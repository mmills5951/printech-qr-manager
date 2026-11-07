import {store,authorized,json,validUrl} from './_shared.mjs';
export default async (request)=>{
 if(!authorized(request))return json({error:'Unauthorized'},401);
 if(request.method!=='POST')return json({error:'Method not allowed'},405);
 let data;try{data=await request.json();}catch{return json({error:'Invalid JSON'},400);}
 const destination=validUrl(data.destination);
 if(!destination)return json({error:'Valid http(s) destination required'},400);
 const db=store(),key='item:'+String(data.code||'');
 const item=await db.get(key,{type:'json'});
 if(!item)return json({error:'QR code not found'},404);
 item.destination=destination;item.updatedAt=new Date().toISOString();
 await db.setJSON(key,item);
 return json({item});
};
