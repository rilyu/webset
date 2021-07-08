// Http.js

export default class Http {

  static lastSerial = 0;
  static get serial() {
    let serial = ++this.lastSerial;
    serial &= 0xFFFF;
    return (`000${serial.toString(16)}`).substr(-4);
  }

  constructor(props) {
    let {baseUrl, debugMode, debugDisableSet} = props || {};
    this.baseUrl = baseUrl || '';
    this.debugMode = !!debugMode;
    this.debugDisableSet = {...debugDisableSet};
    this.cacheDataSet = {};
    this.cacheLoadingSet = {};
  }

  resolveUrl(url) {
    let {baseUrl} = this;
    if (!url || /^(\w*:)?\/\//.test(url) || !baseUrl) return url;
    if (url.substr(0, 1) === '/' && baseUrl.substr(-1) === '/') return baseUrl + url.substr(1);
    return baseUrl + url;
  }  

  // 使用 encoders decoders 的目的是解决日志打印顺序问题

  // Base

  async get({url, params, options}) {
    options = {method: 'GET', body: params, ...options};
    let encoders = [this.baseEncode.bind(this)];
    let decoders = [this.baseDecode.bind(this)];
    return this.request({url, options, encoders, decoders});
  }

  async post({url, params, options}) {
    options = {method: 'POST', body: params, ...options};
    let encoders = [this.baseEncode.bind(this)];
    let decoders = [this.baseDecode.bind(this)];
    return this.request({url, options, encoders, decoders});
  }

  // Text

  async getText({url, params, options}) {
    options = {method: 'GET', body: params, ...options};
    let encoders = [this.baseEncode.bind(this)]; // get 没有 body, 不需要其它 encoder
    let decoders = [this.baseDecode.bind(this), this.textDecode.bind(this)];
    return this.request({url, options, encoders, decoders});
  }

  async postText({url, params, options}) {
    options = {method: 'POST', body: params, ...options};
    let encoders = [this.baseEncode.bind(this), this.textEncode.bind(this)];
    let decoders = [this.baseDecode.bind(this), this.textDecode.bind(this)];
    return this.request({url, options, encoders, decoders});
  }

  // Json

  async getJson({url, params, options}) {
    options = {method: 'GET', body: params, ...options};
    let encoders = [this.baseEncode.bind(this)];
    let decoders = [this.baseDecode.bind(this), this.textDecode.bind(this), this.jsonDecode.bind(this)];
    return this.request({url, options, encoders, decoders});
  }

  async postJson({url, params, options}) {
    options = {method: 'POST', body: params, ...options};
    let encoders = [this.baseEncode.bind(this), this.jsonEndode.bind(this), this.textEncode.bind(this)];
    let decoders = [this.baseDecode.bind(this), this.textDecode.bind(this), this.jsonDecode.bind(this)];
    return this.request({url, options, encoders, decoders});
  }

  // FormData

  async postFormData({url, params, options}) {
    options = {method: 'POST', body: params, ...options};
    let encoders = [this.baseEncode.bind(this), this.formDataEncode.bind(this)];
    let decoders = [this.baseDecode.bind(this), this.textDecode.bind(this), this.jsonDecode.bind(this)];
    return this.request({url, options, encoders, decoders});
  }

  async postUpload({url, params, options}) {
    options = {method: 'POST', body: params, ...options};
    let encoders = [this.baseEncode.bind(this), this.uploadEncode.bind(this)];
    let decoders = [this.baseDecode.bind(this), this.textDecode.bind(this), this.jsonDecode.bind(this), this.uploadDecode.bind(this)];
    return this.request({url, options, encoders, decoders});
  }

  // Cache

  async callCache(func, {url, params, options, ...others}) {
    let sleep = async (milliseconds) => {
      return new Promise((resolve, reject) => setTimeout(() => resolve(), milliseconds));
    };

    let cacheKey = url + JSON.stringify(params);
    while (this.cacheLoadingSet[cacheKey]) await sleep(1);
    let cacheData = this.cacheDataSet[cacheKey];
    if (cacheData) {
      let serial = this.constructor.serial;
      this.debug(serial, 'callCache', `POST: ${url}`);
      this.debug(serial, 'callCache', params);
      this.debug(serial, 'callCache', 'cache hit ==>', cacheData);
      return {success: true, data: cacheData};
    }
    this.cacheLoadingSet[cacheKey] = true;
    let result = await func({url, params, options, ...others});
    this.cacheLoadingSet[cacheKey] = false;
    if (this.isSuccess(result)) {
      this.cacheDataSet[cacheKey] = result.data;
    }
    return result;
  }

  clearCache(url, params) {
    let cacheKey = url + JSON.stringify(params);
    delete this.cacheDataSet[cacheKey];
  }

  clearAllCache() {
    this.cacheDataSet = {};
  }

  async getJsonCache(args) {
    return this.callCache(this.getJson.bind(this), args);
  }

  async postJsonCache(args) {
    return this.callCache(this.postJson.bind(this), args);
  }

  // 判断是否成功

  isSuccess(result) {
    return result && result.success;
  }

  // ================================================================
  // 内部方法
  // ================================================================

  // 某些情况下只取得匿名函数，比如使用了 async/await ，放弃使用
  getCallerName() {
    let reg = /([^(]+)@|at ([^(]+) \(/g;
    let error = new Error();
    reg.exec(error.stack);
    reg.exec(error.stack);
    let regResult = reg.exec(error.stack);
    let callerName = regResult[1] || regResult[2];
    return callerName && callerName.split('.')[1];
  }

  debug(serial, callerName, ...args) {
    if (this.debugMode && !this.debugDisableSet[callerName]) console.log(serial, callerName, ...args);
  }

  error(serial, callerName, ...args) {
    console.error(serial, callerName, ...args);
  }

  // fetch
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
  async fetch(resource, init = undefined) {
    return fetch(resource, init);
  }

  async request({url, options, encoders , decoders}) {
    try {
      options = {serial: this.constructor.serial, method: 'GET', ...options};
      for (let encoder of (encoders || [])) {
        ({url, options} = await encoder({url, options}));
      }
      let response = await fetch(url, options);
      let result = {success: true, response, options};
      for (let decoder of (decoders || [])) {
        result = await decoder(result);
        if (!result.success) {
          this.error(options.serial, 'request', result.error);
          break;
        }
      }
      return result;
    } catch (error) {
      this.error(options.serial, 'request', error);
      return {success: false, error};
    }
  }

  // debug 规则: encoder 在输出解码前数据(baseEncode 例外)， decoder 输出解码后数据

  baseEncode({url, options}) {
    let {body, method, ...others} = options || {};
    method = method ? method.toUpperCase() : 'GET';
    url = this.resolveUrl(url || '');
    if (method === 'GET') {
      if (body && typeof body === 'object') {
        let query = Object.keys(body).map(key => key + '=' + encodeURIComponent(body[key])).join('&');
        url += (url.indexOf('?') > 0 ? '&' : '?') + query;
      }
      this.debug(options.serial, 'baseEncode', `${method}: ${url}`);
      return {url, options: {method, ...others}};      
    } else {
      this.debug(options.serial, 'baseEncode', `${method}: ${url}`);
      return {url, options: {body, method, ...others}};      
    }
  }

  baseDecode({success, response, ...others}) {
    if (response.ok) {
      return {success: true, response, ...others};
    } else {
      return {success: false, error: new Error(response.status + ' ' + response.statusText), response, ...others};
    }
  }

  textEncode({url, options}) {
    let {body, headers, ...others} = options || {};
    this.debug(options.serial, 'textEncode', body);
    headers = {'Content-Type': 'text/plain', ...headers};
    return {url, options: {body, headers, ...others}};
  }

  async textDecode({success, data, response, options, ...others}) {
    data = await response.text();
    this.debug(options.serial, 'textDecode', data);
    return {success: true, data, response, options, ...others};
  }

  jsonEndode({url, options}) {
    let {body, ...others} = options || {};
    this.debug(options.serial, 'jsonEndode', body);
    body = body ? JSON.stringify(body) : body;
    return {url, options: {body, ...others}};
  }

  jsonDecode({success, data, options, ...others}) {
    data = JSON.parse(data);
    this.debug(options.serial, 'jsonDecode', data);
    return {success: true, data, options, ...others};
  }

  formDataEncode({url, options}) {
    let {body, ...others} = options || {};
    this.debug(options.serial, 'formDataEncode', body);

    let formData = new FormData();
    let addValue = (name, value) => {
      if (!value) {
        formData.append(name, value);
      } else if (value instanceof Array) {
        for (let i = 0; i < value.length; ++i) addValue(`${name}[${i}]`, value[i]);
      } else if (value instanceof Object) {
        for (let key in value) addValue(`${name}.${key}`, value[key]);
      } else {
        formData.append(name, value);
      }
    }
    for (let key in (body || {})) {
      addValue(key, body[key]);
    }

    return {url, options: {body: formData, ...others}};
  }

  // 上传文件不能解析文件对象，限定为单层json，其它和 formDataEncode 一样
  uploadEncode({url, options}) {
    let {body, ...others} = options || {};
    this.debug(options.serial, 'uploadEncode', body);

    let formData = new FormData();
    for (let key in (body || {})) {
      formData.append(key, body[key] || '');
    }

    return {url, options: {body: formData, ...others}};
  }

  uploadDecode({success, data, options, ...others}) {
    this.debug(options.serial, 'uploadDecode', data);
    return {success, data, options, ...others};
  }

}
