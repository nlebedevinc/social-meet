import * as Joi from 'joi';

const HTTPError = Joi.object().keys({
  statusCode: Joi.number().required().description('Code of current error'),
  error: Joi.string().required().description('Type description of error'),
  message: Joi.string().required().description('Message with description of error')
}).label('HTTP_ERROR');

const BasicErrors = {
  '400': {
    'description': 'You have an error in request parameters.',
    'label': 'HTTP_BAD_REQUEST',
    'schema': HTTPError.example({
      'statusCode': 400,
      'error': 'Bad Request',
      'message': 'Can\'t find template with ID 35'
    })
  },
  '401': {
    'description': 'User does not have authorization.',
    'label': 'HTTP_NOT_UNAUTHORIZED',
    'schema': HTTPError.example({
      'statusCode': 401,
      'error': 'Unauthorized',
      'message': 'Missing authentication'
    })
  },
  '403': {
    'description': 'An internal server error occurred.',
    'label': 'HTTP_FORBIDDEN',
    'schema': HTTPError.example({
      'statusCode': 403,
      'error': 'Forbidden',
      'message': 'You don\'t have access to the route /user/{id}'
    })
  },
  '500': {
    'description': 'An internal server error occurred.',
    'label': 'HTTP_INTERNAL_SERVER_ERROR',
    'schema': HTTPError.example({
      'statusCode': 500,
      'error': 'Internal Server Error',
      'message': 'An internal server error occurred'
    })
  }
};

const ping = {
  responses: Object.assign({}, BasicErrors, {
    '201': {
      'description': 'Report about success user profile creation with full user profile data',
    },
    '422': {
      'description': 'Report about wrong data for creating new user profile',
      'schema': HTTPError.example({
        'statusCode': 422,
        'error': 'Unprocessable Entity',
        'message': 'User with login "admin" already exists'
      })
    }
  })
};

const info = {
  responses: Object.assign({}, BasicErrors, {
    '201': {
      'description': 'Report about success user profile creation with full user profile data',
    },
    '422': {
      'description': 'Report about wrong data for creating new user profile',
      'schema': HTTPError.example({
        'statusCode': 422,
        'error': 'Unprocessable Entity',
        'message': 'User with login "admin" already exists'
      })
    }
  })
};

const Documentation = {
  'ping': ping,
  'info': info,
};

export {
  Documentation,
};
