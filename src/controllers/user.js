'use strict'

import {
  get,
  create,
  update,
  del
} from '../db/user.queries'

export const getUsers = async (where, select) => {
  const users = await get(where, select)
  if (users.length === 0) {
    return {
      body: {},
      status: Object.keys(where).length === 0 ? 204 : 404
    }
  }
  return {
    body: Object.keys(where).length === 0 ? users : users[0],
    status: 200
  }
}

export const createUser = async (data) => {
  const users = await create(data)
  return {
    body: users[0],
    status: 201
  }
}

export const updateUser = async (where, data) => {
  for (const key of keys) {
    await update(where, key, data[key])
  }
  return {
    body: await get(where),
    status: 200
  }
}

export const deleteUser = async (where) => {
  await del(where)
  return {
    status: 204
  }
}
