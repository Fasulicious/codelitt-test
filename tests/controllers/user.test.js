'use strict'

import test from 'ava'
import sinon from 'sinon'

import * as queries from '../../src/db/user.queries'
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from '../../src/controllers/user'

const users = [
  {
    name: 'jhon doe',
    type: 'contractor',
    duration: 5,
    tag: 'angular'
  }
]

test.serial('GETUSERS/should return an body and status 204 when db is empty', async t => {
  const stub = sinon.stub(queries, 'get').returns(Promise.resolve([]))
  const response = await getUsers({})
  t.deepEqual(response, {
    body: {},
    status: 204
  })
  stub.restore()
})

test.serial('GETUSERS/should return an body and status 404 when user is not found', async t => {
  const stub = sinon.stub(queries, 'get').returns(Promise.resolve([]))
  const response = await getUsers({ id: 1})
  t.deepEqual(response, {
    body: {},
    status: 404
  })
  stub.restore()
})

test.serial('GETUSERS/should return an array with users when everything is ok', async t => {
  const stub = sinon.stub(queries, 'get').returns(Promise.resolve(users))
  const response = await getUsers({})
  t.deepEqual(response, {
    body: users,
    status: 200
  })
  stub.restore()
})

test.serial('CREATEUSERS/should return the user and status code 201', async t => {
  const stub = sinon.stub(queries, 'create').returns(Promise.resolve(users))
  const response = await createUser(users[0])
  t.deepEqual(response, {
    body: users[0],
    status: 201
  })
  stub.restore()
})

test.serial('UPDATEUSER/should return error if try to update a forbidden property - 1', async t => {
  const stub = sinon.stub(queries, 'get').returns(Promise.resolve(users))
  const data = {
    name: 'dhon joe',
    role: 'software_engineer'
  }
  const error = await t.throwsAsync(() => updateUser({ id: 1 }, data))
  t.is(error.message, 'Please read the documentation to check to the correct payload')
  stub.restore()
})

test.serial('UPDATEUSER/should return error if try to update a forbidden property - 2', async t => {
  const users_temp = [{...users[0]}]
  delete users_temp[0].duration
  users_temp[0].type = 'employee'
  users_temp[0].role = 'software_engineer'
  const stub = sinon.stub(queries, 'get').returns(Promise.resolve(users_temp))
  const data = {
    name: 'dhon joe',
    duration: 5
  }
  const error = await t.throwsAsync(() => updateUser({ id: 1 }, data))
  t.is(error.message, 'Please read the documentation to check to the correct payload')
  stub.restore()
})

test.serial('UPDATEUSER/should return the updated user with status code 200 if everything is ok', async t => {
  const stub_get = sinon.stub(queries, 'get').returns(Promise.resolve(users))
  const temp = [...users]
  temp[0].name = 'dhon joe'
  temp[0].duration = 10
  const stub_update = sinon.stub(queries, 'update').returns(Promise.resolve(temp))
  const data = {
    name: 'dhon joe',
    duration: 10
  }
  const response = await updateUser({ id: 1 }, data)
  t.deepEqual(response, {
    body: temp[0],
    status: 200
  })
  stub_get.restore()
  stub_update.restore()
})

test.serial('DELETEUSER/should return status code 204', async t => {
  const stub = sinon.stub(queries, 'del').returns(Promise.resolve({}))
  const response = await deleteUser({ id: 1 })
  t.deepEqual(response, {
    status: 204
  })
  stub.restore()
})
