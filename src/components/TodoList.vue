<template>
  <div class="todo-container">
    <el-input class="todo-input" type="textarea" :rows="2" autofocus
      resize="none"
      placeholder="请输入待办事项，回车键添加"
      v-model="todoToAdd">
    </el-input>
    <div class="state-btns">
      <el-radio-group v-model="filterStatus" size="small" text-color="#FFF" fill="#66D4EB">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="todo">待完成</el-radio-button>
        <el-radio-button label="done">已完成</el-radio-button>
      </el-radio-group>
    </div>
    <ul>
      <li v-for="(item, index) in filteredList" :key="index">
        <div @mouseover="item.btnShow = true" @mouseout="item.btnShow = false" class="item-container">
          <p :class="item.state === 'todo' ? 'todo': 'done'">
            <el-tag :type="item.state === 'todo' ? 'warning' : 'success'">{{ item.id }}</el-tag>
            <span>{{ item.detail }}</span>
            <!-- <input type="text"> -->
          </p>
          <transition name="fade">
            <div class="item-btns" v-if="item.btnShow === true">
              <el-button key="delete" class="item-delete" type="danger" size="mini" plain>删除</el-button>
              <el-button key="detail" class="item-detail" type="primary" size="mini" plain @click="$router.push('/detail')">详情</el-button>
            </div>
          </transition>
        </div>
      </li>
    </ul>
    <div class="pagination-container">
      <el-pagination layout="prev, pager, next" :total="100"></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from '../util/axios'

export default {
  data () {
    return {
      todoToAdd: '',
      todoList: [],
      filterStatus: 'all',
      username: ''
    }
  },
  computed: {
    filteredList () {
      if (this.filterStatus === 'all') return this.todoList
      return this.todoList.filter((todo) => {
        return todo.state === this.filterStatus
      })
    }
  },
  methods: {
    getTodoList () {
    },
    checkHasLogin () {
      axios.get('/api/login/hasLogin')
        .then((res) => {
          console.log(JSON.stringify(res.data))
          if (res.data.success) {
            this.username = res.data.msg
            this.$message({
              message: `Welcome ${this.username}!`,
              type: 'success',
              duration: 1500
            })
            console.log('username ok')
          } else {
            this.username = ''
            console.log('username fail')
            this.$router.replace('/login')
          }
        })
        .catch((err) => { console.log(err) })
    }
  },
  mounted () {
    console.log('todolist mount')
    this.checkHasLogin()
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
      right: -120px;
    }
    .item-detail,
    .item-delete {
      float: right;
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
    }
  }
  .pagination-container {
    margin-top: 24px;
    width: 480px;
  }
}
</style>
