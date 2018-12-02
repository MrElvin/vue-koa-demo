import app from '../../server/app'
import request from 'supertest'

describe('Register Test', () => {
  test('register ok if name is testuser and pwd is 654321', async () => {
    const res = await request(app.callback())
      .post('/api/register')
      .send({
        name: 'testuser',
        pwd: '654321'
      })
    expect(res.body.success).toBe(true)
  })

  test('register fail if name is hello', async () => {
    const res = await request(app.callback())
      .post('/api/register')
      .send({
        name: 'hello',
        pwd: '654321'
      })
    expect(res.body.success).toBe(false)
  })

  test('register fail if post nothing', async () => {
    const res = await request(app.callback())
      .post('/api/register')
    expect(res.status).toBe(500)
  })
})
