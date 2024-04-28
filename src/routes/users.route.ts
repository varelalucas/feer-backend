import express from "express";

// Controllers
import { usersController } from "../controllers/user.controller.js";

// Middlewares
import { authorizationMiddleware } from "../middlewares/authorization.middleware.js";

const routerInstance = express.Router();

// Login
routerInstance.post("/login", usersController.login);

// Rotas de manipulação
routerInstance.get("/all", authorizationMiddleware, usersController.listAll);
routerInstance.get("/me", authorizationMiddleware, usersController.listMe);
routerInstance.post("/create", authorizationMiddleware, usersController.create);
routerInstance.delete(
  "/delete/:id",
  authorizationMiddleware,
  usersController.delete
);

export { routerInstance };
