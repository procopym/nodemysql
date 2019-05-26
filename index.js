'use strict';

const HttpConfig = require('./src/config/http-config');
let HttpServer = require('./src/modules/http-server-module');
let RouteModule = require('./src/modules/route-module');
let RequestController = require('./src/controllers/request-controller');

const server = new HttpServer({...HttpConfig});

// define controllers
let requestController = new RequestController();

// router initialization
let router = new RouteModule(server);
router.route('GET', '/helloworld', requestController.helloWorldAction);
router.route('GET', '/getdata/{reqno?}', requestController.getData.bind(requestController));
router.route('DELETE', '/delete_request/{reqno}', requestController.deteleData.bind(requestController));
router.route('POST', '/newrequest', requestController.addData.bind(requestController));
router.route('POST', '/update_request', requestController.updateData.bind(requestController));
