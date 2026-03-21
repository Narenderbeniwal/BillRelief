# Database connection (Neon + Prisma)

If BillBot shows **“Chat can't be saved right now (database unreachable)”**, the app cannot reach PostgreSQL. Fix connectivity — the banner is a symptom, not a bug in the widget.

---

## `nc: getaddrinfo: nodename nor servname provided, or not known`

Your Mac **cannot resolve the hostname** (DNS). Until this works, **nothing** can connect to Neon by name.

1. **System Settings → Network → Wi‑Fi → Details → DNS** — add **8.8.8.8** and **1.1.1.1** (above any router DNS).
2. Test:
   ```bash
   dig +short ep-damp-hall-a8j06sk2.eastus2.azure.neon.tech @8.8.8.8
   ```
   If this returns an IP but `dig` **without** `@8.8.8.8` fails, the problem is your **router DNS**.

Run **`npm run db:check-env`** — it checks URL shape and DNS for both `DATABASE_URL` and `DIRECT_URL` without printing passwords.

---

## Error `P1013` — “The provided database string is invalid… scheme is not recognized”

Usually **`DATABASE_URL` in `.env` is malformed**. Common fixes:

| Problem | Fix |
|--------|-----|
| Typo | Use **`postgresql://`** (not `postgressql`, not `psql://`). |
| Missing scheme | Line must be `DATABASE_URL="postgresql://..."` (include `postgresql://`). |
| Smart / curly quotes | Use straight `"` or no quotes. |
| **Backslashes before quotes** | Use `DATABASE_URL="postgresql://..."` — **not** `DATABASE_URL=\"postgresql://...\"` (that breaks the URL). |
| UTF-8 BOM | Re-save `.env` as UTF-8 **without BOM** (or run `npm run db:check-env` after pulling latest scripts). |
| `.env.local` overwrote with empty | Remove empty `DATABASE_URL=` from `.env.local`. |

After fixing, run **`npm run db:check-env`** then **`npm run db:ping:pooled`**.

---

## Error `P1001` — “Can't reach database server at `ep-….neon.tech:5432`”

That means **nothing on your Mac can open a raw Postgres TCP connection** to that host (DNS failure, firewall, VPN, wrong host, or Neon compute asleep).

### What Prisma is using

| Command | Connection used |
|--------|-------------------|
| `npm run db:ping` | Reads `prisma/schema.prisma` → with `directUrl` set, Prisma CLI uses **`DIRECT_URL`** (host **without** `-pooler`) on **port 5432**. |
| `npx prisma db push` | Same — uses **`DIRECT_URL`** for schema changes. |
| Next.js app (BillBot, etc.) | Uses **`DATABASE_URL`** via the Neon driver (often **WebSocket over 443**), which can work even when **5432** is blocked. |

So you can see **P1001 in the terminal** but the site **sometimes still talks to the DB** — or both fail, depending on your network.

### Fix it (try in order)

1. **Neon dashboard** — Open the project, confirm the branch isn’t deleted and compute isn’t stuck; run a query in **SQL Editor** to wake it.
2. **Fresh URLs** — **Connect** in Neon → copy new **pooled** → `DATABASE_URL`, **direct** → `DIRECT_URL`. Old `ep-…` endpoints change if you recreated the branch.
3. **DNS on the Mac** — **System Settings → Network → Wi‑Fi → Details → DNS** → add **8.8.8.8** and **1.1.1.1**. Then in Terminal:
   ```bash
   dig +short ep-damp-hall-a8j06sk2.eastus2.azure.neon.tech @8.8.8.8
   ```
   If you get no IP here but get one with `@8.8.8.8`, your router DNS is the problem.
4. **Port 5432** — Some Wi‑Fi / VPN / corporate networks block outbound **5432**. Test:
   ```bash
   nc -zv ep-damp-hall-a8j06sk2.eastus2.azure.neon.tech 5432
   ```
   Or try a **phone hotspot** and run `npm run db:ping` again.
5. **Compare pooled vs direct** (both use TCP in the CLI):
   ```bash
   npm run db:ping:pooled
   npm run db:ping
   ```
   If **both** fail → network/DNS/Neon. If **only** `db:ping` fails, paste **`DIRECT_URL`** again from Neon (direct connection string, no `-pooler`).

### Last resort for `db push` (dev only)

If **443/WSS works** but **5432 never works** on your network, run migrations from a network that allows **5432** (hotspot, CI, another machine), or use Neon **SQL Editor** for one-off DDL (not ideal). Do **not** rely on a fake `DIRECT_URL` long term — keep the real direct string from Neon for migrations.

### Direct host unreachable, but pooler works

`npm run db:ping` uses **`DIRECT_URL`** (host **without** `-pooler`). If that fails with **P1001** but the **pooled** URL is fine:

1. Check the pooler:
   ```bash
   npm run db:ping:pooled
   ```
2. If **pooled** succeeds, run Prisma **once** using the pooler for both (this command does **not** change your `.env` file):
   ```bash
   npm run db:ping:via-pool
   npm run db:push:via-pool
   ```
   Prefer fixing **DNS / hotspot / firewall** and using Neon’s real **`DIRECT_URL`** when you can.

### Accidental shell command

If you typed something like `p-hall-a8j06sk2…` and got “command not found”, that was a typo. To test port **5432** use:
```bash
nc -zv ep-damp-hall-a8j06sk2.eastus2.azure.neon.tech 5432
```

---

## 1. Use current URLs from Neon

1. Open [console.neon.tech](https://console.neon.tech) → your project → **Connect**.
2. Copy **two** connection strings:
   - **Pooled** (host contains `-pooler`) → put in **`.env`** as **`DATABASE_URL`**
   - **Direct** (host **without** `-pooler`) → put in **`.env`** as **`DIRECT_URL`**

Neon rotates endpoints if you recreate branches; old hostnames in `.env` will fail.

## 2. Query string (pooled URL)

For the **pooled** `DATABASE_URL`, append (or merge) these parameters:

```txt
?sslmode=require&pgbouncer=true&connect_timeout=30
```

- **`sslmode=require`** — required for Neon.
- **`pgbouncer=true`** — required when using the pooler with Prisma ([Prisma + PgBouncer](https://www.prisma.io/docs/guides/database/neon#connect-to-neon-using-the-prisma-neon-driver)).

Example:

```txt
postgresql://USER:PASSWORD@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=30
```

## 3. Wake the database

On Neon’s free tier, compute can **suspend** after idle time. Open the Neon dashboard and ensure the project/branch is **active**, then retry the app.

## 4. DNS (common on home routers)

If `nslookup YOUR-NEON-HOST` fails unless you pass `8.8.8.8`, your router’s DNS is blocking or mis-resolving Neon.

**Fix:** On your Mac: **System Settings → Network → Wi‑Fi → Details → DNS** and add **8.8.8.8** and **1.1.1.1**.

## 5. Firewalls and port 5432

Some networks block outbound **5432**. This project uses the **Neon serverless driver** over **WebSockets (HTTPS / 443)** for `*.neon.tech` URLs, which often works when raw Postgres TCP is blocked.

If it still fails, try another network (phone hotspot) to confirm.

## 6. Verify from the project root

From the project folder:

```bash
npm run db:ping          # uses DIRECT_URL (see P1001 section above)
npm run db:ping:pooled   # uses DATABASE_URL only — compare if unsure
```

If `db:ping` fails, fix `.env` / Neon / DNS / network (see **P1001** above), then run:

```bash
npx prisma generate
npx prisma db push
```

## 7. Production (e.g. Azure)

Set **`DATABASE_URL`** and **`DIRECT_URL`** in **Application settings** to the same values as a working Neon project (pooled + direct). Redeploy after changing them.

---

**Security:** Never commit `.env` or paste database URLs in public chats. Rotate the Neon password if it was exposed.
