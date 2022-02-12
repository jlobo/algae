export class S3Entry {
    constructor() {
        this.id = 0;
        this.url = '';
        this.resource = '';
        this.createdAt = new Date();
    }

    /** @returns {S3Entry} */
    static fromModel(entry) {
        var entity = new S3Entry();
        
        entity.id = entry.id;
        entity.url = entry.url;
        entity.resource = entry.resource;
        entity.createdAt = entity.createdAt;

        return entity;
    }

    /** @returns {S3Entry} */
    static fromS3(entry) {
        var entity = new S3Entry();
        
        entity.url = entry.Location;
        entity.resource = entry.Key;
        entity.createdAt = new Date();
        
        return entity;
    }
}
