import LowModel from '../base';
import Interface from './interface';
import { unauthorized } from 'boom';

export default class User extends LowModel {
    constructor(protected db: any, protected collection: string = 'Users') {
        super(db, collection);
    }

    static async getUserFromRequest(db: any, collection: string, request: any): Promise<Interface> {
        if (!request.auth || !request.auth.credentials || !request.auth.credentials.sub) {
          throw unauthorized(`User not authorised`);
        }

        return User.findById(db, collection, request.auth.credentials.sub);
    }
}
