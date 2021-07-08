// AppContext.js

import React from 'react';

const AppContext = React.createContext({
  app: null, // application 对象，尽量避免使用以防止过度依赖, 原有工程引用的 login, setting 的代码已封装到 http 内，无需在调用处引用
  navigator: null, // 至少提供 routeTo, switchTo 两个函数
  http: null, // 至少提供 postJson, postJsonCache, clearAllCache, loadEnumData 四个函数
});

export default AppContext;

