import { ResponseObject, ResponseToolkit, Server } from 'hapi';
import { badData, badImplementation } from 'boom';
import { AppState } from '../interfaces';

export default class EventsController {
    protected _app: AppState;

    constructor(server: Server) {
        this._app = server.app as AppState;
    }

    async list(request: any, toolkit: ResponseToolkit): Promise<ResponseObject | Error> {
        try {
            const { low } = request.server.app.services;
            const list = await low.getEvents();
            if (!list) {
                return badData(`User with login "${request.payload.login}" already exists`);
            }

            return toolkit.response(list);
        } catch (error) {
            return badImplementation(error.message, { error });
        }
    }

    async save(request: any, toolkit: ResponseToolkit): Promise<ResponseObject | Error> {
        const event = request.payload;
        try {
            const { low } = request.server.app.services;
            const storedEvent = await low.storeEvent(event);

            return toolkit.response(storedEvent);
        } catch (error) {
            return badImplementation(error.message, { error });
        }
    }
}