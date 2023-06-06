import axios from 'axios'
import { ElMessage } from 'element-plus'
const JSONBIGINT = require('json-bigint');

const service = axios.create({
    baseURL:'/api'
    ,
    headers: {
        "Content-Type": "application/json"
    },
    transformResponse: [
        data => {
            try {
                return JSONBIGINT.parse(data);
            } catch (err) {
                return data;
            }
        },
    ],
})

const service2 = axios.create({
    baseURL:'/second'
    ,
    headers: {
        "Content-Type": "application/json"
    },
    transformResponse: [
        data => {
            try {
                return JSONBIGINT.parse(data);
            } catch (err) {
                return data;
            }
        },
    ],
})


//  拦截请求，载入加载动画
service.interceptors.request.use(config => {
     return config
    // ,
    // error => {
    //     // 请求错误处理
    //     //console.log('Request Error:', error);
    //     //return Promise.reject(error);
    //      }
})


// 对每个响应进行预处理
service.interceptors.response.use(response => {
    // loadingObj.close()
    return response.data
        // ,
        // error => {
        //     // 响应错误处理
        //     if (error.response) {
        //         // 请求已发送，服务器返回错误状态码
        //         console.log('Response Error:', error.response.status);
        //         console.log('Response Error Data:', error.response.data);
        //     } else if (error.request) {
        //         // 请求已发送，但没有收到响应
        //         console.log('No Response:', error.request);
        //     } else {
        //         // 其他错误
        //         console.log('Error:', error.message);
        //     }
        //     return Promise.reject(error);
        // }
})
//  拦截请求，载入加载动画
service2.interceptors.request.use(config => {
    return config
    // ,
    // error => {
    //     // 请求错误处理
    //     //console.log('Request Error:', error);
    //     //return Promise.reject(error);
    //      }
})


// 对每个响应进行预处理
service2.interceptors.response.use(response => {
    // loadingObj.close()
    return response.data
    // ,
    // error => {
    //     // 响应错误处理
    //     if (error.response) {
    //         // 请求已发送，服务器返回错误状态码
    //         console.log('Response Error:', error.response.status);
    //         console.log('Response Error Data:', error.response.data);
    //     } else if (error.request) {
    //         // 请求已发送，但没有收到响应
    //         console.log('No Response:', error.request);
    //     } else {
    //         // 其他错误
    //         console.log('Error:', error.message);
    //     }
    //     return Promise.reject(error);
    // }
})
// post封装
export const post = config => {
    return service({
        ...config,
        data: config.data,
        method: 'POST'
    })
}

export const post2 = config => {
    return service2({
        ...config,
        data: config.data,
        method: 'POST'
    })
}

// get封装
export const get = config => {
    return service({
        ...config,
        params: config.data,
        method: 'GET'
    })
}