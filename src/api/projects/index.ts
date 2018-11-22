import * as Hapi from 'hapi';
// import { Documentation } from './documentation';
import ProjectsController from '../../controllers/projects.controller';

export default function (server: Hapi.Server, prefix: string) {
  const controller = new ProjectsController(server);
  server.bind(controller);

  server.route({
    method: 'GET',
    path: `${prefix}/list`,
    handler: controller.getProjects,
    options: {
      tags: ['api', 'projects', 'projects'],
      description: 'Check server instance with version response',
      // plugins: {
      //   'hapi-swagger': Documentation.ping,
      // }
    } as Hapi.RouteOptions
  } as Hapi.ServerRoute);

  server.route({
    method: 'GET',
    path: `${prefix}/{id}`,
    handler: controller.getProject,
    options: {
      tags: ['api', 'projects', 'project'],
      description: 'Check server instance with version response',
      // plugins: {
      //   'hapi-swagger': Documentation.info,
      // }
    } as Hapi.RouteOptions
  } as Hapi.ServerRoute);
}
