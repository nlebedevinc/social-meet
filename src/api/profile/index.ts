import * as Hapi from 'hapi';
import ProfileController from '../../controllers/profile.controller';

export default function (server: Hapi.Server, prefix: string) {
  const controller = new ProfileController(server);
  server.bind(controller);

  server.route({
    method: 'GET',
    path: `${prefix}/{id}`,
    handler:  () => {},
    options: {
      tags: ['api', 'profile'],
      description: 'Get detailed information about user profile with specified id',
    } as Hapi.RouteOptions
  } as Hapi.ServerRoute);


}
