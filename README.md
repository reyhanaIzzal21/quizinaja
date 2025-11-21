<div align="center">

# 🎯 Quizinaja

### Interactive Quiz Platform with AI-Powered Quiz Generation

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)](https://www.javascript.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini%20AI-2.0%2F1.5-8F75FF?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)

*Built with Vanilla JavaScript — Perfect for education, learning platforms, and interactive assessments*

[Features](#-features) • [Installation](#-installation) • [Configuration](#-configuration)

</div>

---

## 🌟 Overview

**Quizinaja** is a comprehensive interactive quiz platform designed for educators and learners. It combines traditional quiz management with cutting-edge AI technology to automatically generate quiz questions from educational materials — all without heavy framework dependencies.

### 🎯 Purpose

- 📚 Educational tool for modern learning platforms
- 🎓 Perfect for schools, campuses, and online courses
- 🤖 AI-powered content generation for teachers
- 🚀 Quick prototyping for assessment systems
- 🔧 Easily customizable and extendable codebase

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📚 Quiz Management
- **5+ Subject Categories** (Math, Indonesian, Physics, English, Javanese)
- **60+ Pre-made Quizzes** with varying difficulty levels
- Full CRUD operations for quiz administration
- Real-time availability status

### 🤖 AI Quiz Generator
- **Gemini API Integration** for automated quiz creation
- PDF upload & text input support
- Customizable question count (5-20 questions)
- Difficulty level selection
- PDF export with answer keys

</td>
<td width="50%">

### 🎮 Interactive Quiz Experience
- **Randomized Questions** for fair assessment
- **Instant Scoring** with real-time feedback
- **Progress Tracking** with visual indicators
- **Detailed Results** with answer review
- **Performance Grading** (Legendary/Epic/Keep Fighting)

### 🎨 Modern UI/UX
- **Glassmorphism Design** with animations
- **Dark Mode Theme** with purple gradients
- **Responsive Layout** (Mobile/Tablet/Desktop)
- **Smooth Animations** & micro-interactions
- **Accessibility Features** for all users

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

```
Frontend   🎨 Vanilla JavaScript (ES6+) - No framework bloat
Styling    🎨 Tailwind CSS + Custom CSS - Modern design system
AI Engine  🤖 Google Generative AI (Gemini) - Smart content generation
PDF Tools  📄 PDF.js (read) + jsPDF (write) - Document handling
Server     ⚡ Static or PHP/Node.js - Flexible deployment
Storage    💾 JSON files - Simple data structure
```

---

## 🚀 Installation

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for AI features
- Web server (optional) or PHP built-in server
- Node.js (optional, for development)

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/quizinaja.git
cd quizinaja
```

### Step 2: Project Structure Setup

```bash
# Project is ready to use with this structure:
quizinaja/
├── assets/
│   ├── css/
│   │   ├── styles.css
│   │   └── tailwind.css
│   ├── js/
│   │   ├── app.js
│   │   ├── router.js
│   │   ├── components/
│   │   └── utils/
│   └── data/
│       ├── quiz-questions.json
│       └── quiz-answers.json
└── index.html
```

### Step 3: Setup API Key

#### Get Google Generative AI Key:

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Click **"Get API Key"**
3. Create a new API key in Google Cloud Console
4. Copy your API key

#### Configure in Project:

Edit `assets/js/utils/gemini.js`:

```javascript
// Line 1-2
const API_KEY = "YOUR_GEMINI_API_KEY_HERE";
const modelName = "gemini-2.0-flash"; // or gemini-1.5-flash
```

### Step 4: Run Application

**Option A: Using PHP Built-in Server**
```bash
php -S localhost:8000
```

**Option B: Using Node.js (with live reload)**
```bash
npm install -g http-server
http-server -p 8000 -o
```

**Option C: Direct File Open**
```bash
open index.html
# or simply double-click index.html
```

Then visit: `http://localhost:8000`

### Step 5: Start Using!

```
🏠 Home Page     → Browse categories & statistics
📝 Quiz Mode     → Select category → Choose quiz → Answer questions
🤖 AI Generator  → Upload PDF/Text → Generate questions → Download PDF
🏆 Results Page  → Review answers & performance metrics
```

---

## 📁 Project Structure

```
quizinaja/
│
├── 📂 assets/
│   ├── 📂 css/
│   │   ├── styles.css        # Global styles & animations
│   │   └── tailwind.css      # Tailwind directives
│   │
│   ├── 📂 js/
│   │   ├── app.js            # Main application entry
│   │   ├── router.js         # SPA router logic
│   │   │
│   │   ├── 📂 components/    # Page components
│   │   │   ├── home.js       # Home page
│   │   │   ├── quizList.js   # Category quizzes
│   │   │   ├── quizPage.js   # Quiz interface
│   │   │   ├── result.js     # Results page
│   │   │   └── genarator.js  # AI generator
│   │   │
│   │   └── 📂 utils/         # Utility functions
│   │       ├── dataLoader.js # Load quiz data
│   │       ├── fileParser.js # PDF parsing
│   │       ├── gemini.js     # Gemini API
│   │       ├── pdfGenerator.js
│   │       └── shuffle.js    # Array shuffle
│   │
│   └── 📂 data/
│       ├── quiz-questions.json  # All quiz questions
│       └── quiz-answers.json    # Answer keys
│
└── 📄 index.html             # Main HTML file
```

---

## ⚙️ Configuration

### 🔑 API Configuration

**Google Generative AI (Gemini)**

```javascript
// assets/js/utils/gemini.js

const API_KEY = "YOUR_API_KEY";
const modelName = "gemini-2.0-flash"; // Fastest option
```

**Available Models:**
- `gemini-2.0-flash` ⚡ (Recommended - Fast & accurate)
- `gemini-1.5-flash` (Fallback - Good balance)
- `gemini-1.5-pro` (Premium - Most powerful but slower)

### 🎨 Theme Customization

Edit `assets/css/styles.css`:

```css
:root {
    --bg-color: #000;              /* Background */
    --primary-color: #892CDC;      /* Purple accent */
    --secondary-color: #52057B;    /* Dark purple */
    --text-color: #f5f5f5;         /* Light text */
    --font-family: 'Arial, sans-serif';
}
```

### 📊 Adding New Quiz Categories

Edit `assets/data/quiz-questions.json`:

```json
{
  "categories": [
    {
      "id": "new-subject",
      "name": "New Subject",
      "icon": "🎓",
      "description": "Description here",
      "quizzes": [
        {
          "id": "quiz-1",
          "title": "Quiz Title",
          "description": "Quiz description",
          "difficulty": "medium",
          "questions": [
            {
              "question": "Question text?",
              "options": ["A", "B", "C", "D"]
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 🎨 Feature Highlights

### 📱 Responsive Design

- **Mobile**: Optimized touch interface & readable typography
- **Tablet**: Balanced layout with medium-sized cards
- **Desktop**: Full-featured experience with mouse interactions
- **All Devices**: Consistent 60 FPS animations

### 🤖 AI Features

**Quiz Generation Process:**
```
User Input (Text/PDF)
    ↓
PDF Parsing (if file)
    ↓
Content Validation (min 50 chars)
    ↓
Gemini API Call (with prompt engineering)
    ↓
JSON Parsing & Cleaning
    ↓
Display & Download
```

### 📊 Scoring System

| Grade | Range | Status |
|-------|-------|--------|
| 🌟 Legendary | 80-100% | Outstanding |
| 💎 Epic | 60-79% | Great job |
| 🔥 Keep Fighting | <60% | Keep trying |

### 🔐 Security Features

- XSS Protection via sanitized data
- Input validation on all forms
- Safe PDF file handling
- API key management best practices

---

## 📚 Quiz Categories

### 📐 Matematika (7 Quizzes)
- Aljabar, Geometri, Bilangan Bulat
- Pecahan & Desimal, Persamaan Linear
- Bangun Datar, Bangun Ruang, Peluang

### 🇮🇩 Bahasa Indonesia (7 Quizzes)
- Teks Laporan, Teks Persuasif, Teks Eksplanasi
- Puisi & Pantun, Kata & Kalimat
- Ejaan & Tanda Baca

### ⚛️ Fisika (8 Quizzes)
- Gerak Lurus, Energi & Usaha, Hukum Newton
- Suhu & Kalor, Listrik Statis, Gelombang & Bunyi
- Optik & Cahaya, Tekanan

### 🌍 Bahasa Inggris (3 Quizzes)
- Basic Tenses, Reading Comprehension
- Advanced Grammar

### 🎭 Bahasa Jawa (4 Quizzes)
- Unggah-Ungguh, Tembang Macapat
- Aksara Jawa, Paribasan & Bebasan

---

## 💡 Tips & Best Practices

### 📈 Performance Optimization

- Questions are pre-loaded on app start
- Lazy loading for quiz content
- Cached Gemini API responses
- Optimized animations (60 FPS target)

### 🎨 Customization Guide

```javascript
// Modify quiz difficulty display
const difficultyConfig = {
    'easy': { label: 'Mudah', emoji: '🟢' },
    'medium': { label: 'Sedang', emoji: '🟡' },
    'hard': { label: 'Sulit', emoji: '🔴' }
};

// Adjust timer per question
const timeLeft = 30; // seconds in quizPage.js

// Change scoring thresholds
if (percentage >= 80) grade = 'Legendary'; // Edit in result.js
```

### 🚀 Deployment Guide

**GitHub Pages:**
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
# Then enable GitHub Pages in repository settings
```

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
# Connect your GitHub repo directly to Netlify
# No build step required!
```

---

## 🔮 Roadmap

- [ ] User authentication & progress tracking
- [ ] Leaderboard & achievements
- [ ] Time-based quizzes
- [ ] Collaborative quiz creation
- [ ] Advanced analytics dashboard
- [ ] Spaced repetition algorithm
- [ ] Mobile app (React Native)
- [ ] Voice-based questions
- [ ] Multi-language support

---

## 📞 Support & Community

Need help? We're here:

- 💬 **Issues**: [GitHub Issues](https://github.com/yourusername/quizinaja/issues)
- 📧 **Email**: support@quizinaja.com
- 💭 **Discussions**: [GitHub Discussions](https://github.com/yourusername/quizinaja/discussions)

---

## ⚖️ License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.
See [LICENSE](LICENSE) file for details.

---

## 🌟 Similar Projects

- [Quizizz](https://quizizz.com/) - Interactive quiz platform
- [Kahoot](https://kahoot.com/) - Game-based learning
- [Moodle](https://moodle.org/) - Learning Management System
- [Edmodo](https://www.edmodo.com/) - Educational social network

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ by the Quizinaja Team**

*Belajar lebih seru, belajar lebih cerdas dengan Quizinaja!*

[Report Bug](https://github.com/yourusername/quizinaja/issues) • [Request Feature](https://github.com/yourusername/quizinaja/issues) • [View Demo](https://quizinaja.vercel.app)

</div>
