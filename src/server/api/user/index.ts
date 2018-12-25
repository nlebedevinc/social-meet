import * as Hapi from 'hapi';
import UserController from '../../controllers/user.controller';
import { Role } from '../../plugins/roles/interface';

export default function (server: Hapi.Server, prefix: string) {
    const controller = new UserController(server);
    server.bind(controller);

    // server.route({
    //     method: 'GET',
    //     path: '/user/{id}',
    //     handler: controller.getModel,
    //     options: {
    //         cors: config.get('server:cors'),
    //         auth: 'jwt',
    //         tags: ['api', 'user'],
    //         description: 'Get detailed information about specified user',
    //         validate: Validator.get,
    //         plugins: {
    //             'hapi-swagger': Documentation.get,
    //             'roles': [Role.ADMIN]
    //         }
    //     }
    // })

    // server.route({
    //     method: 'POST',
    //     path: '/users',
    //     handler: controller.getList,
    //     options: {
    //         cors: config.get('server:cors'),
    //         auth: 'jwt',
    //         tags: ['api', 'user'],
    //         description: 'Get detailed information about all users',
    //         plugins: {
    //             'roles': [Role.ADMIN]
    //         }
    //     }
    // })

    server.route({
        method: 'POST',
        path: '/user',
        handler: controller.createUser,
        options: {
            auth: 'jwt',
            tags: ['api', 'user'],
            description: 'Create new user record',
            plugins: {
                'roles': [Role.ADMIN]
            }
        }
    });

    // server.route({
    //     method: 'PATCH',
    //     path: '/user/{id}',
    //     handler: controller.updateUser,
    //     options: {
    //         cors: config.get('server:cors'),
    //         auth: 'jwt',
    //         tags: ['api', 'user'],
    //         description: 'Update user record',
    //         plugins: {
    //             'roles': [Role.ADMIN]
    //         }
    //     }
    // })

    server.route({
        method: 'DELETE',
        path: '/user/{id}',
        handler: controller.deleteUser,
        options: {
            tags: ['api', 'user'],
            description: 'Mark user inavtive',
            plugins: {
                'roles': [Role.ADMIN]
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/user/auth',
        handler: controller.loginUser,
        options: {
            auth: false,
            tags: ['api', 'auth'],
            description: 'Validate user login and password',
        }
    });

    server.route({
        method: 'DELETE',
        path: '/user/auth',
        handler: controller.logoutUser,
        options: {
            tags: ['api', 'auth'],
            description: 'Remove authorisation token from user object',
            plugins: {
                'roles': [Role.USER, Role.ADMIN]
            }
        }
    });

    server.route({
        method: 'PATCH',
        path: '/user/auth',
        handler: controller.authUser,
        options: {
            tags: ['api', 'auth'],
            description: 'Update user authorisation status',
            plugins: {
                'roles': [Role.USER, Role.ADMIN]
            }
        }
    });
}
