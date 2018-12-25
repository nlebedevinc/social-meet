import * as uuid from 'uuid';

export interface Entity {
    readonly id: string;
}

abstract class LowModel {
    protected _entity: Entity;

    constructor(protected db: any, protected collection: string) {
        this._entity = {
            id: uuid(),
        };
    }

    async save() {
        const dbCollection = await this.db
            .get(this.collection);
        const dbEntity = await dbCollection
            .find({ id: this._entity.id });
        const entityValue = await dbEntity.value();

        // check if entity exists and update or create a new one
        if (entityValue) {
            dbEntity
                .assign({ ...this._entity })
                .write();
        } else {
            dbCollection
                .push(this._entity)
                .write();
        }
    }

    static async findOne(db: any, collection: string, query: any) {
        const entity = await db
            .get(collection)
            .find(query)
            .value();

        return entity;
    }

    static async findById(db: any, collection: string, id: string) {
        const query = { id };
        const entity = await LowModel.findOne(db, collection, query);

        return entity;
    }
}

export default LowModel;
