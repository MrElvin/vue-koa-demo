<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密 码">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <div class="btns">
        <el-button @click="$router.push('/register')">注 册</el-button>
        <el-button type="primary">登 录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 400px;
  padding: 90px 40px;
  padding-bottom: 120px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 20px 3px rgba(0, 0, 0, .1);
  position: relative;
  .btns {
    width: 100%;
    position: absolute;
    bottom: 32px;
    left: 0;
    .el-button:nth-child(1) {
      margin-right: 100px;
    }
  }
}
</style>
