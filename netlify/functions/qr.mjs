import QRCode from 'qrcode';
import {store} from './_shared.mjs';
export default async(request)=>{
 const url=new URL(request.url),code=url.searchParams.get('code')||'',format=url.searchParams.get('format')==='png'?'png':'svg';
 if(!/^[a-f0-9]{12}$/.test(code))return new Response('Not found',{status:404});
 const item=await store().get('item:'+code,{type:'json'});
 if(!item)return new Response('Not found',{status:404});
 const target=new URL('/r/'+code,url.origin).toString();
 if(format==='svg')return new Response(await QRCode.toString(target,{type:'svg',margin:4,errorCorrectionLevel:'H'}),{headers:{'content-type':'image/svg+xml','cache-control':'public,max-age=300'}});
 return new Response(await QRCode.toBuffer(target,{type:'png',width:1200,margin:4,errorCorrectionLevel:'H'}),{headers:{'content-type':'image/png','cache-control':'public,max-age=300'}});
};
