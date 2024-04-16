import express, { type RequestHandler } from "express";
import chalk from "chalk";
import cors from "cors";

import { networkInterfaces } from "os";

import { processResponseMiddleware } from "../middlewares/processResponse.middleware.js";
import { type User } from "@prisma/client";
import { routerInstance as ProjectsRouter } from "../routes/projects.route.js";
import { routerInstance as TestimonialsRouter } from "../routes/testimonials.route.js";
import { routerInstance as UsersRouter } from "../routes/users.route.js";
import { routerInstance as PortfolioRouter } from "../routes/portfolio.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(processResponseMiddleware as any);

declare global {
  namespace Express {
    export interface Response {
      processResponse: (status: number, message: string, data?: any) => void;
    }

    export interface Request {
      decoded: {
        user: User;
      };
    }
  }

  namespace NodeJS {
    export interface ProcessEnv {
      API_PORT: number;
      DATABASE_URL: string;
      JWT_SECRET_TOKEN: string;
    }
  }
}

app.use("/projects", ProjectsRouter);
app.use("/portfolio", PortfolioRouter);
app.use("/users", UsersRouter);
app.use("/testimonials", TestimonialsRouter);

app.listen(process.env.API_PORT, () => {
  console.log(chalk.white("Iniciando a API..."));
  console.log("");
  const appUrl = networkInterfaces().en0?.find(
    (network) => network.family === "IPv4"
  );
  console.log("");
  console.log(
    `| Endereço local: ${chalk.magenta(
      `http://localhost:${process.env.API_PORT}`
    )}`
  );
  if (appUrl) {
    console.log(
      `| Endereço na rede: ${chalk.magenta(
        `http://${appUrl.address}:${process.env.API_PORT}`
      )}`
    );
  }
});
