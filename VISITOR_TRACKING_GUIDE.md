# Visitor Tracking Dashboard Setup

## 🎯 **How to Check Dashboard Updates Based on Visitors**

### **1. Backend is Running**
✅ Server: `http://localhost:5000`
✅ Visitor tracking: `/api/visitors/track`
✅ Dashboard API: `/api/dashboard`

### **2. How Visitor Tracking Works**

**Automatic Tracking:**
- Every time someone visits your dashboard, it automatically tracks them
- Tracks IP address, page visited, user agent, referrer
- Updates visitor count and page views in real-time

**What Gets Tracked:**
- **Total Visitors**: Unique visitors to your site
- **Today's Visitors**: Visitors who visited today
- **Total Page Views**: All page views across all visits
- **Today's Page Views**: Page views from today
- **Avg Pages/Visit**: Average pages per visitor
- **Recent Visitors**: Latest 5 visitors with details

### **3. How to Test Visitor Tracking**

**Step 1: Open Dashboard**
- Go to: `http://localhost:3000/dashboard`
- This will automatically track your visit

**Step 2: Check Console Logs**
- Open browser dev tools (F12)
- Go to Console tab
- You should see: "Visitor tracked: {visitorId, totalVisits}"

**Step 3: Refresh Dashboard**
- Click the "Refresh" button or reload the page
- Watch the visitor count increase

**Step 4: Test Multiple Visits**
- Open the dashboard in different browsers
- Use incognito/private browsing
- Each will count as a unique visitor

### **4. Real-time Dashboard Updates**

**What You'll See:**
- **Total Visitors**: Increases with each unique visitor
- **Today's Visitors**: Shows today's visitor count
- **Total Page Views**: Counts every page load
- **Recent Visitors**: Shows latest 5 visitors with:
  - IP address
  - Visit count
  - Last visit time
  - User agent (browser info)
  - Referrer (where they came from)

### **5. API Endpoints for Testing**

**Track Visitor:**
```bash
POST http://localhost:5000/api/visitors/track
{
  "page": "/dashboard",
  "userAgent": "Mozilla/5.0...",
  "ip": "192.168.1.1",
  "referrer": "https://google.com"
}
```

**Get Visitor Analytics:**
```bash
GET http://localhost:5000/api/visitors/analytics
```

**Get Dashboard with Visitor Data:**
```bash
GET http://localhost:5000/api/dashboard
```

### **6. Database Tables Created**

**Visitor Table:**
- Tracks unique visitors by IP
- Counts total visits per visitor
- Records first and last visit times

**PageVisit Table:**
- Tracks every page visit
- Links to visitor and user
- Records timestamp and page details

**DashboardStats Table:**
- Daily aggregated statistics
- Updates automatically with each visit

### **7. How to Verify It's Working**

**Check Dashboard:**
1. Visit `http://localhost:3000/dashboard`
2. Look at the new visitor cards:
   - Total Visitors should be > 0
   - Today's Visitors should be > 0
   - Recent Visitors should show your IP

**Check Database:**
```bash
npm run db:studio
```
- Open Prisma Studio at `http://localhost:5555`
- Browse the `visitors` and `page_visits` tables

**Check API:**
```bash
curl http://localhost:5000/api/dashboard
```
- Should return visitor analytics in the response

### **8. Real-time Updates**

The dashboard updates in real-time:
- **Immediate**: Visitor count updates when someone visits
- **Automatic**: No need to refresh for basic counts
- **Detailed**: Refresh for recent visitors list

Your dashboard now tracks every visitor and shows real-time analytics! 🎉
