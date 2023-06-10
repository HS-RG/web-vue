import axios from 'axios'
import { ElMessage } from 'element-plus'
const JSONBIGINT = require('json-bigint');
import jsonBig from 'json-bigint'
const service = axios.create({
    baseURL:'/api'
    ,
    headers: {
        "Content-Type": "application/json"
    },
    transformResponse: [
        data => {
            try {
                return jsonBig.parse(data);
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
                return jsonBig.parse(data);
            } catch (err) {
                return data;
            }
        },
    ],
})
const service3 = axios.create({
    baseURL:'/third'
    ,
    headers: {
        "Content-Type": "application/json"
    },
    transformResponse: [
        data => {
            try {
                return jsonBig.parse(data);
            } catch (err) {
                return data;
            }
        },
    ],
})
const service4 = axios.create({
    baseURL:'/fourth'
    ,
    headers: {
        "Content-Type": "application/json"
    },
    transformResponse: [
        data => {
            try {
                return jsonBig.parse(data);
            } catch (err) {
                return data;
            }
        },
    ],
})
const service5 = axios.create({
    baseURL:'/fifth'
    ,
    headers: {
        "Content-Type": "application/json"
    },
    transformResponse: [
        data => {
            try {
                return jsonBig.parse(data);
            } catch (err) {
                return data;
            }
        },
    ],
})
//配置文件上传的代理接口
const service6 = axios.create({
    baseURL:'/upfile'
    ,
    headers: {
        "Content-Type": "application/json"
    },
    transformResponse: [
        data => {
            try {
                return jsonBig.parse(data);
            } catch (err) {
                return data;
            }
        },
    ],
})
//  拦截请求，载入加载动画
service6.interceptors.request.use(config => {
    return config
})
// 对每个响应进行预处理
service6.interceptors.response.use(response => {
    return response.data
})
// post封装
export const post6 = config => {
    return service6({
        ...config,
        data: config.data,
        method: 'POST'
    })
}
//END
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

})
//  拦截请求，载入加载动画
service2.interceptors.request.use(config => {
    return config

})

// 对每个响应进行预处理
service2.interceptors.response.use(response => {
    return response.data
})
//  拦截请求，载入加载动画
service3.interceptors.request.use(config => {
    return config
})

// 对每个响应进行预处理
service3.interceptors.response.use(response => {
    return response.data
})
//  拦截请求，载入加载动画
service4.interceptors.request.use(config => {
    return config
})

// 对每个响应进行预处理
service4.interceptors.response.use(response => {
    return response.data
})
//  拦截请求，载入加载动画
service5.interceptors.request.use(config => {
    return config
})

// 对每个响应进行预处理
service5.interceptors.response.use(response => {
    return response.data
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
export const post3 = config => {
    return service3({
        ...config,
        data: config.data,
        method: 'POST'
    })
}
export const post4 = config => {
    return service4({
        ...config,
        data: config.data,
        method: 'POST'
    })
}
export const post5 = config => {
    return service5({
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
