"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const cors_1 = __importDefault(require("cors"));
const os_1 = require("os");
const processResponse_middleware_1 = require("../middlewares/processResponse.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(processResponse_middleware_1.processResponseMiddleware);
const routes = [];
fs_1.default.readdir('./src/routes', (event, files) => {
    console.log('[app] files', files);
    if (!event) {
        files.forEach(async (file) => {
            const { routerInstance } = await Promise.resolve(`${`../routes/${file}`}`).then(s => __importStar(require(s)));
            routes.push(`/${file.replace('.route.ts', '')}`);
            console.log('[app] routes', routes);
            console.log('[app] /${file.replace', `/${file.replace('.route.ts', '')}`);
            app.use(`/${file.replace('.route.ts', '')}`, routerInstance);
        });
    }
});
app.listen(process.env.API_PORT, () => {
    var _a;
    console.log(chalk_1.default.white('Iniciando a API...'));
    console.log('');
    const appUrl = (_a = (0, os_1.networkInterfaces)().en0) === null || _a === void 0 ? void 0 : _a.find((network) => network.family === 'IPv4');
    console.log('');
    console.log(`| Endereço local: ${chalk_1.default.magenta(`http://localhost:${process.env.API_PORT}`)}`);
    if (appUrl) {
        console.log(`| Endereço na rede: ${chalk_1.default.magenta(`http://${appUrl.address}:${process.env.API_PORT}`)}`);
    }
});
