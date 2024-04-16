"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerInstance = void 0;
const express_1 = __importDefault(require("express"));
// Controllers
const project_controller_1 = require("../controllers/project.controller");
// Middlewares
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const routerInstance = express_1.default.Router();
exports.routerInstance = routerInstance;
// Rotas de manipulação
routerInstance.get('/all', project_controller_1.ProjectsController.listAll);
routerInstance.post('/create', authorization_middleware_1.authorizationMiddleware, project_controller_1.ProjectsController.create);
routerInstance.delete('/delete/:id', authorization_middleware_1.authorizationMiddleware, project_controller_1.ProjectsController.delete);
routerInstance.put('/update/:id', authorization_middleware_1.authorizationMiddleware, project_controller_1.ProjectsController.update);
