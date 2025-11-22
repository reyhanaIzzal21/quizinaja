// assets/js/components/quizList.js
import { getCategoryById } from '../utils/dataLoader.js';

export const QuizList = {
    render: function (container, categoryId) {
        const category = getCategoryById(categoryId);

        if (!category) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center min-h-[70vh]">
                    <div class="text-8xl mb-6">😕</div>
                    <h2 class="text-4xl font-bold mb-4" style="color: #f5f5f5;">Kategori Tidak Ditemukan</h2>
                    <p class="text-lg mb-8" style="color: rgba(245, 245, 245, 0.6);">Maaf, kategori yang Anda cari tidak tersedia</p>
                    <button onclick="app.router.navigate('home')" 
                            class="px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-110"
                            style="background: linear-gradient(135deg, #892CDC, #52057B); color: #f5f5f5; box-shadow: 0 10px 40px rgba(137, 44, 220, 0.4);">
                        Kembali ke Home
                    </button>
                </div>
            `;
            return;
        }

        // Generate floating particles for background
        const particles = Array.from({ length: 30 }, (_, i) => {
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
            <!-- Animated Background Layer -->
            <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <!-- Floating Particles -->
                <div class="absolute inset-0">
                    ${particles}
                </div>

                <!-- Dynamic Mouse Glow -->
                <div id="mouse-glow-quiz" class="absolute w-96 h-96 rounded-full transition-all duration-300 ease-out pointer-events-none"
                     style="
                        background: radial-gradient(circle, rgba(137, 44, 220, 0.15) 0%, transparent 70%);
                        filter: blur(60px);
                        transform: translate(-50%, -50%);
                     "></div>

                <!-- Static Gradient Orbs -->
                <div class="absolute w-96 h-96 rounded-full animate-pulse" 
                     style="
                        left: 10%; 
                        top: 30%;
                        background: radial-gradient(circle, rgba(137, 44, 220, 0.25) 0%, transparent 70%);
                        filter: blur(150px);
                        opacity: 0.4;
                     "></div>
                <div class="absolute rounded-full animate-pulse" 
                     style="
                        right: 10%; 
                        bottom: 20%;
                        width: 400px;
                        height: 400px;
                        background: radial-gradient(circle, rgba(82, 5, 123, 0.25) 0%, transparent 70%);
                        filter: blur(180px);
                        opacity: 0.4;
                     "></div>

                <!-- Grid Pattern -->
                <div class="absolute inset-0 opacity-5"
                     style="
                        background-image: 
                            linear-gradient(rgba(137, 44, 220, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(137, 44, 220, 0.3) 1px, transparent 1px);
                        background-size: 50px 50px;
                     "></div>
            </div>

            <!-- Back Button Section -->
            <div class="mb-8 relative z-10">
                <button onclick="app.router.navigate('home')" 
                        class="group flex items-center gap-3 px-6 py-3 rounded-full transition-all hover:scale-105 hover:gap-4"
                        style="background: rgba(137, 44, 220, 0.1); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                    <span class="text-2xl transition-transform group-hover:-translate-x-1">←</span>
                    <span class="font-medium" style="color: #f5f5f5;">Kembali</span>
                </button>
            </div>

            <!-- Category Header Section -->
            <div class="relative mb-16 overflow-hidden rounded-3xl p-12 text-center"
                 style="background: rgba(137, 44, 220, 0.05); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                
                <!-- Animated Background -->
                <div class="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 animate-pulse"></div>
                
                <!-- Shine Effect -->
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                
                <!-- Content -->
                <div class="relative z-10">
                    <!-- Icon with Glow -->
                    <div class="inline-flex items-center justify-center w-32 h-32 mb-6 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-1">
                        <div class="w-full h-full rounded-3xl flex items-center justify-center" style="background: rgba(0, 0, 0, 0.8);">
                            <span class="text-7xl">${category.icon}</span>
                        </div>
                    </div>

                    <!-- Title -->
                    <h1 class="text-5xl md:text-6xl font-bold mb-4" style="color: #f5f5f5;">
                        ${category.name}
                    </h1>
                    
                    <!-- Description -->
                    <p class="text-xl mb-8 max-w-2xl mx-auto" style="color: rgba(245, 245, 245, 0.6);">
                        ${category.description}
                    </p>

                    <!-- Stats -->
                    <div class="flex flex-wrap justify-center gap-6">
                        <!-- Total Quiz -->
                        <div class="flex items-center gap-3 px-6 py-3 rounded-full"
                             style="background: rgba(137, 44, 220, 0.15); border: 1px solid rgba(137, 44, 220, 0.3);">
                            <span class="text-2xl">📝</span>
                            <div class="text-left">
                                <div class="text-xl font-bold" style="color: #f5f5f5;">${category.quizzes.length}</div>
                                <div class="text-xs" style="color: rgba(245, 245, 245, 0.6);">Total Quiz</div>
                            </div>
                        </div>

                        <!-- Difficulty Badge -->
                        <div class="flex items-center gap-3 px-6 py-3 rounded-full"
                             style="background: rgba(137, 44, 220, 0.15); border: 1px solid rgba(137, 44, 220, 0.3);">
                            <span class="text-2xl">⚡</span>
                            <div class="text-left">
                                <div class="text-xl font-bold" style="color: #f5f5f5;">Semua Level</div>
                                <div class="text-xs" style="color: rgba(245, 245, 245, 0.6);">Kesulitan</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Section Header -->
            <div class="mb-12 text-center relative z-10">
                <h2 class="text-4xl font-bold mb-3" style="color: #f5f5f5;">
                    Pilih Quiz Anda
                </h2>
                <p class="text-lg" style="color: rgba(245, 245, 245, 0.6);">
                    Klik quiz untuk memulai perjalanan belajar
                </p>
            </div>

            <!-- Quiz Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 mb-16">
                ${category.quizzes.map((quiz, index) => {
            // Difficulty badge configuration
            const difficultyConfig = {
                'easy': { label: 'Mudah', color: 'from-green-500 to-emerald-500', emoji: '🟢' },
                'medium': { label: 'Sedang', color: 'from-yellow-500 to-orange-500', emoji: '🟡' },
                'hard': { label: 'Sulit', color: 'from-red-500 to-pink-500', emoji: '🔴' }
            };
            const difficulty = difficultyConfig[quiz.difficulty] || difficultyConfig['medium'];

            return `
                        <div class="quiz-card-wrapper relative group cursor-pointer"
                             onclick="app.router.navigate('quiz', {categoryId: '${categoryId}', quizId: '${quiz.id}'})"
                             data-index="${index}">
                            
                            <!-- Glow Effect on Hover -->
                            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                            
                            <!-- Card -->
                            <div class="relative h-full flex flex-col p-8 rounded-3xl transition-all duration-300 group-hover:scale-105 group-hover:translate-y-[-8px] overflow-hidden"
                                 style="background: rgba(137, 44, 220, 0.05); border: 1px solid rgba(137, 44, 220, 0.2); backdrop-filter: blur(10px); min-height: 280px;">
                                
                                <!-- Shine Effect -->
                                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                
                                <!-- Quiz Number Badge -->
                                <div class="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center font-bold"
                                     style="background: rgba(137, 44, 220, 0.2); border: 1px solid rgba(137, 44, 220, 0.4); color: #892CDC;">
                                    ${index + 1}
                                </div>

                                <!-- Content -->
                                <div class="relative flex-1 flex flex-col">
                                    <!-- Title -->
                                    <h3 class="text-2xl font-bold mb-3 pr-12" style="color: #f5f5f5;">
                                        ${quiz.title}
                                    </h3>
                                    
                                    <!-- Description -->
                                    <p class="text-sm mb-6 flex-1" style="color: rgba(245, 245, 245, 0.6);">
                                        ${quiz.description}
                                    </p>

                                    <!-- Info Tags -->
                                    <div class="flex flex-wrap gap-3 mb-6">
                                        <!-- Difficulty Badge -->
                                        <div class="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                                             style="background: rgba(137, 44, 220, 0.1); border: 1px solid rgba(137, 44, 220, 0.3);">
                                            <span>${difficulty.emoji}</span>
                                            <span style="color: #f5f5f5;">${difficulty.label}</span>
                                        </div>

                                        <!-- Questions Count -->
                                        <div class="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                                             style="background: rgba(137, 44, 220, 0.1); border: 1px solid rgba(137, 44, 220, 0.3);">
                                            <span>❓</span>
                                            <span style="color: #f5f5f5;">${quiz.questions.length} Soal</span>
                                        </div>
                                    </div>

                                    <!-- Start Button -->
                                    <div class="flex items-center justify-between pt-4 border-t border-purple-500/20">
                                        <div class="flex items-center gap-2 text-sm" style="color: rgba(245, 245, 245, 0.4);">
                                            <span>🏆</span>
                                            <span>Raih Skormu!</span>
                                        </div>
                                        <div class="flex items-center gap-2 font-bold transition-all group-hover:gap-3" 
                                             style="color: #892CDC;">
                                            <span>Mulai</span>
                                            <span class="text-xl">→</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
        }).join('')}
            </div>

            <!-- Fun Fact Section -->
            <div class="relative z-10 mb-20">
                <div class="relative p-12 rounded-3xl text-center overflow-hidden"
                     style="background: rgba(137, 44, 220, 0.05); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                    
                    <!-- Animated Background -->
                    <div class="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 animate-pulse"></div>
                    
                    <!-- Content -->
                    <div class="relative z-10">
                        <div class="text-6xl mb-4">💡</div>
                        <h3 class="text-3xl font-bold mb-3" style="color: #f5f5f5;">
                            Tahukah Kamu?
                        </h3>
                        <p class="text-lg max-w-2xl mx-auto" style="color: rgba(245, 245, 245, 0.7);">
                            Belajar dengan quiz dapat meningkatkan daya ingat hingga 50% lebih efektif dibanding membaca pasif!
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Mouse tracking for dynamic glow
        const mouseGlow = document.getElementById('mouse-glow-quiz');
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

        // Cleanup on page change
        container.addEventListener('DOMNodeRemoved', () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        }, { once: true });

        // Add shimmer animation to CSS if not exists
        if (!document.querySelector('#shimmer-animation')) {
            const style = document.createElement('style');
            style.id = 'shimmer-animation';
            style.textContent = `
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 3s infinite;
                }
            `;
            document.head.appendChild(style);
        }
    }
};