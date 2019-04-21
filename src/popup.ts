import './styles/base.css';
import './styles/popup.css';

import { Dragger } from './libs/dragger';

const dragArea = document.getElementById('drag-area') as HTMLElement;

const dragger = new Dragger(dragArea, {
  drop:dropCallback,
});

function dropCallback(e:DragEvent) {
  alert(e.dataTransfer!.files[0].name);
}

dragger.on();