<template>
    <div class="login-body" :style="{width: fullWidth+'px', height:fullHeight+'px'}">
      <div class="title" style="margin-top: 9vh; margin-left:3vh ; font-size: 50px; color:#ffffff;    font-weight: bolder;  text-align: center">SE资源互助管理平台</div>
        <div class="login-container" style="margin-top: 2vh">
            <div class="head">
                <img class="logo" src="../assets/用户.png" width="64" height="64" />
                <div class="name">
                    <div class="title">用户登录</div>
                </div>

            </div>
            <el-form label-position="top" :model="data.loginData" ref="formRef" class="login-form">
                <el-form-item label="账号" prop="username" :rules="[
                    {
                        required: true,
                        message: '请输入您的账号！',
                        trigger: 'blur',
                    }
                ]">
                  <el-icon style="margin-left:40px; margin-top: -38px"><User/></el-icon>
                    <el-input type="text" v-model.trim="data.loginData.username" autocomplete="off"></el-input>
                </el-form-item>
                <br />
                <el-form-item label="密码" prop="password" :rules="[
                    {
                        required: true,
                        message: '请输入您的密码！',
                        trigger: 'blur',
                    }
                ]"><el-icon  style="margin-left:40px; margin-top: -38px"><EditPen/></el-icon>
                    <el-input type="password" v-model.trim="data.loginData.password" autocomplete="off"></el-input>
                </el-form-item>
                <br />
                <el-form-item>
                    <el-button style="width: 100%" type="primary" @click="handleLogin">立即登录</el-button>
                </el-form-item>
                <el-form-item style="display: flex;  justify-content: space-between;">
                    <el-button class="admin-login-button" style="" type="text" @click="handleRegister">立即注册</el-button>
                    <div style="min-width: 55%"></div>
                    <el-button class="admin-login-button" style="" type="text" @click="handleAdminLogin">管理员登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { login } from '@/api/api';
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {ElMessage} from "element-plus";
import { User,EditPen } from '@element-plus/icons-vue'

const store = useStore()
const router = useRouter()
const data = reactive({
    loginData: {
        username: "tom",
        password: "123",
    }
})

const handleLogin = () => {
    loginBase(data.loginData)
}
const handleRegister=()=>{
    router.push("/register");
}
const handleAdminLogin = () => {
    router.push("/adminLogin");
}
onMounted(() => {
    // const log = store.state.userInfo;
    // if (log != null) {
    //     loginBase(log.data)
    // }
})

const loginBase = (data) => {
    login({
        username:data.username,
        password: data.password
    }).then(res => {
        console.log("res:",res)
        if (res.code===1) {
            const toStore = {
                data: data,
                token: res.data.token,
                id:res.data.userId
            }
            store.commit('setUserInfo', toStore)
            sessionStorage.setItem("login", JSON.stringify(toStore))
            router.push({
                path: '/myinfo'
            })
        }

    }).catch(error=>{
        console.error('登录请求出错:', error);
        router.push('/');
        ElMessage({
            message: "无法登录，用户名或密码不正确",
            type: 'error',
            duration: 1500,

        });
    });
}
</script>

<style scoped>
.login-body {
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image:url("@/../src/assets/login.jpg");
     background-size: cover; /* 使图片平铺满整个浏览器（从宽和高的最大需求方面来满足，会使某些部分无法显示在区域中） */
    position: absolute; /* 不可缺少 */

}

.login-container {
    width: 420px;
    height: 450px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  margin-left: 550px;
}

.head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
}

.head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
}

.head .title {
    font-size: 20px;
    color: #59aaef;
    font-weight: bold;
}

.head {
    font-size: 12px;
    color: #999;
}

.login-form {
    width: 70%;
    margin: 0 auto;
}

.login-form>>>.el-form--label-top .el-form-item__label {
    padding: 0;
}

.login-form>>>.el-form-item {
    margin-bottom: 0;
}
</style>
