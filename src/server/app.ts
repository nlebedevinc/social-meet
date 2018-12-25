import { Server as HapiServer } from 'hapi';
import * as inert from 'inert';
import * as appPackage from '../../package.json';
import { healthcheckApi, userApi } from './api';
import { AppState, AppServices } from './interfaces';

export async function init(services: AppServices): Promise<HapiServer> {
  try {
    const port = process.env.PORT || 3000;
    const server = new HapiServer({
      debug: false,
      port
    });

    await server.register(inert);
    const appState = server.app as AppState;
    appState.services = services;
    appState.name = (<any>appPackage).name;
    appState.version = (<any>appPackage).version;

    appState.git = {
      url: (<any>appPackage).git.url,
    };

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: 'public'
        }
      }
    });

    healthcheckApi(server, '/v1/healthcheck');
    userApi(server, '/v1/user');
    return server;
  } catch (err) {
    throw err;
  }
}
