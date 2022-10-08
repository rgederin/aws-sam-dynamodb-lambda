import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const client = new DocumentClient();
const tableName = process.env.DYNAMODB_TABLE;


export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.info('received event:', event);

    let data;

    if (event.item) {
        data = event.item;
    } else {
        data = JSON.parse(event.body).item;
    }

    const params = {
        TableName: tableName,
        Item: {
            item_name: data,
        }
    };

    const result = await client.put(params).promise();

    let response: APIGatewayProxyResult;
    try {
        response = {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        };
    } catch (err: unknown) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }

    return response;
};
