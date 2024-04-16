import express from 'express';
// Controllers
import { ProjectsController } from '../controllers/project.controller.js';
// Middlewares
import { authorizationMiddleware } from '../middlewares/authorization.middleware.js';
const routerInstance = express.Router();
// Rotas de manipulação
routerInstance.get('/all', ProjectsController.listAll);
routerInstance.post('/create', authorizationMiddleware, ProjectsController.create);
routerInstance.delete('/delete/:id', authorizationMiddleware, ProjectsController.delete);
routerInstance.put('/update/:id', authorizationMiddleware, ProjectsController.update);
export { routerInstance };
