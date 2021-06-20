'use strict'

import test from 'ava'

import {
  postValidator,
  patchValidator
} from '../../src/utils/validator'

const postPayload = {
  name: 'john doe',
  type: 'contractor',
  duration: 5,
  tag: 'c_sharp'
}

const patchPayload = {
  name: 'john doe',
  tag: 'angular',
  duration: 5,
  role: 'software_engineer'
}

test('POST/Should return an error if name is null or empty', t => {
  const temp = {...postPayload}
  temp.name = ''
  const { error } = postValidator(temp)
  t.is(error.message, '"name" contains an invalid value. "name" is not allowed to be empty')
})

test('POST/Should return an error if type is not in the list', t => {
  const temp = {...postPayload}
  temp.type = 'not_contractor'
  const { error } = postValidator(temp)
  t.is(error.message, '"type" must be one of [contractor, employee]')
})

test('POST/Should return an error if tag is not in the list', t => {
  const temp = {...postPayload}
  temp.tag = 'react'
  const { error } = postValidator(temp)
  t.is(error.message, '"tag" must be one of [c_sharp, angular, general_frontend, seasoned_leader]')
})

test('POST/Should return an error if there is a duration when type is employee', t => {
  const temp = {...postPayload}
  temp.type = 'employee'
  const { error } = postValidator(temp)
  t.is(error.message, '"duration" is not allowed. "role" is required')
})

test('POST/Should return an error if there is a role when type is contractor', t => {
  const temp = {...postPayload}
  temp.role = 'software_engineer'
  delete temp.duration
  const { error } = postValidator(temp)
  t.is(error.message, '"duration" is required. "role" is not allowed')
})

test('POST/Should return an error if role is not in the list', t => {
  const temp = {...postPayload}
  temp.type = 'employee'
  temp.role = 'backend_engineer'
  delete temp.duration
  const { error } = postValidator(temp)
  t.is(error.message, '"role" must be one of [software_engineer, project_manager]')
})

test('POST/Should return an error if duration is not a number greater than or equal to 0', t => {
  const temp = {...postPayload}
  temp.duration = -1
  const { error } = postValidator(temp)
  t.is(error.message, '"duration" must be greater than or equal to 0')
})

test('POST/Should be okey with a good post payload', t => {
  const { error } = postValidator(postPayload)
  t.is(error, undefined)
})

test('PATCH/Should return an error if name is null or empty', t => {
  const temp = {...patchPayload}
  temp.name = ''
  const { error } = patchValidator(temp)
  t.is(error.message, '"name" contains an invalid value. "name" is not allowed to be empty')
})

test('PATCH/Should return an error if tag is not in the list', t => {
  const temp = {...patchPayload}
  temp.tag = 'react'
  const { error } = patchValidator(temp)
  t.is(error.message, '"tag" must be one of [c_sharp, angular, general_frontend, seasoned_leader]')
})

test('PATCH/Should return an error if role is not in the list', t => {
  const temp = {...patchPayload}
  temp.role = 'backend_engineer'
  const { error } = patchValidator(temp)
  t.is(error.message, '"role" must be one of [software_engineer, project_manager]')
})

test('PATCH/Should return an error if duration is not a number greater than or equal to 0', t => {
  const temp = {...patchPayload}
  temp.duration = -1
  const { error } = patchValidator(temp)
  t.is(error.message, '"duration" must be greater than or equal to 0')
})

test('PATCH/Should be okey with a good post payload', t => {
  const { error } = patchValidator(patchPayload)
  t.is(error, undefined)
})
