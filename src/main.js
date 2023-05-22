import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

// 注册 Element Plus 组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
// 重写console.error函数为空函数
// console.error = () => {};
// // 定义全局错误处理函数
// app.config.errorHandler = (err, vm, info) => {
//     // 在这里处理错误，可以根据需要进行自定义操作
//     // 例如，发送错误报告到服务器或显示自定义错误消息
//     // 阻止错误在浏览器控制台打印
//     console.error('Custom error handling:', err, vm, info);
// };

app.use(store);
app.use(router);
app.use(ElementPlus);

app.mount('#app');
