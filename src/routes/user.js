'use strict'

import Router from 'koa-router'

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user'

import {
  postValidator,
  patchValidator
} from '../utils/validator'

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

router.get('/tag/:tag', async ctx => {
  const { tag } = ctx.params
  const {
    body,
    status
  } = await getUsers({ tag })
  ctx.body = body
  ctx.status = status
})

router.patch('/:id', async ctx => {
  const { id } = ctx.params
  const data = ctx.request.body
  const { value, error } = patchValidator(data, 'employee')
  if (error) {  
    console.log(error)
    ctx.throw(400, 'Please read the documentation to check to the correct payload', { code: 'wrong_input' })
  }
  const {
    body,
    status
  } = await updateUser({ id }, { ...value })
  ctx.body = body
  ctx.status = status
})

router.post('/', async ctx => {
  const data = ctx.request.body
  const { value, error } = postValidator(data)
  if (error) {  
    console.log(error)
    ctx.throw(400, 'Please read the documentation to check to the correct payload', { code: 'wrong_input' })
  }
  const {
    body,
    status
  } = await createUser(value)
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
