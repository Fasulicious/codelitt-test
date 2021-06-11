'use strict'

import db from './index'
import CustomError from '../utils/custom.error'

export const get = async (where = {}, select = '*') => {
  try {
    return await db('users').where(where).select(select)
  } catch (e) {
    console.log(e)
    throw new CustomError('db_error', 'Database error, try in a few', 500)
  }
}

export const create = async (user) => {
  try {
    return await db('users').insert(user, '*')
  } catch (e) {
    console.log(e)
    throw new CustomError('db_error', 'Database error, try in a few', 500)
  }
}

export const update = async (where, updateKey, updateValue) => {
  try {
    return await db('users').where(where).update(updateKey, updateValue)
  } catch (e){
    console.log(e)
    throw new CustomError('db_error', 'Database error, try in a few', 500)
  }
}

export const del = async (where) => {
  try {
    return await db('users').where(where).del()
  } catch (e) {
    console.log(e)
    throw new CustomError('db_error', 'Database error, try in a few', 500)
  }
}
