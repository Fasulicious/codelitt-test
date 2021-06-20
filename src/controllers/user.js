import {
  get,
  create,
  update,
  del
} from '../db/user.queries'

import CustomError from '../utils/custom.error'
import logger from '../utils/logger'

const log = logger.getLogger()

export const getUsers = async (where, select) => {
  const users = await get(where, select)
  if (users.length === 0) {
    return {
      body: {},
      status: Object.keys(where).length === 0 ? 204 : 404
    }
  }
  return {
    body: Object.keys(where).length === 0 || Object.keys(where).includes('tag') ? users : users[0],
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
  const user = (await get(where))[0]
  if ((user.type === 'contractor' && keys.includes('role')) || (user.type === 'employee' && keys.includes('duration'))) {
    log.error('Fail validation patch request at:', '/src/controllers/user', 'missmatch type and patch properties')
    throw new CustomError('wrong_input', 'Please read the documentation to check to the correct payload', 400)
  }
  let updatedUsers
  for (const key of keys) {
    updatedUsers = await update(where, key, data[key])
  }
  return {
    body: updatedUsers[0],
    status: 200
  }
}

export const deleteUser = async (where) => {
  await del(where)
  return {
    status: 204
  }
}
