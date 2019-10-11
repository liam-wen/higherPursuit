<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="userRules" label-width="120px">
        <el-form-item label="用户名">
            <el-input v-model="form.username" disabled/>
        </el-form-item>
        <el-form-item label="头像">
            <el-upload
                class="avatar-uploader"
                action="/uploadImage"
                name="wxQrcodeUrl"
                :http-request="handleRequest"
                :show-file-list="false">
                <img v-if="form.head_image" :src="form.head_image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname"/>
        </el-form-item>
        <el-form-item label="简介" prop="description">
            <el-input v-model="form.description" type="textarea" />
            <el-button type="primary" plain size="mini" @click="random">随机生成一条</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">修改</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth' // get token from cookie
import { successMessage, infoMessage, errorMessage, MessageBoxAlert, MessageBoxCofirm } from '@/utils/message'
import qs from 'qs'

export default {
  data() {
    return {
      form: {
        username: '',
        head_image: '',
        nickname:'',
        description:''
      },
      userRules:{
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入个人简介', trigger: 'blur' }
          ],
      }
    }
  },
  created(){
      this.getUserInfo()
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let data={
                username:this.form.username,
                info:{
                    username:this.form.username,
                    nickname:this.form.nickname,
                    description:this.form.description
                }
            }
            data=qs.stringify(data)
            this.Axios.patch(`/auth/userinfo/update`, data).then((response) => {
                successMessage("修改成功")
                this.getUserInfo()
            }).catch(function(error) {
                errorMessage(error.message)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    getUserInfo(){
        console.log(global)
        this.Axios.get(`/auth/userinfo?username=${getToken("username")}`, null).then((response) => {
            this.form=response.data
            global.head_image=response.data.head_image
        }).catch(function(error) {
            errorMessage(error.message)
        })
    },
    handleRequest(param) {
      const fileObj = param.file
      // FormData 对象
      const form = new FormData()
      const type = param.filename
      // 文件对象
      form.append('file', fileObj)
      form.append('username', getToken("username"))
      console.log(this.Axios)
      this.Axios.post(`/auth/userinfo/headimage/update`, form).then((response) => {
        this.form.head_image = response.data.head_image
        console.log(response)
      }).catch(function(error) {
        errorMessage(error.message)
      })
    },
    random(){
        this.Axios.get(`/funny/soup/random`, null).then((response) => {
           successMessage("随机成功")
           this.form.description=response.data[0].title;
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

