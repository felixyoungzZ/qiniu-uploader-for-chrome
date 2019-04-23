import './styles/base.css';
import './styles/uploadPage.css';

import * as qiniu from './libs/qiniu';
import { Dragger } from './libs/dragger';

const dragArea = document.getElementById('drag-area') as HTMLElement;

const dragger = new Dragger(dragArea, {
  drop:dropCallback,
});

function dropCallback(e:DragEvent) {
  alert(e.dataTransfer!.files[0].name);
  handleImageFileForUplaodPage(e.dataTransfer!.files[0]);
}

dragger.on();

const fileBox = document.getElementById('file-box') as HTMLInputElement;

fileBox.addEventListener('change', function() {
  alert(this.files![0].name);
  handleImageFileForUplaodPage(this.files![0]);
});

async function handleImageFileForUplaodPage(file:Blob) {
  const uploader = await qiniu.getUploader();

  uploader(file, 'image-from-upload-page')
    .subscribe({
    next(res) {
      console.log(res);
    },
    error(res) {
      console.log(res);
    },
    complete(res) {
      console.log(res);
    },
  });
}