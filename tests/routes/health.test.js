import test from 'ava'
import request from 'supertest'
import app from '../../src/app'

test('HEALTH should return status code 200', async t => {
  const response = await request(app.callback()).get('/health')
  t.is(response.status, 200)
})
