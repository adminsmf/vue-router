// 安装插件,插件依赖vue

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
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    },
  });
}
