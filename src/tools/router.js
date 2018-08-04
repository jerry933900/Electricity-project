// Vue.use
import Vue from "vue";
// 引入路由模块
import VueRouter from "vue-router";
// 引入自己写的组件组件
import index from "../components/index.vue";
import goodsInfo from "../components/goodsInfo.vue";
import buyCar from "../components/buyCar.vue";
import payOrder from "../components/payOrder.vue";
import login from "../components/login.vue";
import orderInfo from "../components/orderInfo.vue";
import paySuccess from "../components/paySuccess.vue";
import personalCenter from "../components/PersonalCenter.vue";
import orderCenter from "../components/orderCenter.vue";
import lookOrder from "../components/lookOrder.vue";

// 引入仓储模块
import store from './store'

// 导入 axios模块 目的是让所有组件都可以使用
import axios from "axios";
// 正常的服务器
axios.defaults.baseURL = "http://47.106.148.205:8899";
//让ajax携带cookie
axios.defaults.withCredentials = true;
// 崩溃后的备用服务器
// axios.defaults.baseURL = 'http://127.0.0.1:8848';
// 挂载到Vue的原型上->Vue实例化出来的对象 共用 vue-resource this.$http
Vue.prototype.axios = axios;

// 使用路由中间件 $route
Vue.use(VueRouter);

// 路由规则
// 注册路由规则
const router = new VueRouter({
    routes: [
      // 访问的是 / 打到(重定向)
      {
        path: "/",
        redirect: "/index"
      },
      // index 都显示 index这个组件
      {
        path: "/index",
        component: index
      },
      {
        // goodsInfo/:id 参数
        // form表单中的 name属性
        path: "/goodsInfo/:id",
        component: goodsInfo
      },
      {
        path: "/buyCar",
        component: buyCar
      },
      // 订单支付路由
      // 动态路由匹配
      {
        path: "/payOrder/:ids",
        component: payOrder,
        // 路由元信息
        meta: { checkLogin: true }
      },
      // 登陆路由
      {
        path: "/login",
        component: login,
      },
      // 订单详情路由
      {
        path: "/orderInfo/:orderid",
        component: orderInfo,
        // 路由元数据
        meta: { checkLogin: true }
      },
      // 注册成功页
      {
        path: "/paySuccess",
        component: paySuccess,
        // 路由元数据
        meta: { checkLogin: true }
      },
      // 个人中心
      {
        path: "/personalCenter",
        component: personalCenter,
        // 路由元数据
        meta: { checkLogin: true }
      },
      // 订单中心
      {
        path: "/orderCenter",
        component: orderCenter,
        // 路由元数据
        meta: { checkLogin: true }
      },
      // 订单详情
      {
        path: "/lookOrder/:orderId",
        component: lookOrder,
        // 路由元数据
        meta: { checkLogin: true }
      },
    ]
  });

// 路由守卫
// beforeEach 可以当做一个回调函数 不是立刻触发 所以这里顺序不调整是可以的
router.beforeEach((to, from, next) => {
    // 保存来时的路由
    store.commit("saveFromPath", from.path);
    console.log(to);
  
    // from 从哪来 to 去哪里 next()下一个
    // if (to.path == "/payOrder/") {
    // 路由源信息进行判断
    if(to.meta.checkLogin){
      // 判断
     axios
        .get("/site/account/islogin")
        .then(response => {
          // // console.log(response);
          if (response.data.code == "nologin") {
            // 去登录页
            // // console.log('登录页')
            next("/login");
          } else {
            next();
          }
        })
        .catch(err => {});
    } else {
      next();
    }
  });

// 暴露出去 common.js中的暴露语法
// module.exports
// 可以使用ES6的标准语法进行暴露
export default router;