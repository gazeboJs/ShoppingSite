import Vue from "vue"; //导入第三方包


//导入根组件
import AppComponent from "./component/App.vue";

new Vue({
	el:"#app",
	render:c=>c(AppComponent)
})
