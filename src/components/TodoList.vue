<template>
  <div class="todo-container">
    <el-input class="todo-input" type="textarea" :rows="2" autofocus
      resize="none"
      placeholder="请输入待办事项，回车键添加"
      v-model="todoToAdd">
    </el-input>
    <div class="state-btns">
      <el-button size="mini" round>全部</el-button>
      <el-button size="mini" round>待完成</el-button>
      <el-button size="mini" round>已完成</el-button>
    </div>
    <ul>
      <li v-for="(item, index) in todoList" :key="index">
        <div class="item-container" :class="item.state === 'todo' ? 'todo': 'done'">
          <el-tag :type="item.state === 'todo' ? 'warning' : 'success'">{{ item.id }}</el-tag>
          <p>{{ item.detail }}</p>
          <!-- <input type="text"> -->
          <el-button class="item-detail" type="primary" size="mini" plain @click="$router.push('/detail')">详情</el-button>
          <el-button class="item-delete" type="danger" size="mini" plain>删除</el-button>
        </div>
      </li>
    </ul>
    <div class="pagination-container" @click="hackEleCss">
      <el-pagination layout="prev, pager, next" :total="100"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      todoToAdd: '',
      todoList: [
        {
          id: 1,
          state: 'todo',
          time: 11111111,
          detail: 'asdfadfadfadfasdfdafdasdfadfadfadfasdfdafdasdfadfadfadfasdfdafdasdfadfadfadfasdfdafd'
        },
        {
          id: 2,
          state: 'done',
          time: 11111111,
          detail: 'asdfadfadfadfasdfdafd'
        },
        {
          id: 1,
          state: 'todo',
          time: 11111111,
          detail: 'asdfadfadfadfasdfdafdasdfadfadfadfasdfdafdasdfadfadfadfasdfdafdasdfadfadfadfasdfdafd'
        },
        {
          id: 2,
          state: 'done',
          time: 11111111,
          detail: 'asdfadfadfadfasdfdafd'
        },
        {
          id: 1,
          state: 'todo',
          time: 11111111,
          detail: 'asdfadfadfadfasdfdafdasdfadfadfadfasdfdafdasdfadfadfadfasdfdafdasdfadfadfadfasdfdafd'
        },
        {
          id: 2,
          state: 'done',
          time: 11111111,
          detail: 'asdfadfadfadfasdfdafd'
        },
        {
          id: 1,
          state: 'todo',
          time: 11111111,
          detail: 'asdfadfadfadfasdfdafdasdfadfadfadfasdfdafdasdfadfadfadfasdfdafdasdfadfadfadfasdfdafd'
        },
        {
          id: 2,
          state: 'done',
          time: 11111111,
          detail: 'asdfadfadfadfasdfdafd'
        }
      ]
    }
  },
  methods: {
    hackEleCss () {
      this.$nextTick(() => {
        console.log('hack')
        const lis = document.querySelectorAll('.el-pager li')
        const btns = document.querySelectorAll('.el-pagination button')
        const array = [...lis, ...btns]
        for (let item of array) {
          item.style.backgroundColor = 'transparent'
        }
      })
    }
  },
  mounted () {
    this.hackEleCss()
  }
}
</script>

<style lang="scss" scoped>
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
    width: 480px;
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
    .el-tag {
      width: 40px;
      float: left;
      border: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .item-container {
      height: 100%;
      border-radius: 6px;
      cursor: pointer;
      &.todo {
        border: 1px solid #F2E0C9;
      }
      &.done {
        border: 1px solid #D8EDCD;
      }
    }
    .item-detail,
    .item-delete {
      position: absolute;
      right: -70px;
      top: 3px;
      z-index: 1000;
    }
    .item-delete {
      right: -130px;
    }
    p {
      text-align: left;
      width: 422px;
      display: inline-block;
      line-height: 32px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-left: 16px;
      color: #666;
      box-sizing: border-box;
      padding-right: 10px;
      font-size: 14px;
    }
    input {
      width: 422px;
      border: none;
      outline: none;
      height: 100%;
      line-height: 32px;
      margin-left: 16px;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      color: #666;
      box-sizing: border-box;
      padding-right: 10px;
      font-size: 14px;
      background: transparent;
    }
  }
  .pagination-container {
    margin-top: 24px;
    width: 480px;
  }
}
</style>
