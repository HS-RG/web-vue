import {post, get, post2,post3,post4,post5,post6} from '@/util/service'
import { login as slogin} from '@/api/api'

export const login = data => {
    return post({
        url: '/user/login',
        headers: {
            'Content-Type': 'application/json',
        },
        data
    })
}
export const adminLogin = data => {
    return post({
        url: '/user/adminLogin',
        headers: {
            'Content-Type': 'application/json',
        },
        data
    })
}

export const register = data =>{
    return post({
        url: '/user/register',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export const searchUser = data => {
    return post({
        url: '/user/findAllUser',
        data,
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }

    })
}
export const findByName = data => {
    return post({
        url: '/user/findByName',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }

    })
}
export const findUserById = data => {
return post({
    url: '/user/findUserById',
    data,
    headers:{
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(sessionStorage.getItem('login')).token
    }

})
}
export const createKeep = data => {
    return post2({
        url: '/user/createCollection',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }

    })
}
export const deleteKeep = data => {
    return post2({
        url: '/user/deleteCollection',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }

    })
}

export const queryAdminById = data => {
    return post({
        url: '/auth/queryIsAdmin',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }

    })
}
export const updateOneUser = data => {
    return post2({
        url: '/user/updateOneUser',
        data:data.data,
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }

    })
}
export const setUserType = data => {
    return post({
        url: '/auth/setIsAdmin',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}
export const uploadFile = (data,header) => {
    console.log('uploadFile',data)
    return post({
        url: '/file/uploadFile',
        data,
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': header.Authorization
        }

    })
}
//上传图片
export const uploadImg = data => {
    return post3({
        url: '/file/uploadImage',
        data:data.data,
        headers:data.header
    })
}
export const getOneFile = data => {
    return post3({
        url: '/file/QueryFileByFileId',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}
export const DeleteOneFile = data => {
    return post3({
        url: '/file/DeleteOneFile',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}
export const DeleteOneUser = data => {
    return post2({
        url: '/deleteOneUser',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}

export const getMyDetail = data => {
    console.log(data,'ssssssss')
    return post2({
        url: '/user/getMyDetail',
        data:null,
        headers:data.header
    })
}

export const getMyfiles = data => {
    return post3({
        url: '/file/GetMyFiles',
        data,
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}
export const getcollectfiles = data => {
    return post2({
        url: '/user/listMyCollectionByJwt',
        data,
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }


    })
}

export const QueryGradeList = data => {
    return post({
        url: '/grade/QueryGradeList',
        data,
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}

export const QueryUserList = data => {
    return post({
        url: '/user/QueryUserList',
        data,
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}
export const listAllCommentByParent = data => {
    return post5({
        url: '/comment/listAllCommentByParent',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}
export const listCommentByParent = data => {
    return post5({
        url: '/comment/listCommentByParent',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}

export const countLikeByTarget = data => {
    return post4({
        url: '/like/countLikeByTarget',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}
export const createLike = data => {
    return post4({
        url: 'like/createLike',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}

export const deleteLike = data => {
    return post4({
        url: 'like/deleteSelfLike',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}
export const createComment = data => {
    return post5({
        url: '/comment/createComment',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}
export const deleteOneComment = data => {
    return post5({
        url: '/comment/deleteComment',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}

export const removeUser = data => {
    return post({
        url: '/loginIn',
        data
    })
}

export const changePassword = data => {
    return post({
        url: '/loginIn',
        data
    })
}

export const searchIll = data => {
    return post({
        url: '/loginIn',
        data
    })
}

export const updateUser = data => {
    return post({
        url: '/loginIn',
        data
    })
}

export const addIll = data => {
    return post({
        url: '/loginIn',
        data
    })
}

export const removeIll = data => {
    return post({
        url: '/loginIn',
        data
    })
}

export const updateIll = data => {
    return post({
        url: '/loginIn',
        data
    })
}

export const getFileIds = data => {
    return post({
        url: '/loginIn',
        data
    })
}

export const fetchFile = data => {
    return post({
        url: '/loginIn',
        data
    })
}




export const searchPaper = data =>{
    return post({
        url: '/loginIn',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export const addPaper = data => {
    return post({
        url: '/loginIn',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const removePaper = data => {
    return post({
        url: '/loginIn',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export const updatePaper = data => {
    return post({
        url: '/loginIn',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const deleteFile = data => {
    return post({
        url: '/loginIn',
        data
    })
}

export const searchQuestion = data => {
    return post({
        url: '/loginIn',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const addQuestion = data => {
    return post({
        url: '/loginIn',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const updateQuestion = data => {
    return post({
        url: '/loginIn',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const removeQuestion = data => {
    return post({
        url: '/loginIn',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
