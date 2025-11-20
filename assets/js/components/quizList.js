import { getCategory } from '../utils/dataLoader.js';

export const QuizList = {
    render: function (container, categoryId) {
        const category = getCategory(categoryId);
        if (!category) {
            container.innerHTML = '<p class="text-red-500">Kategori tidak ditemukan</p>';
            return;
        }

        container.innerHTML = `
            <button onclick="app.router.navigate('home')" 
                    class="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center">
                ← Kembali ke Kategori
            </button>
            
            <div class="text-center mb-12">
                <div class="text-6xl mb-4">${category.icon}</div>
                <h2 class="text-4xl font-bold text-gray-800 mb-2">${category.name}</h2>
                <p class="text-gray-600">${category.description}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${category.quizzes.map(quiz => `
                    <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">${quiz.title}</h3>
                        <p class="text-gray-600 mb-4">${quiz.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-500">${quiz.questions.length} Soal</span>
                            <button onclick="app.router.navigate('quiz', {categoryId: '${categoryId}', quizId: '${quiz.id}'})"
                                    class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold">
                                Mulai Quiz
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
};