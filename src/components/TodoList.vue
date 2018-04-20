<template>
  <div class="todo-container">
    <el-input class="todo-input" type="textarea" :rows="2" autofocus
      resize="none"
      placeholder="请输入待办事项，Ctrl + Enter 添加"
      v-model="todoToAdd"
      @keyup.ctrl.enter.native="submitTodo">
    </el-input>
    <div class="state-btns">
      <el-radio-group @change="getTodoList(undefined, undefined, true)" v-model="filterStatus" size="small" text-color="#FFF" fill="#66D4EB">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="todo">待完成</el-radio-button>
        <el-radio-button label="done">已完成</el-radio-button>
      </el-radio-group>
    </div>
    <ul>
      <li v-for="(item, index) in todoList" :key="index">
        <div @mouseover="item.btnShow = true" @mouseout="item.btnShow = false" class="item-container">
          <p :class="item.todoState === 'todo' ? 'todo': 'done'" @click="todoClick(item, index)">
            <el-tag :type="item.todoState === 'todo' ? 'warning' : 'success'">{{ index + 1 }}</el-tag>
            <span ref="span" v-show="!item.inputShow">{{ item.todoDetail }}</span>
            <input ref="input" type="text" @keyup.enter="todoInputBlur(item, index)" @blur="todoInputBlur(item, index)" v-show="item.inputShow && item.todoState === 'todo'">
          </p>
          <transition name="fade">
            <div class="item-btns" v-if="item.btnShow === true">
              <el-button @click="completeTodo(item)" key="delete" class="item-delete" type="danger" size="mini" plain>{{ item.todoState === 'todo' ? '标为完成' : '标为未完成' }}</el-button>
              <el-button @click="$router.push(`/detail/${item._id}`)" key="detail" class="item-detail" type="primary" size="mini" plain>详情</el-button>
            </div>
          </transition>
        </div>
      </li>
    </ul>
    <p class="encourage" v-if="todoTotal === 0">空的日程列表</p>
    <div class="pagination-container">
      <el-pagination v-if="todoTotal !== 0" :current-page.sync="page" @current-change="getTodoList" layout="prev, pager, next" :page-size="8" :total="todoTotal"></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      todoToAdd: '',
      todoList: [],
      filterStatus: sessionStorage.getItem('filter') ? sessionStorage.getItem('filter') : 'all',
      todoTotal: 0,
      page: sessionStorage.getItem('pagination') ? Number(sessionStorage.getItem('pagination')) : 1
    }
  },
  methods: {
    checkHasLogin () {
      axios.get('/api/login/hasLogin')
        .then((res) => {
          sessionStorage.username = res.data.msg
          this.$emit('setUserName', { username: res.data.msg })
          if (res.data.success) {
            if (!sessionStorage.hasLogin) {
              this.$message({ message: `你好呀 ${res.data.msg}!`, type: 'success', duration: 1500 })
            }
            sessionStorage.hasLogin = true
            this.getTodoList(this.page, this.filterStatus, false)
          } else {
            this.$router.replace('/login')
          }
        })
        .catch((err) => {
          console.log(err)
          this.$router.replace('/login')
        })
    },
    submitTodo () {
      axios.post(`/api/todo/add`, { todoDetail: this.todoToAdd, todoTime: Date.now() })
        .then(res => {
          if (res.data.success) this.$message({ message: res.data.msg, type: 'success', duration: 1500 })
          else this.$message.error({ message: res.data.msg, duration: 1500 })
          this.todoToAdd = ''
          this.page = 1
          this.getTodoList(this.page, this.filterStatus, false)
        })
        .catch(err => { console.log(err) })
    },
    getTodoList (page = 1, filter = this.filterStatus, backToFirst) {
      this.page = page
      axios.get(`/api/todo/get?page=${this.page}&filter=${filter}`)
        .then(res => {
          res.data.todoList.forEach(todo => {
            todo.btnShow = false
            todo.inputShow = false
          })
          this.todoList = res.data.todoList
          this.todoTotal = res.data.todoTotal
          if (backToFirst) this.page = 1
        })
        .catch(err => {
          console.log(err)
          this.$message.error({ message: '获取事项列表失败', duration: 1500 })
        })
    },
    completeTodo (item) {
      axios.post(`/api/todo/done/${item._id}`, item)
        .then(res => {
          if (res.data.success) {
            this.getTodoList(this.page, this.filterStatus, false)
            return this.$message({ message: '操作事项成功', type: 'success', duration: 1500 })
          }
          this.$message.error({ message: '操作事项失败', duration: 1500 })
        })
        .catch(err => {
          console.log(err)
          this.$message.error({ message: '操作事项失败', duration: 1500 })
        })
    },
    todoClick (item, index) {
      if (item.todoState === 'done' || item.inputShow) return
      const val = this.$refs.span[index].innerText
      item.inputShow = true
      this.$nextTick(() => {
        this.$refs.input[index].focus()
        this.$refs.input[index].value = val
      })
    },
    todoInputBlur (item, index) {
      const val = this.$refs.input[index].value
      item.inputShow = false
      this.$nextTick(() => {
        this.$refs.span[index].innerText = val
        item.todoDetail = val
        this.updateTodoDetail(item)
      })
    },
    updateTodoDetail (item) {
      axios.post('/api/todo/update', item)
        .then((res) => {
          if (res.data.success) {
            this.getTodoList(this.page, this.filterStatus, false)
            return this.$message({ message: '更改事项内容成功', type: 'success', duration: 1500 })
          }
          this.$message.error({ message: '更改事项内容失败', duration: 1500 })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error({ message: '更改事项内容失败', duration: 1500 })
        })
    }
  },
  mounted () {
    this.checkHasLogin()
  },
  beforeDestroy () {
    sessionStorage.setItem('pagination', this.page)
    sessionStorage.setItem('filter', this.filterStatus)
  }
}
</script>

<style>
.el-pagination .btn-prev,
.el-pagination .btn-prev.disabled,
.el-pagination .btn-next,
.el-pagination .btn-next.disabled {
  background-color: transparent !important;
}
.el-pager li {
  background-color: transparent !important;
}
</style>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.todo-container {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .todo-input {
    width: 480px;
  }
  .state-btns {
    margin-top: 12px;
  }
  ul {
    margin-top: 12px;
    list-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      width: 100%;
      margin-top: 16px;
      height: 32px;
      position: relative;
      &:nth-child(1) {
        margin-top: 0px;
      }
    }
    .item-container {
      height: 100%;
      text-align: left;
      cursor: pointer;
      font-size: 14px;
    }
    p {
      text-align: left;
      width: 500px;
      display: inline-block;
      line-height: 32px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #666;
      box-sizing: border-box;
      padding-right: 16px;
      border-radius: 6px;
      cursor: pointer;
      &.todo {
        border: 1px solid #F2E0C9;
      }
      &.done {
        border: 1px solid #D8EDCD;
      }
      .el-tag {
        width: 40px;
        float: left;
        border: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        text-align: center;
        margin-right: 16px;
      }
    }
    .item-btns {
      position: absolute;
      top: 3px;
      right: -154px;
    }
    .item-detail,
    .item-delete {
      float: right;
    }
    .item-delete {
      width: 90px;
    }
    .item-detail {
      margin-right: 4px;
    }
    input {
      width: 422px;
      border: none;
      outline: none;
      height: 100%;
      line-height: 32px;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      color: #666;
      box-sizing: border-box;
      background: transparent;
      font-size: 14px;
    }
  }
  .encourage {
    color: #65D4EB;
    margin-top: 160px;
  }
  .pagination-container {
    margin-top: 24px;
    width: 480px;
  }
}
</style>
