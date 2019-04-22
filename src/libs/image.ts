type ImageFormat = 'image/png' | 'image/jpeg' | 'image/svg';

export async function convertToDataURLWithCanvas(url:string, format:ImageFormat) : Promise<string> {
  return new Promise((resolve) => {
    let dataURL;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(this:HTMLImageElement) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.height = this.height;
      canvas.width = this.width;

      if (ctx) {
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(format);
        resolve(dataURL);
      }
    };

    img.src = url;
  });
}

export function convertDataURLToBlob(dataURL:string) {
  const arr = dataURL.split(',');
  const mimeType = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type:mimeType });
}