import { getQuiz, loadAnswers } from '../utils/dataLoader.js'; // Import loadAnswers
import { shuffle } from '../utils/shuffle.js';

export const QuizPage = {
    currentQuestionIndex: 0,
    shuffledQuestions: [], // Berisi objek soal
    originalQuestionIndices: [], // PENTING: Untuk melacak urutan asli karena soal di-shuffle
    userAnswers: [], // Menyimpan jawaban user ("A", "B", dll) berdasarkan index shuffle
    answered: false,

    render: function (container, categoryId, quizId) {
        const quiz = getQuiz(categoryId, quizId);
        if (!quiz) {
            container.innerHTML = '<p class="text-red-500">Quiz tidak ditemukan</p>';
            return;
        }

        // Inisialisasi awal
        if (this.currentQuestionIndex === 0 && this.shuffledQuestions.length === 0) {
            // Kita perlu shuffle, TAPI kita juga perlu tahu soal ini aslinya urutan ke berapa
            // agar nanti bisa dicocokkan dengan kunci jawaban yang tidak di-shuffle.

            // 1. Buat array index [0, 1, 2, 3, 4]
            const indices = quiz.questions.map((_, i) => i);

            // 2. Shuffle index-nya
            const shuffledIndices = shuffle(indices);

            // 3. Simpan urutan soal yang teracak
            this.shuffledQuestions = shuffledIndices.map(i => quiz.questions[i]);

            // 4. Simpan index aslinya untuk referensi kunci jawaban nanti
            this.originalQuestionIndices = shuffledIndices;

            this.userAnswers = [];
            this.answered = false;
        }

        const question = this.shuffledQuestions[this.currentQuestionIndex];
        // ... (Sisa kode render TAMPILAN sama persis, tidak ada yang berubah) ...
        // ... Copy paste saja bagian HTML templatenya dari kode sebelumnya ...

        // Gunakan kode render HTML yang lama di sini
        const progress = ((this.currentQuestionIndex + 1) / this.shuffledQuestions.length) * 100;
        container.innerHTML = `
            <div class="max-w-3xl mx-auto">
                <div class="bg-white rounded-lg shadow-lg p-8">
                    <div class="mb-6">
                        <div class="flex justify-between items-center mb-2">
                            <h2 class="text-2xl font-bold text-gray-800">${quiz.title}</h2>
                            <span class="text-gray-600 font-semibold">Soal ${this.currentQuestionIndex + 1}/${this.shuffledQuestions.length}</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-indigo-600 h-3 rounded-full transition-all" style="width: ${progress}%"></div>
                        </div>
                    </div>

                    <div class="mb-8">
                        <h3 class="text-xl font-semibold text-gray-800 mb-6">${question.question}</h3>
                        <div class="space-y-3">
                            ${question.options.map((option, index) => {
            const letter = String.fromCharCode(65 + index);
            return `
                                    <button id="option-${letter}" 
                                            onclick="app.components.QuizPage.selectAnswer('${letter}')"
                                            class="option-btn w-full text-left p-4 rounded-lg border-2 border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition">
                                        <span class="font-bold text-indigo-600">${letter}.</span> ${option}
                                    </button>
                                `;
        }).join('')}
                        </div>
                    </div>

                    <div class="flex justify-between">
                        ${this.currentQuestionIndex > 0 ? `
                            <button onclick="app.components.QuizPage.previousQuestion('${categoryId}', '${quizId}')"
                                    class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-semibold">
                                ← Sebelumnya
                            </button>
                        ` : '<div></div>'}
                        
                        <button id="next-btn" onclick="app.components.QuizPage.nextQuestion('${categoryId}', '${quizId}')"
                                class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled>
                            ${this.currentQuestionIndex === this.shuffledQuestions.length - 1 ? 'Selesai' : 'Selanjutnya →'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        if (this.userAnswers[this.currentQuestionIndex]) {
            const prevAnswer = this.userAnswers[this.currentQuestionIndex];
            const btn = document.getElementById(`option-${prevAnswer}`);
            if (btn) {
                btn.classList.add('bg-indigo-100', 'border-indigo-500');
                document.getElementById('next-btn').disabled = false;
            }
        }
    },

    selectAnswer: function (letter) {
        // ... (Tidak berubah, sama seperti sebelumnya) ...
        if (this.answered) return;
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('bg-indigo-100', 'border-indigo-500');
        });
        const selectedBtn = document.getElementById(`option-${letter}`);
        selectedBtn.classList.add('bg-indigo-100', 'border-indigo-500');
        this.userAnswers[this.currentQuestionIndex] = letter;
        document.getElementById('next-btn').disabled = false;
    },

    // --- BAGIAN LOGIKA SELESAI DIPERBARUI ---
    nextQuestion: async function (categoryId, quizId) {
        if (this.currentQuestionIndex < this.shuffledQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.answered = false;
            this.render(document.getElementById('app'), categoryId, quizId);
        } else {
            // USER KLIK SELESAI
            const btn = document.getElementById('next-btn');
            btn.innerText = "Memeriksa Jawaban...";
            btn.disabled = true;

            // 1. Fetch Kunci Jawaban
            const allAnswers = await loadAnswers();

            if (!allAnswers || !allAnswers[quizId]) {
                alert("Gagal memuat kunci jawaban.");
                return;
            }

            const rawCorrectAnswers = allAnswers[quizId]; // Kunci jawaban urutan asli

            // 2. Hitung Skor & Susun Jawaban Benar sesuai urutan Shuffle
            let score = 0;

            // Kita buat array baru berisi kunci jawaban yang URUTANNYA sudah disesuaikan 
            // dengan soal yang tampil (shuffled), agar nanti di Result.js mudah loop-nya.
            const orderedCorrectAnswers = this.shuffledQuestions.map((_, indexShuffle) => {
                const originalIndex = this.originalQuestionIndices[indexShuffle];
                const realAnswer = rawCorrectAnswers[originalIndex];

                // Hitung skor sekalian disini
                if (this.userAnswers[indexShuffle] === realAnswer) {
                    score++;
                }

                return realAnswer;
            });

            // 3. Reset State
            const finalQuestions = [...this.shuffledQuestions]; // Copy soal untuk dikirim
            const finalUserAnswers = [...this.userAnswers];     // Copy jawaban user

            this.currentQuestionIndex = 0;
            this.shuffledQuestions = [];
            this.originalQuestionIndices = [];
            this.userAnswers = [];

            // 4. Kirim Data Lengkap ke Result Page
            window.app.router.navigate('result', {
                score: score,
                total: rawCorrectAnswers.length,
                questions: finalQuestions,       // Kirim Soal
                userAnswers: finalUserAnswers,   // Kirim Jawaban User
                correctAnswers: orderedCorrectAnswers // Kirim Kunci Jawaban (Urut)
            });
        }
    },

    previousQuestion: function (categoryId, quizId) {
        // ... (Tidak berubah) ...
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.answered = false;
            this.render(document.getElementById('app'), categoryId, quizId);
        }
    }
};