import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import {
  Checkbox,
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
  TextField,
} from 'react95';

import { ResultBox } from '../ResultBox';
import * as qiniu from '../../../../libs/qiniu';
import { convertBlobToDataURL, convertURLToBlob } from '../../../../libs/image';
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

  const inputFileEL = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState(bg.file);
  const [imgName, setImgName] = useState();
  const [uploadName, setUploadName] = useState('上传的名字');
  const [isHttps, setIsHttps] = useState(true);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleBgFileChange = (src:string) => {
    bg.file = src;
    setImgSrc(src);
  };

  const setSelectedFile = async (file:File) => {
    // TODO:
    // use window.URL.createObjectURL() ?
    // It's still in Working Draft.
    const dataURL = await convertBlobToDataURL(file);

    handleBgFileChange(dataURL);
    setImgName(file.name);
  };

  const handleFileInputChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].type.includes('image')) {
      const file = e.target.files[0];
      await setSelectedFile(file);
    }
  };

  const handleDropArea = async (e:React.DragEvent<HTMLElement>) => {
    if (e.dataTransfer && e.dataTransfer.files[0] && e.dataTransfer.files[0].type.includes('image')) {
      const file = e.dataTransfer.files[0];
      await setSelectedFile(file);
    }
  };

  const handleUploadNameChange = (e:Event) => {
    setUploadName((e.target as any).value);
  };

  const upload = async () => {
    if (!bg.file) { return; }

    const uploader = await qiniu.getUploader();
    uploader(await convertURLToBlob(bg.file), uploadName)
      .subscribe({
        next(res) {
          console.log(res);
        },
        complete(res) {
          setIsUploaded(true);
          console.log(res);
        },
        error(err) {
          console.log(err);
        },
      });
  };

  const cancel = () => {
    bg.file = undefined;
    if (inputFileEL.current) {
      inputFileEL.current.value = '';
    }

    setImgSrc(undefined);
    setUploadName('');
    setIsUploaded(false);
  };

  const handleIsHttpsChange = (e:Event) => {
    setIsHttps((e.target as any).value);
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

  const renderResultBox = () => isUploaded ?
    (
      <ResultBox isHttps={ isHttps } uploadName={ uploadName } />
    ) :
    (
      <React.Fragment>
        清先上传图片哦~
      </React.Fragment>
    );

  return (
    <Window className={ styles.window }>
      <WindowHeader>upload.exe</WindowHeader>
      <Toolbar>
        <Button size='md' className={ styles.uploadButton }>
          选择图片
          <input ref={ inputFileEL } type='file' onChange={ handleFileInputChange } accept='image/*' />
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
        <Toolbar className={ styles.optionsBar }>
          <TextField value={ uploadName } onChange={ handleUploadNameChange } />
          <Button onClick={ upload }>上传</Button>
          <Button onClick={ cancel }>取消</Button>
          <Checkbox defaultChecked={ true } checked={ isHttps } onChange={ handleIsHttpsChange } value='isHttps' label='使用 Https' name='isHttps' />
        </Toolbar>
        { renderResultBox() }
      </WindowContent>
    </Window>
  );
}