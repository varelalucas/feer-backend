import express from "express";
import chalk from "chalk";
import cors from "cors";
import { networkInterfaces } from "os";
import { processResponseMiddleware } from "../middlewares/processResponse.middleware.js";
import { routerInstance as ProjectsRouter } from "../routes/projects.route.js";
import { routerInstance as TestimonialsRouter } from "../routes/testimonials.route.js";
import { routerInstance as UsersRouter } from "../routes/users.route.js";
import { routerInstance as PortfolioRouter } from "../routes/portfolio.route.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(processResponseMiddleware);
app.use("/projects", ProjectsRouter);
app.use("/portfolio", PortfolioRouter);
app.use("/users", UsersRouter);
app.use("/testimonials", TestimonialsRouter);
app.listen(process.env.API_PORT, () => {
    var _a;
    console.log(chalk.white("Iniciando a API..."));
    console.log("");
    const appUrl = (_a = networkInterfaces().en0) === null || _a === void 0 ? void 0 : _a.find((network) => network.family === "IPv4");
    console.log("");
    console.log(`| Endereço local: ${chalk.magenta(`http://localhost:${process.env.API_PORT}`)}`);
    if (appUrl) {
        console.log(`| Endereço na rede: ${chalk.magenta(`http://${appUrl.address}:${process.env.API_PORT}`)}`);
    }
});
