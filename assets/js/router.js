import { Home } from './components/home.js';
import { QuizList } from './components/quizList.js';
import { QuizPage } from './components/quizPage.js';
import { Result } from './components/result.js';

export const Router = {
    currentRoute: 'home',
    params: {},

    navigate: function (route, params = {}) {
        this.currentRoute = route;
        this.params = params;
        this.render();
    },

    render: function () {
        const appElement = document.getElementById('app');
        appElement.innerHTML = '';
        appElement.className = 'container mx-auto px-4 py-8 fade-in';

        switch (this.currentRoute) {
            case 'home':
                Home.render(appElement);
                break;
            case 'quizList':
                QuizList.render(appElement, this.params.categoryId);
                break;
            case 'quiz':
                QuizPage.render(appElement, this.params.categoryId, this.params.quizId);
                break;
            case 'result':
                Result.render(
                    appElement,
                    this.params.score,
                    this.params.total,
                    this.params.questions,      // Data Soal
                    this.params.userAnswers,    // Jawaban User
                    this.params.correctAnswers  // Kunci Jawaban
                );
                break;
            default:
                Home.render(appElement);
        }
    }
};