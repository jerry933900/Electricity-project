import Vue from "vue";
import App from "./App.vue";
// 引入自己封装的router
import router from './tools/router';
// 引入第三方包
import './tools/libs';
// 引入Vuex相关
import store from './tools/store';

// 引入自己的静态页面的样式
import "./assets/statics/site/css/style.css";

Vue.config.productionTip = false;

new Vue({
  // 选择器
  el: "#app",
  // 挂载到vue
  router,
  // 渲染 App组件
  render: h => h(App),
  // 挂载仓库
  store,
  // 生命周期函数
  beforeCreate() {
    // console.log('app-beforeCreate');
    this.axios
      .get("/site/account/islogin")
      .then(response => {
        // console.log(response);
        // if(response.data.code=='logined')
        store.state.isLogin = response.data.code == "logined";
      })
      .catch(err => {
        // console.log(err);
      });
  },
  created() {
    // console.log('app-created');
  }
});


