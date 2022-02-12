# Senior Software Engineer Test

This project consists of a Web API that receives a message and stores it in an `S3` bucket, in addition to saving a record of the action in a `Postgres` database with a configured `Timescale`.

### How to run it?

```bash
make up
```

### How to test it?
```bash
make test
```

### Things to fix 
* When an S3Entry is inserted in the database the time zone of this does not match the original.
* S3RepoTest should check for a single entity instead of a list.
