<template>
  <div class="todo-header">
    <div @click="logout" v-if="username !== ''"></div>
    <h1>{{ username }}{{ username === '' ? '' : '\'s ' }}todos</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'todo',
  data () {
    return {
      logoutPic: '/static/images/logout.png'
    }
  },
  props: {
    username: String
  },
  methods: {
    logout () {
      return axios.get('/api/logout')
        .then((res) => {
          if (res.data.success) {
            this.$emit('setUserName', { username: '' })
            this.$message({ message: '注销成功 😛', type: 'success', duration: 1500 })
            sessionStorage.username = ''
            sessionStorage.hasLogin = false
            this.$router.replace('/login')
          }
        })
        .catch((err) => {
          this.$message.error({ message: '注销失败', duration: 1500 })
        })
    }
  }
}
</script>

<style scoped lang="scss">
.todo-header {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  flex: 0 0 auto;
  position: relative;
  div {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 32px;
    top: 32px;
    cursor: pointer;
    background: url('~@/assets/logout.png') no-repeat no-repeat center center;
    background-size: 20px 20px;

    &:hover {
      background-image: url('~@/assets/logout-active.png');
    }
  }
  h1 {
    height: 140px;
    line-height: 140px;
    color: #67D4EB;
    letter-spacing: 2px;
  }
}
</style>
