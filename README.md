---
# MERN Blog Platform 📝🚀

A full-featured blog application built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, create and manage their own blogs, like and comment on posts, and view others' blogs.


---

## 📚 Features

### 🔐 Authentication
- Register and login using email & password
- JSON Web Token (JWT)-based session management
- Protected routes for authenticated users

### 🧑‍💻 User Dashboard
- Profile dropdown with logout, create blog, view profile
- Personalized blog listing (My Blogs)
- User avatar and welcome message

### 📝 Blog Management
- Create, read, update, and delete your own blogs
- Rich text blog content
- Upload featured images
- Like and comment functionality

### 🗂️ Blog Feed
- View all published blogs
- Like counts & comment counts
- Sorted by latest posts

### 💬 Comments & Likes
- Add comments to any blog
- Like functionality with real-time UI update
- Likes stored as user references in the DB

### 🔥 Toast Notifications
- Clean feedback using `react-hot-toast` across the app:
  - Login/logout
  - Protected route redirects
  - Blog actions (create, delete)

### 🧠 Conditional Rendering
- Navbar changes based on login status
- Profile dropdown visibility
- Only blog owners can edit/delete their blogs

---

## 🛠️ Tech Stack

### Frontend:
- React
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for auth
- Multer for image upload

---

## 📂 Folder Structure

```bash
MERN-BLOG/
├── client/              # React frontend
│   ├── components/      # UI components
│   ├── pages/           # Pages (Home, Login, MyBlogs, etc.)
│   ├── context/         # Auth context
│   └── utils/           # Toast utility, API helpers
├── server/              # Backend
│   ├── controllers/     # Logic for blog, user
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── models/          # Mongoose schemas
│   └── uploads/         # Blog images
````

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/aakash-gupta02/MERN-BLOG.git
cd MERN-BLOG
```

### 2. Setup Backend

```bash
cd server
npm install
```

* Create `.env` in `server/`:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

* Start backend:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

### 4. Access App

Visit: `http://localhost:5173`

---

## 📦 API Routes Overview

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/me` – get logged-in user

### Blogs

* `GET /api/blogs`
* `POST /api/blogs`
* `GET /api/blogs/:id`
* `PUT /api/blogs/:id`
* `DELETE /api/blogs/:id`
* `PUT /api/blogs/like/:id`
* `POST /api/blogs/comment/:id`

---

## 📸 Screenshots

*(Add screenshots of UI here once ready)*

---

## 💡 Future Improvements

* Rich text editor (e.g., Quill.js)
* Pagination
* Admin dashboard
* Tags and categories
* Blog search
* Public user profiles

---

## ✅ Installation Prerequisites

* Node.js (v16+)
* MongoDB (local or Atlas)
* Git
* VS Code or preferred editor

---

## 🙋‍♂️ Author

Made with 💻 by [Aakash Gupta](https://github.com/aakash-gupta02)

---

## 🧪 Disclaimer

**This project is built for learning and practice purposes only.** It is not meant for production use.

```

---
