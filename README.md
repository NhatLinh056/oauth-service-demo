# Social OAuth Login Demo

Demo full-stack để học OAuth 2.0 với Google và Facebook.

## Luồng đăng nhập

```text
React frontend
→ NestJS backend
→ Google hoặc Facebook
→ backend callback nhận authorization code
→ backend lấy profile user
→ redirect về frontend
→ hiển thị user và logout giao diện
```

Frontend không nhận password, Client Secret hoặc access token của Google/Facebook.

## Cấu trúc project

```text
social-oauth-login-demo/
├── backend/                 # NestJS OAuth service
├── frontend/                # React + TypeScript + Vite
├── .gitignore
└── README.md
```

## Chạy backend

```powershell
cd backend
npm install
npm run start:dev
```

Backend chạy mặc định tại `http://localhost:3000`.

Tạo file `backend/.env` và điền credentials thật. Không commit file này.

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback
```

## Chạy frontend

```powershell
cd frontend
npm install
npm run dev
```

Mở `http://localhost:5173`.

## OAuth redirect URIs

Google và Facebook cần được cấu hình đúng các callback sau:

```text
http://localhost:3000/auth/google/callback
http://localhost:3000/auth/facebook/callback
```

## Kiểm tra

```powershell
cd backend
npm run build
npm run lint
npm run test:e2e

cd ../frontend
npm run build
npm run lint
```

`npm test` hiện không có unit test riêng; lệnh vẫn pass để phản ánh đúng trạng thái project.
