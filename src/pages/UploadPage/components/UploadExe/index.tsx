import * as React from 'react';

import {
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

export function UploadExe() {
  return (
    <Window className={ styles.window }>
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
                  <div className={ styles.imgBox }>
                    <img src='https://qn-static.felixzzz.cn/fivesmall0.jpg' alt='example'/>
                  </div>
                </TableDataCell>
                <TableDataCell style={{ textAlign: 'center', verticalAlign: 'middle' }}>example.jpg</TableDataCell>
              </TableRow>
            </TableBody>

          </Table>
        </WindowContent>
      </Window>
  )
}