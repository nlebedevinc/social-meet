import * as path from 'path';
import * as Low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { LowService } from '../../interfaces';

function init() {
    // change and configure db path
    const adapter = new FileSync(path.resolve(process.cwd(), './db/projects.json'));
    return Low(adapter);
}

export default function createLowService(): LowService {
    const connection = init();
    return {
        getConnection: (): any => {
            return connection;
        }
    };
}
