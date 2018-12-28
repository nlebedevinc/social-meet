import * as Hapi from 'hapi';
import EventsController from '../../controllers/events.controller';

export default function (server: Hapi.Server, prefix: string) {
    const controller = new EventsController(server);
    server.bind(controller);

    server.route({
        method: 'GET',
        path: `${prefix}/list`,
        handler: controller.list,
        options: {
            cors: true,
            auth: false,
            tags: ['api', 'events', 'list'],
            description: 'Check server instance with version response',
        } as Hapi.RouteOptions
    } as Hapi.ServerRoute);

    server.route({
        method: 'POST',
        path: `${prefix}/save`,
        handler: controller.save,
        options: {
            cors: true,
            auth: false,
            tags: ['api', 'events', 'save'],
            description: 'Check server instance with version response',
        } as Hapi.RouteOptions
    } as Hapi.ServerRoute);
}
