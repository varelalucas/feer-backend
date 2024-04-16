import express from 'express'

// Controllers
import { testimonialsController } from '../controllers/testimonials.controller.js'

// Middlewares
import { authorizationMiddleware } from '../middlewares/authorization.middleware.js'

const routerInstance = express.Router()

// Rotas de manipulação
routerInstance.get('/all', testimonialsController.listAll)
routerInstance.post(
  '/create',
  authorizationMiddleware,
  testimonialsController.create
)
routerInstance.delete(
  '/delete/:id',
  authorizationMiddleware,
  testimonialsController.delete
)

export { routerInstance }
