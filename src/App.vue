<template>
  <div id="app">
    <todo-header :username="username"/>
    <router-view/>
    <todo-footer/>
  </div>
</template>

<script>
import TodoHeader from '@/components/Todoheader'
import TodoFooter from '@/components/TodoFooter'
// import axios from './util/axios'

export default {
  name: 'App',
  data () {
    return {
      username: ''
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
