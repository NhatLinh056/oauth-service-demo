# OAuth Service Demo

A Demo OAuth 2.0 login with Google and Facebook. Built with React, TypeScript, Vite, and NestJS, it redirects users through each provider, handles OAuth callbacks on the backend, and displays basic user profile information on the frontend.

## Features

- Login with Google OAuth 2.0
- Login with Facebook OAuth 2.0
- Backend callback handling with NestJS and Passport
- Display authenticated user's basic profile on React
- Simple client-side logout for this learning demo

## Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: NestJS, TypeScript, Passport
- OAuth Providers: Google and Facebook

## OAuth Flow

```text
React frontend
→ NestJS backend
→ Google or Facebook
→ Backend callback receives the authorization code
→ Backend retrieves the user profile
→ Backend redirects to React
→ React displays the user
```

The application never receives the user's Google or Facebook password. Client secrets stay in the backend environment file and are not committed to Git.

## Project Structure

```text
oauth-service-demo/
├── backend/      # NestJS OAuth service
├── frontend/     # React + Vite application
├── .gitignore
└── README.md
```

## Setup

### 1. Configure the backend

```powershell
cd backend
npm install
```

Create `backend/.env`:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback
```

Configure these callback URLs in Google Cloud Console and Meta for Developers:

```text
http://localhost:3000/auth/google/callback
http://localhost:3000/auth/facebook/callback
```

Start the backend:

```powershell
npm run start:dev
```

### 2. Configure the frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` and choose Google or Facebook login.

## Verification

```powershell
cd backend
npm run build
npm run lint
npm run test:e2e

cd ../frontend
npm run build
npm run lint
```

## Notes

This is a learning project for understanding OAuth redirect, callback, authorization code, access token, and frontend/backend cooperation. It intentionally does not use a database, JWT, refresh token, or Docker.
