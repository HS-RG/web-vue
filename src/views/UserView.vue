<template>
    <div style="display: flex; justify-content: flex-end; align-items: center;margin-bottom: 30px" class="Touxiang">
        <el-dropdown style="text-align: right">
            <div class="account">
                <img :src="url"  class="touxiang"/>
                <div style="font-weight: bolder;margin-top: 10px; "><div  style="color: #56a2ee">{{wellCome}}</div></div>
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
    <el-card shadow="always" >

        <!-- <div style="display:flex; justify-content: flex-end; align-items: center;margin-bottom: 20px;">-->

        <!--      <el-input placeholder="请输入搜索关键字" v-model="arg" style="width: 300px" class="search-box"></el-input>-->
        <!--      <el-button type="primary" style="margin-left: 10px;" @click="handleSearch">搜索</el-button>-->
        <!--    </div>-->
        <div class="card-header" style="display: flex; justify-content: flex-end; align-items: center;">
            <el-input v-model="arg" style="width: 500px;" placeholder="请输入昵称搜索"><template #append>
                <el-button type="primary" @click="handleSearch"><el-icon>
                    <Search />
                </el-icon>搜索</el-button>
            </template></el-input>&nbsp;&nbsp;&nbsp;


        </div>
        <el-table :data="tableData" border stripe style="width: 100%; margin-top: 20px;" @selection-change="handleSelectionChange">
            <!--      <el-table-column type="selection" />-->
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="username" min-width="40px" label="用户名"></el-table-column>
            <el-table-column prop="nickname" min-width="40px" label="昵称"></el-table-column>
            <el-table-column prop="usertype" min-width="30px" label="身份"></el-table-column>
            <el-table-column prop="addTime" label="考核次数"></el-table-column>
            <el-table-column prop="latestTime" label="平均分数"></el-table-column>
            <el-table-column label="操作" align="center">
                <template v-slot="scope">
                    <el-button
                            type="primary"
                            v-model="scope.row.id"
                            @click="handleClickUserType(scope.row)"
                    >
                        <el-icon>
                            <Edit />
                        </el-icon>
                    </el-button>
                    <el-popconfirm title="Are you sure to delete this?"
                                   @confirm="handleDelete(scope.row)"
                                   @cancel="cancelEvent">
                        <template #reference>
                            <el-button
                                type="danger"
                                v-model="scope.row.id"

                            >
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                :current-page="currentPage"
                :page-size="pageSize"
                :total="total"
                @current-change="handlePageChange"
                layout="prev, pager, next,jumper"
        ></el-pagination>
        <el-dialog
                v-model="dialogVisible"
                title="更改用户信息"
                width="30%"
                center
        >
            <el-form
                    ref="editDataForm"
                    :model="editData"
                    status-icon
                    label-width="70px"
            >
                <el-form-item label="ID" prop="id">
                    <el-input v-model="editData.id" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="editData.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="handleUpdateSubmit">提交</el-button>
                    <el-button type="primary" @click="handleUpdateReset">重置</el-button>
                    <el-button type="danger" @click="dialogVisible = false"
                    >取消</el-button
                    >
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
                v-model="dialogPasswordVisible"
                title="修改密码"
                width="30%"
                center
        >
            <el-form
                    ref="editPasswordForm"
                    :model="editPassword"
                    status-icon
                    label-width="70px"
            >
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input v-model="editPassword.oldPassword" autocomplete="off" show-password disabled></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="editPassword.newPassword" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleUpdatePasswordSubmit">提交</el-button>
                    <el-button type="primary" @click="handleUpdatePasswordReset">重置</el-button>
                    <el-button type="primary" @click="dialogPasswordVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
                v-model="dialogUserTypeVisible"
                title="更改用户权限"
                width="30%"
                center
        >
            <el-form
                    ref="editUserTypeForm"
                    status-icon
                    label-width="70px"
            >
                <el-form-item>
                    <el-button type="success" @click="upManage">升为管理员</el-button>
                    <el-button type="danger" @click="downUser">置为普通用户</el-button>
                    <el-button type="primary" @click="dialogUserTypeVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    name:"userPage",
    data() {
        return{
            wellCome: JSON.parse(sessionStorage.getItem('login')).data.username ,
            //url:"https://i.postimg.cc/P5NVjZxd/yangyuhuan.jpg"
        }
    },

    methods: {
        logout(){
            console.log(sessionStorage.getItem('login'));
            sessionStorage.removeItem('login');
            sessionStorage.removeItem('login');
            console.log(sessionStorage.getItem('login'));
            this.$router.push('/adminLogin');
        },


    },


}
</script>


<script setup>
import {ref, onMounted, watch, nextTick} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {
  findByName,
  changePassword,
  searchUser,
  findUserById,
  setUserType,
  removeUser,
  updateUser,
  queryAdminById,
  updateOneUser, DeleteOneFile, DeleteOneUser, QueryGradeList, QueryUserList
} from '@/api/api';
import {ElMessage} from "element-plus";
const url=ref("")
const store = useStore()
const router = useRouter()
const wellCome=ref(JSON.parse(sessionStorage.getItem('login')).data.username)
const usertype=ref([])
const tableData = ref([])
const arg = ref('')
const dialogVisible = ref(false)
const dialogPasswordVisible=ref(false)
const dialogUserTypeVisible=ref(false)
const multipleSelection = ref([])
const editData = ref({
    id: 0,
    name: '',
    nameBackup: ''
})
const userData = ref({
    id: 0,
    name: '',
})

const editDataForm = ref()
const editPassword=ref({
    oldPassword:'',
    newPassword:''
})
const editPasswordForm=ref()
const currentPage = ref(1)
const total = ref(0)
const pageSize = 5
onMounted(() => {
    findUserById({userId:store.getters.isLogIn.id}
    ).then(res=>{
      //  url.value=res.data.imageUrl;
    });
    search('', currentPage.value)
})

watch(currentPage, (newValue) => {
    search(arg.value, newValue)
})

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
        if(res.code===1){
            ElMessage({
                message: "修改成功",
                type: 'success',
                duration: 1500,
            });
            search('',currentPage.value)
        }

    })
}
const upManage = () => {

    const login = store.getters.isLogIn;

    if(!login.isLogIn) {
        router.push('/adminLogin')
    }
    console.log(editData.value.name)
    setUserType({
        token: login.token,
        userId:userData.value.id,
        isAdmin:true
    }).then(res => {
        dialogUserTypeVisible.value = false;
        const login = JSON.parse(sessionStorage.getItem('login') || '{}');
        if(res.code===1){
            search('',currentPage.value)
            ElMessage({
                message: '设置成功',
                type: 'success',
            })
        }

    }).catch(error=>{
        console.error(error);
    });
}
const downUser = () => {

    const login = store.getters.isLogIn;

    if(!login.isLogIn) {
        router.push('/adminLogin')
    }
    console.log(editData.value.name)
    setUserType({
        token: login.token,
        userId:userData.value.id,
        isAdmin:false
    }).then(res => {
        dialogUserTypeVisible.value = false;
        const login = JSON.parse(sessionStorage.getItem('login') || '{}');
        if(res.code===1){
            search('',currentPage.value)
            ElMessage({
                message: '设置成功',
                type: 'success',
            })
        }

    }).catch(error=>{
        console.error(error);
    });
}

const handleUpdatePasswordReset = () => {
    editPassword.value['newPassword'] = editPassword.value['oldPassword']

}
const handleUpdateReset = () => {
    editData.value['name'] = editData.value['nameBackup']

}
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
const Image=ref('')
const handleClickEdit = (data) => {

    const login = store.getters.isLogIn;
    findUserById({userId:store.getters.isLogIn.id}
    ).then(res => {
        // Image.value=res.data.imageUrl;
        // editData.value['id'] = store.getters.isLogIn.id,
        //     editData.value['name'] = res.data.nickname,
        //     editData.value['nameBackup'] = res.data.nickname
    })
    console.log(editData.value)
    dialogVisible.value = true
}
const handleClickUserType = (data) => {
    userData.value['id']=data.id
    dialogUserTypeVisible.value=true
}
const handleChangePassword = (data) => {
    // console.log(data)

    editPassword.value['oldPassword']=JSON.parse(sessionStorage.getItem('login')).data.password
    // console.log(editData.value)
    dialogPasswordVisible.value = true
}








const handleDelete = (data) => {
    const login = store.getters.isLogIn;
    DeleteOneUser({
        token:login.token,
        userId:data.id
    }).then(res=>{
        if(res.msg==="success"){
            ElMessage({
                message: '删除成功',
                type: 'success',
            });
            search("",currentPage.value)
        }
    })


}


const search = (arg, page) => {
    console.log("arg:"+arg);
    const login = store.getters.isLogIn;
    if (!login.isLogIn) {
        router.push('/adminLogin')
    }
    QueryUserList({
        username:arg,
        size:pageSize,
        page:currentPage.value-1
    },{
        params:{
          token:login.token,
            nickname:arg,
            size:pageSize,
            page:currentPage.value-1
        },
        headers: {
            Authorization: login.token
        }
    }).then(res => {
      console.log(res)
        tableData.value=[];
        let len=res.userList.userList.length;
        let i=0;
        console.log(len);
        nextTick(() => {
            for (let i = 0; i < len; i++) {

                tableData.value[i] = {
                    id: res.userList.userList[i].userId,
                    username: res.userList.userList[i].username,
                     addTime: res.userList.userList[i].surgeryTimes,
                     latestTime:res.userList.userList[i].averageScore ,
                    nickname: res.userList.userList[i].username,
                    usertype:res.userList.userList[i].role
                };
            }

            console.log(tableData);
            console.log(tableData.value);
        });
        total.value = res.userList.total;


    }).catch(error=>{
        console.error(error);
    });
}
const handleSearch = () => {
    // console.log("outside", search('user'))

    search(arg.value, 1)

}

const handlePageChange = (newPage) => {
    currentPage.value = newPage
}

const handleSelectionChange = (val) => {
    // console.log(val[0].id)
    multipleSelection.value = []
    val.forEach(elem => {
        multipleSelection.value.push(elem.id)
    })
    // console.log(multipleSelection)
}



</script>


<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
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
