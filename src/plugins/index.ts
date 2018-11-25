import * as Boom from 'boom';
import * as Hapi from 'hapi';
import * as ReactRouter from 'react-router';
import * as History from 'history';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { assign } from 'lodash';

import { Options, HapiPlugin } from './interfaces';

class HapiServerSide {
  constructor(private server: Hapi.Server, private options: Options, next: Function) {
    server.route({
      path: '/{path*}',
      method: 'GET',
      handler: this.handler,
    } as Hapi.ServerRoute);
  }

  async handler(request: Hapi.Request, toolkit: Hapi.ResponseToolkit) {
    const {
      routes,
      bootstrapAction,
      template,
      visionOptions,
      params,
      rootElement,
      getInitialContext,
      renderToStaticMarkup,
      contextAsProps,
    } = this.options;

    ReactRouter.matchPath(
      { routes, location: request.url },
      async (error: Error, redirectLocation: History.Location, renderProps: any) => {
        if (error) {
          return toolkit.response(Boom.badImplementation(error.message));
        }

        if (redirectLocation) {
          return toolkit.redirect(redirectLocation.pathname + redirectLocation.search);
        }

        if (!renderProps) {
          return toolkit.response(Boom.notFound('Invalid route', { route: request.url.pathname }));
        }

        const context = getInitialContext();
        const componentsToFill = renderProps.components
          .filter((component: any) => component[bootstrapAction])
          .map((component: any) => component[bootstrapAction](context, renderProps));

        try {
          await Promise.all(componentsToFill);

          const reactRootElement = React.createElement(
            rootElement,
            contextAsProps ? context : { context },
            React.createElement('context', renderProps)
          );

          const renderContext = assign(
            params,
            { context: JSON.stringify(context) },
            {
              componentRenderedToString: renderToStaticMarkup ?
                ReactDOMServer.renderToStaticMarkup(reactRootElement) : ReactDOMServer.renderToString(reactRootElement)
            }
          );
          return (<any>toolkit).view(template, renderContext, visionOptions);
        } catch (err) {
          return toolkit.response(Boom.badImplementation(err.message));
        }
      });
  }
}

export register: HapiPlugin = HapiServerSide;
