<template>
  <div class="login">
    <el-form ref="form" status-icon :model="form" :rules="loginRules" label-width="70px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="pwd">
        <el-input type="password" v-model="form.pwd"></el-input>
      </el-form-item>
      <div class="btns">
        <el-button @click="$router.push('/register')">注 册</el-button>
        <el-button @click="login" type="primary">登 录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'))
      } else {
        axios.post('/api/login/name', this.form)
          .then((res) => {
            if (!res.data.success) callback(new Error('用户名不存在'))
            else callback()
          })
          .catch((err) => console.log(err))
      }
    }
    const validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        pwd: ''
      },
      loginRules: {
        name: [{ validator: validateUser, trigger: 'blur' }],
        pwd: [{ validator: validatePwd, trigger: 'blur' }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios.post('/api/login', this.form)
            .then((res) => {
              if (res.data.success) {
                this.$message({ message: '登录成功 😛', type: 'success', duration: 1500 })
                setTimeout(() => {
                  this.$router.push('/todo')
                }, 1000)
              } else {
                this.$message.error({ message: res.data.msg, duration: 1500 })
                this.resetForm('form')
              }
            })
            .catch((err) => { console.log(err) })
        }
        return false
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created () {
    if (sessionStorage.username) {
      this.$router.replace('/todo')
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
