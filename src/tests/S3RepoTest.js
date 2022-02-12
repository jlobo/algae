import assert from 'assert';
import S3Repo from '../repos/S3Repo';

const repo = new S3Repo();
describe('S3Repo', function () {
    it('should insert an S3Entry when provided', async function () {
        const message = 'Hello world!';
        
        const entry = await repo.insert(message);
        const entries = await repo.all();
        
        const exists = entries.some(obj => obj.resource === entry.resource);
        assert.equal(exists, true);
    });
});
