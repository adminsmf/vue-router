import createRouteMap from "./create-route-map";

export default function createMatcher(routes) {
  // routes 用户当前传入的路由配置对象
  // 扁平化路由对象，创建路由映射表
  // pathList  ['/', 'about']
  // pathMap  {'/': 'xxx', 'about': 'xxx'}
  let { pathList, pathMap } = createRouteMap(routes); // 初始化配置

  // 动态的添加路由配置
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap); // 添加新的配置
  }

  // 负责匹配路径
  function match() {}
  return {
    match,
    addRoutes,
  };
}
