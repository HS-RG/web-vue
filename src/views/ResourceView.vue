<template>
    <!--  <audio ref="audio" id="audio" src="../../public/img/Summer.mp3" loop preload="auto" hidden></audio>-->

    <div class="background-image">
        <div class="common-layout">
            <el-container>
                <el-header class="logo">
                    <a href="javascript:void(0);" class="a" style="vertical-align: middle ">华师热狗资源详情页</a>
                    <div style="vertical-align: middle" class="Touxiang">
                        <el-dropdown style="text-align: right">
                            <div class="account">
                                <img :src="touxiang" alt="头像" class="touxiang"/>
                                <div style="font-weight: bolder;margin-top: 10px; "><div style="color: aqua">{{wellCome}}</div></div>
                            </div>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item >修改用户名</el-dropdown-item>
                                    <el-dropdown-item >修改密码</el-dropdown-item>
                                    <el-dropdown-item @click="logout">退出</el-dropdown-item>

                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </el-header>
                <el-dialog
                    v-model="dialogVisible"
                    title="更改用户名"
                    width="30%"
                    center
                >
                    <el-form
                        status-icon
                        label-width="70px"
                    >
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="newUsername" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleUpdateSubmit">提交</el-button>
                            <el-button type="danger" @click="dialogVisible = false"
                            >取消</el-button
                            >
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <el-dialog
                    v-model="dialogReplyVisible"
                    title="回复评论"
                    width="50%"
                    center
                >
                    <el-form
                        status-icon
                        label-width="100px"
                    >
                        <el-form-item label="输入回复内容" prop="reply">
                            <el-input type="text" v-model="replyText" style="color: red"  autocomplete="off" ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="replyCommentSubmit">提交</el-button>
                            <el-button type="danger" @click="dialogReplyVisible = false"
                            >取消</el-button
                            >
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <el-dialog
                    v-model="dialogPasswordVisible"
                    title="更改密码"
                    width="30%"
                    center
                >
                    <el-form
                        status-icon
                        label-width="70px"
                    >
                        <el-form-item label="旧密码" prop="oldPassword">
                            <el-input type="text" v-model="oldPassword" style="color: red" show-password autocomplete="off" ></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPassword">
                            <el-input type="text" v-model="newPassword" autocomplete="off" show-password ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleUpdatePasswordSubmit">提交</el-button>
                            <el-button type="danger" @click="dialogPasswordVisible = false"
                            >取消</el-button
                            >
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <!--      <el-header style="text-align: right; vertical-align: middle">-->



                <!--      </el-header>-->
                <el-main style="height: 0vh;">

                </el-main>
                <el-card style="width: 80vw;height:180px;margin: auto; display: block;">
                    <el-descriptions
                        class="margin-top"
                        title="文件概况"
                        :column="3"
                        :size="size"
                        :style="blockMargin"
                    >
                        <template #extra>
                            <el-button type="primary" @click="download">下载</el-button>
                        </template>
                        <el-descriptions-item label="文件名：">{{fileName}}</el-descriptions-item>
                        <el-descriptions-item label="课程：">{{course}}</el-descriptions-item>
                        <el-descriptions-item label="年份：">{{year}}</el-descriptions-item>
                        <el-descriptions-item label="类型：">
                            <el-tag size="small">{{type}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="文件简介："
                        >{{context}}
                        </el-descriptions-item>
                        <el-descriptions-item label="上传时间：">{{timeUp}}</el-descriptions-item>
                    </el-descriptions>
                    <el-row >
                        <img style="margin-left: 90%; margin-top:0" @click="likeClick" v-show="likeVisible" src="../../public/assets/未点赞.png">
                        <img style="margin-left: 90%; margin-top:0" @click="quitLikeClick" v-show="!likeVisible" src="../../public/assets/点赞.png">
                        <img style="margin-left: 1%" v-show="keepVisible" @click="keepClick" src="../../public/assets/未收藏.png">
                        <img style="margin-left: 1%" v-show="!keepVisible" @click="quitKeepClick" src="../../public/assets/收藏.png">
                    </el-row>

                </el-card>
                <div style="width: 80vw; height: 400px; overflow: auto; margin: auto; display: block;position: relative">
                    <el-card style="background-color: #99a9bf; position: absolute;  top: 0;  left: 0;  right: 0;  bottom: 0;">
                        <div v-html="cardContent"></div>
                    </el-card>
                    <el-card  style="background-color: #99a9bf; min-height: 50px; position: absolute;overflow: auto;  top: 0;  left: 0;  right: 0;  bottom: 0;">
                        <el-card style="min-height: 100%; margin-top: -10px">
                            <el-row style="min-height: 100%" > <el-text tag="b" style="min-height: 100% ; width: 30%; text-align: left">评论详情:</el-text>
                            <el-input  v-model="commentText" style="width: 600px;" placeholder="快发表你的评论吧">
                            </el-input>
                            <el-button type="success" @click="sendComment" style="margin-left: 20px">
                                发表
                            </el-button>
                            </el-row>

                        </el-card>

                        <el-card >
                            <el-row v-for="card in commentList" :key="card.commentId">
                                <el-col :span="24">
                                    <el-card :body-style="{ padding: '0px' }">
                                        <div style="display: flex">
                                            <img :src="card.image" class="image" style="height:40px; flex: 0.6 0.6 0 "/>
                                            <div style="position: absolute; bottom: 0; left: 3px; background-color: #fff; padding: 3px;">
                                                <span style="font-size:small ">{{ card.username }}</span>
                                            </div>
                                            <div style=" flex: 0 1 auto; padding: 14px; width: 90% ">
                                                <div style="margin-top: 0; margin-left: 0; text-align: left">
                                                    <el-text style="margin-right:2px ; width: 40px; color: #f35626; font-size: 10px;">{{ card.parentName }}</el-text>
                                                    <el-text style="text-align: left;">{{ card.content }}</el-text>
                                                    <el-text style="margin-right:2px ; color: rgba(24,183,159,0.62); font-size: 5px">发表于</el-text>
                                                    <el-text style="margin-right:20px ;color: rgba(24,183,159,0.62); font-size: 5px">{{ card.time }}</el-text>
                                                    <el-button @click="replyComment(card.commentId)" type="success" style="float: right;">回复</el-button>
                                                    <el-button @click="deleteComment(card.commentId)" type="danger" style="float: right; margin-right: 5px;">删除</el-button>
                                                </div>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </el-card>

                    </el-card>


                </div>
            </el-container>
        </div>
    </div>
</template>

<script>
// Export the default object at the top level of the script tag
export default {
    name:"resourceView",
    data:function() {
        return{
            wellCome:sessionStorage.getItem('username'),
            likeVisible:true,
            keepVisible:true,

        }
    },

    methods: {
        logout(){
            localStorage.removeItem('login');
            sessionStorage.removeItem('login');
            this.$router.push('/');
        }
    },


}

</script>

<script setup>
import {ref, onMounted, watch, nextTick} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {
    listAllCommentByParent,
    listCommentByParent,
    changePassword,
    searchUser,
    findUserById,
    setUserType,
    removeUser,
    updateUser,
    queryAdminById,
    updateOneUser, createComment, getOneFile, deleteOneComment, createLike, deleteLike, createKeep, deleteKeep
} from '@/api/api';
import {ElMessage,UploadProps,UploadUserFile} from "element-plus";

import {Promotion} from "@element-plus/icons-vue";
import store from "@/store";
const commentText=ref('');
const commentList = ref([]);
const likeVisible=ref(true);
const keepVisible=ref(true);
const selectedCommentId = ref('');
const fileName=ref('');
const course=ref('');
const year=ref('');
const type=ref('');
const context=ref('');
const timeUp=ref('');
const fileUrl=ref('')
const dialogReplyVisible=ref(false)
const replyText=ref("")
const touxiang=ref("");
const wellCome=ref(JSON.parse(sessionStorage.getItem('login')).data.username)

const sendComment = (cardId) => {
    if(commentText.value!=""){
        selectedCommentId.value = cardId;
        createComment({
            context:commentText.value,
            authorId:store.getters.isLogIn.id,
            type:1,
            parentId:sessionStorage.getItem('fileId')
        }).then(res=>{
            if(res.code===1){

                ElMessage({
                    message: "评论成功",
                    type: 'success',
                    duration: 1500,
                });
                commentText.value=""
            }
        })
    }
    location.reload();
};
const replyComment = (cardId) => {
    selectedCommentId.value = cardId;
    dialogReplyVisible.value=true
}

const replyCommentSubmit = () => {

    createComment({
        context:replyText.value,
        authorId:store.getters.isLogIn.id,
        type:2,
        parentId:selectedCommentId.value
    }).then(res=>{
        if(res.code===1){
            searchCommentById(sessionStorage.getItem('fileId'));
        }
    })
    dialogReplyVisible.value=false
    location.reload();
};

const deleteComment = (cardId) => {
    deleteOneComment({
        commentId:cardId
    });
    location.reload();
};
//const cardData= ref( null)

const Image=ref("")
const ParentName=ref("")
const userName=ref("")
const findImageById=(Id)=>{
    findUserById({userId:Id}
    ).then(res=>{
        console.log(res.data);
        userName.value=res.data.username
        Image.value=res.data.imageUrl;
    }).catch(error=>{
        console.log(error);
    });
}
// const findParentNameById=(Id,Type)=>{
//     console.log(Id,Type);
//     if(Type===2){
//         findUserById({userId:Id }
//         ).then(res=>{
//             console.log(res.data);
//          //   ParentName.value=res.data.username||"";
//             ParentName.value="tom"
//             console.log(Image.value);
//             console.log(userName.value);
//             console.log(ParentName.value);
//         }).catch(error=>{
//             console.log(error);
//         });
//     }
//     else ParentName.value="tom"
//
// }
//
// const searchComment=()=>{
//     listAllCommentByParent(
//         {
//             type:1,
//             parentId:sessionStorage.getItem('commentId')
//         }
//     ).then(res=>{
//
//         for(let i=0;i<res.data.length;i++){
//             console.log(commentList.value);
//             nextTick(()=>{
//                 findImageById(res.data[i].authorId);
//                 nextTick(()=>{
//                     findParentNameById(res.data[i].parentId,res.data[i].commentType);
//                     nextTick(()=>{
//                         commentList[i].value={
//                             commentId: res.data[i].commentId,
//                             image:Image.value                    ,
//                             authorId:res.data[i].authorId,
//                             username: userName.value,
//                             parentId: res.data[i].parentId,
//                             parentName: ParentName.value,
//                             commentType:res.data[i].commentType,
//                             content: res.data[i].context,
//                             time: res.data[i].createTime
//                         }
//                     });
//                     }
//                 )
//
//                 }
//             )
//
//             console.log(commentList.value);
//
//         }
//         console.log(commentList.value);
//
//
//     }).catch(error=>{
//
//     });
//
// }
const searchCommentById = (id) => {
    commentList.value=[]
    listAllCommentByParent({
        type: 1,
        parentId: id
    }).then((res) => {
        console.log(res.data);

        const filteredData = res.data.filter((item) => item.context !== "评论已删除");

        for (let i = 0; i < filteredData.length; i++) {
            console.log(filteredData[i].authorId);
            findUserById({ userId: filteredData[i].authorId }).then((res1) => {
                console.log(res1.data);
                userName.value = res1.data.username;
                console.log(userName.value);
                Image.value = res1.data.imageUrl;
                if (filteredData[i].type === 2) {
                    findUserById({ userId: filteredData[i].replyTo }).then((res2) => {
                        console.log(res2.data);

                        ParentName.value = "@" + (res2.data?.username || "");
                        commentList.value[i] = {
                            commentId: filteredData[i].commentId,
                            image: Image.value,
                            authorId: filteredData[i].authorId.toString(),
                            username: userName.value,
                            parentId: filteredData[i].parentId.toString(),
                            parentName: ParentName.value,
                            commentType: filteredData[i].type,
                            content: filteredData[i].context,
                            time: filteredData[i].createTime
                        };
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    commentList.value[i] = {
                        commentId: filteredData[i].commentId,
                        image: Image.value,
                        authorId: filteredData[i].authorId.toString(),
                        username: userName.value,
                        parentId: filteredData[i].parentId.toString(),
                        parentName: ParentName.value,
                        commentType: filteredData[i].type,
                        content: filteredData[i].context,
                        time: filteredData[i].createTime
                    };
                }

                // 执行其他操作
                console.log(commentList.value);
            }).catch((error) => {
                console.log(error);
            });
        }
        console.log(commentList.value);
    }).catch((error) => {
        console.log(error);
    });
};







onMounted(() => {

    findUserById({userId:store.getters.isLogIn.id}
    ).then(res=>{
        touxiang.value=res.data.imageUrl;
    }).catch(error=>{
        console.log(error);
    });
    getFile()
    searchCommentById(sessionStorage.getItem('fileId'))


   // cardData.value=commentList.value
})

const getFile = () => {
    const fileId=sessionStorage.getItem('fileId')
    getOneFile({
        fileId:fileId
    }).then(resp=>{
        console.log(resp);
        fileName.value=resp.data.filename,
        fileUrl.value=resp.data.fileUrl,
            type.value=resp.data.typeTag,
            context.value=resp.data.context,
        course.value=resp.data.courseTag,
        year.value=resp.data.yearTag
        timeUp.value=resp.data.createTime
    }).catch(error=>{
        console.log(error);
    })
    ;
}



const download = (url,filename) => {
    url=fileUrl.value
    filename=fileName.value
    fetch(url, { mode: 'no-cors' })
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        }).catch(error=>{
            console.log(error);
    })
    ;
}


const likeClick=()=>{
    likeVisible.value=!likeVisible.value
    createLike({
        userId:JSON.parse(sessionStorage.getItem('login')).id,
        targetType:1,
        targetId:sessionStorage.getItem('fileId')
    }).then(
        res=>{
            if(res.code===1){
                ElMessage({
                    message: "点赞成功",
                    type: 'success',
                    duration: 1500,
                });
            }
        }
    ).catch(error=>{
        console.log(error);
    })
}
const keepClick=()=>{
    keepVisible.value=!keepVisible.value
    createKeep({
        userId:JSON.parse(sessionStorage.getItem('login')).id,
        fileId:sessionStorage.getItem('fileId')
    }).then(
        res=>{
            if(res.code===1){
                ElMessage({
                    message: "收藏成功",
                    type: 'success',
                    duration: 1500,
                });
            }
        }
    ).catch(error=>{
        console.log(error);
    })
}

const quitLikeClick=()=>{
    likeVisible.value=!likeVisible.value
    deleteLike({
        targetType:1,
        targetId:sessionStorage.getItem('fileId')
    }).then(
        res=>{
            if(res.code===1){
                ElMessage({
                    message: "取消点赞成功",
                    type: 'success',
                    duration: 1500,
                });
            }
        }
    ).catch(error=>{
        console.log(error);
    })
}
const quitKeepClick=()=>{
    keepVisible.value=!keepVisible.value
    deleteKeep({
        userId:JSON.parse(sessionStorage.getItem('login')).id,
        fileId:sessionStorage.getItem('fileId')
    }).then(
        res=>{
            if(res.code===1){
                ElMessage({
                    message: "取消收藏成功",
                    type: 'success',
                    duration: 1500,
                });
            }
        }
    ).catch(error=>{
        console.log(error);
    })
}
</script>



<style>
.time {
    font-size: 12px;
    color: #999;
}

.center {
    margin: auto;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
    max-width: 60%;
    display: inline-block;
    text-align: left;
}

.image {

    display: block;
}
</style>

<style>
.hh5{
    font: 20px "微软雅黑";/*设置字体和字体大小*/

    font-weight: 500; /*设置字体粗细*/
    text-align: center; /*设置文字居中*/
    color: #f35626; /*设置文字颜色*/
    -webkit-animation:swing 2s infinite;/*设置动画*/
}
@-webkit-keyframes swing{/*创建动画*/
    20%{
        -webkit-transform:rotate(15deg);
    }40%{
         -webkit-transform:rotate(-15deg);
     }60%{
          -webkit-transform:rotate(5deg);
      }80%{
           -webkit-transform:rotate(-5deg);
       }100%{
            -webkit-transform:rotate(0deg);
        }
}
.background-image {
    background-image: url("../../public/assets/background.png");
    background-size: cover;
    height: 100vh; /* 将容器的高度设置为整个视口的高度，以确保图片填充整个页面 */
}
.background-button {
    background-image: url("../../public/assets/background.png");
    background-size: cover;
    height: 100%; /* 将容器的高度设置为整个视口的高度，以确保图片填充整个页面 */
}
</style>
<style scoped>
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
    border-right: none;
}
.layout-container-demo .el-main {
    padding: 0;
}
.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
.account{
    margin-right: 20px;
}
el-carousel-item img {
    max-width: 100%;
    max-height: 100%;
    min-height: 100%;
    min-width: 100%;
}
div {
    text-align: center;
}

.logo{
    display: flex;
    justify-content: center;
    align-items: center;
    /* 设置文字为蓝色 */
    color: #a350cc;
    margin-top: 30px;
    /* 设置文本水平居中对齐 */
    text-align: center;

    /* 设置字体为黑体 */
    font-family: "黑体", sans-serif;

    /* 设置字体大小为40px */
    font-size: 40px;
}
.a{
    color:#0000FF; /*设置文字颜色*/
    text-decoration: none;
    font-size:1em; /*设置字体大小*/
    font-family:"微软雅黑";/*设置字体*/
    -webkit-animation: shine 2.4s infinite;/*设置动画*/
    margin-left: 28vw;
}
@-webkit-keyframes shine{/*创建动画*/
    0%,100%{ color:#fff;text-shadow:0 0 10px #0000FF,0 0 10px #0000FF; }
    50%{ text-shadow:0 0 10px #0000FF,0 0 40px #0000FF; }
}
.Touxiang{
    margin-left: 28vw;
}

.touxiang{
    width:35px;
    height:35px;
    border-radius:50%;
    margin-top: 15px;

    /*设为圆形*/
}
</style>

<style scoped>
.demonstration {
    color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
