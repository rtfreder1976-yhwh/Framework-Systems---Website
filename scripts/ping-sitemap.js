#!/usr/bin/env node
/**
 * ping-sitemap.js
 * Notifies search engines of an updated sitemap after every successful deployment.
 *
 * Runs automatically via the "build" npm script in package.json, which is
 * called by Vercel on every deployment via buildCommand in vercel.json.
 *
 * Engines notified via IndexNow (api.indexnow.org):
 *   - Bing   (IndexNow co-founder; deprecated their /ping endpoint in favour of this)
 *   - Yandex, Seznam, and other IndexNow participants
 *
 * Note: Google's /ping and Bing's /ping endpoints are both deprecated (410 Gone).
 * IndexNow is the current standard for notifying all major search engines at once.
 *
 * Key verification file deployed at:
 *   https://www.frameworksystems.co/68b34e14ba0041719f3e6a06a9229128.txt
 */

import https from 'https';

const SITEMAP_URL  = 'https://www.frameworksystems.co/sitemap.xml';
const INDEXNOW_KEY = '68b34e14ba0041719f3e6a06a9229128';
const SITE_HOST    = 'www.frameworksystems.co';

// ─── POST helper ──────────────────────────────────────────────────────────────
function post(hostname, path, body) {
  return new Promise((resolve) => {
    const data = JSON.stringify(body);
    const options = {
      hostname,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(data),
      },
      timeout: 10000,
    };
    const req = https.request(options, (res) => {
      res.resume();
      resolve({
        ok: res.statusCode >= 200 && res.statusCode < 400,
        status: res.statusCode,
      });
    });
    req.on('error', (err) => resolve({ ok: false, status: null, error: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, status: null, error: 'timeout' }); });
    req.write(data);
    req.end();
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🔔  Pinging search engines (IndexNow) with updated sitemap...');
  console.log(`    Sitemap : ${SITEMAP_URL}`);
  console.log(`    Engines : Bing · Yandex · Seznam (via api.indexnow.org)\n`);

  const result = await post('api.indexnow.org', '/indexnow', {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
    urlList: [SITEMAP_URL],
  });

  if (result.ok) {
    console.log(`✅  IndexNow ping succeeded (HTTP ${result.status}). Bing, Yandex, and other IndexNow engines notified.\n`);
  } else {
    // Non-fatal — a failed ping never blocks a Vercel deployment.
    console.log(`⚠️   IndexNow ping returned HTTP ${result.status ?? 'N/A'} (${result.error ?? 'non-2xx'}). Non-fatal — engines will still crawl on their normal schedule.\n`);
  }
}

main().catch((err) => {
  console.error('ping-sitemap error:', err.message);
  // Always exit 0 so a ping failure never blocks a Vercel deployment
  process.exit(0);
});
