# TrackNexus Backend

A complete Node.js backend API for the TrackNexus dashboard with MongoDB database.

## Features

- **Authentication**: JWT-based auth system with user registration and login
- **User Management**: CRUD operations for users with role-based access
- **Lead Management**: Complete lead tracking system with status and priority management
- **Analytics Dashboard**: Real-time analytics and reporting
- **Activity Tracking**: Comprehensive activity logging system
- **Security**: Rate limiting, CORS, helmet, compression middleware

## Tech Stack

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Morgan** for logging
- **Helmet** for security headers

## Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Update .env with your configuration
```

3. Make sure MongoDB is running on your system

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Users
- `GET /api/users` - Get all users (paginated)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Leads
- `GET /api/leads` - Get all leads (paginated)
- `POST /api/leads` - Create new lead
- `GET /api/leads/recent` - Get recent leads
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Analytics
- `GET /api/analytics/overview` - Get dashboard overview
- `GET /api/analytics/activity` - Get activity feed
- `GET /api/analytics/performance` - Get performance metrics

### Activity
- `POST /api/activity` - Log activity
- `GET /api/activity/user/:userId` - Get user activities
- `GET /api/activity/recent` - Get recent activities

## Database Models

### User
- name, email, password, role, avatar, company, phone
- Roles: admin, manager, user

### Lead
- name, email, phone, company, source, status, priority, value
- Status: new, contacted, qualified, converted, lost
- Priority: low, medium, high

### Activity
- user, type, description, metadata, timestamp
- Types: login, logout, lead_created, lead_updated, etc.

## Security Features

- JWT authentication with expiration
- Password hashing with bcrypt
- Rate limiting to prevent abuse
- CORS configuration
- Helmet security headers
- Input validation and sanitization

## Development

The server runs on port 5000 by default. Use `npm run dev` for development with auto-restart.

## Environment Variables

Create a `.env` file with:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tracknexus
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

## API Response Format

All API responses follow this format:

Success:
```json
{
  "message": "Success message",
  "data": { ... }
}
```

Error:
```json
{
  "error": "Error message"
}
```
