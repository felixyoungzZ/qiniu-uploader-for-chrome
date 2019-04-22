import './styles/base.css';
import './styles/uploadPage.css';

import { Dragger } from './libs/dragger';
import * as qiniu from './libs/qiniu';

const dragArea = document.getElementById('drag-area') as HTMLElement;

const dragger = new Dragger(dragArea, {
  drop:dropCallback,
});

function dropCallback(e:DragEvent) {
  alert(e.dataTransfer!.files[0].name);
}

dragger.on();

const fileBox = document.getElementById('file-box') as HTMLInputElement;

fileBox.addEventListener('change',function(){
  alert(this.files![0].name);
}, false);