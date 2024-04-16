export const processResponseMiddleware = (req, res, next) => {
    res.processResponse = (status = 500, message = 'Erro interno', data = undefined) => {
        return res.status(status).json({
            status,
            message,
            data
        });
    };
    return next();
};
