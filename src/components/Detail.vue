<template>
  <div class="detail">
    <el-form ref="detailTodo" :model="detailTodo" label-width="60px">
      <el-form-item label="时间">
        <p class="detail-date">{{ detailTodo.time }}</p>
      </el-form-item>
      <el-form-item label="内容">
        <p class="detail-content">{{ detailTodo.detail }}</p>
      </el-form-item>
      <img src="../assets/complete.png" alt="已完成" v-if="detailTodo.status === 'done'">
      <i @click="$router.replace('/todo')"></i>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data () {
    return {
      detailTodo: {
        time: '',
        detail: '',
        status: 'todo'
      }
    }
  },
  created () {
    axios.get(`/api/todo/detail/${this.$route.params.todoId}`)
      .then(res => {
        this.detailTodo.detail = res.data.todo.todoDetail
        this.detailTodo.time = moment(Number(res.data.todo.todoTime)).format(`YYYY 年 MM 月 DD 日 hh:mm a`)
        this.detailTodo.status = res.data.todo.todoState
      })
      .catch(err => {
        this.$message.error({ message: '事项详情获取失败', duration: 1500 })
        setTimeout(() => {
          this.$router.push('/todo')
        }, 1000)
      })
  }
}
</script>

<style lang="scss" scoped>
.detail {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 100px;
  position: absolute;
  right: 30px;
  bottom: 50px;
}
.el-form {
  width: 400px;
  padding: 90px 40px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 20px 3px rgba(0, 0, 0, .1);
  position: relative;
  p {
    height: 42px;
  }
  .el-input:focus {
    border-color: none;
  }
  i {
    cursor: pointer;
    width: 28px;
    height: 28px;
    display: inline-block;
    position: absolute;
    left: 32px;
    bottom: 32px;
    background: url('../assets/back.png') no-repeat center center;
    background-size: 28px 28px;
  }
  p {
    text-align: left;
    border: 1px solid #DCDEE6;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 0px 10px;
  }
  .detail-content {
    height: 300px;
    overflow-wrap: break-word;
    overflow-y: auto;
    cursor: default;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
