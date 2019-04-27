import * as React from 'react';

export function App() {
  const handleButtonClick = () => {
    chrome.tabs.create({
      url:'./UploadPage.html',
    });
  }

  return (
    <button onClick={ handleButtonClick }>上传图片</button>
  )
}