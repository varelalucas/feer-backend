import express from 'express'

// Controllers
import { portfolioController } from '../controllers/portfolio.controller'

// Middlewares
import { authorizationMiddleware } from '../middlewares/authorization.middleware'

const routerInstance = express.Router()

// Rotas de manipulação
routerInstance.get('/all', portfolioController.listAll)
routerInstance.post(
  '/create',
  authorizationMiddleware,
  portfolioController.create
)
routerInstance.delete(
  '/delete/:id',
  authorizationMiddleware,
  portfolioController.delete
)
routerInstance.put(
  '/update/:id',
  authorizationMiddleware,
  portfolioController.update
)

export { routerInstance }
