<template>
  <div class="todo-header">
    <img @click="logout" v-if="username !== ''" @mouseover="logoutPic = '/static/images/logout-active.png'" @mouseout="logoutPic = '/static/images/logout.png'" :src="logoutPic" alt="登出">
    <h1>{{ username }}{{ username === '' ? '' : '\'s ' }}todos</h1>
  </div>
</template>

<script>
export default {
  name: 'todo',
  props: {
    username: String
  },
  data () {
    return {
      logoutPic: '/static/images/logout.png'
    }
  },
  methods: {
    logout () {
      console.log('log out')
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
