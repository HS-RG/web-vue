<template>
  <div class="background-img">
    <div class="common-layout" >
  <el-backtop :right="100" :bottom="100" />

  <el-container>
    <el-aside width="200px" class="common-aside">
      <el-menu background-color="none" text-color="#fff" :router="true">
        <el-menu-item index="/"> <el-icon>
          <ArrowLeft />
        </el-icon> 返回</el-menu-item>
        <el-menu-item index="/homepage"> <el-icon>
          <House />
        </el-icon> 主页</el-menu-item>
        <el-menu-item index="/myinfo"> <el-icon>
          <Setting />
        </el-icon> 个人设置</el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>

      <dialog-component v-if="Visiable" ref="dialog"></dialog-component>
      <el-dialog
          v-model="upload"
          title="资源上传"
          width="40%"
          :before-close="handleClose"
      >

        <el-form :model="form" label-width="120px">
          <el-col :span="8">
            <el-form-item label="标题" ><el-input v-model="form.title" /></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上传者姓名"><el-input v-model="form.name" /></el-form-item>
          </el-col>
          <el-form-item label="Activity time">
            <el-col :span="10">
              <!--                <el-date-picker-->
              <!--                    v-model="form.date1"-->
              <!--                    type="date"-->
              <!--                    placeholder="Pick a date"-->
              <!--                    style="width: 100%"-->
              <!--                />-->
              <el-date-picker
                  v-model="form.date1"
                  type="year"
                  placeholder="选择年">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="课程标签">
            <el-radio-group v-model="form.course">
              <el-radio label="数据库" />
              <el-radio label="操作系统" />
              <el-radio label="密码学" />
              <el-radio label="其它" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="资源类型">
            <el-radio-group v-model="form.type">
              <el-radio label="试卷" />
              <el-radio label="试卷答案" />
              <el-radio label="课本答案" />
              <el-radio label="其它" />
            </el-radio-group>
          </el-form-item>
          <el-col :span="20">
            <el-form-item label="对于资源的描述">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
          </el-col>
        </el-form>
        <el-upload
            ref="uploadRef"
            class="upload-demo"
            action="#"
            :auto-upload="false"
            :http-request="uploadFileWrapper"
        >
          <template #trigger>
            <el-button class="select" type="primary">select file</el-button>
          </template>
          <!--          <el-button class="toserver" type="success" @click="submitUpload">-->
          <!--            upload to server-->
          <!--          </el-button>-->
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
        <el-button class="submit" type="primary" @click="submitUpload">Submit</el-button>
        <el-button>Cancel</el-button>
      </el-dialog>
      <el-card  style="margin-top: 200px; height: 700px" shadow="always" >

        <div class="card-header" style="display: flex; justify-content: flex-end; align-items: center;">
          <el-button class="el-button" type="primary" :icon="Plus"  @click="upload = true">上传</el-button>
          <el-input v-model="arg" style="width: 500px;" placeholder="请输入关键字搜索"><template #append>
            <el-button type="primary" @click="handleSearch"><el-icon>
              <Search />
            </el-icon>搜索</el-button>
          </template></el-input>&nbsp;&nbsp;&nbsp;


        </div>
        <el-table :data="tableData" border stripe style="width: 100%; margin-top: 20px;" @selection-change="handleSelectionChange">
          <!--      <el-table-column type="selection" />-->
          <el-table-column prop="id" label="ID" min-width="60px" ></el-table-column>
          <el-table-column prop="filename" min-width="70px" label="文件名"></el-table-column>
          <el-table-column prop="title" min-width="35px" label="标题"></el-table-column>
          <el-table-column prop="year" min-width="20px" label="年份"></el-table-column>
          <el-table-column prop="course" label="学科" min-width="30px"></el-table-column>
          <el-table-column prop="time" label="上传时间" min-width="50px"></el-table-column>
          <el-table-column label="操作" align="center">
            <template v-slot="scope">

              <el-button
                  class="fuck"
                  type="primary"
                  v-model="scope.row.id"
                  @click="handleClickUserType(scope.row)"
              >
                <el-icon>
                  <View />
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
              <el-input v-model="editPassword.oldPassword" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="editPassword.newPassword" autocomplete="off"></el-input>
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

    </el-main>

</el-container>
    </div>
  </div>
</template>
<script setup>
import {ref, onMounted, nextTick, watch} from 'vue'
import { useRouter } from 'vue-router';
import { View,ArrowLeft,House,Setting,Plus } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {findUserById, getMyDetail, login, QueryFileList, uploadFile} from '@/api/api'
import { useStore } from 'vuex';
const tableData = ref([])
const currentPage = ref(1)
const total = ref(0)
const pageSize = 5
const arg=ref('')
const router = useRouter()
const store = useStore()
const count = ref(0)
const upload=ref(false)
const load = () => {
  count.value += 2
}


const fileList = ref([

])
const handleClickUserType = (data) => {
  // userData.value['id']=data.id
  // dialogUserTypeVisible.value=true
  sessionStorage.setItem('fileId',data.id)
  router.push("/userresource")
}
const search = (arg, page) => {
  console.log("arg:"+arg);
  const login = store.getters.isLogIn;
  if (!login.isLogIn) {
    router.push('/adminLogin')
  }
  QueryFileList({
    yearTag:-1 ,
    courseTag: "",
    typeTag: "",
    searchString:arg,
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


const uploadRef = ref(null)

const submitUpload = () => {
  console.log(1111111   )
  uploadRef.value.submit()
}
/*const formData = reactive({
  params:new FormData()
})*/
const form = reactive({
  title: '',
  name: '',
  date1: '',
  course:'',
  type: '',
  desc: '',
})
const uploadFileWrapper = (file) => {
  console.log('filefilefilefile',file)
  const formData=new FormData()
  formData.append('file', file.file)
  formData.append('typeTag', 'form.type')
  formData.append('userId', store.state.userInfo.id)
  for (const key in form) {
    formData.append(key, form[key])
  }
  console.log('submit!',formData)
  uploadFile(formData,{
    Authorization: store.state.userInfo.token
  })
  console.log('formData',[formData])
  // uploadFile(formData,{
  //   Authorization: store.state.userInfo.token
  // })
}
onMounted(() => {
  getMyDetail({
    header:{
      Authorization: store.state.userInfo.token
    }
  }).then(res=>{
    // fileList.value=res.data;
  })
})
onMounted(() => {
  findUserById({userId:store.getters.isLogIn.id}
  ).then(res=>{
    // url.value=res.data.imageUrl;
  });
  search('', currentPage.value)
})

watch(currentPage, (newValue) => {
  search(arg.value, newValue)
})

// const form=ref();
// const onSubmit = () => {
//   console.log('submit!',form)
//   for (const key in form) {
//     formData.params.append(key, form[key])
//   }
//   console.log('submit!',formData.params)
//   uploadFile(formData.params,{
//     Authorization: store.state.userInfo.token
//   })
// }


</script>
<style>
.common-aside {
  background-color: rgb(34, 40, 50);
  width: 200px;
  height: 1300px;
}
.infinite-list {
  height: 900px;
  padding: 0;
  margin: 0;
  width:60%;
  margin-left: 300px;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.el-button{
  margin-right: 1250px;
  size: A5;
}

.submit{
  margin-left: 120px;
}

.el-upload__tip{
  margin-left: 280px;
  margin-top: -25px;

}
.select{
  margin-left: 20px;
}
.fuck{
  margin-top: 10px;
  justify-content: center;
  margin-left: 65px;

}
.background-img{
  background-image: url("../../public/assets/img.png");
  background-size: cover;
  height: 120vh; /* 将容器的高度设置为整个视口的高度，以确保图片填充整个页面 */
}
</style>

