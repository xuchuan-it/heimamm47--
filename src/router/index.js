//导入Vue
import Vue from 'vue'

// 导入路由 vue-router
import VueRouter from 'vue-router'

//注册 vue-router
Vue.use(VueRouter)

//准备组建
import login from '../views/login/index.vue'
//设置路由规则
const routes = [
    {
        path:"/login",
        component:login
    }
]

// 创建实例化
const router = new VueRouter({
//这里就是路由的配制项
routes
})

// 输出 出去router
export default router