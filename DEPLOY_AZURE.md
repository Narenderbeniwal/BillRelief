# Deploy BillRelief to Azure (Free Tier)

This guide walks you through deploying BillRelief to **Azure App Service** on the **free F1 tier**, with a **free PostgreSQL** database, so all features (auth, dashboard, uploads, PayPal, blog) work.

---

## What you get (free)

| Resource | Option | Limit |
|----------|--------|--------|
| **App** | Azure App Service (Linux, Node) – **F1 Free** | 60 min/day when idle; 1 GB RAM |
| **Database** | Neon or Supabase PostgreSQL (free tier) | 0.5 GB / 500 MB |
| **File uploads** | Local disk or Azure Blob | Ephemeral if local; see [Azure Blob Storage](#azure-blob-storage-for-uploads) for persistent option |

---

## Prerequisites

- **Azure account** – [Create free](https://azure.microsoft.com/free/)
- **Git** – [Install](https://git-scm.com/)
- **Node.js 18+** – [Install](https://nodejs.org/)
- **GitHub account** – for GitHub Actions deploy (recommended)

---

## Step 1: Free PostgreSQL database

Your app needs a Postgres DB. Use one of these **free** options.

### Option A: Neon (recommended, no credit card)

1. **Sign up**
   - Open [neon.tech](https://neon.tech) in your browser.
   - Click **Sign up** (top right).
   - Sign up with **GitHub**, **Google**, or **email** (no credit card required).

2. **Create a project**
   - After login you’ll see the **Neon Console**.
   - Click **New Project** (or **Create a project**).
   - **Project name**: e.g. `billrelief`.
   - **Region**: choose one close to your Azure app (e.g. **East US (Virginia)** or **US East (N. Virginia)**).
   - **PostgreSQL version**: leave default (e.g. 16).
   - Click **Create project**.

3. **Get the connection string**
   - On the project dashboard, find the **Connection details** (or **Connect**) section.
   - Select the **Connection string** tab (or **URI**).
   - Copy the full string. It looks like:
     ```
     postgresql://USER:PASSWORD@ep-xxxxx.us-east-1.aws.neon.tech/neondb?sslmode=require
     ```
   - If you see a **Password** field shown once, copy that too and keep it safe (the URI may already include it).

4. **Save it**
   - Paste the connection string into a secure note or password manager.
   - You’ll add this later in **Azure** as the `DATABASE_URL` environment variable (and optionally in local `.env` for development).

### Option B: Supabase

1. Go to [supabase.com](https://supabase.com) and create a project.
2. **Settings → Database** → copy **Connection string (URI)**.
3. Replace the password placeholder and save as `DATABASE_URL`.

### Option C: Azure Database for PostgreSQL (Flexible Server)

1. Azure Portal → **Create a resource** → **Azure Database for PostgreSQL** → **Flexible Server**.
2. Basics: pick subscription, resource group, region, give a name, **PostgreSQL 15**.
3. Compute + storage: **Burstable B1ms** (cheapest); 32 GB storage.
4. Create and note **Server name**, **Admin username**, **Password**.
5. After deploy: **Server** → **Connect** → **Connection strings** → copy **ADO.NET** or build:
   `postgresql://adminuser%40servername:YOUR_PASSWORD@servername.postgres.database.azure.com:5432/postgres?sslmode=require`  
   (URL-encode `@` in username as `%40`.)

---

## Step 2: Push code to GitHub

1. Create a new repo on [github.com](https://github.com) (e.g. `billrelief`).
2. On your machine, in the BillRelief folder:

```bash
cd /Users/narender/Desktop/Products/BillRelief
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/billrelief.git
git push -u origin main
```

(Replace `YOUR_USERNAME` and repo name if different.)

---

## Step 3: Create Azure Web App (free tier)

1. Go to [portal.azure.com](https://portal.azure.com).
2. **Create a resource** → search **Web App** → **Create**.
3. **Basics**
   - **Subscription**: your subscription.
   - **Resource group**: create new, e.g. `rg-billrelief`.
   - **Name**: e.g. `billrelief` (must be globally unique; try `billrelief-yourname`).
   - **Publish**: **Code**.
   - **Runtime stack**: **Node 20 LTS** (or 18 LTS).
   - **Operating System**: **Linux**.
   - **Region**: pick one close to you.
   - **Pricing**: **Free F1** (or **Dev/Test** → **F1**).
4. Click **Review + create** → **Create**.
5. After deploy, go to the **App Service** resource. Note the URL: `https://<your-app-name>.azurewebsites.net`.

---

## Step 4: Configure environment variables in Azure

1. In your App Service → **Settings** → **Environment variables** (or **Configuration** → **Application settings**).
2. Add these **Application settings** (name = key, value = your value):

| Name | Value | Notes |
|------|--------|--------|
| `DATABASE_URL` | `postgresql://...` | From Step 1 (Neon/Supabase/Azure Postgres). **Enable SSL** (e.g. `?sslmode=require`). |
| `NEXTAUTH_URL` | `https://<your-app-name>.azurewebsites.net` | Your Azure app URL (no trailing slash). |
| `NEXTAUTH_SECRET` | Long random string | e.g. `openssl rand -base64 32` |
| `PAYPAL_CLIENT_ID` | Your PayPal Client ID | From [developer.paypal.com](https://developer.paypal.com) |
| `PAYPAL_CLIENT_SECRET` | Your PayPal Secret | Same app |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Same as PAYPAL_CLIENT_ID | Must match |
| `PAYPAL_MODE` | `live` or `sandbox` | Use `live` for real payments |
| `NEXT_PUBLIC_PAYPAL_MODE` | `live` or `sandbox` | Same as above |
| `AZURE_STORAGE_CONNECTION_STRING` | (optional) Connection string | For persistent uploads; see [Azure Blob Storage](#azure-blob-storage-for-uploads) below. |
| `AZURE_STORAGE_CONTAINER_NAME` | (optional) e.g. `bill-uploads` | Blob container name; default `bill-uploads` if not set. |

3. **Save** the configuration.

---

## Step 5: Run database migrations

Your app needs the Prisma schema in the DB. Do **one** of the following.

### Option A: Run migrations from your PC (easiest)

Point `.env` at the **same** `DATABASE_URL` you set in Azure, then:

```bash
cd /Users/narender/Desktop/Products/BillRelief
npx prisma generate
npx prisma db push
```

(Or use `prisma migrate deploy` if you use migrations.)

### Option B: Run in Azure (SSH/Console)

1. App Service → **Development Tools** → **SSH** or **Advanced Tools** → **Go** (Kudu).
2. In the SSH/console, go to `/home/site/wwwroot` and run:

```bash
npx prisma generate
npx prisma db push
```

---

## Step 6: Deploy code to Azure

### Option A: Deploy with GitHub Actions (recommended)

1. **Azure:** App Service → **Deployment Center**.
   - **Source**: GitHub → Authorize and choose repo + branch (`main`).
   - **Build Provider**: **GitHub Actions**.
   - Finish **Save**; Azure will add a workflow and a **publish profile** (or you’ll get a secret).

2. **GitHub:** In your repo, add these **Secrets** (Settings → Secrets and variables → Actions):
   - `AZURE_WEBAPP_PUBLISH_PROFILE`:  
     In Azure: App Service → **Get publish profile** (download). Open the file, copy **all** content, and paste as the secret value.

3. **Use the workflow in this repo:** The file `.github/workflows/azure-deploy.yml` is already in the project. Open it and set `AZURE_WEBAPP_NAME` to your Azure app name (e.g. `billrelief` or `billrelief-yourname`). Reference (no need to create):

```yaml
name: Deploy to Azure App Service

on:
  push:
    branches: [main]

env:
  AZURE_WEBAPP_NAME: billrelief   # change to your app name

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Generate Prisma Client
        run: npx prisma generate

      - name: Build
        run: npm run build
        env:
          SKIP_ENV_VALIDATION: 1

      - name: Deploy to Azure
        uses: azure/webapps-deploy@v3
        with:
          app-name: ${{ env.AZURE_WEBAPP_NAME }}
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: .
```

4. **Important:** The workflow builds on GitHub but deploys the **entire repo** (including `node_modules` if present). For a **cleaner deploy**, use the **ZIP deploy** approach below so only built output is uploaded, or add a step that zips only `.next`, `public`, `package.json`, `node_modules` (production), and `prisma` (see Azure docs for “Deploy only build output”).

   Alternatively use **ZIP deploy** (Option B) from your machine.

### Option B: ZIP deploy from your machine

1. Build and prepare the app locally (use the **same** `DATABASE_URL` as Azure or a dummy for build):

```bash
cd /Users/narender/Desktop/Products/BillRelief
npm ci
npx prisma generate
npm run build
```

2. Create a zip of the **whole** project (including `node_modules` and `.next`):

```bash
zip -r deploy.zip . -x "*.git*" -x "uploads/*" -x ".env"
```

3. Install Azure CLI: [Install Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli). Then log in and deploy:

```bash
az login
az webapp deploy --resource-group rg-billrelief --name billrelief --src-path deploy.zip --type zip
```

(Replace `rg-billrelief` and `billrelief` with your resource group and app name.)

4. Set **startup command** in Azure so the app runs `npm start`:
   - App Service → **Configuration** → **General settings** → **Startup Command**: `npm start` → **Save**.

---

## Step 7: Startup command (required)

1. App Service → **Settings** → **Configuration** → **General settings**.
2. **Startup Command**: set to:

```bash
npm start
```

or, if you use a custom build step:

```bash
npm run build && npm start
```

3. **Save** and **Restart** the app.

---

## Step 8: Verify everything works

1. Open `https://<your-app-name>.azurewebsites.net`.
2. **Homepage** – loads.
3. **Register / Login** – works (NextAuth with `NEXTAUTH_URL` and `NEXTAUTH_SECRET`).
4. **Dashboard** – after login you see “My Bills”.
5. **Upload a bill** – file is stored under `uploads/` or in Azure Blob (see [Azure Blob Storage for uploads](#azure-blob-storage-for-uploads)).
6. **Pricing / Checkout** – PayPal works if env vars and `NEXTAUTH_URL` are correct.
7. **Blog** – `/blog` and related routes work.

If something fails, check **App Service → Log stream** and **Monitoring → Log** (or **Diagnose and solve problems**).

---

## Azure Blob Storage for uploads

The app supports **Azure Blob Storage** for bill uploads. When configured, files are stored in Blob Storage instead of local disk, so uploads persist across restarts and redeploys.

### Setup

1. **Create a Storage Account** (Azure Portal → Create a resource → Storage account).
   - Subscription, resource group, name (e.g. `billreliefuploads`), region.
   - Performance: Standard; Redundancy: LRS is fine for dev.
   - Create the account.

2. **Create a container** in the storage account:
   - Open the storage account → **Containers** → **+ Container**.
   - Name: `bill-uploads` (or any name; set `AZURE_STORAGE_CONTAINER_NAME` to match).
   - Public access: **Private (no anonymous access)**.
   - Create.

3. **Get the connection string:**
   - Storage account → **Access keys** → show **Connection string** for key1 (or key2).
   - Copy the full string (e.g. `DefaultEndpointsProtocol=https;AccountName=...;AccountKey=...;EndpointSuffix=core.windows.net`).

4. **Configure the app:**
   - In App Service **Configuration** → **Application settings**, add:
     - `AZURE_STORAGE_CONNECTION_STRING` = the connection string you copied.
     - `AZURE_STORAGE_CONTAINER_NAME` = `bill-uploads` (optional; this is the default).
   - Save and restart the app.

After this, new bill uploads are stored in Blob Storage. Existing rows that point to local paths (`/uploads/...`) continue to be served from disk when the file exists; blob-backed rows are served via a time-limited SAS redirect.

---

## Uploads on Azure (legacy / without Blob)

- **Without Blob:** If `AZURE_STORAGE_CONNECTION_STRING` is not set, uploaded files are saved under `uploads/<userId>/` on the **local disk** of the App Service instance.
- That disk is **ephemeral**; files can be lost on restart, scale-out, or redeploy.
- **With Blob:** See [Azure Blob Storage for uploads](#azure-blob-storage-for-uploads) above for persistent uploads.

---

## Troubleshooting

| Issue | What to do |
|-------|------------|
| **503 / App not loading** | Check **Startup Command** is `npm start`; check **Log stream** for errors. |
| **Database connection errors** | Ensure `DATABASE_URL` has `?sslmode=require` (Neon/Supabase/Azure Postgres). Run `npx prisma db push` (or migrations) once. |
| **NextAuth redirect / session** | Set `NEXTAUTH_URL` to `https://<your-app>.azurewebsites.net` (no trailing slash). |
| **PayPal not working** | Confirm all PayPal env vars are set and `NEXTAUTH_URL` is correct so redirects work. |
| **Build fails in Azure** | In Deployment Center, ensure Node version is 18 or 20. If needed, set **Application setting** `WEBSITE_NODE_DEFAULT_VERSION` = `20-lts`. |

---

## Summary checklist

- [ ] Free Postgres (Neon / Supabase / Azure) created; `DATABASE_URL` with SSL.
- [ ] Azure Web App (Linux, Node 20, **F1 Free**) created.
- [ ] All env vars set in App Service (including `NEXTAUTH_URL` and `NEXTAUTH_SECRET`).
- [ ] `npx prisma generate` and `npx prisma db push` run once.
- [ ] Startup command = `npm start` (and deploy includes `npm run build` if you build on server).
- [ ] Code deployed (GitHub Actions or ZIP).
- [ ] App URL opens; login, dashboard, upload, pricing/PayPal, and blog all tested.

After this, your app runs on Azure free tier with full functionality; for long-term reliability of uploads, add Azure Blob Storage as above.
