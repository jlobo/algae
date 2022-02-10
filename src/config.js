const isProd = process.env.NODE_ENV === 'production';

export class S3config {
    static get id() {
        if (isProd && !process.env.AWS_ACCESS_KEY)
            throw Error("AWS_ACCESS_KEY environment variable must be set");

        return process.env.AWS_ACCESS_KEY || 'id';
    }

    static get secret() {
        if (isProd && !process.env.AWS_SECRET_ACCESS_KEY)
            throw Error("AWS_SECRET_ACCESS_KEY environment variable must be set");

        return process.env.AWS_SECRET_ACCESS_KEY || 'secret';
    }

    static get endpoint() {
        return isProd ? undefined : process.env.AWS_ACCESS_ENDPOINT || 'http://localhost:4566';
    }
}
