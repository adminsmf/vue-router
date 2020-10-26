import createRouteMap from "./create-route-map";
import { createRoute } from "./history/base";

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
  // 需要找到对应的记录,并且根据记录产生一个匹配数组
  // 比如‘/about/a’,不但需要找到‘/about/a’的记录，也需要找到‘/about’的记录
  function match(location) {
    let record = pathMap[location];
    let local = {
      path: location,
    };
    if (record) {
      return createRoute(record, local);
    }
    return createRoute(null, local);
  }
  return {
    match,
    addRoutes,
  };
}
