import {store} from './_shared.mjs';
export default async (request)=>{
 const code=new URL(request.url).searchParams.get('code')||'';
 if(!/^[a-f0-9]{12}$/.test(code))return new Response('QR code not found',{status:404});
 const db=store(),key='item:'+code;
 const item=await db.get(key,{type:'json'});
 if(!item)return new Response('QR code not found',{status:404});
 // Basic aggregate counter; under simultaneous scans updates may collide.
 try{item.scans=(item.scans||0)+1;await db.setJSON(key,item);}catch(e){console.error('Scan logging failed',e);}
 return new Response(null,{status:302,headers:{location:item.destination,'cache-control':'no-store, max-age=0'}});
};
