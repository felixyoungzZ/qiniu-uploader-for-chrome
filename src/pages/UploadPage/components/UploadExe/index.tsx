import * as React from 'react';
import { useState, useEffect } from 'react';

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
  Fieldset,
} from 'react95';

import { convertBlobToDataURL } from '../../../../libs/image';
import * as styles from './style.less';

interface Background extends Window {
  file?:string;
}
const bg = chrome.extension.getBackgroundPage() as Background;

function addWindowDrapEventListener() {
  window.addEventListener('dragenter', (e) => { e.preventDefault(); });
  window.addEventListener('dragover', (e) => { e.preventDefault(); });
  window.addEventListener('dragleave', (e) => { e.preventDefault(); });
  window.addEventListener('drop', (e) => { e.preventDefault(); });
}

function listenOnBeforeUnload() {
  window.addEventListener('beforeunload', (e) => {
    bg.file = undefined;
  });
}

export function UploadExe() {
  useEffect(() => {
    addWindowDrapEventListener();
    listenOnBeforeUnload();
  });

  const [imgSrc, setImgSrc] = useState(bg.file);
  const [imgName, setImgName] = useState();

  const handleBgFileChange = (src:string) => {
    bg.file = src;
    setImgSrc(src);
  };

  const setSelectedFile = async (file:File) => {
    const dataURL = await convertBlobToDataURL(file);

    handleBgFileChange(dataURL);
    setImgName(file.name);
  };

  const handleFileInputChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await setSelectedFile(file);
    }
  };

  const handleDropArea = async (e:React.DragEvent<HTMLElement>) => {
    if (e.dataTransfer && e.dataTransfer.files.length > 0 && e.dataTransfer.files[0].type.includes('image')) {
      const file = e.dataTransfer.files[0];
      await setSelectedFile(file);
    }
  };

  const renderImgBox = () => imgSrc ?
    (
      <React.Fragment>
        <TableDataCell className={ styles.imgBox }>
          <img src={ imgSrc }></img>
        </TableDataCell>
        <TableDataCell className={ styles.imgNameBox }>{ imgName }</TableDataCell>
      </React.Fragment>
    ) :
    (
      <React.Fragment>
        <TableDataCell colSpan='2' style={{ padding: '1rem' }}>
          <Fieldset className={ styles.dropArea } onDrop={ handleDropArea }>拖拽图片上传🖱</Fieldset>
        </TableDataCell>
      </React.Fragment>
    );

  return (
    <Window className={ styles.window }>
      <WindowHeader>upload.exe</WindowHeader>
      <Toolbar>
        <Button size='md' className={ styles.uploadButton }>
          选择图片
          <input type='file' onChange={ handleFileInputChange } accept='image/*' />
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
              { renderImgBox() }
            </TableRow>
          </TableBody>
        </Table>
      </WindowContent>
    </Window>
  );
}