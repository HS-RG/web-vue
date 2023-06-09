import {post, get, post2,post3,post4,post5} from '@/util/service'


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
            'Authorization': login.token
        }

    })
}
export const findUserById = data => {
return post2({
    url: '/user/selectByUserId',
    data,
    headers:{
        'Content-Type': 'application/json',
        'Authorization': login.token
    }

})
}
export const queryAdminById = data => {
    return post({
        url: '/auth/queryIsAdmin',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': login.token
        }

    })
}
export const updateOneUser = data => {
    return post2({
        url: '/user/updateOneUser',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': login.token
        }

    })
}
export const setUserType = data => {
    return post({
        url: '/auth/setIsAdmin',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': login.token
        }
    })
}
export const uploadFile = data => {
    return post3({
        url: '/file/uploadFile',
        data,
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': login.token
        }
    })
}

export const getOneFile = data => {
    return post3({
        url: '/file/QueryFileByFileId',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': login.token
        }
    })
}
export const DeleteOneFile = data => {
    return post3({
        url: '/file/DeleteOneFile',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': login.token
        }
    })
}
export const DeleteOneUser = data => {
    return post2({
        url: '/deleteOneUser',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': login.token
        }
    })
}

export const getMyDetail = data => {
    return post2({
        url: '/user/getMyDetail',
        data,
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': login.token
        }
    })
}

export const QueryFileList = data => {
    return post3({
        url: '/file/QueryFileList',
        data,
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': login.token
        }
    })
}
export const listAllCommentByParent = data => {
    return post5({
        url: '/comment/listAllCommentByParent',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': login.token
        }
    })
}
export const listCommentByParent = data => {
    return post5({
        url: '/comment/listCommentByParent',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': login.token
        }
    })
}
export const createComment = data => {
    return post5({
        url: '/comment/createComment',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': login.token
        }
    })
}
export const deleteOneComment = data => {
    return post5({
        url: '/comment/deleteComment',
        data,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': login.token
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
