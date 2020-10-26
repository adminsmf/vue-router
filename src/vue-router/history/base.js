export function createRoute(record, location) {
  let res = [];
  // record形如：
  // {
  //   path: 'about/a',
  //   component: xxx,
  //   parent: xxx
  // }
  if (record) {
    while (record) {
      res.unshift(record);
      record = record.parent;
    }
  }
  return {
    ...location,
    matched: res,
  };
}
export default class History {
  constructor(router) {
    // router = new VueRouter()
    this.router = router;

    // 默认路由中应该保存一个当前的路径
    // {
    //   path: 'about/a',
    //   matched: ['about', 'about/a']
    // }
    this.current = createRoute(null, {
      path: "/",
    });
  }
  // 跳转逻辑， location跳转路径， onComplete成功回调
  transitionTo(location, onComplete) {
    // 期待返回
    // /about/a => {path: '/about/a', matched: ['about', 'about/a']}
    // route就是当前路径要匹配哪些路由
    let route = this.router.match(location);
    console.log(route);
    // 将新的route属性 覆盖掉current
    if (
      // 如果是相同路径，不进行处理
      this.current.path === location &&
      route.matched.length === this.current.matched.length
    ) {
      return;
    }
    this.updateRoute(route);
    onComplete && onComplete();
  }
  updateRoute(route) {
    this.current = route;
    this.cb && this.cb(route); // 路径变化会将最新路径传递给listen
  }
  listen(cb) {
    this.cb = cb;
  }
}
