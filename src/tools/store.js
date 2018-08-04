// 导入Vue
import Vue from "vue";
// 导入Vuex
import Vuex from "vuex";

// 使用Vuex
Vue.use(Vuex);

// 判断localStorage中是否有数据
let buyList = JSON.parse(window.localStorage.getItem("buyList")) || {};

// 实例化一个 Vuex的 仓库
const store = new Vuex.Store({
  // 状态
  state: {
    // 数量
    // buyList: {}
    buyList,
    isLogin: false,
    // 来时的路由
    fromPath: "/"
  },
  // 类似于computed的属性
  getters: {
    totalCount(state) {
      let num = 0;
      // 遍历对象
      for (const key in state.buyList) {
        // 累加总数
        num += parseInt(state.buyList[key]);
      }
      return num;
    }
  },
  mutations: {
    // info->{goodId:xx,goodNum:xxx}
    buyGood(state, info) {
      if (state.buyList[info.goodId]) {
        // 解决字符串累加问题
        let oldNum = parseInt(state.buyList[info.goodId]);
        oldNum += parseInt(info.goodNum);
        // 重新赋值
        state.buyList[info.goodId] = oldNum;
      } else {
        // 没有 直接赋值这种方法 vue不会跟踪属性
        // state.buyList[info.goodId]=info.goodNum;
        // 需要使用 Vue.set(obj, 'newProp', 123) 替代
        Vue.set(state.buyList, info.goodId, parseInt(info.goodNum));
      }
    },
    // 直接修改数值的方法
    changeNum(state, info) {
      state.buyList[info.goodId] = info.goodNum;
    },
    // 删除数据
    delGoodById(state, id) {
      // 使用Vue的方法来删除
      Vue.delete(state.buyList, id);
    },
    // 修改登陆状态
    changeLogin(state, login) {
      state.isLogin = login;
    },
    // 保存来时的路由
    saveFromPath(state, fromPath) {
      state.fromPath = fromPath;
    }
  }
});

// 浏览器关闭&刷新时数据常驻
window.onbeforeunload = function() {
    // alert('onbeforeunload');
    // window.localStorage.setItem('onbeforeunload',123);
    window.localStorage.setItem("buyList", JSON.stringify(store.state.buyList));
  };

// 暴露 store
export default store;