# Step-by-step: Move your website to billreliefai.com

This guide walks you through pointing **billreliefai.com** (and optionally **www.billreliefai.com**) to your Azure App Service so your live site runs on your own domain.

---

## Before you start

- Your app is already deployed on Azure (e.g. `https://billrelief.azurewebsites.net` or similar).
- You own the domain **billreliefai.com** (bought from GoDaddy, Namecheap, Google Domains, Cloudflare, etc.).
- You can log in to both **Azure Portal** and your **domain registrar / DNS provider**.

---

## Step 1: Add the custom domain in Azure

1. Open **[Azure Portal](https://portal.azure.com)** and sign in.
2. Go to **App Services** → select your app (e.g. **billrelief**).
3. In the left menu, under **Settings**, click **Custom domains** (or **Configuration** → **Custom domains**).
4. Click **+ Add custom domain**.
5. **Custom domain**: type `www.billreliefai.com` (recommended for first setup).
6. Click **Validate**.
7. Azure will show you the DNS records you need. **Keep this page open** — you’ll use it in Step 2.

---

## Step 2: Add DNS records at your domain provider

Go to where you manage DNS for **billreliefai.com** (e.g. GoDaddy DNS, Namecheap Advanced DNS, Cloudflare DNS).

### For www.billreliefai.com (recommended first)

Add these two records (use the **exact** values Azure shows in “Add custom domain”; the table below is typical):

| Type  | Name/Host | Value/Points to |
|-------|------------|------------------|
| **CNAME** | `www` | `<your-app-name>.azurewebsites.net` (e.g. `billrelief.azurewebsites.net`) |
| **TXT**   | `asuid.www` | The **Domain verification ID** Azure shows (long string like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`) |

- **Name/Host**: sometimes you enter `www`, sometimes `www.billreliefai.com` — follow your provider’s labels.
- **TXT** is used by Azure to verify you control the domain.

### For root domain (billreliefai.com without www)

Azure will show an **A record** and a **TXT** (verification) record:

| Type | Name/Host | Value |
|------|------------|--------|
| **A**  | `@` (or leave blank) | **IP address** Azure shows (e.g. for App Service) |
| **TXT** | `asuid` (or `@`) | **Domain verification ID** from Azure |

- Some providers support **ALIAS** or **ANAME** for root instead of **A**; if available, you can point root to `<your-app>.azurewebsites.net` instead of an IP.
- Save the DNS records.

---

## Step 3: Wait for DNS and finish adding the domain in Azure

1. DNS can take **5 minutes to 48 hours** (often 10–30 minutes).
2. In Azure **Custom domains**, click **Validate** again.
3. When validation succeeds, click **Add custom domain** to bind it.
4. Repeat for the other hostname if you added both (e.g. add **billreliefai.com** after **www.billreliefai.com**).

---

## Step 4: Turn on HTTPS (SSL) in Azure

1. In your App Service, go to **Custom domains** (or **TLS/SSL settings**).
2. For the domain you added, click **Add binding** (or **Add TLS/SSL binding**).
3. Choose **SNI SSL** and select **Create free App Service managed certificate**.
4. Save. Azure will issue a free certificate and serve HTTPS for that domain.

Do this for each custom hostname (e.g. **www** and root) if you use both.

---

## Step 5: Set NEXTAUTH_URL and app URL in Azure

Your app uses **NEXTAUTH_URL** for login redirects and callbacks. It must match the URL users use.

1. In Azure: **App Service** → **Configuration** → **Application settings**.
2. Add or edit:
   - **Name:** `NEXTAUTH_URL`
   - **Value:** `https://www.billreliefai.com` (or `https://billreliefai.com` if you use root only).
3. Click **Save** and **Confirm** (and restart the app if Azure asks).

---

## Step 6: Set NEXTAUTH_URL in GitHub (for deployments)

So each new deploy is built with the correct URL:

1. Open your repo on **GitHub** → **Settings** → **Secrets and variables** → **Actions**.
2. Add or edit the secret **NEXTAUTH_URL** with value: `https://www.billreliefai.com` (same as in Azure).

---

## Step 7: Redirect root to www (optional but recommended)

If you use both **billreliefai.com** and **www.billreliefai.com**, it’s best to pick one canonical URL (e.g. **www**) and redirect the other.

- **Option A – At your DNS/hosting provider:**  
  Many registrars or DNS/hosting panels have a “Redirect domain” or “URL redirect” option: redirect **billreliefai.com** → **https://www.billreliefai.com**.

- **Option B – In your app:**  
  You can add a redirect in Next.js (e.g. in `next.config.mjs` or middleware) from `https://billreliefai.com` to `https://www.billreliefai.com`. This only works after the root domain already points to your app.

---

## Step 8: Verify

1. Open **https://www.billreliefai.com** (or **https://billreliefai.com**) in a browser.
2. Check:
   - Homepage loads.
   - Login/Sign up works (NEXTAUTH_URL is correct).
   - Footer shows **© 2026 billreliefai.com** and **contact@billreliefai.com**.

---

## Quick checklist

| Step | Where | Action |
|------|--------|--------|
| 1 | Azure → App Service → Custom domains | Add custom domain (e.g. www.billreliefai.com), Validate |
| 2 | Domain registrar DNS | Add CNAME (www → *.azurewebsites.net) + TXT (asuid.www) |
| 3 | Azure → Custom domains | Validate again, then Add custom domain |
| 4 | Azure → Custom domains / TLS | Add SSL binding (free managed cert) |
| 5 | Azure → Configuration → Application settings | Set NEXTAUTH_URL = https://www.billreliefai.com |
| 6 | GitHub → Settings → Secrets → Actions | Set NEXTAUTH_URL (same value) |
| 7 | Domain provider (optional) | Redirect billreliefai.com → www.billreliefai.com |
| 8 | Browser | Open https://www.billreliefai.com and test login + footer |

---

## Troubleshooting

- **“Domain verification failed”**  
  Wait longer for DNS, or double-check the **TXT** record (name and value) exactly as Azure shows.

- **“SSL certificate” or “Binding” error**  
  Ensure the custom domain is added and validated first; then add the TLS binding. Retry after a few minutes.

- **Login redirects to *.azurewebsites.net**  
  NEXTAUTH_URL in Azure (and in GitHub Secrets) must be exactly `https://www.billreliefai.com` (no trailing slash). Restart the app after changing settings.

- **Site works on Azure URL but not on billreliefai.com**  
  Confirm CNAME (and A/ALIAS if used) point to the correct Azure hostname and that DNS has propagated (use [whatsmydns.net](https://www.whatsmydns.net) to check).
