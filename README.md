# Chat Summariser (Frontend)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&labelColor=101010)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss&logoColor=white&labelColor=101010)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animation-FF0050?logo=framer&logoColor=white&labelColor=101010)
![Render](https://img.shields.io/badge/Hosted%20on-Render-46E3B7?logo=render&logoColor=white&labelColor=101010)

A sleek, responsive React UI to chat, summarise conversations, and run intelligent queries over past chats. Built with **Create React App**, **Tailwind CSS**, and **Framer Motion**. Backend: Django REST API.

**Live Demo:**  
Frontend → https://chat-summariser-frontend.onrender.com/ 
Backend → https://chat-backend-ec08.onrender.com/api/chat/list/

---

## Features

- Modern, responsive chat UI (mobile → desktop)
- Dark/Light mode toggle
- Sidebar with conversation list (create, edit title, delete)
- Auto-generated titles and summaries (from backend)
- Intelligent Query page with relevant sources
- Dashboard listing with search filter
- Smooth animations with Framer Motion
- Configurable API base URL via environment variables

---

## Tech Stack

- **React 18** (Create React App)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide-react** for icons

---

## Local Setup

```bash
# 1) Clone
git clone https://github.com/Whitedevil-cloud-ux/chat-summariser-frontend.git
cd chat-summariser-frontend

# 2) Install
npm install

# 3) Configure environment
cp .env.example .env
# edit .env and set REACT_APP_API_URL to your backend, e.g.:
# REACT_APP_API_URL=https://chat-backend-ec08.onrender.com/api

# 4) Run
npm start


# UI Screenshot
- **Chat Page**
<img width="1895" height="857" alt="image" src="https://github.com/user-attachments/assets/1560a6f6-fae8-4c2f-be0f-b4be68df7326" />

**Dashboard Page**
<img width="1883" height="919" alt="image" src="https://github.com/user-attachments/assets/b5f6fac4-6bb3-47a5-a894-f938f510b62b" />

**Intelligent Query Page**
<img width="1746" height="914" alt="image" src="https://github.com/user-attachments/assets/fa1c1ff1-d3bb-4bce-aa53-a265039efc2d" />



