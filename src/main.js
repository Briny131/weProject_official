import Vue from 'vue'
import App from './App'
import store from '../store/index'
import fetch from './fetch/index'
import '../static/weui.css'
// import toast from "./components/dist/base/index"
import './utils/ceshi'
import ceshi from './utils/ceshi'

const { $Toast } = require('./components/dist/base/index');
var Fly=require("flyio/dist/npm/wx")
var fly=new Fly
Vue.prototype.$store=store;
Vue.prototype.$ceshi=ceshi;
Vue.prototype.$toast=$Toast
Vue.prototype.$fetch=fetch
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
