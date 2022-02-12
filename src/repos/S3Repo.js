import { guid } from "../utils"
import { S3Entry } from '../entities/S3Entry';
import config from '../config/s3.config';

export default class S3Repo {
    constructor(bucket="main") {
        this._bucket = bucket;
        this._s3 = config.buildS3();
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
}
