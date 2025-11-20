import { getCategories } from '../utils/dataLoader.js';

export const Home = {
    render: function (container) {
        const categories = getCategories();
        container.innerHTML = `
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">Selamat Datang di Quiz Master! 🎓</h2>
                <p class="text-gray-600 text-lg">Pilih kategori quiz untuk memulai</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${categories.map(category => `
                    <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer transform hover:-translate-y-1"
                         onclick="app.router.navigate('quizList', {categoryId: '${category.id}'})">
                        <div class="text-5xl mb-4">${category.icon}</div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">${category.name}</h3>
                        <p class="text-gray-600 mb-4">${category.description}</p>
                        <div class="text-indigo-600 font-semibold">${category.quizzes.length} Quiz tersedia →</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
};