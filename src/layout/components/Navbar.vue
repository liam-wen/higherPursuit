<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div class="avatar-container">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" @error="imgLoadError()">
          <span class="name">{{name}}</span>
          <!-- <i class="el-icon-caret-bottom" /> -->
          <i class="el-icon-switch-button" @click="logout()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getToken, removeToken } from '@/utils/auth' // get token from cookie

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  data(){
    return {
      avatar:getToken("avatr"),
      name:getToken("username")
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      removeToken('username')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    imgLoadError () {
        this.avatar="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
 　　}
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 55px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          vertical-align: middle;
        }
        .name{
          display: inline-block;
          height:40px;
          color:#97a8be;
          line-height: 40px;
          margin:0 10px 0 10px;
          vertical-align: middle;
        }
        .el-icon-switch-button{
          cursor: pointer;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
