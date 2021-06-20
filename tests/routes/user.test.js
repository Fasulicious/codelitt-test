import test from 'ava'
import request from 'supertest'
import sinon from 'sinon'

import app from '../../src/app'
import * as queries from '../../src/db/user.queries'
const users = [
  {
    id: 1,
    name: 'jhon doe',
    type: 'contractor',
    duration: 5,
    tag: 'angular'
  }
]

test.serial('GET should return status code 200 with users', async t => {
  const stub = sinon.stub(queries, 'get').returns(Promise.resolve(users))
  const response = await request(app.callback()).get('/user')
  t.is(response.status, 200)
  t.deepEqual(response.body, users)
  stub.restore()
})

test.serial('GET should return status code 200 with specific user', async t => {
  const stub = sinon.stub(queries, 'get').returns(Promise.resolve(users))
  const response = await request(app.callback()).get('/user/1')
  t.is(response.status, 200)
  t.deepEqual(response.body, users[0])
  stub.restore()
})

test.serial('GET should return status code 200 with users by specific tag', async t => {
  const stub = sinon.stub(queries, 'get').returns(Promise.resolve(users))
  const response = await request(app.callback()).get('/user/tag/angular')
  t.is(response.status, 200)
  t.deepEqual(response.body, users)
  stub.restore()
})

test.serial('PATCH should return error if the input is not correct', async t => {
  const to_update = {
    name: ''
  }
  const response = await request(app.callback()).patch('/user/1').send(to_update)
  t.is(response.status, 400)
  t.is(response.body.message, 'Please read the documentation to check to the correct payload')
})

test.serial('PATCH should return tu user updated is everything is correct', async t => {
  const to_update = {
    name: 'dhon joe'
  }
  const stub_get = sinon.stub(queries, 'get').returns(Promise.resolve(users))
  const temp = [...users]
  temp[0].name = 'dhon jode'
  const stub_update = sinon.stub(queries, 'update').returns(Promise.resolve(temp))
  const response = await request(app.callback()).patch('/user/1').send(to_update)
  t.is(response.status, 200)
  t.deepEqual(response.body, temp[0])
  stub_get.restore()
  stub_update.restore()
})

test.serial('POST should return error if the input is incorrect', async t => {
  const new_user = {
    name: 'kyle',
    tag: 'angular',
    role: 'employee',
    duration: 10
  }
  const response = await request(app.callback()).post('/user').send(new_user)
  t.is(response.status, 400)
  t.is(response.body.message, 'Please read the documentation to check to the correct payload')
})

test.serial('POST should return the new user with id if everything is ok', async t => {
  const new_user = {
    name: 'kyle',
    tag: 'angular',
    type: 'contractor',
    duration: 10
  }
  const temp = {...new_user}
  temp.id = 2
  const stub = sinon.stub(queries, 'create').returns(Promise.resolve([temp]))
  const response = await request(app.callback()).post('/user').send(new_user)
  t.is(response.status, 201)
  t.deepEqual(response.body, temp)
  stub.restore()
})

test.serial('DELETE should return status code 204', async t => {
  const stub = sinon.stub(queries, 'del').returns(Promise.resolve({}))
  const response = await request(app.callback()).delete('/user/1')
  t.is(response.status, 204)
  stub.restore()
})
