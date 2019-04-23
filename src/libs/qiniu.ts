import * as UTF from './utf';
import * as CryptoJS from 'crypto-js';
import * as Base64 from './base64';

import * as qiniu from 'qiniu-js';

const MAX_AGE_OF_TOKEN = 3600;
interface AuthOptions {
  accessKey:string;
  secretKey:string;
  bucket:string;
}

// Get upload token. From https://github.com/neal1991/image-host/blob/master/js/qiniu.js
function generateUploadToken(options:AuthOptions) {
  const {
    accessKey,
    secretKey,
    bucket,
  } = options;

  const putPolicy = {
    scope: bucket,
    deadline: new Date().getTime() + MAX_AGE_OF_TOKEN,
  };

  const encoded = Base64.encode(UTF.utf16to8(JSON.stringify(putPolicy)));
  const hash = CryptoJS.HmacSHA1(encoded, secretKey);
  const encoded_signed = hash.toString(CryptoJS.enc.Base64);
  return accessKey + ':' + Base64.safe(encoded_signed) + ':' + encoded;
}

interface QiniuConfig {
  accessKey:string;
  secretKey:string;
  bucket:string;
  domain:string;
}
async function getQiniuConfigFromChromeStorageSync() : Promise<QiniuConfig> {
  return new Promise((resolve) => {
    chrome.storage.sync.get((items) => {
      if (
        items['accessKey'] &&
        items['secretKey'] &&
        items['bucket'] &&
        items['domain']
      ) {
        resolve({
          accessKey: items['accessKey'],
          secretKey: items['secretKey'],
          bucket: items['bucket'],
          domain: items['domain'],
        });
      }
    });
  });
}

export async function getUploader() {
  const config = await getQiniuConfigFromChromeStorageSync();
  const token = generateUploadToken({
    accessKey: config.accessKey,
    secretKey: config.secretKey,
    bucket: config.bucket,
  });

  const uploadConfig = {
    useCdnDomain: true,
  };

  return (file:Blob, uploadName:string) => qiniu.upload(file, uploadName, token, {}, uploadConfig);
}
