import Vue from 'vue';
import App from './App.vue';
import router from './router';
import singleSpaVue from 'single-spa-vue';
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

Vue.config.productionTip = false;


const appOptions = {
  el: '#vue',             // 挂在父应用中的id为vue的标签中
  store,
  router,
  render: h => h(App)
}

const vueLifeCycle = singleSpaVue({
  Vue,
  appOptions
})

// 如果是父应用引用我（当前子应用）
if(window.singleSpaNavigate){
  // 设定这个是为了在当前子应用请求静态资源时，按照当前应用的域名和端口号，而不是被父应用带着跑
  __webpack_public_path__ = 'http://localhost:10000/'         
}

// 如果想独立运行
if(!window.singleSpaNavigate){
  delete appOptions.el;
  new Vue(appOptions).$mount('#app')
}

// 接入协议，我订好了协议，父应用来调用这些方法
export const bootstrap = vueLifeCycle.bootstrap;
export const mount = vueLifeCycle.mount;
export const unmount = vueLifeCycle.unmount;

// 我们需要父应用加载子应用，将子应用打包成一个个的lib去给父应用使用

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
