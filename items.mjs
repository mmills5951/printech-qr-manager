import {store,authorized,json,validUrl} from './_shared.mjs';
export default async (request) => {
 if(!authorized(request))return json({error:'Unauthorized'},401);
 const db=store();
 if(request.method==='GET'){
   const {blobs}=await db.list({prefix:'item:'});
   const items=await Promise.all(blobs.map(x=>db.get(x.key,{type:'json'})));
   return json({items:items.filter(Boolean).sort((a,b)=>b.createdAt.localeCompare(a.createdAt))});
 }
 if(request.method!=='POST')return json({error:'Method not allowed'},405);
 let data;try{data=await request.json();}catch{return json({error:'Invalid JSON'},400);}
 const destination=validUrl(data.destination);
 if(!destination || !String(data.customer||'').trim())return json({error:'Customer and valid http(s) destination required'},400);
 const code=crypto.randomUUID().replaceAll('-','').slice(0,12);
 const item={code,customer:String(data.customer).trim().slice(0,120),label:String(data.label||'').trim().slice(0,120),destination,scans:0,createdAt:new Date().toISOString()};
 await db.setJSON('item:'+code,item);
 return json({item},201);
};
