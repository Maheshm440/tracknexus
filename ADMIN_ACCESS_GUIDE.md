# Admin Access Control - Implementation Guide

## Overview
The dashboard is now protected with role-based access control (RBAC). Only users with the `admin` role can access the dashboard. Regular users will be redirected to an access denied page.

## What Changed

### 1. User Role Configuration
- **New file**: `lib/auth-config.ts`
- Defines user roles: `admin` or `user`
- Currently configured users:
  - `kesavula.reddy@workisy.com` - Admin
  - `mahesh.mangala@workisy.com` - Admin

### 2. Authentication Middleware
- **Updated**: `middleware.ts`
- Now checks both authentication AND admin role
- Non-admin users are redirected to `/access-denied`
- Sets two cookies: `tracknexus_auth` (email) and `tracknexus_role` (role)

### 3. Login API
- **Updated**: `app/api/auth/login/route.ts`
- Validates user email and role from config
- Returns user information including role
- Sets role cookie for authorization

### 4. Logout API
- **Updated**: `app/api/auth/logout/route.ts`
- Now clears both auth and role cookies

### 5. Login Page
- **Updated**: `app/login/page.tsx`
- Redirects admins to dashboard
- Redirects regular users to homepage
- Removed client-side email whitelist (now handled by server)

### 6. Access Denied Page
- **New file**: `app/access-denied/page.tsx`
- Shows when non-admin users try to access dashboard
- Auto-redirects to homepage after 5 seconds
- Provides logout option

## How to Add New Users

### Adding an Admin User
Edit `lib/auth-config.ts`:
```typescript
export const USERS: UserConfig[] = [
  // ... existing users
  {
    email: 'newadmin@example.com',
    role: 'admin',
    name: 'New Admin'
  }
];
```

### Adding a Regular User
```typescript
export const USERS: UserConfig[] = [
  // ... existing users
  {
    email: 'user@example.com',
    role: 'user',
    name: 'Regular User'
  }
];
```

## Access Control Flow

### Admin User Login
1. User enters email on `/login`
2. Server validates email and checks role = 'admin'
3. Sets cookies: `tracknexus_auth` and `tracknexus_role=admin`
4. Redirects to `/dashboard`
5. Middleware allows access ✅

### Regular User Login
1. User enters email on `/login`
2. Server validates email and checks role = 'user'
3. Sets cookies: `tracknexus_auth` and `tracknexus_role=user`
4. Redirects to homepage `/`
5. If user tries to access `/dashboard`, middleware redirects to `/access-denied` ❌

### Unauthorized Access Attempt
1. Non-admin user tries to access `/dashboard`
2. Middleware checks `tracknexus_role` cookie
3. Role is not 'admin'
4. Redirects to `/access-denied`
5. Access denied page auto-redirects to homepage after 5 seconds

## Testing

### Test Admin Access
1. Go to http://localhost:3001/login
2. Enter: `kesavula.reddy@workisy.com`
3. Should redirect to dashboard ✅

### Test User Access (Add a test user first)
1. Add a test user with `role: 'user'` in `lib/auth-config.ts`
2. Login with that email
3. Should redirect to homepage, NOT dashboard ✅
4. Try accessing `/dashboard` directly
5. Should show "Access Denied" page ✅

## Security Features

- ✅ HTTP-only cookies (protected from JavaScript access)
- ✅ Server-side role validation
- ✅ Middleware protection on all dashboard routes
- ✅ Separate auth and role cookies
- ✅ Automatic logout on unauthorized access
- ✅ No client-side role bypass possible

## API Endpoints

### Login
- **POST** `/api/auth/login`
- Body: `{ email: string }`
- Returns: User info with role
- Sets cookies: `tracknexus_auth`, `tracknexus_role`

### Logout
- **POST** `/api/auth/logout`
- Clears both auth cookies
- Redirects to login page

## Important Notes

1. **Dashboard routes** (`/dashboard/*`) are protected by middleware
2. **Only admins** can access dashboard pages
3. **Regular users** get redirected to `/access-denied`
4. **Cookies expire** after 7 days
5. **Role cannot be changed** without server-side code modification

## Customization

### Change Auto-Redirect Timeout
Edit `app/access-denied/page.tsx`:
```typescript
const [countdown, setCountdown] = useState(5); // Change to desired seconds
```

### Add Custom User Pages
Create protected routes for regular users:
```typescript
// In middleware.ts, add new protected sections
if (pathname.startsWith('/user-dashboard')) {
  // Check for 'user' role instead of 'admin'
}
```

## Current Admin Emails
- kesavula.reddy@workisy.com
- mahesh.mangala@workisy.com

Both configured as admins and can access the full dashboard.
