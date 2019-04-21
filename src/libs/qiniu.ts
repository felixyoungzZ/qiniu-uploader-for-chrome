import * as UTF from './utf';
import * as CryptoJS from 'crypto-js';
import * as Base64 from './base64';

import * as qiniu from 'qiniu-js';

interface AuthOptions {
  accessKey:string;
  secretKey:string;
  putPolicy:{
    scope:string;
    deadline:number;
  };
}

// Get upload token. From https://github.com/neal1991/image-host/blob/master/js/qiniu.js
export function getUploadToken(options:AuthOptions) {
  const {
    accessKey,
    secretKey,
    putPolicy,
  } = options;

  const encoded = Base64.encode(UTF.utf16to8(JSON.stringify(putPolicy)));
  const hash = CryptoJS.HmacSHA1(encoded, secretKey);
  const encoded_signed = hash.toString(CryptoJS.enc.Base64);
  return accessKey + ':' + Base64.safe(encoded_signed) + ':' + encoded;
}

export function upload(file:string|Blob) {
  if (typeof file === 'string') {
    // Convert file to blob
  }

  return qiniu.upload;
}