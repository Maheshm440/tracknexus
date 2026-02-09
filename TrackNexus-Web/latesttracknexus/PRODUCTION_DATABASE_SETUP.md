# Production Database Setup Guide

## Overview

This guide explains how to migrate from SQLite (development) to PostgreSQL (production) for the TrackNexus-Web application.

## Prerequisites

- Node.js installed
- Prisma CLI installed (`npm install -g prisma`)
- Access to a PostgreSQL database

---

## Option 1: Vercel Postgres (Recommended for Vercel Deployments)

### Setup Steps

1. **Install Vercel Postgres SDK:**
   ```bash
   npm install @vercel/postgres
   ```

2. **Create Database in Vercel Dashboard:**
   - Go to your Vercel project
   - Navigate to Storage → Create Database → Postgres
   - Copy the `DATABASE_URL` from the environment variables section

3. **Add to Environment:**
   ```env
   DATABASE_URL="postgres://USER:PASSWORD@HOST/DATABASE?sslmode=require"
   ```

4. **Run Migrations:**
   ```bash
   npx prisma migrate deploy
   ```

5. **Seed Database:**
   ```bash
   npx prisma db seed
   ```

---

## Option 2: Neon (Serverless Postgres)

### Setup Steps

1. **Sign up at [neon.tech](https://neon.tech)**

2. **Create a new project**

3. **Copy the connection string** from the dashboard

4. **Add to `.env`:**
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
   ```

5. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

### Advantages
- Serverless (scales to zero)
- Fast cold starts
- Automatic backups
- Free tier available

---

## Option 3: Supabase

### Setup Steps

1. **Sign up at [supabase.com](https://supabase.com)**

2. **Create a new project**

3. **Get connection string from Settings → Database**
   - Use the "Connection pooling" URL for production

4. **Add to `.env`:**
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:6543/postgres?pgbouncer=true"
   ```

5. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

### Advantages
- Includes authentication, storage, and real-time features
- Built-in connection pooling
- Free tier with 500MB database

---

## Option 4: Railway

### Setup Steps

1. **Sign up at [railway.app](https://railway.app)**

2. **Create a new PostgreSQL database**

3. **Copy the connection string**

4. **Add to `.env`:**
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

5. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

---

## Migration Commands

### Generate Migration (Development)
```bash
npx prisma migrate dev --name migration_name
```

### Deploy Migrations (Production)
```bash
npx prisma migrate deploy
```

### Reset Database (Development Only)
```bash
npx prisma migrate reset
```

### Seed Production Database
```bash
npx prisma db seed
```

---

## Connection Pooling

For production environments, use connection pooling to handle multiple requests efficiently:

### Configuration

```env
# Direct connection (for migrations)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"

# Pooled connection (for app runtime)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?pgbouncer=true&connection_limit=1"
```

### Recommended Settings

- **Connection Limit**: 1 per serverless function
- **Pool Size**: 10-20 for traditional servers
- **Timeout**: 10 seconds

---

## Environment Variables

### Development (.env)
```env
DATABASE_URL="file:./backend/prisma/dev.db"
```

### Production (.env.production or deployment platform)
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
NODE_ENV="production"
```

---

## Troubleshooting

### Error: "Can't reach database server"
- Check if PostgreSQL is running
- Verify connection string is correct
- Check firewall settings
- Ensure SSL mode is set correctly

### Error: "Migration failed"
- Ensure database is empty or backed up
- Check Prisma version compatibility
- Review migration files for syntax errors

### Error: "Too many connections"
- Enable connection pooling
- Reduce connection limit per function
- Use a connection pooler like PgBouncer

---

## Data Migration from SQLite

If you have existing data in SQLite:

### 1. Export Data
```bash
# Export to SQL
sqlite3 backend/prisma/dev.db .dump > data.sql
```

### 2. Convert to PostgreSQL Format
- Use a tool like [pgloader](https://pgloader.io/)
- Or manually adjust SQL syntax

### 3. Import to PostgreSQL
```bash
psql $DATABASE_URL < data.sql
```

---

## Verification

After migration, verify the setup:

### 1. Test Connection
```bash
npx prisma db pull
```

### 2. Check Migrations
```bash
npx prisma migrate status
```

### 3. Open Prisma Studio
```bash
npx prisma studio
```

### 4. Verify Admin User
- Open Prisma Studio
- Check that the admin user exists
- Verify MFA settings if applicable

---

## Security Checklist

- [ ] DATABASE_URL uses SSL (`sslmode=require`)
- [ ] Connection string stored in environment variables (not in code)
- [ ] Connection pooling enabled for production
- [ ] Database credentials rotated regularly
- [ ] Backups configured and tested
- [ ] Database accessible only from allowed IPs
- [ ] Connection timeout configured
- [ ] Monitoring and alerts set up

---

## Performance Tips

1. **Enable Connection Pooling**: Reduces connection overhead
2. **Use Indexes**: Add indexes to frequently queried columns
3. **Optimize Queries**: Use Prisma's query optimization
4. **Monitor Performance**: Set up query monitoring
5. **Regular Maintenance**: Run VACUUM and ANALYZE regularly

---

## Backup Strategy

### Automated Backups

Most PostgreSQL providers offer automated backups:
- **Vercel**: Automatic daily backups
- **Neon**: Point-in-time recovery
- **Supabase**: Daily backups on paid plans
- **Railway**: Automatic snapshots

### Manual Backup

```bash
# Backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

---

## Need Help?

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Neon Documentation](https://neon.tech/docs)
- [Supabase Documentation](https://supabase.com/docs)
