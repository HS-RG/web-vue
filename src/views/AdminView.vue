<template>

    <div>

    <div class="common-layout">
        <el-container>
            <el-aside width="200px" class="common-aside">
                <el-menu background-color="none" text-color="#fff" :router="true">
                    <el-menu-item index="/user"> <el-icon>
                        <User />
                    </el-icon> 用户管理</el-menu-item>
                    <el-menu-item index="/file"> <el-icon>
                        <DocumentChecked />
                    </el-icon> 资源管理</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <el-dialog v-model="dialogVisible" title="更改用户信息" width="30%" center>
                    <el-form ref="editDataForm" :model="editData" status-icon label-width="70px">
                        <el-form-item label="ID" prop="id">
                            <el-input v-model="editData.id" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="editData.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="handleUpdateSubmit">提交</el-button>
                            <el-button type="primary" @click="handleUpdateReset">重置</el-button>
                            <el-button type="danger" @click="dialogVisible = false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <el-dialog v-model="dialogPasswordVisible" title="修改密码" width="30%" center>
                    <el-form ref="editPasswordForm" :model="editPassword" status-icon label-width="70px">
                        <el-form-item label="旧密码" prop="oldPassword">
                            <el-input v-model="editPassword.oldPassword" autocomplete="off" show-password
                                      disabled></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPassword">
                            <el-input v-model="editPassword.newPassword" autocomplete="off" show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="handleUpdatePasswordSubmit">提交</el-button>
                            <el-button type="primary" @click="handleUpdatePasswordReset">重置</el-button>
                            <el-button type="danger" @click="dialogPasswordVisible = false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item v-for="route in routes" :key="route.path" :to="{ path: route.path }">
                        {{ route.name }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <br />
                <div v-if="showDashboard" class="dashboard-editor-container">
                    <div style="display: flex; justify-content: flex-end; align-items: center;margin-bottom: 30px" class="Touxiang">
                        <el-dropdown style="text-align: right">
                            <div class="account">
                                <img :src="url"  class="touxiang"/>
                                <div style="font-weight: bolder;margin-top: 10px; "><div  style="color: aqua">{{wellCome}}</div></div>
                            </div>
                            <template #dropdown>
                                <el-dropdown-menu>

                                    <el-dropdown-item @click="handleClickEdit">修改昵称</el-dropdown-item>
                                    <el-dropdown-item @click="handleChangePassword">修改密码</el-dropdown-item>
                                    <el-dropdown-item @click="logout">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <el-row :gutter="40" class="panel-group">
                        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                            <div class="card-panel"  @click="handleSetLineChartData('user')">
                                <div>
                                    <User class="card-panel-icon-wrapper icon-people" />
                                </div>
                                <div class="card-panel-description">
                                    <div class="card-panel-text">
                                        用户
                                    </div>
                                    <CountTo ref="myCount" :start-val="0" :end-val="userTotal" :duration="2600"
                                             class="card-panel-num" />
                                </div>
                            </div>
                        </el-col>
                        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                            <div class="card-panel" @click="handleSetLineChartData('file')">
                                <div>
                                    <FirstAidKit class="card-panel-icon-wrapper icon-message" />
                                </div>
                                <div class="card-panel-description">
                                    <div class="card-panel-text">
                                        资源
                                    </div>
                                    <CountTo :start-val="0" :end-val="illCaseTotal" :duration="2600"
                                             class="card-panel-num" />
                                </div>
                            </div>
                        </el-col>
                        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                            <div class="card-panel" >
                                <div>
                                    <SetUp class="card-panel-icon-wrapper icon-money" />
                                </div>
                                <div class="card-panel-description">
                                    <div class="card-panel-text">
                                        评论
                                    </div>
                                    <CountTo :start-val="0" :end-val="questionTotal" :duration="2600"
                                             class="card-panel-num" />
                                </div>
                            </div>
                        </el-col>
                        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                            <div class="card-panel" >
                                <div>
                                    <DocumentChecked class="card-panel-icon-wrapper icon-shopping" />
                                </div>
                                <div class="card-panel-description">
                                    <div class="card-panel-text">
                                        点赞
                                    </div>
                                    <CountTo :start-val="0" :end-val="examinationTotal" :duration="2600"
                                             class="card-panel-num" />
                                </div>
                            </div>
                        </el-col>
                    </el-row>
<!--                    <el-row>-->
<!--                        <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 24 }" :lg="{ span: 8 }" :xl="{ span: 8 }"-->
<!--                                style="padding-right:8px;margin-bottom:30px;">-->
<!--                            <div class="chart-wrapper" id="PieCharts" ref="pieChartRef"-->
<!--                                 style="width: 500px; height: 300px" />-->
<!--                        </el-col>-->
<!--                    </el-row>-->
                </div>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
    </div>
</template>

<script>
export default {
    name: "AboutView",
    data: function () {
        return {
          wellCome:JSON.parse(sessionStorage.getItem('login')).data &&JSON.parse(sessionStorage.getItem('login')).data.username?JSON.parse(sessionStorage.getItem('login')).data.username:""

    }
    },

    methods: {
        logout() {
            sessionStorage.removeItem('login');
            this.$router.push('/');
        },


    },


}
</script>
<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { computed, onMounted, ref, nextTick, watch } from 'vue';
import { useRouter, useRoute } from "vue-router";
import * as echarts from 'echarts'
co
import {

    searchUser,
    changePassword,
    updateUser,
    QueryFileList,
    getAllCommentCount, getAllLikeCount, findUserById
} from '@/api/api'
import { CountTo } from 'vue3-count-to'
import { useStore } from 'vuex';
import {ElMessage} from "element-plus";

const router = useRouter()
const route = useRoute()
const store = useStore()
const wellCome=ref(JSON.parse(sessionStorage.getItem('login')).data &&JSON.parse(sessionStorage.getItem('login')).data.username?JSON.parse(sessionStorage.getItem('login')).data.username:"")
// console.log(router.currentRoute.value.matched)
const routes = computed(() => {
    // 过滤掉没有meta的
    let ret = [];
    router.currentRoute.value.matched.forEach(function (val, index) {
        const route = {
            path: val.path,
            name: val.name,
        }
        ret.push(route)
    })
    // console.log(ret)
    return ret
})

watch(routes, (newval) => {
    if(newval.length === 1) {
        location.reload()
    }
})
const dialogPasswordVisible=ref(false)
const dialogVisible=ref(false)
const editData = ref({
    id: 0,
    name: '',
    nameBackup: ''
})
const editPassword = ref({
    oldPassword: '',
    newPassword: ''
})
const handleUpdatePasswordSubmit = () => {
    if (editPassword.value.oldPassword === editPassword.value.newPassword) {
        dialogPasswordVisible.value = false;
        return;
    }

    const login = store.getters.isLogIn;

    if (!login.isLogIn) {
        router.push('/login')
    }
    console.log(editData.value.name)
    changePassword({
        password: editPassword.value.newPassword
    }).then(res => {
        dialogPasswordVisible.value = false;
        const login = JSON.parse(sessionStorage.getItem('login') || '{}');
        if (res.code===1) {
            login.data.password = editPassword.value.newPassword;
            sessionStorage.setItem('login', JSON.stringify(login));
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
        }

    })
}

const handleSetLineChartData = name => {
    router.push(name)
}
const handleChangePassword = (data) => {
    editPassword.value['oldPassword'] = JSON.parse(sessionStorage.getItem('login')).data.password
    dialogPasswordVisible.value = true
}
const handleUpdatePasswordReset = () => {
    editPassword.value['newPassword'] = editPassword.value['oldPassword']

}

const handleUpdateReset = () => {
    editData.value['name'] = editData.value['nameBackup']

}
const Image=ref('')
const handleClickEdit = (data) => {

    const login = store.getters.isLogIn;
    findUserById({userId:store.getters.isLogIn.id}
    ).then(res => {
        Image.value=res.data.imageUrl;
        editData.value['id'] = store.getters.isLogIn.id,
        editData.value['name'] = res.data.nickname,
        editData.value['nameBackup'] = res.data.nickname
    })
    console.log(editData.value)
    dialogVisible.value = true
}
const handleUpdateSubmit = () => {
    if (editData.value.name === editData.value.nameBackup) {
        dialogVisible.value = false;
        return;
    }

    const login = store.getters.isLogIn;

    if (!login.isLogIn) {
        router.push('/login')
    }
    console.log(editData.value.name)
    updateUser({
            userId:JSON.parse(sessionStorage.getItem('login')).id,
            nickname: editData.value.name
        }).then(res => {
        dialogVisible.value = false;
        console.log(res);
        if (res.code===1) {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
        }

    })
}



const showDashboard = computed(() => {
    return route.meta.showDashboard
})

const userTotal = ref(0)
const questionTotal = ref(0)
const illCaseTotal = ref(0)
const examinationTotal = ref(0)
const url =ref('')
onMounted(() => {
    findUserById({userId:store.getters.isLogIn.id}
    ).then(res=>{
        url.value=res.data.imageUrl;
    });
    console.error = () => {}; // 重写console.error方法，使其不执行任何操作
    try {
        console.log(route.meta.showDashboard)
        searchUser({
            nickname:"",
            pageSize:5,
            pageNumber:1},{
            params:{
                nickname:"",
                pageSize:5,
                pageNumber:1
            }
        }).then(res => {
            nextTick(() => {
                userTotal.value=res.data[res.data.length-1].length
            })
        }).catch(error=>{
            console.error(error);
        });
        QueryFileList({
            yearTag:-1 ,
            courseTag: "",
            typeTag: "",
            searchString:"",
            pageSize:200000,
            pageNum:1},{
            params:{
                yearTag:-1 ,
                courseTag: "",
                typeTag: "",
                searchString:"",
                pageSize:200000,
                pageNum:1
            }
        }).then(res => {
            nextTick(() => {
                console.log(res)
               illCaseTotal.value = res.data.total
            })
        }).catch(error=>{
            console.error(error);
        });
        getAllCommentCount({

        }).then(res => {
            nextTick(() => {
                questionTotal.value = res.data
            })
        }).catch(error=>{
            console.error(error);
        });
        const login = store.getters.isLogIn;
        if (!login.isLogIn) {
            router.push('/login')
        }
        getAllLikeCount({
        }).then(res => {
            nextTick(() => {
                examinationTotal.value = res.data
            })
        }).catch(error=>{
            console.error(error);
        });
    } catch (error){
        console.error();
    }

})






</script>

<style scoped>
.common-header {
    background-color: #d2d2d2;
    display: flex;
}

.common-aside {
    background-color: rgb(34, 40, 50);
    width: 200px;
}

/* rgb(38, 52, 69) */

.el-container {
    height: 100vh;
    overflow: hidden;
}

.logo {
    width: 80px;
}

.title {
    color: white;
}

.el-aside::-webkit-scrollbar {
    display: none;
}

.el-submenu__title:hover {
    background-color: rgb(27, 32, 40) !important;
}

.el-menu-item:hover {
    background-color: rgb(27, 32, 40) !important;
}

.panel-group {
    margin-top: 18px;




}

.card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    height: 124px;
    background: #FFFFFF;
    border-radius: 10px;

}

img {
    width: 60px;
    height: 60px;
    display: inline-block;
}

.icon-people {
    /* color:  */
    background-color: #9694ff;
    color: #fbfaff;
}

.icon-message {
    background-color: #57caeb;
    color: #fbfaff;
}

.icon-money {
    color: #fbfaff;
    background-color: #5ddab4;
}

.icon-shopping {
    color: #fbfaff;
    background-color: #ff7976;
}

.card-panel-icon-wrapper {
    width: 3em;
    height: 3em;
    float: left;
    margin: 26px 0 0 26px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 16px;
}

.card-panel-icon {
    float: left;
    font-size: 48px;
}

.card-panel-description {
    float: right;
    font-weight: bold;
    margin: 26px;
    margin-left: 0px;


}

.card-panel-text {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
}

.card-panel-num {
    font-size: 20px;
}

.card-panel-col {
    margin-bottom: 32px;
}

@media (max-width:550px) {
    .card-panel-description {
        display: none;
    }

    .card-panel-icon-wrapper {
        float: none !important;
        width: 100%;
        height: 100%;
        margin: 0 !important;


    }

    svg {
        display: block;
        margin: 14px auto !important;
        float: none !important;
    }
}

@media (max-width:1024px) {
    .chart-wrapper {
        padding: 8px;
    }
}

.dashboard-editor-container {
    padding: 32px;
    background-color: #F2F7FF;
    position: relative;
}

.chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
    border-radius: 8px;
}
.Touxiang{
    margin-left: 28vw;
}

.touxiang{
    width:35px;
    height:35px;
    border-radius:50%;
    margin-top: 15px;
    box-shadow: 0 0 0 2px black;

    /*设为圆形*/
}
</style>