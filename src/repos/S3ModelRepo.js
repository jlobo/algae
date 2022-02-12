import models from '../models';
import { S3Entry } from '../entities/S3Entry';
import { Op } from 'sequelize';

export default class S3ModelRepo {
    /**
     * @param {number} id 
     * @returns {Promise<S3Entry>}
     */
    async getById(id) {
        const entry = await models.S3Entry.findByPk(id, {} );
        if (!entry) return null;

        return S3Entry.fromModel(entry);
    }

    /**
     * @param {Date} from 
     * @param {Date} to 
     * @returns {Promise<S3Entry[]>}
     */
    async getRange(from, to) {
        const entries = await models.S3Entry.findAll({
            where: {
                createdAt: {
                    [Op.between]: [from, to], 
                }                
            }
        });

        return entries.map(S3Entry.fromModel);
    }

    /**
     * @param {S3Entry} entry 
     * @returns {Promise<S3Entry>}
     */
     async insert(entry) {
        const newEntry = await models.S3Entry.create(entry);
        return S3Entry.fromModel(newEntry);
    }
}
