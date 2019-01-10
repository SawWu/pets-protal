// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { Field,CellGroup } from 'vant';
import VueAMap from 'vue-amap';
import router from './router'
import '@babel/polyfill'

Vue.use(Field).use(CellGroup).use(VueAMap);

VueAMap.initAMapApiLoader({
  key: 'b979f0ccd504dfa7aac6bd4bb4c7ee0a',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



