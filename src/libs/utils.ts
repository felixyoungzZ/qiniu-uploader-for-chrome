// Test the contextMenu info.srcUrl, will always get image url
// cause it has been defined in manifest.json
export function isURL(str:string) {
  return str.indexOf('http://') !== -1 || str.indexOf('https://') !== -1;
}

// TODO: check file name given by users.
export function checkUploadName(name:string) {
  return name;
}