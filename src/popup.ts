const button = document.getElementById('upload') as HTMLButtonElement;

button.addEventListener('click', (e) => {
  chrome.tabs.create({
    url:'./uploadPage.html',
  });
});