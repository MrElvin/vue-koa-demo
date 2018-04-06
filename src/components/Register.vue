<template>
  <div class="register">
    <el-form ref="form" :model="form" label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密 码">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.repwd"></el-input>
      </el-form-item>
      <div class="btns">
        <el-button @click="$router.push('/login')">取消注册</el-button>
        <el-button type="primary">确认注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        pwd: '',
        repwd: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
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
  margin-top: -20px;
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
