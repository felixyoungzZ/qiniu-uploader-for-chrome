import * as U from './utils';

export async function onvertFileToDataURLviaFileReader(url:string) : Promise<string> {
  return new Promise((resolve) => {
    const xhr= new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.readAsDataURL(xhr.response);
    };

    xhr.open('GET', url);
    xhr.send();
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

export async function getBlob(url:string) {
  // URL or dataURL
  if (U.isURL(url)) {
    url = await onvertFileToDataURLviaFileReader(url);
  }

  return convertDataURLToBlob(url);
}