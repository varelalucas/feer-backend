"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerInstance = void 0;
const express_1 = __importDefault(require("express"));
// Controllers
const portfolio_controller_1 = require("../controllers/portfolio.controller");
// Middlewares
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const routerInstance = express_1.default.Router();
exports.routerInstance = routerInstance;
// Rotas de manipulação
routerInstance.get('/all', portfolio_controller_1.portfolioController.listAll);
routerInstance.post('/create', authorization_middleware_1.authorizationMiddleware, portfolio_controller_1.portfolioController.create);
routerInstance.delete('/delete/:id', authorization_middleware_1.authorizationMiddleware, portfolio_controller_1.portfolioController.delete);
routerInstance.put('/update/:id', authorization_middleware_1.authorizationMiddleware, portfolio_controller_1.portfolioController.update);
