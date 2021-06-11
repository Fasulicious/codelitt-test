'use strict'

import Router from 'koa-router'

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user'

const router = new Router({ prefix: '/user' })

router.get('/', async ctx => {
  const {
    body,
    status
  } = await getUsers({})
  ctx.body = body
  ctx.status = status
})

router.get('/:id', async ctx => {
  const { id } = ctx.params
  const {
    body,
    status
  } = await getUsers({ id })
  ctx.body = body
  ctx.status = status
})

router.patch('/:id', async ctx => {
  const { id } = ctx.params
  const data = ctx.request.body
  const {
    body,
    status
  } = await updateUser({ id }, { ...data })
  ctx.body = body
  ctx.status = status
})

router.post('/', async ctx => {
  const data = ctx.request.body
  const {
    body,
    status
  } = await createUser(data)
  ctx.body = body
  ctx.status = status
})

router.delete('/:id', async ctx => {
  const { id } = ctx.params
  const {
    status
  } = await deleteUser({ id })
  ctx.status = status
})

export default router
