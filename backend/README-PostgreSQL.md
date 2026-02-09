# PostgreSQL Setup with Docker (Easiest Option)

## Quick Start with Docker

### Step 1: Run PostgreSQL Container
```bash
docker run --name postgres-tracknexus -e POSTGRES_PASSWORD=postgres123 -e POSTGRES_DB=tracknexus -p 5432 -d postgres:14
```

### Step 2: Create .env File
Create `.env` file in backend folder:
```env
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/tracknexus"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-min-32-characters"
JWT_EXPIRE="7d"
PORT=5000
```

### Step 3: Initialize Database
```bash
npm run db:push
npm run db:seed
```

### Step 4: Start Backend
```bash
npm run dev
```

### Step 5: View Dashboard
Open browser: `http://localhost:3000/dashboard`

## Alternative: Install PostgreSQL Locally

### Windows
1. Download from: https://www.postgresql.org/download/windows/
2. Run installer with default settings
3. Open pgAdmin 4 (comes with installer)
4. Create database named "tracknexus"
5. Use connection string: `postgresql://postgres:yourpassword@localhost:5432/tracknexus`

### macOS
```bash
brew install postgresql
brew services start postgresql
createdb tracknexus
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql
CREATE DATABASE tracknexus;
CREATE USER tracknexus_user WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE tracknexus TO tracknexus_user;
```

## Test Connection
```bash
npm run test
```

## Database Studio
```bash
npm run db:studio
```
Open: http://localhost:5555
