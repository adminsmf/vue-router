// 安装插件,插件依赖vue
import RouterView from "./components/view";
export let _Vue;
export default function install(Vue) {
  // Vue就是vue的构造函数
  _Vue = Vue;

  // mixin混入主要做的事情是为所有组件增加_routerRoot根属性
  Vue.mixin({
    beforeCreate() {
      console.log(this.$options.name);
      if (this.$options.router) {
        // 跟实例
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, "_route", this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    },
  });
  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._routerRoot._route;
    },
  });
  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot._router;
    },
  });
  Vue.component("RouterView", RouterView);
}
