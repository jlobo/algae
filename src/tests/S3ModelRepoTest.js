import assert from 'assert';
import { guid } from '../utils';
import { S3Entry } from '../entities/S3Entry';
import  S3ModelRepo from '../repos/S3ModelRepo';

const repo = new S3ModelRepo();
describe('S3ModelRepo', function () {
    it('should insert an S3Entry when provided', async function () {
        const entry = new S3Entry();
        entry.resource = guid();
        entry.url = `http://algae.local:4566/main/${entry.resource}`;
    
        const newEntry = await repo.insert(entry);
        const sameEntry = await repo.getById(newEntry.id);
    
        assert.equal(newEntry.id > 0, true);
        assert.equal(newEntry.resource, entry.resource);
        assert.equal(newEntry.url, entry.url);
    
        assert.equal(sameEntry.id, newEntry.id);
        assert.equal(sameEntry.resource, newEntry.resource);
        assert.equal(sameEntry.url, newEntry.url);
    });
});
