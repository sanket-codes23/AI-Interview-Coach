# 🚀 AI Interview Coach

An AI-powered interview preparation platform that analyzes a candidate's resume and job description to generate personalized interview questions, detailed model answers, skill gap analysis, ATS-optimized resumes, and a structured preparation roadmap.

---

## ✨ Features

- 📄 Upload Resume (PDF)
- 💼 Paste Job Description
- 🤖 AI-powered Resume Analysis
- 🎯 Job Match Score (0–100)
- 💡 Personalized Technical Interview Questions
- 🗣️ Behavioral Interview Questions with STAR Strategy
- ✅ Detailed Model Answers
- 📌 Key Talking Points for Every Question
- 📉 Skill Gap Analysis
- 📅 7-Day Personalized Preparation Plan
- 📑 ATS-Optimized Resume Generation
- 🔐 Secure Authentication using JWT & HTTP Cookies
- 📂 Interview Report History
- 📥 Download Resume as PDF

---

## 🖼️ Screenshots

### Home Page

> Add your homepage screenshot here.

![Home](./screenshots/home.png)

---

### Interview Report

> Add your interview report screenshot here.

![Interview Report](./screenshots/report.png)

---

### Resume PDF

> Add your resume screenshot here.

![Resume](./screenshots/resume.png)

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- SCSS
- Axios
- React Router

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Puppeteer
- PDF Parse

### AI

- Groq API
- Llama 3.3 70B Versatile
- Zod

---

## ⚙️ Project Workflow

```text
                 Resume (PDF)
                      │
                      ▼
               PDF Text Extraction
                      │
                      ▼
      +-------------------------------+
      |     Groq Llama 3.3 70B         |
      +-------------------------------+
                      │
                      ▼
        AI Interview Report Generator
                      │
       ├──────── Match Score
       ├──────── Technical Questions
       ├──────── Behavioral Questions
       ├──────── Model Answers
       ├──────── Skill Gaps
       └──────── Preparation Plan
                      │
                      ▼
               MongoDB Database
                      │
                      ▼
             Resume PDF Generator
```

---

# 📂 Project Structure

```text
AI-Interview-Coach
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   │   └── ai.service.js
│   │   └── templates
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── index.html
│
├── .gitignore
└── README.md
```
## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/sanket-codes23/AI-Interview-Coach.git
```

```bash
cd AI-Interview-Coach
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env`

```env
PORT=3000

MONGODB_URI=YOUR_MONGODB_URI

JWT_SECRET_KEY=YOUR_SECRET_KEY

GROQ_API_KEY=YOUR_GROQ_API_KEY
```

Run backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Backend Port |
| MONGODB_URI | MongoDB Atlas Connection String |
| JWT_SECRET_KEY | JWT Secret |
| GROQ_API_KEY | Groq API Key |

---

## 📌 Future Improvements

- Voice-based mock interviews
- AI-generated cover letters
- HR interview simulator
- Resume scoring dashboard
- Company-specific interview preparation
- Multi-language support
- Dark/Light Theme
- Export interview reports as PDF

---

## 👨‍💻 Author

**Sanket Singhal**

- GitHub: https://github.com/sanket-codes23

---

## ⭐ If you like this project

Please consider giving it a ⭐ on GitHub.