const Mock = require('mockjs')
const Random = Mock.Random
const template = {
  'todoList|4-8': [{
    id: Random.integer(1, 100),
    state: Random.pick(['todo', 'done']),
    time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    detail: Random.sentence(20, 40)
  }, {
    id: Random.integer(1, 100),
    state: Random.pick(['todo', 'done']),
    time: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    detail: Random.sentence(20, 40)
  }]
}
Mock.mock(/\/api\/todolist/, 'get', template)
