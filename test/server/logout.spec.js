import app from '../../server/app'
import request from 'supertest'

describe('Logout Test', () => {
  test('logout ok', async () => {
    const res = await request(app.callback())
      .get('/api/logout')
    expect(res.body.success).toBe(true)
  })
})
