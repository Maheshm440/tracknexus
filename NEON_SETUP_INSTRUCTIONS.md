# Neon.tech PostgreSQL Setup for TrackNexus

## Quick Setup (2-3 minutes)

### Step 1: Create Neon Account
- Go to https://neon.tech
- Click "Sign Up" → Use GitHub/Google or email
- Verify email (if using email)

### Step 2: Create Database Project
- Click "Create a project"
- Name: `tracknexus-dev`
- Region: Choose closest to you (US East recommended)
- PostgreSQL version: 16 or latest
- Click "Create project"

### Step 3: Copy Connection String
- Dashboard shows your connection string
- It looks like: 
  ```
  postgresql://neon_user:password@ep-xxxxx.neon.tech/tracknexus-dev?sslmode=require
  ```
- **Copy the full string**

### Step 4: Add to .env
Update your `.env` file:
```
DATABASE_URL="postgresql://neon_user:password@ep-xxxxx.neon.tech/tracknexus-dev?sslmode=require"
```

### Step 5: Test Connection
```bash
npx prisma db pull  # Should connect successfully
```

## That's it! Your PostgreSQL database is ready! 🎉

**Next Steps:** Run the migration and seed data
```bash
npx prisma migrate dev
npm run seed
```

## Troubleshooting

### Connection refused
- Check your CONNECTION_STRING has correct credentials
- Verify `sslmode=require` is in the URL
- Try removing `?sslmode=require` if issues persist

### Password reset
- Go to Neon dashboard → Project settings → Edit compute
- Reset password if needed

### Need more help?
- Neon docs: https://neon.tech/docs/get-started-with-neon/signing-up
- Prisma PostgreSQL: https://www.prisma.io/docs/orm/overview/databases/postgresql

