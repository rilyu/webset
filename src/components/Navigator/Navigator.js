// Navigator.js

import React from 'react';

export default class Navigator {

  //routes: 路由定义数组，必填
  //defaultOpenUris: 默认打开键数组
  //options:
  //  navType: 导航类型， global 或 local ，默认为 global
  constructor(routes, defaultOpenUris, options) {
    this.routes = routes;
    this.defaultOpenUris = defaultOpenUris || [];
    this.options = {
      navType: 'global',
      ...options,
    };
    this.eventHandlerSet = {};
    this.state = {
      activePath: (this.defaultOpenUris[0] || '').split('?')[0],
      pageSet: this.initPageSet(),
    };
    this.installListener();
  }

  // 管理函数

  register(event, handler) {
    if (!this.eventHandlerSet[event]) this.eventHandlerSet[event] = [];
   this.eventHandlerSet[event].push(handler);
    return {unregister: () => this.unregister(event, handler)};
  }

  unregister(event, handler) {
    this.eventHandlerSet[event] = (this.eventHandlerSet[event] && this.eventHandlerSet[event].filter(item => item !== handler));
  }

  emit(event, data) {
    this.eventHandlerSet[event] && this.eventHandlerSet[event].map(handler => handler(data));
  }

  getPath(ref) {
    let {pageSet} = this.state;
    for (let key in pageSet) {
      if (pageSet[key].ref === ref) return key;
    }
    return null;
  }

  changeParams(path, params) {
    let page = this.state.pageSet[path];
    if (!page) return;
    Object.assign(page.params, params);
    this.setState({});
  }

  // *** 导航函数

  switchTo(path) {
    let page = this.state.pageSet[path];
    this.setState({activePath: page ? path : null});
  }

  routeTo(uri) {
    return this.open(uri);
  }

  redirectTo(uri, oldUri = undefined) {
    let [path, queryString] = (uri || '').split('?');
    let oldPath = oldUri && oldUri.split('?')[0];
    let {activePath, pageSet} = this.state;
    let newPageSet = {};
    if (oldPath === undefined) oldPath = activePath;
    for (let key in pageSet) {
      if (key === oldPath) {
        let page = this.genPage(path, queryString);
        if (page === false) return null;
        if (!page) {
          console.error('页面路由不存在：' + path);
          return null;
        }
        this.emit('pageClose', pageSet[oldPath]);
        newPageSet[path] = page;
      } else if (key === path) {
        continue;
      } else {
        newPageSet[key] = pageSet[key];
      }      
    }
    this.setState({activePath: path, pageSet: newPageSet});
    return newPageSet[path];
  }

  open(uri) {
    let [path, queryString] = (uri || '').split('?');
    let {activePath, pageSet} = this.state;
    let page = pageSet[path];
    if (page) {
      page.uri = uri;
      Object.assign(page.params, this.getQueryParams(queryString));
    } else {
      page = this.genPage(path, queryString);
      if (page === false) return null;
      if (!page) {
        console.error('页面路由不存在：' + path);
        return null;
      }
      if (activePath && pageSet[activePath]) {
        let array = Object.keys(pageSet).map(key => ({key, value: pageSet[key]}));
        pageSet = {};
        for (let item of array) {
          pageSet[item.key] = item.value;
          if (item.key === activePath) pageSet[path] = page;
        }
      } else {
        pageSet[path] = page;
      }
    }
    this.setState({activePath: path, pageSet});
    return page;
  }

  async close(uri) {
    let path = uri && uri.split('?')[0];
    let {activePath, pageSet} = this.state;
    if (!pageSet[path]) return;
    if (!await this.canClose(pageSet[path])) return;
    if (path === activePath) {
      let keys = Object.keys(pageSet)
      let index = keys.indexOf(activePath);
      if (index - 1 >= 0) activePath = keys[index - 1];
      else if (index + 1 < keys.length) activePath = keys[index + 1];
      else activePath = null;
    }
    this.emit('pageClose', pageSet[path]);
    delete pageSet[path];
    this.setState({activePath, pageSet});
  }

  closeCurrent() {
    this.close(this.state.activePath);
  }

  async closeAll() {
    for (let key of Object.keys(this.state.pageSet)) {
      await this.close(key);
    }
  }

  async closeOthers(uri) {
    let path = uri && uri.split('?')[0];
    for (let key of Object.keys(this.state.pageSet)) {
      if (key !== path) await this.close(key);
    }
  }

  async closeLeft(uri) {
    let path = uri && uri.split('?')[0];
    for (let key of Object.keys(this.state.pageSet)) {
      if (key === path) break;
      await this.close(key);
    }
  }

  async closeRight(uri) {
    let path = uri && uri.split('?')[0];
    let startFlag = false;
    for (let key of Object.keys(this.state.pageSet)) {
      if (startFlag) await this.close(key);
      if (key === path) startFlag = true;
    }
  }

  // *** 私有函数

  installListener() {
    if (this.options.navType !== 'global') return;
    this.hashChangeHandler = e => {
      let uri = window.location.hash ? window.location.hash.substr(1) : '/';
      let path = uri.split('?')[0];
      if (path !== this.state.activePath) this.open(uri);
    };
    window.addEventListener('hashchange', this.hashChangeHandler);
  }

  uninstallListener() {
    if (this.options.navType !== 'global') return;
    window.removeEventListener('hashchange', this.hashChangeHandler);
  }

  setState(newState) {
    let {activePath} = this.state;
    if ('activePath' in newState && activePath !== newState.activePath && this.state.pageSet[activePath]) {
      this.emit('pageHide', this.state.pageSet[activePath]);
    }
    Object.assign(this.state, newState);
    this.emit('navigatorStateChange', this.state);
    if (activePath !== this.state.activePath) {
      let page = this.state.pageSet[this.state.activePath];
      if (page) {
        this.emit('pageShow', page);
        if (this.options.navType === 'global') window.location.hash = page.uri;
      }
    }
  }

  initPageSet() {
    let pageSet = {};
    for (let uri of this.defaultOpenUris) {
      let [path, queryString] = uri.split('?');
      let page = this.genPage(path, queryString);
      if (page) pageSet[path] = page;
    }
    return pageSet;
  }

  genPage(path, queryString) {
    let {route, pathParams} = this.matchRoute(path) || {};
    if (!route) return null;
    let {Page, params, options, onRoute} = route;
    let queryParams = this.getQueryParams(queryString);
    if (onRoute) {
      onRoute({...params, ...pathParams, ...queryParams});
      return false;
    }
    let navigator = this;
    let page = {
      uri: path + (queryString ? '?' + queryString : ''),
      Page,
      params: {...Page.defaultProps, ...params, ...pathParams, ...queryParams},
      options: {...options},
      render: function() {
        return (
          <this.Page
            {...this.params}
            key={this.uri}
            ref={v => v && this.ref !== v && (this.ref = v) && navigator.emit('pageMount', this)}
            />
        );
      },
    };
    this.emit('pageCreate', page);
    return page;
  }

  matchRoute(path) {
    let pathParams = {};
    let pathItems = path.split('/');

    let match = route => {
      let routeItems = route.path.split('/');
      if (routeItems.length !== pathItems.length) return false;
      pathParams = {};
      for (let i = 0; i < pathItems.length; i++) {
        let pathItem = pathItems[i], routeItem = routeItems[i];
        if (routeItem && routeItem[0] === '{' && routeItem[routeItem.length - 1] === '}') {
          pathParams[routeItem.substr(1, routeItem.length - 2)] = pathItem;
        } else if (pathItem !== routeItem) {
          return false;
        }
      }
      return true;
    };

    for (let route of this.routes) {
      if (match(route)) return {route, pathParams};
    }

    return null;
  }

  async canClose(page) {
    if (page.options.noClose) return false;
    if (page.ref && page.ref.closeQuery) return await page.ref.closeQuery();
    return true;
  }

  getQueryParams(queryString) {
    let result = {};
    for (let item of (queryString || '').split('&')) {
      let kv = item.split('=');
      result[kv[0]] = kv[1] && decodeURIComponent(kv[1]);
    }
    return result;
  }

}
