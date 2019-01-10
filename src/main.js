// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { Field } from 'vant';
import router from './router'
import '@babel/polyfill'

Vue.use(Field)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



