import type express from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../core/prisma.js'

export const authorizationMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.processResponse(
      401,
      'Não foi possível pegar o token da requisição!'
    )
  }

  const token = authorization.replace('Bearer ', '')

  if (!token) {
    return res.processResponse(
      401,
      'O token da requisição está no formato errado!'
    )
  }

  let userFromToken

  try {
    const user = jwt.decode(token, {
      json: true
    })

    userFromToken = user
  } catch (err) {
    console.error(err)

    return res.processResponse(
      401,
      'O token da requisição está no formato errado!'
    )
  }

  if (!userFromToken) {
    return res.processResponse(401, 'O token da requisição é inválido!')
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userFromToken.id
    }
  })

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
    }

    return next()
  }

  return res.processResponse(401, 'Não foi possível autenticar o usuário')
}
