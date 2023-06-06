import {post, get, post2} from '@/util/service'


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

export const uploadFile = data => {
    return post({
        url: '/loginIn',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
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
