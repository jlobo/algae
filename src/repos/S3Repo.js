import { S3 } from 'aws-sdk';
import { guid } from "../utils"
import { S3Entry } from '../entities/S3Entry';
import config from '../config/s3.config';

export default class S3Repo {
    constructor() {
        this._bucket = config.bucket;
        this._s3 = new S3(config.buildS3());
    }

    /**
     * @param {string|object} data 
     * @param {string} resourceName 
     * @returns {Promise<S3Entry>}
     */
    async insert(data, resourceName = '') {
        if (typeof data !== 'string')
            data = JSON.stringify(data, null, 2)

        const params = {
            Bucket: this._bucket,
            Key: resourceName || guid(),
            Body: data
        };

        const entry = await this._s3.upload(params).promise();
        return S3Entry.fromS3(entry);
    }

    /** @returns {Promise<S3Entry[]>} */
    async all() {
        var params = { Bucket: this._bucket}
        var entries = await this._s3.listObjects(params).promise();

        if (!entries.Contents) return [];
        
        return entries.Contents.map(S3Entry.fromS3);
    }
}
