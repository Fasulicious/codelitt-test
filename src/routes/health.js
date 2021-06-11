'use strict'

import Router from 'koa-router'

const router = new Router()

router.get('/health', async (ctx, next) => {
  ctx.status = 200
})

export default router
