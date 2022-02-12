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
     * @param {string} data 
     * @param {string} filename 
     * @returns {Promise<S3Entry>}
     */
    async upload(data, filename = '') {
        const params = {
            Bucket: this._bucket,
            Key: filename || guid(),
            Body: JSON.stringify(data, null, 2)
        };

        const entry = await this._s3.upload(params).promise();
        return S3Entry.fromS3(entry);
    }

    /** @returns {Promise<S3Entry>} */
    async all() {
        var params = { Bucket: this._bucket}
        var entries = await this._s3.listObjects(params).promise();

        if (!entries.Contents) return [];
        
        return entries.Contents.map(S3Entry.fromS3);
    }
}
