import "dotenv/config"
import { S3 } from 'aws-sdk';

const isProd = process.env.NODE_ENV === 'production';

export default class S3config {
    static get id() {
        if (!process.env.AWS_ACCESS_KEY)
            throw Error("AWS_ACCESS_KEY environment variable must be set");

        return process.env.AWS_ACCESS_KEY;
    }

    static get secret() {
        if (!process.env.AWS_SECRET_ACCESS_KEY)
            throw Error("AWS_SECRET_ACCESS_KEY environment variable must be set");

        return process.env.AWS_SECRET_ACCESS_KEY;
    }

    static get bucket() {
        if (!process.env.AWS_S3_BUKET)
            throw Error("AWS_S3_BUKET environment variable must be set");

        return process.env.AWS_S3_BUKET;
    }

    static get endpoint() {
        return isProd ? undefined : process.env.AWS_ACCESS_ENDPOINT || 'http://localhost:4566';
    }

    static buildS3() {
        return new S3({
            accessKeyId: S3config.id,
            secretAccessKey: S3config.secret,
            endpoint: S3config.endpoint,
            s3ForcePathStyle: !isProd,
        });
    }
}
