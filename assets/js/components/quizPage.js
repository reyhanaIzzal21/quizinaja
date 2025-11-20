import { getQuiz, loadAnswers } from '../utils/dataLoader.js';
import { shuffle } from '../utils/shuffle.js';

export const QuizPage = {
    currentQuestionIndex: 0,
    shuffledQuestions: [],
    originalQuestionIndices: [],
    userAnswers: [],
    answered: false,
    timeLeft: 30, // Timer per question
    timerInterval: null,

    render: function (container, categoryId, quizId) {
        const quiz = getQuiz(categoryId, quizId);
        if (!quiz) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center min-h-[70vh]">
                    <div class="text-8xl mb-6">❌</div>
                    <h2 class="text-4xl font-bold mb-4" style="color: #f5f5f5;">Quiz Tidak Ditemukan</h2>
                    <button onclick="app.router.navigate('home')" 
                            class="px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-110"
                            style="background: linear-gradient(135deg, #892CDC, #52057B); color: #f5f5f5;">
                        Kembali ke Home
                    </button>
                </div>
            `;
            return;
        }

        // Inisialisasi awal
        if (this.currentQuestionIndex === 0 && this.shuffledQuestions.length === 0) {
            const indices = quiz.questions.map((_, i) => i);
            const shuffledIndices = shuffle(indices);
            this.shuffledQuestions = shuffledIndices.map(i => quiz.questions[i]);
            this.originalQuestionIndices = shuffledIndices;
            this.userAnswers = [];
            this.answered = false;
        }

        const question = this.shuffledQuestions[this.currentQuestionIndex];
        const progress = ((this.currentQuestionIndex + 1) / this.shuffledQuestions.length) * 100;
        const isLastQuestion = this.currentQuestionIndex === this.shuffledQuestions.length - 1;

        // Generate floating particles
        const particles = Array.from({ length: 20 }, (_, i) => {
            const delay = Math.random() * 5;
            const duration = 4 + Math.random() * 4;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const size = Math.random() * 3 + 1;
            return `
                <div class="absolute rounded-full bg-purple-500 animate-pulse" 
                     style="
                        left: ${left}%; 
                        top: ${top}%; 
                        width: ${size}px; 
                        height: ${size}px;
                        animation-delay: ${delay}s; 
                        animation-duration: ${duration}s;
                        opacity: ${Math.random() * 0.5 + 0.2};
                     "></div>
            `;
        }).join('');

        container.innerHTML = `
            <!-- Animated Background -->
            <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div class="absolute inset-0">${particles}</div>
                
                <div id="mouse-glow-quiz-page" class="absolute w-96 h-96 rounded-full transition-all duration-300 ease-out pointer-events-none"
                     style="background: radial-gradient(circle, rgba(137, 44, 220, 0.15) 0%, transparent 70%); filter: blur(60px); transform: translate(-50%, -50%);"></div>
                
                <div class="absolute w-96 h-96 rounded-full animate-pulse" 
                     style="left: 10%; top: 30%; background: radial-gradient(circle, rgba(137, 44, 220, 0.25) 0%, transparent 70%); filter: blur(150px); opacity: 0.4;"></div>
                
                <div class="absolute inset-0 opacity-5"
                     style="background-image: linear-gradient(rgba(137, 44, 220, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(137, 44, 220, 0.3) 1px, transparent 1px); background-size: 50px 50px;"></div>
            </div>

            <div class="max-w-5xl mx-auto relative z-10">
                <!-- Header Section -->
                <div class="mb-8 flex items-center justify-between flex-wrap gap-4">
                    <!-- Back Button -->
                    <button onclick="app.router.navigate('quizList', {categoryId: '${categoryId}'})" 
                            class="group flex items-center gap-3 px-6 py-3 rounded-full transition-all hover:scale-105"
                            style="background: rgba(137, 44, 220, 0.1); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                        <span class="text-2xl transition-transform group-hover:-translate-x-1">←</span>
                        <span class="font-medium" style="color: #f5f5f5;">Keluar</span>
                    </button>

                    <!-- Quiz Title Badge -->
                    <div class="flex items-center gap-3 px-6 py-3 rounded-full"
                         style="background: rgba(137, 44, 220, 0.1); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                        <span class="text-2xl">📝</span>
                        <span class="font-bold text-lg" style="color: #f5f5f5;">${quiz.title}</span>
                    </div>
                </div>

                <!-- Progress Bar Section -->
                <div class="mb-8 p-6 rounded-3xl overflow-hidden"
                     style="background: rgba(137, 44, 220, 0.05); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                    
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl"
                                 style="background: linear-gradient(135deg, #892CDC, #52057B); color: #f5f5f5;">
                                ${this.currentQuestionIndex + 1}
                            </div>
                            <div>
                                <div class="text-sm" style="color: rgba(245, 245, 245, 0.6);">Progress</div>
                                <div class="font-bold text-lg" style="color: #f5f5f5;">
                                    ${this.currentQuestionIndex + 1} dari ${this.shuffledQuestions.length} Soal
                                </div>
                            </div>
                        </div>

                        <!-- Score Badge -->
                        <div class="flex items-center gap-2 px-4 py-2 rounded-full"
                             style="background: rgba(137, 44, 220, 0.15); border: 1px solid rgba(137, 44, 220, 0.4);">
                            <span class="text-xl">🏆</span>
                            <span class="font-bold" style="color: #f5f5f5;">${Math.round(progress)}%</span>
                        </div>
                    </div>

                    <!-- Animated Progress Bar -->
                    <div class="relative w-full h-4 rounded-full overflow-hidden"
                         style="background: rgba(137, 44, 220, 0.1);">
                        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 animate-pulse transition-all duration-500 ease-out"
                             style="width: ${progress}%; box-shadow: 0 0 20px rgba(137, 44, 220, 0.6);"></div>
                        
                        <!-- Progress Shine Effect -->
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>

                    <!-- Question Dots -->
                    <div class="flex items-center justify-center gap-2 mt-4 flex-wrap">
                        ${this.shuffledQuestions.map((_, idx) => {
            const isAnswered = this.userAnswers[idx] !== undefined;
            const isCurrent = idx === this.currentQuestionIndex;
            return `
                                <div class="w-3 h-3 rounded-full transition-all ${isCurrent ? 'w-8' : ''}"
                                     style="background: ${isCurrent ? 'linear-gradient(135deg, #892CDC, #52057B)' :
                    isAnswered ? 'rgba(137, 44, 220, 0.5)' : 'rgba(137, 44, 220, 0.2)'};
                                            ${isCurrent ? 'box-shadow: 0 0 15px rgba(137, 44, 220, 0.8);' : ''}">
                                </div>
                            `;
        }).join('')}
                    </div>
                </div>

                <!-- Main Question Card -->
                <div class="relative mb-8 p-10 rounded-3xl overflow-hidden"
                     style="background: rgba(137, 44, 220, 0.05); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                    
                    <!-- Animated Background -->
                    <div class="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-purple-600/5 animate-pulse"></div>
                    
                    <!-- Question Number Badge -->
                    <div class="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full"
                         style="background: rgba(137, 44, 220, 0.15); border: 1px solid rgba(137, 44, 220, 0.4);">
                        <span class="text-lg">❓</span>
                        <span class="font-bold" style="color: #f5f5f5;">Soal ${this.currentQuestionIndex + 1}</span>
                    </div>

                    <!-- Question Text -->
                    <div class="relative z-10 pr-32">
                        <h3 class="text-3xl font-bold leading-relaxed" style="color: #f5f5f5;">
                            ${question.question}
                        </h3>
                    </div>
                </div>

                <!-- Options Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    ${question.options.map((option, index) => {
            const letter = String.fromCharCode(65 + index);
            const isSelected = this.userAnswers[this.currentQuestionIndex] === letter;
            const gradients = [
                'from-purple-600 to-pink-600',
                'from-blue-600 to-purple-600',
                'from-pink-600 to-purple-600',
                'from-purple-600 to-indigo-600'
            ];
            const gradient = gradients[index % gradients.length];

            return `
                            <div class="option-card-wrapper relative group cursor-pointer"
                                 id="option-wrapper-${letter}"
                                 onclick="app.components.QuizPage.selectAnswer('${letter}')">
                                
                                <!-- Glow on Hover/Selected -->
                                <div class="absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-0 ${isSelected ? 'opacity-40' : 'group-hover:opacity-30'} transition-opacity duration-500"></div>
                                
                                <!-- Option Card -->
                                <div id="option-${letter}" 
                                     class="relative h-full p-6 rounded-2xl transition-all duration-300 group-hover:scale-105 overflow-hidden ${isSelected ? 'scale-105' : ''}"
                                     style="background: ${isSelected ? 'rgba(137, 44, 220, 0.15)' : 'rgba(137, 44, 220, 0.05)'}; 
                                            border: 2px solid ${isSelected ? 'rgba(137, 44, 220, 0.6)' : 'rgba(137, 44, 220, 0.2)'}; 
                                            backdrop-filter: blur(10px);">
                                    
                                    <!-- Shine Effect -->
                                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    
                                    <!-- Content -->
                                    <div class="relative flex items-start gap-4">
                                        <!-- Letter Badge -->
                                        <div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${isSelected ? 'animate-pulse' : ''}"
                                             style="background: linear-gradient(135deg, #892CDC, #52057B); color: #f5f5f5; box-shadow: ${isSelected ? '0 0 20px rgba(137, 44, 220, 0.8)' : '0 5px 15px rgba(137, 44, 220, 0.3)'};">
                                            ${letter}
                                        </div>
                                        
                                        <!-- Option Text -->
                                        <p class="flex-1 text-lg leading-relaxed pt-2" style="color: #f5f5f5;">
                                            ${option}
                                        </p>

                                        <!-- Selected Checkmark -->
                                        ${isSelected ? `
                                            <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center animate-pulse"
                                                 style="background: linear-gradient(135deg, #892CDC, #52057B); color: #f5f5f5;">
                                                ✓
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        `;
        }).join('')}
                </div>

                <!-- Navigation Buttons -->
                <div class="flex items-center justify-between gap-4 flex-wrap">
                    <!-- Previous Button -->
                    ${this.currentQuestionIndex > 0 ? `
                        <button onclick="app.components.QuizPage.previousQuestion('${categoryId}', '${quizId}')"
                                class="group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
                                style="background: rgba(137, 44, 220, 0.1); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px); color: #f5f5f5;">
                            <span class="text-xl transition-transform group-hover:-translate-x-1">←</span>
                            <span>Sebelumnya</span>
                        </button>
                    ` : '<div></div>'}
                    
                    <!-- Next/Finish Button -->
                    <button id="next-btn" 
                            onclick="app.components.QuizPage.nextQuestion('${categoryId}', '${quizId}')"
                            class="group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            style="background: linear-gradient(135deg, #892CDC, #52057B); color: #f5f5f5; box-shadow: 0 10px 40px rgba(137, 44, 220, 0.4);"
                            disabled>
                        <span>${isLastQuestion ? 'Selesai Quiz' : 'Lanjut'}</span>
                        <span class="text-xl transition-transform group-hover:translate-x-1">${isLastQuestion ? '🏁' : '→'}</span>
                    </button>
                </div>

                <!-- Help Text -->
                <div class="mt-8 text-center">
                    <p class="text-sm" style="color: rgba(245, 245, 245, 0.5);">
                        💡 Pilih salah satu jawaban untuk melanjutkan
                    </p>
                </div>
            </div>
        `;

        // Restore previous answer if exists
        if (this.userAnswers[this.currentQuestionIndex]) {
            document.getElementById('next-btn').disabled = false;
        }

        // Mouse tracking for glow
        this.initMouseGlow();

        // Add entrance animation
        this.addEntranceAnimation();
    },

    initMouseGlow: function () {
        const mouseGlow = document.getElementById('mouse-glow-quiz-page');
        let rafId = null;

        const handleMouseMove = (e) => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                if (mouseGlow) {
                    mouseGlow.style.left = `${e.clientX}px`;
                    mouseGlow.style.top = `${e.clientY}px`;
                }
                rafId = null;
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
    },

    addEntranceAnimation: function () {
        const elements = document.querySelectorAll('.option-card-wrapper');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            setTimeout(() => {
                el.style.transition = 'all 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    },

    selectAnswer: function (letter) {
        if (this.answered) return;

        // Remove previous selection
        document.querySelectorAll('.option-card-wrapper').forEach(wrapper => {
            const card = wrapper.querySelector('[id^="option-"]');
            const glow = wrapper.querySelector('.absolute.blur');
            wrapper.classList.remove('scale-105');
            if (card) {
                card.style.background = 'rgba(137, 44, 220, 0.05)';
                card.style.borderColor = 'rgba(137, 44, 220, 0.2)';
            }
            if (glow) {
                glow.classList.remove('opacity-40');
            }
        });

        // Add selection to clicked option
        const wrapper = document.getElementById(`option-wrapper-${letter}`);
        const selectedCard = document.getElementById(`option-${letter}`);

        if (wrapper && selectedCard) {
            wrapper.classList.add('scale-105');
            selectedCard.style.background = 'rgba(137, 44, 220, 0.15)';
            selectedCard.style.borderColor = 'rgba(137, 44, 220, 0.6)';

            // Add pulse animation
            selectedCard.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                selectedCard.style.animation = '';
            }, 500);
        }

        // Save answer
        this.userAnswers[this.currentQuestionIndex] = letter;

        // Enable next button
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                nextBtn.style.animation = '';
            }, 500);
        }

        // Play selection sound effect (optional - you can add sound later)
        console.log(`Answer selected: ${letter}`);
    },

    nextQuestion: async function (categoryId, quizId) {
        if (this.currentQuestionIndex < this.shuffledQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.answered = false;
            this.render(document.getElementById('app'), categoryId, quizId);
        } else {
            // Quiz finished
            const btn = document.getElementById('next-btn');
            btn.innerHTML = '<span class="animate-spin">⏳</span> <span>Menghitung Skor...</span>';
            btn.disabled = true;

            // Fetch answers
            const allAnswers = await loadAnswers();

            if (!allAnswers || !allAnswers[quizId]) {
                alert("Gagal memuat kunci jawaban.");
                return;
            }

            const rawCorrectAnswers = allAnswers[quizId];

            // Calculate score
            let score = 0;
            const orderedCorrectAnswers = this.shuffledQuestions.map((_, indexShuffle) => {
                const originalIndex = this.originalQuestionIndices[indexShuffle];
                const realAnswer = rawCorrectAnswers[originalIndex];

                if (this.userAnswers[indexShuffle] === realAnswer) {
                    score++;
                }

                return realAnswer;
            });

            // Reset state
            const finalQuestions = [...this.shuffledQuestions];
            const finalUserAnswers = [...this.userAnswers];

            this.currentQuestionIndex = 0;
            this.shuffledQuestions = [];
            this.originalQuestionIndices = [];
            this.userAnswers = [];

            // Navigate to result
            setTimeout(() => {
                window.app.router.navigate('result', {
                    score: score,
                    total: rawCorrectAnswers.length,
                    questions: finalQuestions,
                    userAnswers: finalUserAnswers,
                    correctAnswers: orderedCorrectAnswers
                });
            }, 1000);
        }
    },

    previousQuestion: function (categoryId, quizId) {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.answered = false;
            this.render(document.getElementById('app'), categoryId, quizId);
        }
    }
};