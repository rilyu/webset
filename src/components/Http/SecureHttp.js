// SecureHttp.js

import CryptoJS from 'crypto-js';
import Http from './Http';

export default class SecureHttp extends Http {

  constructor(props) {
    super(props);
    let {crypt, cryptPassword, cryptVector} = props || {};
    this.crypt = !!crypt;
    this.cryptPassword = cryptPassword || '';
    this.cryptVector = cryptVector || '';
  }

  async postJson({url, params, options}) {
    options = {method: 'POST', body: params, crypt: this.crypt, ...options};
    let encoders = [this.baseEncode.bind(this), this.jsonEndode.bind(this), this.secureEncode.bind(this), this.textEncode.bind(this)];
    let decoders = [this.baseDecode.bind(this), this.textDecode.bind(this), this.secureDecode.bind(this), this.jsonDecode.bind(this)];
    let result = await this.request({url, options, encoders, decoders});
    return result;
  }

  secureEncode({url, options}) {
    let {body, crypt, ...others} = options || {};
    this.debug(options.serial, 'secureEncode', body);
    body = crypt ? this.encrypt(body) : body;
    return {url, options: {body, crypt, ...others}};
  }

  secureDecode({success, data, options, ...others}) {
    let {crypt} = options || {};
    data = crypt ? this.decrypt(data) : data;
    this.debug(options.serial, 'secureDecode', data);
    return {success, data, options, ...others};
  }

  encrypt(text) {
    let key = CryptoJS.enc.Latin1.parse(this.cryptPassword);
    let iv = CryptoJS.enc.Latin1.parse(this.cryptVector);
    let encrypted = CryptoJS.TripleDES.encrypt(text, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    let encryptedBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    return encryptedBase64;
  }

  decrypt(text) {
    let key = CryptoJS.enc.Latin1.parse(this.cryptPassword);
    let iv = CryptoJS.enc.Latin1.parse(this.cryptVector);
    text = text.replace(/(\s*)/g, '');
    let decrypted = CryptoJS.TripleDES.decrypt(text, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    let decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }

}
