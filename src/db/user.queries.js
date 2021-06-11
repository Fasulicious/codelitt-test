'use strict'

import db from './index'

export const get = async (where = {}, select = '*') => db('users').where(where).select(select)

export const create = async (user) => db('users').insert(user, '*')

export const update = async (where, updateKey, updateValue) => db('users').where(where).update(updateKey, updateValue)

export const del = async (where) => db('users').where(where).del()
