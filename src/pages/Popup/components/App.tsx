import * as React from 'react';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { reset, themes, List, ListItem } from 'react95';

const ResetStyles = createGlobalStyle`
  ${ reset }
`;

function RootComponent() {
  const handleUploadClick = () => {
    chrome.tabs.create({
      url:'./UploadPage.html',
    });
  };

  const handleExploreClick = () => {
    window.open('https://felixzzz.cn');
  }

  return (
    <List>
      <ListItem onClick={ handleUploadClick }>🚀 上传图片</ListItem>
      <ListItem onClick={ handleExploreClick }>👻 探索一下</ListItem>
    </List>
  );
}

export const App = () => (
  <React.Fragment>
    <ResetStyles />
    <ThemeProvider theme={ themes.default }>
      <RootComponent />
    </ThemeProvider>
  </React.Fragment>
);