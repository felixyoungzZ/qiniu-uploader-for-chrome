import * as React from 'react';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import {
  reset,
  themes,
} from 'react95';

import { UploadExe } from './UploadExe';

import * as styles from './style.less';

const ResetStyles = createGlobalStyle`
  ${ reset }
`;

function RootComponent() {

  return (
    <div className={ styles.container }>
      <UploadExe />
    </div>
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