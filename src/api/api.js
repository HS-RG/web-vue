import { post, get } from '@/util/service'


export const login = data => {
    return post({
        url: '/loginIn',
        headers: {
            'Content-Type': 'application/json',
        },
        data
    })
}


export const register = data =>{
    return get({
        url: '/register',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

