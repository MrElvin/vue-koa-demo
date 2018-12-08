import app from '../../server/app'
import request from 'supertest'

describe('Login Test', () => {
  test('login failed if username is mrelvin and pwd is 111', async () => {
    const res = await request(app.callback())
      .post('/api/login')
      .send({
        name: 'mrelvin',
        pwd: '111'
      })
    expect(res.body.success).toBe(false)
    expect(res.body.msg).toBe('用户名不存在')
  })

  test('login success if username is hello and pwd is 654321', async () => {
    const res = await request(app.callback())
      .post('/api/login')
      .send({
        name: 'hello',
        pwd: '654321'
      })
    expect(res.body.success).toBe(true)
    expect(res.body.userName).toBe('hello')
  })

  test('login failed if username is hello and pwd is 321', async () => {
    const res = await request(app.callback())
      .post('/api/login')
      .send({
        name: 'hello',
        pwd: '321'
      })
    expect(res.body.success).toBe(false)
    expect(res.body.msg).toBe('密码错误')
  })
})

describe('Login Name Test', () => {
  test('user not found if username is jest', async () => {
    const res = await request(app.callback())
      .post('/api/login/name')
      .send({
        name: 'jest'
      })
    expect(res.body.success).toBe(false)
    expect(res.body.msg).toBe('用户名不存在')
  })

  test('user found if username is hello', async () => {
    const res = await request(app.callback())
      .post('/api/login/name')
      .send({
        name: 'hello'
      })
    expect(res.body.success).toBe(true)
  })
})

describe('Login Check Test', () => {
  test('user not login if session.userName is empty', async () => {
    const res = await request(app.callback())
      .get('/api/login/hasLogin')
      .set('cookie', '')
    expect(res.body.success).toBe(false)
  })

  test('user login if session.userName is exist', async () => {
    const res = await request(app.callback())
      .get('/api/login/hasLogin')
      .set('cookie', 'koa:todo=eyJ1c2VyTmFtZSI6ImFhYiIsIl9leHBpcmUiOjE1NDQzMzQ5NzA1NTMsIl9tYXhBZ2UiOjg2NDAwMDAwfQ==; koa:todo.sig=VSv55nf4ufEYX_4cDJ2yBd3p1_g')
    expect(res.body.success).toBe(true)
  })
})
