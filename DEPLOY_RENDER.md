# Deployment Guide: MDT-EXTRA CRM Backend on Render

## Prerequisites
- A GitHub account with this repository pushed to it.
- A Render.com account.

## Step 1: Database Setup (PostgreSQL)
1. Log in to **Render Dashboard**.
2. Click **New +** -> **PostgreSQL**.
3. **Name**: `mdt-crm-db` (or similar).
4. **Database**: `crm_db`.
5. **User**: `admin` (or leave default).
6. **Region**: Choose one close to you (e.g., Frankfurt/London for EU).
7. Select the **Free Plan** (for dev) or a paid plan.
8. Click **Create Database**.
9. **Wait** for it to be created.
10. Copy the **Internal Database URL** (for backend service) and **External Database URL** (if you want to connect from your PC).

## Step 2: Backend Service Setup
1. On Render Dashboard, Click **New +** -> **Web Service**.
2. Connect your **GitHub Repository**.
3. Select the repository.
4. **Name**: `mdt-crm-backend`.
5. **Region**: Same as your database.
6. **Branch**: `main` (or your working branch).
7. **Root Directory**: `backend` (IMPORTANT: because your NestJS app is in a subfolder).
8. **Runtime**: `Node`.
9. **Build Command**: `npm install && npm run build`.
10. **Start Command**: `npm run start:prod`.

## Step 3: Environment Variables
Scroll down to the "Environment Variables" section and add the following keys. Use the **Internal Database URL** from Step 1.

| Key | Value | Note |
|-----|-------|------|
| `DB_HOST` | *Host from Internal URL* | e.g. `dpg-chn...a.oregon-postgres.render.com` |
| `DB_PORT` | `5432` | Standard Postgres port |
| `DB_USER` | *User from Internal URL* | e.g. `admin` |
| `DB_PASSWORD` | *Password from Internal URL* | Hidden in dashboard |
| `DB_NAME` | `crm_db` | Or whatever name you chose |
| `PORT` | `3000` | Render expects this or will assign its own |

*Alternatively, if you can just paste the full connection string:*
Many Render apps work better with a single connection string. If you used the `TypeOrmModule` with individual params, keep the above. If you modify `app.module.ts` to use a `DATABASE_URL`, just add `DATABASE_URL` = *Internal Database URL*.

## Step 4: Deploy
1. Click **Create Web Service**.
2. Render will start the build process.
3. Watch the logs. It should say `Nest application successfully started`.

## Step 5: Verify
1. Once deployed, Render gives you a URL (e.g., `https://mdt-crm-backend.onrender.com`).
2. Test a health check endpoint or Swagger if enabled.
