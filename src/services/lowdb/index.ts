import * as path from 'path';
import * as Low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { LowService } from '../../interfaces';


function init() {
  const adapter = new FileSync(path.resolve(__dirname, '../../../../db/projects.json'));
  return Low(adapter);
}

export default function createLowService(): LowService {
  const connection = init();
  return {
    getProjects: (): any[] => {
      return connection.get('projects')
        .value();
    },
    getProject: (id: string): any => {
      return connection.get('details')
        .find({id: id})
        .value();
    }
  };
}
