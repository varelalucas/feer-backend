"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../core/prisma");
const authorizationMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.processResponse(401, 'Não foi possível pegar o token da requisição!');
    }
    const token = authorization.replace('Bearer ', '');
    if (!token) {
        return res.processResponse(401, 'O token da requisição está no formato errado!');
    }
    let userFromToken;
    try {
        const user = jsonwebtoken_1.default.decode(token, {
            json: true
        });
        userFromToken = user;
    }
    catch (err) {
        console.error(err);
        return res.processResponse(401, 'O token da requisição está no formato errado!');
    }
    if (!userFromToken) {
        return res.processResponse(401, 'O token da requisição é inválido!');
    }
    const user = await prisma_1.prisma.user.findFirst({
        where: {
            id: userFromToken.id
        }
    });
    if (user) {
        req.decoded = {
            user: {
                id: user.id,
                full_name: user.full_name,
                password: user.password,
                username: user.username,
                dt_created_at: user.dt_created_at,
                dt_updated_at: user.dt_updated_at
            }
        };
        return next();
    }
    return res.processResponse(401, 'Não foi possível autenticar o usuário');
};
exports.authorizationMiddleware = authorizationMiddleware;
