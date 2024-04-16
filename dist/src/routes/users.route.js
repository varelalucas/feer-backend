"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerInstance = void 0;
const express_1 = __importDefault(require("express"));
// Controllers
const user_controller_1 = require("../controllers/user.controller");
// Middlewares
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const routerInstance = express_1.default.Router();
exports.routerInstance = routerInstance;
// Login
routerInstance.post('/login', user_controller_1.usersController.login);
// Rotas de manipulação
routerInstance.get('/all', user_controller_1.usersController.listAll);
routerInstance.post('/create', user_controller_1.usersController.create);
routerInstance.delete('/delete/:id', authorization_middleware_1.authorizationMiddleware, user_controller_1.usersController.delete);
