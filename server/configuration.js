const PostController = require('../controllers/postController');
const RegistrationController = require('../controllers/registrationController');
const UserController = require('../controllers/userController');
const LikeController = require('../controllers/likesController');
const RequestService = require('./service/request-service');
const SessionService = require('./service/session-service');
const Session = require('./session');

const AccessHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  'Access-Control-Allow-Headers':
    'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
};

const methodHandler = async (args, config) => {
  const { client } = args;
  const { method } = client.req;
  const handler = config[method];
  if (handler) {
    return await handler(args);
  }
};

const methodsConfig = {
  login: {
    handle: async (args) => await methodHandler(args, methodsConfig.login),
    POST: async ({ client }) =>
      await RequestService.getRequestBodyData(client.req)
        .then(RegistrationController.authUserController)
        .then((data) => SessionService.start(client, data, Session.start)),
    DELETE: async ({ client }) => SessionService.delete(client, Session.delete),
  },
  me: {
    handle: async (args) => await methodHandler(args, methodsConfig.me),
    GET: async ({ client }) => {
      if (client.cookie) {
        return await UserController.findUserController(client.cookie);
      }
      return { messages: 'Token doesn`t exist!', resultCode: 1 };
    },
  },
  register: {
    handle: async (args) => await methodHandler(args, methodsConfig.me),
    POST: async ({ client }) =>
      await RequestService.getRequestBodyData(client.req)
        .then(UserController.createNewUserController)
        .then((data) => SessionService.start(client, data, Session.start)),
  },
  profile: {
    handle: async (args) => await methodHandler(args, methodsConfig.profile),
    GET: async ({ params }) => await UserController.findUserController(params),
  },
  status: {
    handle: async (args) => await methodHandler(args, methodsConfig.status),
    GET: async ({ params }) =>
      await UserController.getUserStatusController(params),
    PUT: async ({ client, params }) => {
      return await RequestService.getRequestBodyData(client.req).then((data) =>
        UserController.updateUserStatusController(data, params)
      );
    },
  },
  skills: {
    handle: async (args) => await methodHandler(args, methodsConfig.skills),
    GET: async ({ params }) =>
      await UserController.getUserSkillsController(params),
    PUT: async ({ client, params }) =>
      await RequestService.getRequestBodyData(client.req).then((data) =>
        UserController.updateUserSkillsController(data, params)
      ),
  },
  posts: {
    handle: async (args) => await methodHandler(args, methodsConfig.posts),
    GET: async ({ params }) => await PostController.getPostsController(params),
    POST: async ({ client, params }) =>
      await RequestService.getRequestBodyData(client.req).then((data) =>
        PostController.createPostController(data.post, params)
      ),
    PUT: async ({ client }) =>
      await RequestService.getRequestBodyData(client.req).then((data) =>
        PostController.updatePostController(data.status, data.id)
      ),
    DELETE: async ({ params }) =>
      await PostController.deletePostController(params),
  },
  users: {
    handle: async (args) => await methodHandler(args, methodsConfig.users),
    GET: async ({ parsedQuery }) =>
      await UserController.getUsersController(parsedQuery),
  },
  likes: {
    handle: async (args) => await methodHandler(args, methodsConfig.likes),
    GET: async ({ params }) => await LikeController.getLikesController(params),
    PUT: async ({ client, params }) => {},
    PATCH: async ({ client, params }) => {},
  },
};

const PORT = 3003;

module.exports = { AccessHeaders, methodsConfig, PORT };
