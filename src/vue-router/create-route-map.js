export default function createRouteMap(routes, oldPathList, oldPathMap) {
  // 扁平化路由对象，创建路由映射表
  let pathList = oldPathList || [];
  let pathMap = oldPathMap || Object.create(null);
  routes.forEach((route) => {
    addRouteRecord(route, pathList, pathMap);
  });
  console.log(pathList, pathMap);
  return {
    pathList,
    pathMap,
  };
}

function addRouteRecord(route, pathList, pathMap, parent) {
  let path = parent ? `${parent.path}/${route.path}` : route.path;
  let record = {
    path,
    component: route.component,
    parent: parent,
  };
  if (!pathMap[path]) {
    pathList.push(path); // 将路径添加到pathList
    pathMap[path] = record;
  }
  if (route.children) {
    route.children.forEach((child) => {
      addRouteRecord(child, pathList, pathMap, record); // 每次循环儿子时，将父路径传入
    });
  }
}
