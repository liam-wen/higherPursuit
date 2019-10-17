<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="userRules" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" disabled />
      </el-form-item>
      <el-form-item label="旧密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { successMessage, errorMessage } from '@/utils/message'
import qs from 'qs'

export default {
  data() {
    const checkData = (rule, value, callback) => {
      if (value) {
        if (/[\u4E00-\u9FA5]/g.test(value)) {
          callback(new Error('密码不能输入汉字!'))
        } else {
          callback()
        }
      }
      callback()
    }
    return {
      form: {
        username: sessionStorage.getItem('username'),
        nickname: '',
        description: ''
      },
      userRules: {
        password: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: checkData, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = qs.stringify(this.form)
          this.Axios.patch(`/auth/password/update`, data).then((response) => {
            successMessage('修改成功')
          }).catch(function(error) {
            errorMessage(error.message)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRequest(param) {
      const fileObj = param.file
      // FormData 对象
      const form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      form.append('username', sessionStorage.getItem('username'))
      this.Axios.post(`/auth/userinfo/headimage/update`, form).then((response) => {
        this.form.head_image = response.data.head_image
      }).catch(function(error) {
        errorMessage(error.message)
      })
    }
  }
}
</script>

<style scoped>
.app-container{
    width:30%;
}
.line{
  text-align: center;
}
.avatar-uploader .avatar-uploader-icon{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .avatar-uploader-icon:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

