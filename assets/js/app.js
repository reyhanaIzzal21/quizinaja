import { Router } from './router.js';
import { Navbar } from './components/navbar.js';
import { loadQuestions } from './utils/dataLoader.js';

// Import Components untuk didaftarkan ke global (agar bisa diakses via onclick HTML)
import { Home } from './components/home.js';
import { QuizList } from './components/quizList.js';
import { QuizPage } from './components/quizPage.js';
import { Result } from './components/result.js';
import { Generator } from './components/genarator.js';

const app = {
    router: Router,
    // Kita perlu mengekspos components ke objek app agar bisa dipanggil via string onclick
    components: {
        Home,
        QuizList,
        QuizPage,
        Result,
        Generator
    },
    
    init: async function () {
        // Render Navbar
        Navbar.render('main-nav'); // ID elemen navbar

        // Load Data JSON dulu sebelum render halaman
        await loadQuestions();

        // Mulai Router
        this.router.navigate('home');
    }
};

// PENTING: Expose 'app' ke window object agar bisa diakses oleh onclick di HTML string
window.app = app;

// Start app
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});