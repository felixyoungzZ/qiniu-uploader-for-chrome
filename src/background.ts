import * as qiniu from './libs/qiniu';
import { getBlob } from './libs/image';

chrome.contextMenus.create({
  title: '上传图片到七牛云',
  contexts: ['image'],
  onclick: (info) => {
    handleImageUrlForContextMenu(info.srcUrl);
  },
});

async function handleImageUrlForContextMenu(url?:string) {
  if (!url) { return; }

  const blob = await getBlob(url);
  const uploader = await qiniu.getUploader();

  uploader(blob, 'image-from-background')
    .subscribe({
    next(res) {
      console.log(res);
    },
    error(res) {
      console.log(res);
    },
    complete(res) {
      console.log(res);
    },
  });
}