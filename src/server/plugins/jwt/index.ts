import { Plugin } from '../../interfaces';
import { Server } from 'hapi';
import validateUser from './validate';

const PRIVATE_KEY = '3Ust0R0z9aekHi2n54TTL2edk+888TCYBYcPDw1PmrHDulFh4/3euNYmsqu7s+cJyIPY3xWD8AnFzNRP747OGorAt0A20qpPeFeHKGTQ11CsXHpsEh1YWZ3RG+LKEbBWK0jU6gMYe0msDVzTcORFKH48RK7Gmpf5NAL152dJOWys34E30i7UC4PZ1+vJJbP6s12+nHUInA26S7E7FBCFpM1/oeF+gStSHi9IdXZCyYsIDRkZKAQBCqhoeW4PvMb6wiOMQ10l4xaiFNRfwHnHlOTFROo7hSKLaBP9zGyvx7+gsX+Q5bJjM+TI2gOg88OsK/Ervz+ogWEnpYFC+3WGdw==';

export default (): Plugin => {
    return {
        register: async (server: Server): Promise<void> => {
            try {
                // registering new plugin in server instance
                await server.register(require('hapi-auth-jwt2'));

                // defining new auth strategy
                server.auth.strategy('jwt', 'jwt', {
                    key: PRIVATE_KEY,
                    validate: validateUser,
                    verifyOptions: { algorithms: ['HS256'] }
                });

                // setting default auth strategy as JWT
                server.auth.default('jwt');

            } catch (error) {
                // log.error(`Catch error on token validation: ${error.message}`, { err: error })
                throw new Error(error);
            }
        },
        info: () => {
            return {
                name: 'JWT Authentication',
                version: '1.0.0'
            };
        }
    };
};
