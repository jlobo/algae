# Senior Software Engineer Test

This project consists of a Web API that receives a message and stores it in an `S3` bucket, in addition to saving a record of the action in a `Postgres` database with a configured `Timescale`.

> ***You can try postman at this [Web API](http://ec2-54-252-187-173.ap-southeast-2.compute.amazonaws.com:8080)***

### API Definition

| API                             | Description                   | Request body | Response body |
| ------------------              | ------------------            | ------------ | ------------- |
| POST `/`                        | Upload a text to AWS S3       | Text         | S3 item |
| GET `/`                         | Get all the key items         | None         | List of S3 |
| GET `/`{from:date}`/`{to:date}  | Get all the S3 in the range   | None         | List of S3 |

### POST Request example

```http
POST / HTTP/1.1
Content-Type: text/plain

Hello World!
```

```
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": 1,
    "url": "http://algae.local:4566/main/e4512ffb-333d-46a3-b24e-0741aa3b9256",
    "resource": "e4512ffb-333d-46a3-b24e-0741aa3b9256",
    "updatedAt": "2021-01-12T12:21:59.985Z"
}
```

### GET Request root example

```http
GET / HTTP/1.1
```

```
HTTP/1.1 200 OK
Content-Type: application/json

[
    {
        "id": 1,
        "url": "http://algae.local:4566/main/e4512ffb-333d-46a3-b24e-0741aa3b9256",
        "resource": "e4512ffb-333d-46a3-b24e-0741aa3b9256",
        "updatedAt": "2021-01-12T12:21:59.985Z"
    },
    {
        "id": 2,
        "url": "http://algae.local:4566/main/13882aba-696e-4d27-b6e5-8dcda25e1600",
        "resource": "13882aba-696e-4d27-b6e5-8dcda25e1600",
        "updatedAt": "2021-05-04T14:51:99.254Z"
    }
]
```

### GET Request range example

```http
GET /2022-01-01/2023-02-01 HTTP/1.1
```

```
HTTP/1.1 200 OK
Content-Type: application/json

[
    {
        "id": 1,
        "url": "http://algae.local:4566/main/e4512ffb-333d-46a3-b24e-0741aa3b9256",
        "resource": "e4512ffb-333d-46a3-b24e-0741aa3b9256",
        "updatedAt": "2021-01-12T12:21:59.985Z"
    }
]
```

### How to run it?

```bash
make up
```

### How to test it?
```bash
make test
```
### How to make a new release?
```bash
make release
```

### Things to fix 
* When an S3Entry is inserted in the database the time zone of this does not match the original.
* S3RepoTest should check for a single entity instead of a list.
