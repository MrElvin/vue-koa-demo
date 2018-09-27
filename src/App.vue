<template>
  <div id="app">
    <todo-header :username="username" @setUserName="setUserName"/>
    <router-view @setUserName="setUserName"/>
    <todo-footer/>
  </div>
</template>

<script>
import TodoHeader from '@/components/Todoheader'
import TodoFooter from '@/components/Todofooter'

export default {
  name: 'App',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    setUserName (payload) {
      this.username = payload.username
    }
  },
  mounted () {
    this.username = sessionStorage.username || ''
    if (sessionStorage.username) {
      this.$router.replace('/todo')
    }
  },
  components: {
    TodoHeader,
    TodoFooter
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html, body {
  width: 100%;
  height: 100%;
  background: #f9f9f9;
}
#app {
  width: 100%;
  height: 100%;
  min-height: 780px;
  min-width: 800px;
  text-align: center;
  display: flex;
  flex-direction: column;
}
body::-webkit-scrollbar {
  display: none;
}
</style>
