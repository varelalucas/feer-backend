"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processResponseMiddleware = void 0;
const processResponseMiddleware = (req, res, next) => {
    res.processResponse = (status = 500, message = 'Erro interno', data = undefined) => {
        return res.status(status).json({
            status,
            message,
            data
        });
    };
    return next();
};
exports.processResponseMiddleware = processResponseMiddleware;
