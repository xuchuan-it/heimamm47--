import axios from 'axios'
let bRequest = axios.create({

    baseURL:process.env.VUE_APP_URL,
    withCredentials:true,
})

import { getToken } from '@/utilis/token.js'

bRequest.interceptors.request.use( function(config){

    config.headers.token = getToken();

    return config;

},function(error){

    return Promise.reject(error);
} )

// 封装对应的接口请求就可以了
export function businessList(params){

    return bRequest({
        url:"/enterprise/list",
        method:"get",
        params
    })
}

// 封装企业添加
export function businessAdd(data){

    return bRequest({
        url:"/enterprise/add",
        method:"post",
        data
    })
}


// 封装企业修改状态
export function businessStatus(data){

    return bRequest({
        url:"/enterprise/status",
        method:"post",
        data
    })
}
// 封装企业删除状态
export function businessRemove(data){

    return bRequest({
        url:"/enterprise/remove",
        method:"post",
        data
    })
}
// 封装企业编辑状态
export function businessEdit(data){

    return bRequest({
        url:"/enterprise/edit",
        method:"post",
        data
    })
}

