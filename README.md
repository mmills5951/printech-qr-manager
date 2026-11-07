# Printech QR Manager — initial prototype

A small Netlify-hosted application with permanent redirect links, QR downloads, customer records, and approximate scan counts.

## Deploy
1. Unzip this folder and put it in a GitHub repository (or deploy through a Netlify workflow that installs dependencies and builds functions). **Do not use a plain static drag-and-drop upload**: this app requires serverless functions and npm dependencies.
2. In Netlify, create a **new project** from that repository. The included `netlify.toml` sets the publish directory and functions directory.
3. In Netlify project environment variables, add `QR_ADMIN_KEY` with a strong random secret (at least 24 characters). Never add this secret to source code.
4. Deploy, open the project's live URL, enter the key, and create a test QR code.
5. Scan the downloaded QR code with a phone; then change its destination in the dashboard and scan the *same* code again.

## Important before commercial use
- This is an **initial prototype**, not a production-hardened customer service.
- The admin key is a simple shared secret. For production, implement proper user authentication, rate limiting, access logs, and secure account recovery.
- Scan totals are approximate: simultaneous requests may overwrite increments. Use an append-only event table or transactional counter in a database for dependable analytics.
- Netlify Blobs persistence, limits, deployment configuration, and costs must be tested on the actual account.
- Public redirects should be restricted to authorized customer destinations and monitored to prevent abuse or phishing.
- Test with the actual production custom domain **before printing any commercial materials**. A permanent QR code is only permanent while its domain and redirect service remain active.
- Netlify's free plan usage limits can interrupt redirects if exceeded. Monitor usage and arrange a suitable plan before a mass mailing.
