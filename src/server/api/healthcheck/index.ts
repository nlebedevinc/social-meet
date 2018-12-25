import * as Hapi from 'hapi';
// import { Documentation } from './documentation';
import HealthcheckController from '../../controllers/healthcheck.controller';

export default function (server: Hapi.Server, prefix: string) {
    const controller = new HealthcheckController(server);
    server.bind(controller);

    server.route({
        method: 'GET',
        path: `${prefix}/ping`,
        handler: controller.ping,
        options: {
            auth: false,
            tags: ['api', 'healthcheck', 'ping'],
            description: 'Check server instance with version response',
            // plugins: {
            //   'hapi-swagger': Documentation.ping,
            // }
        } as Hapi.RouteOptions
    } as Hapi.ServerRoute);

    server.route({
        method: 'GET',
        path: `${prefix}/info`,
        handler: controller.info,
        options: {
            auth: false,
            tags: ['api', 'healthcheck', 'info'],
            description: 'Check server instance with version response',
            // plugins: {
            //   'hapi-swagger': Documentation.info,
            // }
        } as Hapi.RouteOptions
    } as Hapi.ServerRoute);
}
