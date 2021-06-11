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
  const keys = Object.keys(data)
  if (keys.includes('type')) {
    return {
      body: {
        message: 'You are not allowed to change this user type'
      },
      status: 403
    }
  }
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
