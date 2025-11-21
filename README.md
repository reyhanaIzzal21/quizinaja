🎯 Quizinaja — Platform Quiz Interaktif dengan AI
Quizinaja adalah platform quiz interaktif modern yang dirancang untuk memudahkan guru dan pelajar membuat serta mengerjakan quiz dengan pengalaman pengguna yang
✨ Fitur Utama
1. 📚 Quiz Kategoris Lengkap

Matematika: Aljabar, Geometri, Bilangan Bulat, Pecahan, Persamaan Linear, Bangun Datar, Bangun Ruang, Peluang
Bahasa Indonesia: Teks Laporan, Teks Persuasif, Teks Eksplanasi, Puisi & Pantun, Kata & Kalimat, Ejaan & Tanda Baca
Fisika: Gerak Lurus, Energi & Usaha, Hukum Newton, Suhu & Kalor, Listrik Statis, Gelombang & Bunyi, Optik & Cahaya, Tekanan
Bahasa Inggris: Basic Tenses, Reading Comprehension, Advanced Grammar
Bahasa Jawa: Unggah-Ungguh, Tembang Macapat, Aksara Jawa, Paribasan & Bebasan

2. 🤖 AI Quiz Generator (Fitur Premium)
Menggunakan Google Generative AI (Gemini 2.0/1.5 Flash) untuk membuat quiz otomatis:

Upload Materi: Unggah file PDF atau paste teks langsung
Generate Soal: AI akan membuat soal pilihan ganda otomatis berdasarkan materi
Kustomisasi: Tentukan jumlah soal (5-20) dan tingkat kesulitan (Mudah/Sedang/Sulit)
Download PDF: Unduh quiz beserta kunci jawaban dalam format PDF

3. 📊 Sistem Penilaian Real-Time

Score instant setelah menyelesaikan quiz
Tampilan rating berdasarkan performa:

🌟 Legendary (80-100%): Outstanding performance
💎 Epic (60-79%): Great job
🔥 Keep Fighting (<60%): Keep trying


Persentase akurasi dan statistik detail

4. 🎨 UI/UX Modern & Futuristik

Dark mode dengan tema purple & pink gradient
Animasi particles dan glassmorphism design
Dynamic mouse glow effect
Responsive design (Mobile, Tablet, Desktop)
Progress bar dengan animasi smooth
Card hover effects dengan shimmer animation

5. 🎯 Fitur Quiz Interaktif

Acak Soal: Urutan soal dan opsi selalu berbeda
Instant Feedback: Visual feedback untuk setiap jawaban
Progress Tracking: Lihat progres real-time dengan dots indicator
Review Lengkap: Lihat jawaban benar dan salah setelah selesai
Navigasi Mudah: Tombol Sebelumnya/Lanjutkan untuk review

6. 📱 User Experience yang Baik

Loading animations
Toast notifications untuk feedback
Error handling yang user-friendly
Smooth transitions & page navigation
Mobile-optimized interface


🛠️ Tech Stack
Frontend

Framework: Vanilla JavaScript (ES6+)
Styling: Tailwind CSS + Custom CSS
Architecture: Component-based with Router pattern
Animations: CSS keyframes + JavaScript RAF

Backend/APIs

Generative AI: Google Generative AI (Gemini models)
PDF Processing: PDF.js (reading)
PDF Generation: jsPDF (creating)

Data Storage

Local: JSON files (quiz-questions.json, quiz-answers.json)
Client-side: JavaScript variables & state management


🚀 Fitur Teknis
Architecture
assets/
├── css/
│   ├── styles.css          # Global styles & animations
│   ├── tailwind.css        # Tailwind directives
│   └── components/         # Component-specific styles
├── js/
│   ├── app.js              # Main app entry point
│   ├── router.js           # Router logic
│   ├── components/         # Vue-like components
│   │   ├── home.js         # Home page
│   │   ├── quizList.js     # Quiz listing
│   │   ├── quizPage.js     # Quiz taking interface
│   │   ├── result.js       # Results page
│   │   └── genarator.js    # AI Quiz generator
│   └── utils/
│       ├── dataLoader.js   # Load quiz data
│       ├── fileParser.js   # PDF parsing
│       ├── gemini.js       # Gemini API integration
│       ├── pdfGenerator.js # PDF export
│       └── shuffle.js      # Array shuffle utility
└── data/
    ├── quiz-questions.json # All quiz questions
    └── quiz-answers.json   # Answer keys
State Management

Komponen-level state dalam JavaScript objects
Global app object untuk akses global
Router untuk state navigasi

Data Flow
User Input → Router → Component → API/Utils → UI Update

📖 Cara Penggunaan
1. Memulai Aplikasi
bash# Buka di browser
http://localhost:3000
# atau
open index.html
2. Mode Quiz Biasa

Klik kategori di halaman home
Pilih quiz dari daftar
Kerjakan soal (acak otomatis)
Lihat hasil dan review jawaban

3. Mode AI Quiz Generator

Klik tombol "✨ Buat Quiz AI" di navbar
Pilih salah satu:

Paste teks di textarea
Upload file PDF dengan drag & drop


Atur jumlah soal (5-20) dan tingkat kesulitan
Klik "Generate Quiz dengan AI"
Tunggu AI memproses (15-30 detik)
Review soal yang dibuat
Klik "Download PDF" untuk simpan


🔑 Konfigurasi API
Google Generative AI (Gemini)
Edit file assets/js/utils/gemini.js:
javascriptconst API_KEY = "YOUR_GEMINI_API_KEY_HERE";
Cara mendapatkan API Key:

Kunjungi Google AI Studio
Klik "Create API Key"
Copy key dan paste ke file di atas

Models yang tersedia:

gemini-2.0-flash (Recommended - lebih cepat)
gemini-1.5-flash (Fallback)
gemini-1.5-pro (More powerful but slower)


📊 Quiz Data Structure
Questions Format
json{
  "categories": [
    {
      "id": "matematika",
      "name": "Matematika",
      "icon": "🔢",
      "description": "Uji kemampuan matematika Anda",
      "quizzes": [
        {
          "id": "aljabar",
          "title": "Quiz Aljabar",
          "description": "Soal-soal aljabar dasar",
          "difficulty": "easy",
          "questions": [
            {
              "question": "Berapakah hasil dari 2x + 5 = 15?",
              "options": ["x = 5", "x = 10", "x = 7", "x = 8"]
            }
          ]
        }
      ]
    }
  ]
}
Answers Format
json{
  "aljabar": ["A", "B", "A", "B", "C"],
  "geometri": ["B", "B", "B", "B", "B"]
}

🎨 Customization
Mengubah Warna Theme
Edit di index.html atau assets/css/styles.css:
css:root {
    --primary-color: #892CDC;      /* Purple */
    --secondary-color: #52057B;    /* Dark Purple */
    --bg-color: #000;              /* Black */
    --text-color: #f5f5f5;         /* White */
}
Menambah Quiz Baru

Edit assets/data/quiz-questions.json
Tambah struktur quiz baru di kategori yang sesuai
Edit assets/data/quiz-answers.json dengan kunci jawaban

Custom Animations
Tambah di assets/css/styles.css:
css@keyframes customAnimation {
    from { opacity: 0; }
    to { opacity: 1; }
}

.custom-element {
    animation: customAnimation 0.5s ease-out;
}

🔐 Security Notes
⚠️ PENTING: Fitur saat ini untuk development/demo saja:

Answer keys disimpan di client-side (visible di source code)
API key di-expose di frontend (gunakan backend proxy untuk production)
Tidak ada authentication/authorization

Rekomendasi Production:

Move answer keys ke backend
Gunakan environment variables untuk API keys
Implementasi user authentication
Add rate limiting pada Gemini API calls
Validasi user input di backend


📱 Browser Support

✅ Chrome/Edge (v90+)
✅ Firefox (v88+)
✅ Safari (v14+)
✅ Mobile browsers


🚦 Performance

Bundle Size: ~200KB (uncompressed)
Load Time: <2s (dengan CDN)
AI Generation: 15-30s (tergantung panjang materi)
Responsiveness: 60 FPS animations


🐛 Known Issues & Limitations

PDF Upload: Maksimal 10MB, hanya format PDF
AI Generation: Terbatas 60 requests/minute (Gemini API limit)
Offline Mode: Butuh internet untuk AI generator
Mobile: Loading animations bisa lag di device lama


🔮 Roadmap Fitur

 Dark/Light mode toggle
 User accounts & progress tracking
 Leaderboard & achievement badges
 Quiz collaboration untuk teachers
 Text-to-speech untuk accessibility
 Integration dengan LMS (Google Classroom, Moodle)
 Analytics dashboard
 Mobile app (React Native)


📄 Lisensi
Distributed under the MIT License. See LICENSE file for more information.

🤝 Kontribusi
Contributions are welcome! Please follow these steps:

Fork repository
Buat branch baru (git checkout -b feature/amazing-feature)
Commit changes (git commit -m 'Add amazing feature')
Push ke branch (git push origin feature/amazing-feature)
Buka Pull Request


👨‍💻 Author & Support
Dibuat dengan ❤️ untuk para pelajar dan pendidik.
Support & Feedback:

📧 Email: support@quizinaja.com
🐛 Issues: GitHub Issues
💬 Discussions: GitHub Discussions


🙏 Terima Kasih

Google untuk Generative AI (Gemini)
Tailwind CSS untuk utilities framework
PDF.js & jsPDF untuk PDF handling
Community yang terus support


Made with 🚀 by Quizinaja Team
Belajar lebih seru, belajar lebih cerdas dengan Quizinaja!
