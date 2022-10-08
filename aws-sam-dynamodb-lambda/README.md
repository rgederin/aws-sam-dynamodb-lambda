# Description

AWS SAM application using TS which is deploying next infrastructure:

- DynamoDB table for keeping simple items
- Two Lambdas for list items and post item
- API GW for invoking Lambdas

## How to build and deploy

```
sam build
sam deploy --guided
```

After deploy you will find API GW url in SAM output

```
Key                 ApiGwURL                                                                                      
Description         API Gateway endpoint URL                                                                      
Value               https://7qr4lena4e.execute-api.us-west-2.amazonaws.com/Prod
```

## Test my deployment 

You could use Postman to execute HTTP requests.

List all items in DynamoDB table

```
GET https://7qr4lena4e.execute-api.us-west-2.amazonaws.com/Prod

Response: 

[
    {
        "item_name": "Karpov"
    }
]
```

Add new item in DynamoDB

```
POST https://7qr4lena4e.execute-api.us-west-2.amazonaws.com/Prod

Body :

{
    "item" : "Gederin"
}

Response:

{
    "item_name": "Gederin"
}

```

Test that new item was added:

```
GET https://7qr4lena4e.execute-api.us-west-2.amazonaws.com/Prod

[
    {
        "item_name": "Karpov"
    },
    {
        "item_name": "Gederin"
    }
]
```

