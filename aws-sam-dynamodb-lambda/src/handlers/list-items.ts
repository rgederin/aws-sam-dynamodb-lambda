import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const client = new DocumentClient();
const tableName = process.env.DYNAMODB_TABLE;


export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.info('received event:', event);

    const params = {
        TableName: tableName
    };

    const data = await client.scan(params).promise();
    const items = data.Items;

    let response: APIGatewayProxyResult;
    try {
        response = {
            statusCode: 200,
            body: JSON.stringify(items)
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
