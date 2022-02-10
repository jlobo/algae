import { S3 } from 'aws-sdk';
import { guid } from "./utils"
import { S3config as config } from './config';

export default class S3Repo {
    constructor(bucket="main") {
        this._bucket = bucket;
        this._s3 = new S3({
            accessKeyId: config.id,
            secretAccessKey: config.secret,
            endpoint: config.endpoint,
            s3ForcePathStyle: true,
        });
    }

    async upload(data, filename = '') {
        const params = {
            Bucket: this._bucket,
            Key: filename || guid(),
            Body: JSON.stringify(data, null, 2)
        };

        const entry = await this._s3.upload(params).promise();
        
        return new S3Entry(entry.Key, entry.Location);
    }
}

export class S3Entry {
    /**
     * @param {string} id 
     * @param {string} url 
     */
    constructor(id, url) {
        this.id = id;
        this.url = url;
        this.date = new Date();
    }
}
