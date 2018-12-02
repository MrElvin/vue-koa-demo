import app from '../../server/app'
import request from 'supertest'

afterAll(async () => {
  await request(app.callback())
    .post('/api/todo/done/5c0361f44a240a3fa9e06928')
    .send({
      todoState: 'todo'
    })
    .set('cookie', 'koa:todo=eyJ1c2VyTmFtZSI6Imhpd29ybGQiLCJfZXhwaXJlIjoxNTQzNzM5NjU1ODkwLCJfbWF4QWdlIjo4NjQwMDAwMH0=; koa:todo.sig=Op3Ik5vbgl-IsFuGC8i_u6MRgyk')
})

describe('UserTodo Test', () => {
  test('add todo test', async () => {
    const res = await request(app.callback())
      .post('/api/todo/add')
      .send({
        todoDetail: 'test todo detail',
        todoTime: new Date().getTime()
      })
      .set('cookie', 'koa:todo=eyJ1c2VyTmFtZSI6Imhpd29ybGQiLCJfZXhwaXJlIjoxNTQzNzM5NjU1ODkwLCJfbWF4QWdlIjo4NjQwMDAwMH0=; koa:todo.sig=Op3Ik5vbgl-IsFuGC8i_u6MRgyk')
    expect(res.body.success).toBe(true)
  })

  test('change todo status to todo test', async () => {
    const res = await request(app.callback())
      .post('/api/todo/done/5c0361f44a240a3fa9e06928')
      .send({
        todoState: 'todo'
      })
      .set('cookie', 'koa:todo=eyJ1c2VyTmFtZSI6Imhpd29ybGQiLCJfZXhwaXJlIjoxNTQzNzM5NjU1ODkwLCJfbWF4QWdlIjo4NjQwMDAwMH0=; koa:todo.sig=Op3Ik5vbgl-IsFuGC8i_u6MRgyk')
    expect(res.body.success).toBe(true)
  })

  test('change todo status to done test', async () => {
    const res = await request(app.callback())
      .post('/api/todo/done/5c0361f44a240a3fa9e06928')
      .send({
        todoState: 'done'
      })
      .set('cookie', 'koa:todo=eyJ1c2VyTmFtZSI6Imhpd29ybGQiLCJfZXhwaXJlIjoxNTQzNzM5NjU1ODkwLCJfbWF4QWdlIjo4NjQwMDAwMH0=; koa:todo.sig=Op3Ik5vbgl-IsFuGC8i_u6MRgyk')
    expect(res.body.success).toBe(true)
  })

  test('update todo detail test', async () => {
    const res = await request(app.callback())
      .post('/api/todo/update')
      .send({
        _id: '5c0361f44a240a3fa9e06928',
        todoDetail: 'todo detail updated'
      })
      .set('cookie', 'koa:todo=eyJ1c2VyTmFtZSI6Imhpd29ybGQiLCJfZXhwaXJlIjoxNTQzNzM5NjU1ODkwLCJfbWF4QWdlIjo4NjQwMDAwMH0=; koa:todo.sig=Op3Ik5vbgl-IsFuGC8i_u6MRgyk')
    expect(res.body.success).toBe(true)
  })

  test('get detail todo test', async () => {
    const res = await request(app.callback())
      .get('/api/todo/detail/5c0361f44a240a3fa9e06928')
    expect(res.body.success).toBe(true)
  })

  test('get todolist test: get all todos && todos.length > 0', async () => {
    const res = await request(app.callback())
      .get('/api/todo/get?page=1&filter=all')
      .set('cookie', 'koa:todo=eyJ1c2VyTmFtZSI6Imhpd29ybGQiLCJfZXhwaXJlIjoxNTQzNzM5NjU1ODkwLCJfbWF4QWdlIjo4NjQwMDAwMH0=; koa:todo.sig=Op3Ik5vbgl-IsFuGC8i_u6MRgyk')
    expect(res.body.success).toBe(true)
  })

  test('get todolist test: get done todos', async () => {
    const res = await request(app.callback())
      .get('/api/todo/get?page=1&filter=done')
      .set('cookie', 'koa:todo=eyJ1c2VyTmFtZSI6Imhpd29ybGQiLCJfZXhwaXJlIjoxNTQzNzM5NjU1ODkwLCJfbWF4QWdlIjo4NjQwMDAwMH0=; koa:todo.sig=Op3Ik5vbgl-IsFuGC8i_u6MRgyk')
    expect(res.body.success).toBe(true)
  })
})
