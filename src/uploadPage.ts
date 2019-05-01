// import './styles/base.css';
// import './styles/uploadPage.css';

// import * as qiniu from './libs/qiniu';
// import * as U from './libs/utils';
// import { getBlob } from './libs/image';
// import { Dragger } from './libs/dragger';

// interface Background extends Window {
//   file?:File | string;
// }
// const bg = chrome.extension.getBackgroundPage() as Background;

// const dragArea = document.getElementById('drag-area') as HTMLElement;
// const dragger = new Dragger(dragArea, {
//   drop:(e) => {
//     bg.file = e.dataTransfer!.files[0];
//   },
// });

// dragger.on();

// const fileBox = document.getElementById('file-box') as HTMLInputElement;
// fileBox.addEventListener('change', (e) => {
//   bg.file = fileBox.files![0];
// });

// window.onload = async () => {
//   if (bg.file) {

//   }
// };

// const uploadName = document.getElementById('upload-name') as HTMLInputElement;
// const confirmButton = document.getElementById('confirm') as HTMLButtonElement;
// confirmButton.addEventListener('click', async (e) => {
//   const name = uploadName.value;
//   if (U.checkUploadName(name)) {
//   }

//   const file = bg.file;
//   if (typeof file === 'string') {
//     await upload(await getBlob(file), name);
//   } else {
//     await upload(file as File, name);
//   }
// });

// async function upload(file:Blob, upload_name:string) {
//   const uploader = await qiniu.getUploader();

//   uploader(file, upload_name)
//     .subscribe({
//       next(res) {
//         console.log(res);
//       },
//       error(res) {
//         console.log(res);
//       },
//       async complete(res) {
//         console.log(res);
//         bg.file = undefined;
//       },
//     });
//   }