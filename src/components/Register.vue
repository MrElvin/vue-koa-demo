<template>
  <div class="register">
    <el-form ref="form" status-icon :rules="registerRules" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="pwd">
        <el-input type="password" v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repwd">
        <el-input type="password" v-model="form.repwd"></el-input>
      </el-form-item>
      <div class="btns">
        <el-button @click="$router.push('/login')">取消注册</el-button>
        <el-button type="primary" @click="confirmRegister('form')">确认注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    const validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    const validateRepwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('再次输入密码'))
      } else if (value !== this.form.pwd) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        pwd: '',
        repwd: ''
      },
      registerRules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符之间', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePwd, trigger: 'blur' }
        ],
        repwd: [
          { required: true, message: '再次输入密码', trigger: 'blur' },
          { validator: validateRepwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async confirmRegister (formName) {
      try {
        const result = await this.$refs[formName].validate()
        if (result) {
          const res = await axios.post('/api/register', this.form)
          if (res.data.success) {
            this.$message({
              message: '注册成功，快去登录吧 😉',
              type: 'success',
              duration: 1500
            })
            setTimeout(() => {
              this.$router.push('/login')
            }, 1000)
            return true
          } else {
            this.$message.error({
              message: '用户名已被占用',
              duration: 1500
            })
            this.resetForm('form')
            return false
          }
        } else {
          this.$message.error({
            message: '注册失败 😥',
            duration: 1500
          })
          return false
        }
      } catch (err) {
        console.log(err)
        return false
      }
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
.register {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 420px;
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
