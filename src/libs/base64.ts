export function encode(strToEncode:string) {
  return window.btoa(strToEncode);
}

export function safe(base64:string) {
  base64 = base64.replace(/\+/g, '-');
  base64 = base64.replace(/\//g, '_');
  return base64;
}