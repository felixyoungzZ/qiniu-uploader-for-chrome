import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useEffect } from 'react';

function App(){
  useEffect(() => {
    chrome.contextMenus.create({
      title: '上传图片到七牛云',
      contexts: ['image'],
      onclick: (info) => {
        if (info.srcUrl) {
          (window as any).file = info.srcUrl;
          chrome.tabs.create({
            url:'./UploadPage.html',
          });
        }
      },
    });
  });

  return (
    <React.Fragment>
      Hello, background!
    </React.Fragment>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);