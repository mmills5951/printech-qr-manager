import { getStore } from '@netlify/blobs';
export const store = () => getStore('printech-qr-manager');
export function authorized(request) {
  const expected = process.env.QR_ADMIN_KEY;
  return !!expected && request.headers.get('authorization') === `Bearer ${expected}`;
}
export const json = (data,status=200) => new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json','cache-control':'no-store'}});
export function validUrl(value){try {const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.toString():null;}catch{return null;}}
