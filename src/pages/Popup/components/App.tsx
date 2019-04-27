import * as React from 'react';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { reset, themes, Button } from 'react95';

import * as styles from './style.less';

const ResetStyles = createGlobalStyle`
  ${ reset }
`;

function RootComponent() {
  const handleButtonClick = () => {
    chrome.tabs.create({
      url:'./UploadPage.html',
    });
  }

  return (
    <div className={ styles.buttonBox }>
      <Button onClick={ handleButtonClick }>上传图片</Button>
    </div>
  )
}

export const App = () => (
  <React.Fragment>
    <ResetStyles />
    <ThemeProvider theme={ themes.default }>
      <RootComponent />
    </ThemeProvider>
  </React.Fragment>
)