<template>
  <div class="login-container">
    <el-form class="login-form" label-width="80px" >
      <div class="title-container">
        <h3 class="title">后台管理系统登录</h3>
      </div>
      <el-form-item label="用户名">
        <el-input v-model="formUser.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formUser.password" show-password></el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, watch, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";

export default defineComponent({
  name: "Login",
  setup() {
    const formUser = reactive({
      name: 'admin',
      password: '111111'
    })
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const redirect = ref('')
    const otherQuery = ref({})
    const handleLogin = () => {
      store.dispatch('user/login', formUser).then(res=>{
        router.push({path: redirect.value || '/', query: otherQuery.value})
      })
    }
    const getOtherQuery = (query:object) => {
      return Object.keys(query).reduce((acc, cur:string) => {
        if (cur !== 'redirect') {
          // @ts-ignore
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    watch(()=>route, (val)=> {
      const query = val.query
      if (query) {
        redirect.value = query.redirect as string
        otherQuery.value = getOtherQuery(query) as object
      }
    })
    return {
      formUser,
      handleLogin
    }
  }
})
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    color: white;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;

    label {
      height: 47px;
      line-height: 47px;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
