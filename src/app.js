'use strict'

import Koa from 'koa'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import cors from 'koa2-cors'
import body from 'koa-body'
import compress from 'koa-compress'

import health from './routes/health'
import user from './routes/user'

const app = new Koa()

app.use(cors())
app.use(body())
app.use(logger())
app.use(helmet())
app.use(compress())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    if (!e.statusCode && !e.status) {
      console.log(e)
    }
    ctx.status = e.statusCode || e.status || 500
    ctx.body = {
      code: e.code || 'unhandled_error',
      message: e.message || 'Something went wrong'
    }
  }
})

app.use(user.routes())
app.use(health.routes())

export default app

if (!module.parent) {
  const port = process.env.PORT || 3000
  app.listen(port, () => console.log(`Server listening on port ${port}`))
}
