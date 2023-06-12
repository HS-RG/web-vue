<template>
  <el-backtop :right="100" :bottom="100" />

  <div class="background-img">
    <el-container>
      <el-aside width="200px" class="common-aside">
        <el-menu background-color="none" text-color="#fff" :router="true">
          <el-menu-item index="/homepage"> <el-icon>
            <House />
          </el-icon> 主页</el-menu-item>
          <el-menu-item index="/myinfo"> <el-icon>
            <Setting />
          </el-icon> 个人设置</el-menu-item>
        </el-menu>
      </el-aside>
    <el-container class="el-container">

      <el-main class="el-main">
          <div style="display: flex; justify-content: flex-end; align-items: center;margin-bottom: 30px" class="Touxiang">
              <el-dropdown style="text-align: right">
                  <div class="account">
                      <img :src="avaurl"  class="touxiang"/>
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
        <el-avatar class="img" :src="avaurl" size="large"/>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>个人简介</span>
              <el-button class="icon" type="primary" :icon="Star" @click="handleSearch1= true">收藏夹</el-button>
              <el-dialog
                  v-model="handleSearch1"
                  title="我收藏的资源"
                  width="50%"
                  :before-close="handleClose"
              >

                <el-table :data="tableData1" border stripe style="width: 100%; margin-top: 20px;" >
                  <!--      <el-table-column type="selection" />-->
                  <el-table-column prop="id" label="ID" min-width="60px"></el-table-column>
                  <el-table-column prop="filename" min-width="70px" label="文件名"></el-table-column>
                  <el-table-column prop="title" min-width="35px" label="标题"></el-table-column>
                  <el-table-column prop="year" min-width="20px" label="年份"></el-table-column>
                  <el-table-column prop="course" label="学科" min-width="30px"></el-table-column>
                  <el-table-column prop="time" label="上传时间" min-width="50px"></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template v-slot="scope">
                      <el-button
                          type="primary"
                          v-model="scope.row.id"
                          @click="handleClickUserType(scope.row)"
                      >
                        <el-icon>
                          <View />
                        </el-icon>
                      </el-button>
                      <el-button
                          type="danger" v-show="false"
                          v-model="scope.row.id"
                          @click="handleDelete(scope.row)"
                      >
                        <el-icon>
                          <Delete />
                        </el-icon>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                  <el-pagination
                          :current-page="currentPage1"
                          :page-size="pageSize"
                          :total="total1"
                          @current-change="handlePageChange1"
                          layout="prev, pager, next,jumper"
                  ></el-pagination>
                <template #footer>
                </template>
              </el-dialog>
            </div>
          </template>
          <el-icon>
            <User/>
          </el-icon>
          <text style="margin-left: 7px; margin-top: -2px">昵称：{{name}}</text>
          <el-divider></el-divider>
          <el-upload
              ref="uploadRef"
              class="upload-demo"
              action="#"
              :auto-upload="false"
              :headers="headers"
              :on-change="handleChange"
          >
            <template #trigger>
              <el-button class="select" type="primary">选择本地头像</el-button>
            </template>

             <el-button class="toserver" type="success" @click="submitUpload">
              上传
            </el-button>
            <el-divider></el-divider>

            <template #tip>
              <div style="margin-left: 5px;margin-top: 5px; size:A4 ">
                jpg/png files with a size less than 500kb
              </div>
            </template>
          </el-upload>

        </el-card>
        <el-card class="box-card1">
          <template #header>
            <div class="card-header">
              <span>我上传的资源</span>
            </div>
          </template>
          <div>
            <el-table :data="tableData" border stripe style="width: 100%; margin-top: 20px;">
              <!--      <el-table-column type="selection" />-->
              <el-table-column prop="id" label="ID" min-width="60px"></el-table-column>
              <el-table-column prop="filename" min-width="70px" label="文件名"></el-table-column>
              <el-table-column prop="title" min-width="35px" label="标题"></el-table-column>
              <el-table-column prop="year" min-width="20px" label="年份"></el-table-column>
              <el-table-column prop="course" label="学科" min-width="30px"></el-table-column>
              <el-table-column prop="time" label="上传时间" min-width="50px"></el-table-column>
              <el-table-column label="操作" align="center">
                <template v-slot="scope">
                  <el-button
                      type="primary"
                      v-model="scope.row.id"
                      @click="handleClickUserType(scope.row)"
                  >
                    <el-icon>
                      <View />
                    </el-icon>
                  </el-button>
                  <el-button
                      type="danger" v-show="false"
                      v-model="scope.row.id"
                      @click="handleDelete(scope.row)"
                  >
                    <el-icon>
                      <Delete />
                    </el-icon>
                  </el-button>
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
          </div>

        </el-card>

      </el-main>

      <el-footer></el-footer>
    </el-container>
    </el-container>

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
<script  setup>
import {ref, onMounted, nextTick, watch} from 'vue'
import { User,Star,UserFilled,More } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const name=ref("")
const input1 = ref('')
const input2 = ref('')
const router = useRouter()
const avaurl=ref('')
const count = ref(0)
const store = useStore()
import {ElMessage, ElMessageBox} from 'element-plus'
import {
    changePassword, findUserById,
    getcollectfiles,
    getMyDetail,
    getMyfiles,
    login,
    QueryFileList, updateOneUser,
    updateUser,
    uploadFile,
    uploadImg
} from "@/api/api";
const tableData = ref([])
const tableData1 = ref([])
const currentPage = ref(1)
const currentPage1 = ref(1)
const total = ref(0)
const total1 = ref(0)
const pageSize = 5
const arg=ref('')
const handleSearch1=ref(false)
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
const handleUpdateReset = () => {
    editData.value['name'] = editData.value['nameBackup']

}
const handleUpdatePasswordReset = () => {
    editPassword.value['newPassword'] = editPassword.value['oldPassword']

}
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
const handleChangePassword = (data) => {
    editPassword.value['oldPassword'] = JSON.parse(sessionStorage.getItem('login')).data.password
    dialogPasswordVisible.value = true
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
const handleClickUserType = (data) => {
  // userData.value['id']=data.id
  // dialogUserTypeVisible.value=true
  sessionStorage.setItem('fileId',data.id)
  router.push("/resource")
}
// const search = (arg, page) => {
//   console.log("arg:"+arg);
//   const login = store.getters.isLogIn;
//   if (!login.isLogIn) {
//     router.push('/adminLogin')
//   }
//   getMyfiles({
//     pageNum:currentPage.value},{
//     params:{
//       yearTag: -1,
//       courseTag: "",
//       typeTag: "",
//       searchString:arg,
//       pageSize:5,
//       pageNum:currentPage.value
//     },
//     headers: {
//       Authorization: login.token
//     }
//   }).then(res => {
//     tableData.value=[];
//     let len=res.data.rows.length;
//     console.log(len);
//     nextTick(() => {
//       let usertype=[]
//       for (let i = 0; i < len; i++) {
//
//         tableData.value[i] = {
//           id: res.data.rows[i].fileId,
//           filename: res.data.rows[i].filename,
//           year:res.data.rows[i].yearTag,
//           time: res.data.rows[i].createTime,
//           title:res.data.rows[i].title,
//           course: res.data.rows[i].courseTag
//         };
//       }
//
//       console.log(tableData);
//       console.log(tableData.value);
//     });
//     total.value = res.data.total;
//
//
//   }).catch(error=>{
//     console.error(error);
//   });
// }
// const handleSearch = () => {
//   // console.log("outside", search('user'))
//
//   search(arg.value, 1)
//
// }

const handlePageChange = (newPage) => {
  currentPage.value = newPage

}
const handlePageChange1 = (newPage) => {
    currentPage1.value = newPage

}
//
// const handleSelectionChange = (val) => {
//   // console.log(val[0].id)
//   multipleSelection.value = []
//   val.forEach(elem => {
//     multipleSelection.value.push(elem.id)
//   })
//   // console.log(multipleSelection)
// }
//
// const load = () => {
//   count.value += 2
// }
//
//
// const handlechange=()=> {
// }

let fileUpload = ref()
// 设置请求头
const headers = {
  // 'Content-Type': 'multipart/form-data'
}
watch(currentPage, (newValue) => {
    searchUpload(arg.value, newValue)
})
watch(currentPage1, (newValue) => {
    searchKeep(arg.value, newValue)
})
// 选择文件时被调用，将他赋值给fileUpload
const handleChange = (file) => {
  fileUpload.value = file
}

const submitUpload=(res)=> {
  console.log(fileUpload.value,'ssubmitUpload')
  const formData = new FormData()
  formData.append('image', fileUpload.value.raw)
    formData.append('userId', JSON.parse(sessionStorage.getItem('login')).id)
  console.log(formData,"formData",fileUpload.value)
    updateOneUser({
        data:formData,
        header:{
            'Content-Type': 'multipart/form-data',
            Authorization: store.state.userInfo.token
        }
    }).then(res=>{
        if(res.code===1){
            ElMessage({
                message: "上传成功",
                type: 'success',
                duration: 1500,
            });
            location.reload()
        }
    })
  uploadImg({
    data:formData,
    header:{
      'Content-Type': 'multipart/form-data',
      Authorization: store.state.userInfo.token
    }
  })
}
const searchUpload = () => {
    getMyfiles({
        pageSize:5,
        pageNum:currentPage.value},{
        params:{
            yearTag: -1,
            courseTag: "",
            typeTag: "",
            searchString:arg,
            pageSize:5,
            pageNum:currentPage.value
        },
        headers: {
            Authorization: login.token
        }
    }).then(res => {
    tableData.value=[];
    let len=res.data.rows.length;
    console.log(len);
    nextTick(() => {
        let usertype=[]
        for (let i = 0; i < len; i++) {

            tableData.value[i] = {
                id: res.data.rows[i].fileId,
                filename: res.data.rows[i].filename,
                year:res.data.rows[i].yearTag,
                time: res.data.rows[i].createTime,
                title:res.data.rows[i].title,
                course: res.data.rows[i].courseTag
            };
        }

        console.log(tableData);
        console.log(tableData.value);
    });
    total.value = res.data.total;
}).catch(error=>{
    console.error(error);
});
}
const searchKeep = () =>{
    getcollectfiles(
        {pageSize:5,
            pageNumber:currentPage1.value},{
            params:{
                yearTag: -1,
                courseTag: "",
                typeTag: "",
                searchString:arg,
                pageSize:5,
                pageNum:currentPage1.value
            },
            headers: {
                Authorization: login.token
            }
        }).then(res => {
        tableData1.value=[];
        let len=res.data.length-1;
        console.log(len);
        nextTick(() => {
            let usertype=[]
            for (let i = 0; i < len; i++) {

                tableData1.value[i] = {
                    id: res.data[i].fileId,
                    filename: res.data[i].filename,
                    year:res.data[i].yearTag,
                    time: res.data[i].createTime,
                    title:res.data[i].title,
                    course: res.data[i].courseTag
                };
            }

            console.log(tableData);
            console.log(tableData.value);
        });
        total1.value = res.data[res.data.length-1].length;


    }).catch(error=>{
        console.error(error);
    });
}
onMounted(() => {
  console.log(store.state.userInfo,"store")

  searchUpload()
searchKeep()

  getMyDetail({
    header:{
      Authorization: store.state.userInfo.token
    }
  }).then(res=>{
    if(res.code===1){
        name.value=res.data.nickname
        avaurl.value=res.data.imageUrl
    }
  })
})

</script>

<style scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}
.common-aside {
  background-color: rgb(34, 40, 50);
  width: 200px;
  height: 1500px;
}
.img {
  margin-left: 80px;
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.icon {
  margin-left: 550px;
  margin-right: 20px;
  margin-top: -10px;
}

.el-container{

}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}


.box-card {
  width: 850px;
  margin-left: 200px;
  height: 330px;
  margin-top: 10px;

}
.box-card1{
  width: 1000px;
  margin-left: 200px;
  height: 700px;
  margin-top: 50px;
}
.infinite-list {
  height: 560px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  height: 50px;
  margin: 10px;
  width: 100%;
  color: var(--el-color-primary);

}
.infinite-list .infinite-list-item .el-row{
  width: 100%;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;

}
.common-aside {
  background-color: rgb(34, 40, 50);
  width: 200px;
  height: 1300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.select{
  margin-top: 10px;

}
.toserver{
  margin-top: 0px;
  margin-left: 12px;
}

.background-img{
  background-image: url("../../public/assets/img_1.png");
  background-size: cover;
  height: 120vh; /* 将容器的高度设置为整个视口的高度，以确保图片填充整个页面 */
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















