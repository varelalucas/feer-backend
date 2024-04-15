import type { NextFunction, Response } from 'express'

export const processResponseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.processResponse = (
    status = 500,
    message = 'Erro interno',
    data = undefined
  ) => {
    return res.status(status).json({
      status,
      message,
      data
    })
  }

  return next()
}
