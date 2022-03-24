import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { registerApplication, start } from 'single-spa';

// 动态创建script，不会产生跨域问题
async function loadScript(url){
  return new Promise((resolve, reject)=>{
    let script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  })
}

registerApplication(
  'myVueApp', // 子应用名字随便取
  async () => {                 // 第二个参数必须为Promise函数
    console.log('加载子模块');
    // systemJs：在浏览器中用ES6模块
    // 这种引入方式的本质，动态创建script标签，把脚本引入
    await loadScript(`http://localhost:10000/js/chunk-vendors.js`);   // 先加载公共的
    await loadScript(`http://localhost:10000/js/app.js`);   // 在加载app
    return window.singleVue;
  },
  location => location.pathname.startsWith('/vue')      // 触发时机，用户切换到/vue的路径下，我需要加载刚才的定义子应用
)

start();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
