
import {store} from './_shared.mjs';

export default async (request) => {
  const url = new URL(request.url);

  // Accept a code from either a query parameter or a short link.
  let code = url.searchParams.get('code') || '';

  if (!code) {
    const match = url.pathname.match(/\/r\/([a-f0-9]{12})\/?$/i);
    if (match) code = match[1];
  }

  if (!/^[a-f0-9]{12}$/i.test(code)) {
    return new Response('QR code not found', {status: 404});
  }

  const db = store();
  const key = 'item:' + code;
  const item = await db.get(key, {type: 'json'});

  if (!item) {
    return new Response('QR code not found', {status: 404});
  }

  try {
    item.scans = (item.scans || 0) + 1;
    await db.setJSON(key, item);
  } catch (e) {
    console.error('Scan logging failed', e);
  }

  return new Response(null, {
    status: 302,
    headers: {
      location: item.destination,
      'cache-control': 'no-store, max-age=0'
    }
  });
};
