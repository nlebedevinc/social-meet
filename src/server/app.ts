import { Server as HapiServer } from 'hapi';
import * as inert from 'inert';
import * as appPackage from '../../package.json';
import { healthcheckApi, userApi, eventsApi } from './api';
import { AppState, AppServices } from './interfaces';
import jwtAuth from './plugins/jwt';

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

    // setup custom hapi plugins
    const jwt = jwtAuth();
    await jwt.register(server);

    server.route({
      method: 'GET',
      path: '/{param*}',
      options: {
          auth: false,
      },
      handler: {
        directory: {
          path: 'public'
        }
      }
    });

    healthcheckApi(server, '/v1/healthcheck');
    userApi(server, '/v1/user');
    eventsApi(server, '/v1/events');
    return server;
  } catch (err) {
    throw err;
  }
}
