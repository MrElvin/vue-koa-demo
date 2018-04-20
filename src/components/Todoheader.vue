<template>
  <div class="todo-header">
    <img @click="logout" v-if="username !== ''" @mouseover="logoutPic = '/static/images/logout-active.png'" @mouseout="logoutPic = '/static/images/logout.png'" :src="logoutPic" alt="登出">
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
      axios.get('/api/logout')
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
          console.log(err)
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
  img {
    width: 20px;
    position: absolute;
    right: 32px;
    top: 32px;
    cursor: pointer;
  }
  h1 {
    height: 140px;
    line-height: 140px;
    color: #67D4EB;
    letter-spacing: 2px;
  }
}
</style>
