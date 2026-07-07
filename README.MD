# TrackMate

TrackMate is a Node.js / Express backend for managing user transactions. It includes authentication, protected transaction routes, file upload support, Swagger API documentation, and basic admin authorization.

## Features

- User registration and login with JWT
- Protected transaction CRUD routes
- Monthly transaction summary endpoint
- Profile image upload via Cloudinary
- Swagger API docs at `/docs`
- Rate limiting, CORS, and security with Helmet

## Project Structure

- `index.js` — Express app and route mounting
- `Routes/` — Route definitions for auth, transactions, admin, upload
- `controllers/` — Controller logic for auth, transactions, upload
- `middlewares/` — Auth, validation, upload, rate limiter, error handling
- `model/` — Mongoose models for User and Transaction
- `schemas/` — Zod request validation schemas
- `utils/` — Swagger config, Cloudinary helper, token generation

## Requirements

- Node.js 18+ (or compatible)
- MongoDB connection string
- Cloudinary account if using file upload

## Environment Variables

Create a `.env` file in the root folder with:

```env
PORT=5000
NODE_ENV=development
MONGO_URI_DEV=<your-dev-mongo-uri>
MONGO_URI_PRO=<your-production-mongo-uri>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
JWT_SECRET=<your_jwt_secret>
```

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## API Base URLs

- Local development: `http://localhost:5000`
- Swagger docs: `http://localhost:5000/docs`

## Main Routes

### Auth

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — authenticate and receive JWT
- `POST /api/auth/getAllUsers` — list all users

### Transactions

- `POST /api/transaction/transaction` — create a transaction
- `GET /api/transaction` — get current user transactions
- `GET /api/transaction/summary` — get monthly summary
- `PUT /api/transaction/:id` — update a transaction
- `DELETE /api/transaction/:id` — delete a transaction

### Upload

- `POST /api/upload/profile-picture` — upload profile picture (authenticated)

### Admin

- `GET /api/admin/dashboard` — admin dashboard access (admin-only)

## Notes

- The API uses JWT authentication on protected endpoints.
- Swagger docs are generated from route annotations.
- Make sure the `.env` values are set before running the server.
