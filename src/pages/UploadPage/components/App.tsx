import * as React from 'react';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import {
  reset,
  themes,
  Window,
  WindowHeader,
  Toolbar,
  Button,
  WindowContent,
  Table,
  TableHead,
  TableHeadCell,
  TableRow,
  TableDataCell,
  TableBody,
} from 'react95';

import * as styles from './style.less';

const ResetStyles = createGlobalStyle`
  ${ reset }
`;

function RootComponent() {
  return (
    <div className={ styles.container }>
      <Window style={{ width: 400 }}>
        <WindowHeader>upload.exe</WindowHeader>
        <Toolbar>
          <Button size='sm'>
            选择图片
          </Button>
        </Toolbar>
        <WindowContent>
          <Table>
            <TableHead>
              <TableRow head>
                <TableHeadCell>预览</TableHeadCell>
                <TableHeadCell>名称</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableDataCell>
                  <div style={{ padding: '10px' }}>
                    <img style={{ width: '150px' }} src='https://qn-static.felixzzz.cn/fivesmall0.jpg' alt='example'/>
                  </div>
                </TableDataCell>
                <TableDataCell style={{ textAlign: 'center', verticalAlign: 'middle' }}>example.jpg</TableDataCell>
              </TableRow>
            </TableBody>

          </Table>
        </WindowContent>
      </Window>
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