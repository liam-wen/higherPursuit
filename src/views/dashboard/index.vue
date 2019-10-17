<template>
  <div class="dashboard-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <div class="title">欢迎</div>
      </div>
      <div>欢迎光临兴趣管理系统</div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.box-card{
  width:400px;
  margin:0 auto;
}
.title{
  width:100%;
  text-align: center
}
</style>
