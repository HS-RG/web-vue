<template>
    <el-upload
        ref="uploadRef"
        class="upload-demo"
        action="#"
        :auto-upload="false"
        :http-request="uploadFileWrapper"
    >
        <template #trigger>
            <el-button type="primary">select file</el-button>
        </template>

        <el-button class="ml-3" type="success" @click="submitUpload">
            upload to server
        </el-button>

        <template #tip>
            <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </el-upload>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {findUserById, getMyDetail, login, uploadFile} from '@/api/api'
import store from "@/store";

const uploadRef = ref(null)

const submitUpload = () => {
    uploadRef.value.submit()
}

const uploadFileWrapper = (file) => {
    const formData = new FormData()
    formData.append('file', file.file)
    formData.append('userId', JSON.parse(sessionStorage.getItem('login')).id )
    formData.append('title', '2022六级')
    formData.append('context', '2022六级真题试卷')
    formData.append('yearTag', 2022)
    formData.append('courseTag', '英语')
    formData.append('typeTag', '试卷')

    uploadFile(formData)
}
onMounted(() => {
    getMyDetail({
        header:{
            Authorization: login.token
        }
    }).then(res=>{

    })
})

</script>
