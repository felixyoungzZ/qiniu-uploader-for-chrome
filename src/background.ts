chrome.contextMenus.create({
  title: '上传图片到七牛云',
  contexts: ['image'],
  onclick: (info) => {
    console.log(info.srcUrl);
  },
});