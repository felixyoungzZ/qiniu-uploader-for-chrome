// Test the contextMenu info.srcUrl, will always get image url
// cause it has been defined in manifest.json
export function isURL(url:string) {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1;
}

export function getURLFileName(url:string) {
}