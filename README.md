# 🏆 Leaderboard App (Full Stack with Redis, MongoDB, Node.js, React)

This project is a full-stack **Leaderboard Management Application** built with:

- **Frontend**: React + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Atlas)
- **Cache Layer**: Redis (Render Key-Value Store)

Users can be added and awarded points. A leaderboard shows users sorted by score, and caching via Redis ensures better performance and faster data fetch.

---

## 🚀 Live Demo

- **Frontend**: https://leaderboard-assignment-nine.vercel.app/
- **Backend**: https://leaderboard-assignment-crgm.onrender.com

---

## 📦 Features

- ✅ Add players (users)
- ✅ Award points to users (claim points)
- ✅ View leaderboard (sorted by score)
- ✅ View claim history with timestamps
- ✅ Uses Redis to cache leaderboard data (for faster fetch)
- ✅ Uses MongoDB for persistent storage

---

## 🔧 Technologies Used

### Backend
- Node.js
- Express
- MongoDB (Mongoose ODM)
- Redis (via `ioredis`)
- Render for backend hosting

### Frontend
- React
- Tailwind CSS
- Axios
- Toast notifications (for UX)

---

## 🛠️ Project Structure

```bash
.
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── redis.js
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/axios.js
│   └── App.jsx
```
Note: Use your own mongodb url and redis port in project env.
