import express, { type RequestHandler } from 'express'
import fs from 'fs'
import chalk from 'chalk'
import cors from 'cors'

import { networkInterfaces } from 'os'

import { processResponseMiddleware } from '../middlewares/processResponse.middleware'
import { type User } from '@prisma/client'

const app = express()

app.use(cors())
app.use(express.json())
app.use(processResponseMiddleware)

const routes: string[] = []

declare global {
  namespace Express {
    export interface Response {
      processResponse: (status: number, message: string, data?: any) => void
    }

    export interface Request {
      decoded: {
        user: User
      }
    }
  }

  namespace NodeJS {
    export interface ProcessEnv {
      API_PORT: number
      DATABASE_URL: string
      JWT_SECRET_TOKEN: string
    }
  }
}

fs.readdir('./src/routes', (event, files) => {
  console.log('[app] files', files)
  if (!event) {
    files.forEach(async (file: string) => {
      const { routerInstance }: { routerInstance: RequestHandler } =
        await import(`../routes/${file}`)

      routes.push(`/${file.replace('.route.ts', '')}`)

      console.log('[app] routes', routes)
      console.log('[app] /${file.replace', `/${file.replace('.route.ts', '')}`)

      app.use(`/${file.replace('.route.ts', '')}`, routerInstance)
    })
  }
})

app.listen(process.env.API_PORT, () => {
  console.log(chalk.white('Iniciando a API...'))
  console.log('')
  const appUrl = networkInterfaces().en0?.find(
    (network) => network.family === 'IPv4'
  )
  console.log('')
  console.log(
    `| Endereço local: ${chalk.magenta(
      `http://localhost:${process.env.API_PORT}`
    )}`
  )
  if (appUrl) {
    console.log(
      `| Endereço na rede: ${chalk.magenta(
        `http://${appUrl.address}:${process.env.API_PORT}`
      )}`
    )
  }
})
