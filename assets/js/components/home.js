// assets/js/components/home.js
import { getCategories } from '../utils/dataLoader.js';

export const Home = {
    render: function (container) {
        const categories = getCategories();

        // Generate advanced floating particles with varied animations
        const particles = Array.from({ length: 50 }, (_, i) => {
            const delay = Math.random() * 8;
            const duration = 5 + Math.random() * 8;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const size = Math.random() * 4 + 1;
            const opacity = Math.random() * 0.4 + 0.1;
            return `
                <div class="absolute rounded-full animate-pulse" 
                     style="
                        left: ${left}%; 
                        top: ${top}%; 
                        width: ${size}px; 
                        height: ${size}px;
                        animation-delay: ${delay}s; 
                        animation-duration: ${duration}s;
                        opacity: ${opacity};
                        background: radial-gradient(circle, rgba(137, 44, 220, 0.8), rgba(82, 5, 123, 0.4));
                        filter: blur(${Math.random() * 2}px);
                     "></div>
            `;
        }).join('');

        container.innerHTML = `
            <!-- Advanced Background System -->
            <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <!-- Animated Particles Network -->
                <div class="absolute inset-0">${particles}</div>

                <!-- Dynamic Mouse Glow -->
                <div id="mouse-glow" class="absolute w-[500px] h-[500px] rounded-full transition-all duration-500 ease-out pointer-events-none"
                     style="
                        background: radial-gradient(circle, rgba(137, 44, 220, 0.2) 0%, rgba(82, 5, 123, 0.1) 40%, transparent 70%);
                        filter: blur(80px);
                        transform: translate(-50%, -50%);
                        mix-blend-mode: screen;
                     "></div>

                <!-- Layered Gradient Orbs -->
                <div class="absolute w-[600px] h-[600px] rounded-full" 
                     style="
                        left: -10%; 
                        top: 10%;
                        background: radial-gradient(circle, rgba(137, 44, 220, 0.25) 0%, transparent 70%);
                        filter: blur(120px);
                        opacity: 0.6;
                        animation: float 20s ease-in-out infinite;
                     "></div>
                <div class="absolute w-[500px] h-[500px] rounded-full" 
                     style="
                        right: -5%; 
                        top: 40%;
                        background: radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%);
                        filter: blur(100px);
                        opacity: 0.5;
                        animation: float 25s ease-in-out infinite reverse;
                     "></div>
                <div class="absolute w-[550px] h-[550px] rounded-full" 
                     style="
                        left: 40%; 
                        bottom: -10%;
                        background: radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, transparent 70%);
                        filter: blur(110px);
                        opacity: 0.4;
                        animation: float 30s ease-in-out infinite;
                     "></div>

                <!-- Animated Grid Pattern -->
                <div class="absolute inset-0 opacity-[0.03]"
                     style="
                        background-image: 
                            linear-gradient(rgba(137, 44, 220, 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(137, 44, 220, 0.5) 1px, transparent 1px);
                        background-size: 60px 60px;
                        animation: gridMove 20s linear infinite;
                     "></div>

                <!-- Radial Light -->
                <div class="absolute inset-0" 
                     style="
                        background: radial-gradient(circle at 50% 0%, rgba(137, 44, 220, 0.1) 0%, transparent 50%);
                     "></div>
            </div>

            <!-- Hero Section - Above the Fold -->
            <div class="relative z-10 min-h-[85vh] flex items-center justify-center">
                <div class="max-w-7xl mx-auto px-4 text-center">
                    
                    <!-- Badge/Tag -->
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fadeIn"
                         style="
                            background: rgba(137, 44, 220, 0.1); 
                            border: 1px solid rgba(137, 44, 220, 0.3); 
                            backdrop-filter: blur(10px);
                            animation-delay: 0.1s;
                         ">
                        <span class="w-2 h-2 rounded-full animate-pulse" style="background: #892CDC;"></span>
                        <span class="text-sm font-medium" style="color: rgba(245, 245, 245, 0.8);">Platform Quiz Generasi Baru</span>
                    </div>

                    <!-- Main Headline -->
                    <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] animate-fadeIn" style="animation-delay: 0.2s;">
                        <span style="color: #f5f5f5;">Tingkatkan Skill,</span>
                        <br>
                        <span class="inline-block relative">
                            <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                                Raih Pengetahuan Baru
                            </span>
                            <!-- Underline decoration -->
                            <svg class="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 10C50 5 100 2 150 5C200 8 250 4 298 7" stroke="url(#gradient)" stroke-width="3" stroke-linecap="round"/>
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style="stop-color:rgb(167, 139, 250);stop-opacity:0.6" />
                                        <stop offset="100%" style="stop-color:rgb(236, 72, 153);stop-opacity:0.6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                    </h1>
                    
                    <!-- Subheadline -->
                    <p class="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed animate-fadeIn" 
                       style="color: rgba(245, 245, 245, 0.7); animation-delay: 0.3s;">
                        Asah kemampuan dengan ribuan soal interaktif. Dapatkan feedback real-time dan lacak progres belajarmu secara detail.
                    </p>

                    <!-- CTA Buttons -->
                    <div class="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fadeIn" style="animation-delay: 0.4s;">
                        <button onclick="document.getElementById('categories-section').scrollIntoView({behavior: 'smooth'})"
                                class="group relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
                                style="background: linear-gradient(135deg, #892CDC, #52057B); color: #f5f5f5; box-shadow: 0 20px 60px rgba(137, 44, 220, 0.4);">
                            <span class="relative z-10 flex items-center gap-2">
                                Mulai Belajar
                                <span class="transition-transform group-hover:translate-x-1">→</span>
                            </span>
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </button>
                        
                        <button onclick="document.getElementById('features-section').scrollIntoView({behavior: 'smooth'})"
                                class="group px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
                                style="background: rgba(137, 44, 220, 0.1); border: 2px solid rgba(137, 44, 220, 0.4); color: #f5f5f5; backdrop-filter: blur(10px);">
                            <span class="flex items-center gap-2">
                                Lihat Fitur
                                <span class="transition-transform group-hover:translate-y-0.5">↓</span>
                            </span>
                        </button>
                    </div>

                    <!-- Stats Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fadeIn" style="animation-delay: 0.5s;">
                        <!-- Stat 1 -->
                        <div class="relative group">
                            <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                            <div class="relative p-6 rounded-2xl transition-all duration-300 group-hover:translate-y-[-4px]" 
                                 style="background: rgba(137, 44, 220, 0.08); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                                <div class="text-4xl mb-3">🎯</div>
                                <div class="text-4xl font-bold mb-1" style="color: #f5f5f5;">${categories.length}+</div>
                                <div class="text-sm font-medium" style="color: rgba(245, 245, 245, 0.6);">Kategori Belajar</div>
                            </div>
                        </div>

                        <!-- Stat 2 -->
                        <div class="relative group">
                            <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                            <div class="relative p-6 rounded-2xl transition-all duration-300 group-hover:translate-y-[-4px]" 
                                 style="background: rgba(137, 44, 220, 0.08); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                                <div class="text-4xl mb-3">📚</div>
                                <div class="text-4xl font-bold mb-1" style="color: #f5f5f5;">${categories.reduce((sum, cat) => sum + cat.quizzes.length, 0)}+</div>
                                <div class="text-sm font-medium" style="color: rgba(245, 245, 245, 0.6);">Materi Quiz Tersedia</div>
                            </div>
                        </div>

                        <!-- Stat 3 -->
                        <div class="relative group">
                            <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                            <div class="relative p-6 rounded-2xl transition-all duration-300 group-hover:translate-y-[-4px]" 
                                 style="background: rgba(137, 44, 220, 0.08); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                                <div class="text-4xl mb-3">⚡</div>
                                <div class="text-4xl font-bold mb-1" style="color: #f5f5f5;">24/7</div>
                                <div class="text-sm font-medium" style="color: rgba(245, 245, 245, 0.6);">Akses Tanpa Batas</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Features Section -->
            <div id="features-section" class="relative z-10 py-24">
                <div class="max-w-7xl mx-auto px-4">
                    
                    <!-- Section Header -->
                    <div class="text-center mb-20">
                        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                             style="background: rgba(137, 44, 220, 0.1); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                            <span class="text-sm font-medium" style="color: rgba(245, 245, 245, 0.8);">Kenapa Memilih Kami?</span>
                        </div>
                        <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: #f5f5f5;">
                            Belajar Lebih Efektif & Menyenangkan
                        </h2>
                        <p class="text-lg max-w-2xl mx-auto" style="color: rgba(245, 245, 245, 0.6);">
                            Fitur-fitur canggih yang dirancang untuk memaksimalkan pengalaman belajarmu
                        </p>
                    </div>

                    <!-- Features Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${[
                {
                    icon: '🎮',
                    title: 'Interface Interaktif',
                    desc: 'Desain modern dan responsif yang membuat belajar terasa seperti bermain game',
                    gradient: 'from-purple-600 to-pink-600'
                },
                {
                    icon: '📊',
                    title: 'Progress Tracking',
                    desc: 'Pantau perkembangan belajarmu dengan sistem tracking yang detail dan akurat',
                    gradient: 'from-blue-600 to-purple-600'
                },
                {
                    icon: '⚡',
                    title: 'Instant Feedback',
                    desc: 'Dapatkan penjelasan langsung untuk setiap jawaban benar atau salah',
                    gradient: 'from-pink-600 to-purple-600'
                },
                {
                    icon: '🎯',
                    title: 'Multi Kategori',
                    desc: 'Berbagai topik dari berbagai bidang ilmu sesuai minat dan kebutuhanmu',
                    gradient: 'from-purple-600 to-indigo-600'
                },
                {
                    icon: '🏆',
                    title: 'Sistem Skor',
                    desc: 'Kompetisi sehat dengan sistem penilaian yang fair dan transparan',
                    gradient: 'from-orange-500 to-pink-600'
                },
                {
                    icon: '📱',
                    title: 'Multi Platform',
                    desc: 'Akses dari desktop, tablet, atau smartphone kapan saja dan dimana saja',
                    gradient: 'from-green-500 to-blue-600'
                }
            ].map((feature, idx) => `
                            <div class="feature-card relative group cursor-pointer" style="animation: fadeInUp 0.6s ease ${idx * 0.1}s backwards;">
                                <div class="absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                                <div class="relative h-full p-8 rounded-3xl transition-all duration-300 group-hover:translate-y-[-8px]"
                                     style="background: rgba(137, 44, 220, 0.05); border: 1px solid rgba(137, 44, 220, 0.2); backdrop-filter: blur(10px);">
                                    
                                    <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r ${feature.gradient} p-0.5">
                                        <div class="w-full h-full rounded-2xl flex items-center justify-center text-3xl" style="background: rgba(0, 0, 0, 0.8);">
                                            ${feature.icon}
                                        </div>
                                    </div>

                                    <h3 class="text-xl font-bold mb-3" style="color: #f5f5f5;">
                                        ${feature.title}
                                    </h3>
                                    
                                    <p class="text-sm leading-relaxed" style="color: rgba(245, 245, 245, 0.6);">
                                        ${feature.desc}
                                    </p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Categories Section -->
            <div id="categories-section" class="relative z-10 py-24">
                <div class="max-w-7xl mx-auto px-4">
                    
                    <!-- Section Header -->
                    <div class="text-center mb-20">
                        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                             style="background: rgba(137, 44, 220, 0.1); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                            <span class="text-sm font-medium" style="color: rgba(245, 245, 245, 0.8);">Jelajahi Materi</span>
                        </div>
                        <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: #f5f5f5;">
                            Pilih Kategori Favorit Kamu
                        </h2>
                        <p class="text-lg max-w-2xl mx-auto" style="color: rgba(245, 245, 245, 0.6);">
                            Dari sains hingga seni, temukan beragam topik yang siap menguji pengetahuanmu
                        </p>
                    </div>

                    <!-- Categories Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        ${categories.map((category, index) => {
                const gradients = [
                    'from-purple-600 to-pink-600',
                    'from-blue-600 to-purple-600',
                    'from-pink-600 to-purple-600',
                    'from-purple-600 to-indigo-600',
                    'from-orange-500 to-pink-600',
                    'from-green-500 to-blue-600'
                ];
                const gradient = gradients[index % gradients.length];

                return `
                                <div class="category-card-wrapper relative group cursor-pointer" 
                                     onclick="app.router.navigate('quizList', {categoryId: '${category.id}'})"
                                     style="animation: fadeInUp 0.6s ease ${index * 0.1}s backwards;">
                                    
                                    <div class="absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur-lg opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
                                    
                                    <div class="relative h-full p-8 rounded-3xl transition-all duration-300 group-hover:scale-[1.02] group-hover:translate-y-[-8px] overflow-hidden"
                                         style="background: rgba(137, 44, 220, 0.05); border: 1px solid rgba(137, 44, 220, 0.2); backdrop-filter: blur(10px);">
                                        
                                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        
                                        <div class="relative mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${gradient} p-0.5">
                                            <div class="w-full h-full rounded-2xl flex items-center justify-center" style="background: rgba(0, 0, 0, 0.8);">
                                                <span class="text-4xl">${category.icon}</span>
                                            </div>
                                        </div>

                                        <h3 class="text-2xl font-bold mb-3" style="color: #f5f5f5;">
                                            ${category.name}
                                        </h3>
                                        
                                        <p class="text-sm mb-6 leading-relaxed" style="color: rgba(245, 245, 245, 0.6);">
                                            ${category.description}
                                        </p>

                                        <div class="flex items-center justify-between pt-4 border-t border-white/10">
                                            <div class="flex items-center gap-2">
                                                <div class="w-2 h-2 rounded-full" style="background: #892CDC;"></div>
                                                <span class="text-sm font-medium" style="color: rgba(245, 245, 245, 0.5);">
                                                    ${category.quizzes.length} Quiz Available
                                                </span>
                                            </div>
                                            <div class="flex items-center gap-2 font-bold transition-all group-hover:gap-3" 
                                                 style="color: #892CDC;">
                                                <span class="text-sm">Explore</span>
                                                <span class="text-xl">→</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
            }).join('')}
                    </div>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="relative z-10 py-24">
                <div class="max-w-5xl mx-auto px-4">
                    <div class="relative p-16 rounded-3xl text-center overflow-hidden group"
                         style="background: rgba(137, 44, 220, 0.08); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                        
                        <div class="absolute inset-0">
                            <div class="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 animate-pulse"></div>
                            <div class="absolute top-0 left-0 w-full h-full opacity-30" style="
                                background-image: radial-gradient(circle, rgba(137, 44, 220, 0.3) 1px, transparent 1px);
                                background-size: 30px 30px;
                            "></div>
                        </div>
                        
                        <div class="relative z-10">
                            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                                 style="background: rgba(137, 44, 220, 0.15); border: 1px solid rgba(137, 44, 220, 0.4);">
                                <span class="w-2 h-2 rounded-full animate-pulse" style="background: #892CDC;"></span>
                                <span class="text-sm font-medium" style="color: rgba(245, 245, 245, 0.9);">Siap Untuk Tantangan?</span>
                            </div>

                            <h2 class="text-4xl md:text-5xl font-bold mb-6" style="color: #f5f5f5;">
                                Waktunya Buktikan Kemampuanmu
                            </h2>
                            <p class="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style="color: rgba(245, 245, 245, 0.7);">
                                Bergabung dengan ribuan learner yang sudah mengasah skill mereka. Perjalanan belajarmu dimulai dari sini.
                            </p>
                            
                            <button onclick="document.getElementById('categories-section').scrollIntoView({behavior: 'smooth'})"
                                    class="group relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-110"
                                    style="background: linear-gradient(135deg, #892CDC, #52057B); color: #f5f5f5; box-shadow: 0 20px 60px rgba(137, 44, 220, 0.5);">
                                <span class="relative z-10 flex items-center gap-2">
                                    Mulai Quiz Sekarang
                                    <span class="transition-transform group-hover:translate-x-2">🚀</span>
                                </span>
                                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Credit -->
            <div class="relative z-10 text-center py-8">
                <p class="text-sm" style="color: rgba(245, 245, 245, 0.4);">
                    © 2024 Quizinaja. Crafted with passion for learning.
                </p>
            </div>

            <style>
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translate(0, 0) rotate(0deg);
                    }
                    33% {
                        transform: translate(30px, -30px) rotate(120deg);
                    }
                    66% {
                        transform: translate(-20px, 20px) rotate(240deg);
                    }
                }

                @keyframes gridMove {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(60px, 60px);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.8s ease forwards;
                    opacity: 0;
                }
            </style>
        `;

        // Mouse tracking for dynamic glow with smooth easing
        const mouseGlow = document.getElementById('mouse-glow');
        let rafId = null;
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const updateGlow = () => {
            if (mouseGlow) {
                currentX += (mouseX - currentX) * 0.1;
                currentY += (mouseY - currentY) * 0.1;
                mouseGlow.style.left = `${currentX}px`;
                mouseGlow.style.top = `${currentY}px`;
            }
            rafId = requestAnimationFrame(updateGlow);
        };

        document.addEventListener('mousemove', handleMouseMove);
        updateGlow();

        // Cleanup
        container.addEventListener('DOMNodeRemoved', () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        }, { once: true });
    }
};