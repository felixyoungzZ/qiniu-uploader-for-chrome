import './styles/options.css';

const confirmButton = document.getElementById('confirm') as HTMLButtonElement;
const accessKey = document.getElementById('accessKey') as HTMLInputElement;
const secretKey = document.getElementById('secretKey') as HTMLInputElement;
const bucket = document.getElementById('bucket') as HTMLInputElement;
const domain = document.getElementById('domain') as HTMLInputElement;

window.onload = () => {
  chrome.storage.sync.get((items) => {
    accessKey.value = items['accessKey'] || '';
    secretKey.value = items['secretKey'] || '';
    bucket.value = items['bucket'] || '';
    domain.value = items['domain'] || '';
  });
};

confirmButton.addEventListener('click', (e) => {
  chrome.storage.sync.set({ accessKey: accessKey.value });
  chrome.storage.sync.set({ secretKey: secretKey.value });
  chrome.storage.sync.set({ bucket: bucket.value });
  chrome.storage.sync.set({ domain: domain.value });
});