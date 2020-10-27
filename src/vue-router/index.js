import install from "./install";
import createMatcher from "./create-matcher";
import HashHistory from "./history/hash";

export default class VueRouter {
  constructor(options) {
    // 根据不同路径跳转不同组件
    // 将用户传递的routers转化成好维护的结构
    // match 负责匹配路径 {'/': 'xxx', 'about': 'xxx'}
    // addRouters 动态的添加路由配置
    this.matcher = createMatcher(options.routes || []);

    this.mode = options.mode || "hash";

    this.history = new HashHistory(this);
  }
  init(app) {
    // app指的是根实例
    const history = this.history;

    const setupListeners = () => {
      history.setupListeners();
    };

    history.transitionTo(history.getCurrentLocation(), setupListeners);

    history.listen((route) => {
      app._route = route;
    });
  }
  // 用来匹配路径
  match(location) {
    return this.matcher.match(location);
  }
}

VueRouter.install = install;
