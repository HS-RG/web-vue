import axios from 'axios'
import { ElMessage } from 'element-plus'


const service = axios.create({
    baseURL:'/api'
    ,
    headers: {
        "Content-Type": "application/json"
    }

})


//  拦截请求，载入加载动画
service.interceptors.request.use(config => {
    return config
})


// 对每个响应进行预处理
service.interceptors.response.use(response => {
    // loadingObj.close()
    const data = response.data
    if(!data.success && data.message !== 'success' && data.message !== '成功') {
        ElMessage({
            message: "出错啦！！！",
            type: 'error',
            duration: 1500,
        })
    }
    return data
})

// post封装
export const post = config => {
    return service({
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