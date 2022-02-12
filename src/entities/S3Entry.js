export class S3Entry {
    constructor() {
        /** @type {number} */
        this.id = null;
        this.url = '';
        this.resource = '';
        this.updatedAt = new Date();
    }

    /** @returns {S3Entry} */
    static fromModel(entry) {
        var entity = new S3Entry();
        
        entity.id = entry.id;
        entity.url = entry.url;
        entity.resource = entry.resource;
        entity.updatedAt = entity.updatedAt;

        return entity;
    }

    /** @returns {S3Entry} */
    static fromS3(entry) {
        var entity = new S3Entry();
        
        entity.resource = entry.Key;

        if (entry.Location)
            entity.url = entry.Location;
        
        if (entry.LastModified)
            entity.updatedAt = entry.LastModified;
        
        return entity;
    }
}
