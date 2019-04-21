type Callback = (e:DragEvent) => void;

interface DragCallback {
  dragenter?:Callback;
  dragover?:Callback;
  dragleave?:Callback;
  drop:Callback;
}

export class Dragger {
  constructor(public el:HTMLElement, public callbacks:DragCallback) {
    this.removeWindowListener();
  }

  public removeWindowListener() {
    window.addEventListener('dragenter', (e) => { e.preventDefault(); });
    window.addEventListener('dragover', (e) => { e.preventDefault(); });
    window.addEventListener('dragleave', (e) => { e.preventDefault(); });
    window.addEventListener('drop', (e) => { e.preventDefault(); });
  }

  public on() {
    this.switch('on');
  }

  public dispose() {
    this.switch('dispose');
  }

  private switch(type:'on'|'dispose') {
    const operator = type === 'on' ? 'add' : 'remove';

    Object.keys(this.callbacks).forEach((callbackName) => {
      this.el[`${ operator }EventListener`](callbackName, this.callbacks[callbackName]);
    });
  }
}