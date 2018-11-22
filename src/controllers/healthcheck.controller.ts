import { Server } from 'hapi';
import { AppState } from '../interfaces';

export default class HealthcheckController {
  protected _app: AppState;

  constructor(server: Server) {
    this._app = server.app as AppState;
  }

  info() {
    return {
      git: this._app.git,
    };
  }

  ping() {
    return {
      ping: 'PONG',
      appName: this._app.name,
      appVersion: this._app.version,
    };
  }
}
