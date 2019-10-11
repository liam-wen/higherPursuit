<template>
  <div class="app-container">
    <div class="table">
      <el-table
        :data="tableData"
        border
        style="width: 80%"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50"
        />
        <el-table-column
          prop="_id"
          label="用户ID"
          align="center"
          width="300"
        />
        <el-table-column
          prop="username"
          label="用户姓名"
          align="center"
          width="150"
        />
        <el-table-column
          prop="nickname"
          label="昵称"
          align="center"
          width="150"
        />
        <el-table-column
          prop="description"
          label="简介"
          align="center"
        />
        <el-table-column label="头像" align="center" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.head_image" >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              plain
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { successMessage, infoMessage, errorMessage, MessageBoxAlert, MessageBoxCofirm } from '@/utils/message'

export default {
  data() {
    return {
      list: null,
      tableData:[],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.Axios.get(`/auth/userinfo/list`, null).then((response) => {
          this.tableData=response.data
      }).catch(function(error) {
          errorMessage(error.message)
      })
    },
    handleDelete(index, row){
      console.log(row)
      let data={
        username:row.username
      }
      MessageBoxCofirm("请确认是否删除用户", 'warning').then(() => {
        this.Axios.post(`/auth/delete`, data).then((response) => {
          successMessage('删除成功')
          this.fetchData()
        }).catch(function(error) {
          errorMessage(error.msg)
        })
      })
      .catch(() => {
        infoMessage('已取消删除')
      })
    }
  }
}
</script>
<style scoped>
img{
  max-width:50px;
}
</style>


