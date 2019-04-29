import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    chrome.contextMenus.create({
      title: '上传图片到七牛云',
      contexts: ['image'],
      onclick: (info) => {
        if (info.srcUrl) {
          // Communicate with the UploadPage.html
          (window as any).file = info.srcUrl;

          // Jump to the UploadPage.html
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
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);