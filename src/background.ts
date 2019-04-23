chrome.contextMenus.create({
  title: '上传图片到七牛云',
  contexts: ['image'],
  onclick: (info) => {
    if (info.srcUrl) {
      (window as any).file = info.srcUrl;
      chrome.tabs.create({
        url:'./uploadPage.html',
      });
    }
  },
});