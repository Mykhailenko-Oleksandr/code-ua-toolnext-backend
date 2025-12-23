# 🧰 ToolNext Backend

## 🔍 About the Project

**ToolNext** is a full-stack application for renting and publishing tools. This backend provides a RESTful API for authentication, user profiles, tool listings, bookings, categories, and feedback. It was developed as part of a team project during the final stage of a React + Node.js course.

The backend is built with **Node.js**, uses **MongoDB** for data storage, and includes **JWT-based authentication**, **file uploads**, and **Swagger API documentation**.

## 🚀 Technologies Used

- 🟩 **Node.js + Express**
- 🍃 **MongoDB + Mongoose**
- 🔐 **JWT** – authentication
- 🧪 **Joi** – data validation
- 📦 **Multer** – file uploads
- 🧰 **Swagger** – API documentation
- 🛡️ **CORS, dotenv, helmet, morgan**

## ⚙️ Getting Started

1. 📥 Clone the repository:

   ```bash
   git clone https://github.com/your-team/toolnext-backend.git
   cd toolnext-backend
   ```

2. 📦 Install dependencies:

   ```bash
   npm install
   ```

3. 🛠️ Create a `.env` file based on `.env.template`:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000
   ```

4. ▶️ Run the development server:
   ```bash
   npm run dev
   ```

## 📚 API Documentation

Interactive Swagger documentation is available at:

```
http://localhost:5000/api-docs
```

Or view the deployed version here:
🌐 [Swagger UI – ToolNext API](https://your-deployed-backend.com/api-docs)

## 🧾 Main Endpoints

### 🔐 Auth – `/api/auth`

- `POST /register` – Register a new user
- `POST /login` – Log in
- `POST /logout` – Log out (private)

### 👤 Users – `/api/users`

- `GET /me` – Get current user info (private)
- `GET /:userId` – Get public user profile
- `GET /:userId/tools` – Get tools by user

### 🛠️ Tools – `/api/tools`

- `POST /` – Create a tool (private)
- `GET /` – Get all tools (pagination, filtering, search)
- `GET /:toolId` – Get tool details
- `PATCH /:toolId` – Edit tool (owner only)
- `DELETE /:toolId` – Delete tool (owner only)

### 📅 Bookings – `/api/bookings`

- `POST /` – Create a booking (private)

### 🗂️ Categories – `/api/categories`

- `GET /` – Get all categories

### ⭐ Feedbacks – `/api/feedbacks`

- `GET /` – Get feedback list (with pagination)
- `POST /` – Submit feedback (private, optional)

## ✅ Validation Rules

### 🔐 Registration

- `name`: string, 2–32 chars
- `email`: valid email, max 64, unique
- `password`: string, 8–128 chars

### 🛠️ Tool Form

- `name`: string, 3–96 chars
- `pricePerDay`: number ≥ 0
- `categoryId`: valid ID
- `description`: 20–2000 chars
- `terms`: 20–1000 chars
- `specifications`: optional, max 1000 chars
- `images`: jpg/png, max 1MB

### 📅 Booking Form

- `toolId`: valid ID
- `firstName`, `lastName`: 2–50 chars
- `phone`: valid format
- `startDate`, `endDate`: format `YYYY-MM-DD`
- `deliveryCity`: 2–100 chars
- `deliveryBranch`: 1–200 chars

## 🌐 Deployment

The backend is deployed on [Render](https://render.com) or similar hosting.
Swagger is publicly accessible at:
🔗 [https://your-deployed-backend.com/api-docs](https://your-deployed-backend.com/api-docs)

## 👥 ToolNext Team

- 👑 **Oleksandr Mykhailenko** – TL-developer
- 🧭 **Mykhailo Kit** – SM-1 developer
- 🧭 **Alla Yevlampieva** – SM-2 developer
- 👨‍💻 **Oleh Butenko** – developer
- 👩‍💻 **Liubov Yurinets** – developer
- 👨‍💻 **Valerii Zalevskyi** – developer
- 👩‍💻 **Tetiana Haidar** – developer
- 👨‍💻 **Vadym Linov** – developer
- 👩‍💻 **Kateryna Balashova** – developer
- 👨‍💻 **Borys Savenok** – developer
- 👨‍💻 **Serhii Komarov** – developer
- 👨‍💻 **Andrii Bondarenko** – developer
- 👨‍💻 **Andrii Zinchenko** – developer
- 👨‍💻 **Oleksandr Shpylovyi** – developer
- 👨‍💻 **Andrii Krisenko** – developer

```

```
