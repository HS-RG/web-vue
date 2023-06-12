import {post, get, post2,post3,post4,post5,post6} from '@/util/service'
import { login as slogin} from '@/api/api'

export const login = data => {
    return post({
        url: '/auth/login',
        headers: {
            'Content-Type': 'application/json',
        },
        data
    })
}
export const adminLogin = data => {
    return post({
        url: '/auth/adminLogin',
        headers: {
            'Content-Type': 'application/json',
        },
        data
    })
}

export const register = data =>{
    return post({
        url: '/auth/register',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export const searchUser = data => {
    return post2({
        url: '/user/listByNickname',
        data,
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }

    })
}
export const findUserById = data => {
return post2({
    url: '/user/selectByUserId',
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
        data,
        headers:{
            'Content-Type': 'application/json',
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
export const deleteOneFile = data => {
    return post2({
        url: '/file/DeleteOneFile',
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
        data:null,
        'Authorization': JSON.parse(sessionStorage.getItem('login')).token
    })
}
export const getcollectfiles = data => {
    return post2({
        url: '/user/listMyCollectionByJwt',
        data:null,
        'Authorization': JSON.parse(sessionStorage.getItem('login')).token
    })
}

export const QueryFileList = data => {
    return post3({
        url: '/file/QueryFileList',
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
export const getAllCommentCount = data => {
    return post5({
        url: '/comment/getAllCommentNum',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
    })
}
export const getAllLikeCount = data => {
    return post5({
        url: '/like/allLikeNum',
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
        url: '/auth/resetPassword',
        data,
        headers:{
        'Content-Type': 'application/json',

            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
    },
    })
}


export const updateUser = data => {
    return post({
        url: '/user/updateOneUser',
        headers:{
            'Content-Type': 'multipart/form-data',

            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        },
        params:{
            ...data,
        }
    })
}

export const IsKeeped = data => {
    return post({
        url: '/user/determineIsCollected',
        data,

        headers:{
            'Content-Type': 'application/json',

            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        },
        params:{
            fileId:sessionStorage.getItem('fileId')
        }
    })

}
export const Isliked = data => {
    return post({
        url: '/like/determineIsLiked',
        data,
        params:{
            targetId:sessionStorage.getItem('fileId'),
            targetType:1
        },
        headers:{
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(sessionStorage.getItem('login')).token
        }
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









