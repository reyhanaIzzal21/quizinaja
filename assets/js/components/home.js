// assets/js/components/home.js
import { getCategories } from '../utils/dataLoader.js';

export const Home = {
    render: function (container) {
        const categories = getCategories();

        // Generate floating particles
        const particles = Array.from({ length: 40 }, (_, i) => {
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
                <div id="mouse-glow" class="absolute w-96 h-96 rounded-full transition-all duration-300 ease-out pointer-events-none"
                     style="
                        background: radial-gradient(circle, rgba(137, 44, 220, 0.15) 0%, transparent 70%);
                        filter: blur(60px);
                        transform: translate(-50%, -50%);
                     "></div>

                <!-- Static Gradient Orbs -->
                <div class="absolute w-96 h-96 rounded-full animate-pulse" 
                     style="
                        left: 10%; 
                        top: 20%;
                        background: radial-gradient(circle, rgba(137, 44, 220, 0.3) 0%, transparent 70%);
                        filter: blur(150px);
                        opacity: 0.4;
                     "></div>
                <div class="absolute rounded-full animate-pulse" 
                     style="
                        right: 15%; 
                        top: 50%;
                        width: 400px;
                        height: 400px;
                        background: radial-gradient(circle, rgba(82, 5, 123, 0.3) 0%, transparent 70%);
                        filter: blur(180px);
                        opacity: 0.4;
                     "></div>
                <div class="absolute rounded-full animate-pulse" 
                     style="
                        left: 50%; 
                        bottom: 10%;
                        width: 350px;
                        height: 350px;
                        background: radial-gradient(circle, rgba(137, 44, 220, 0.2) 0%, transparent 70%);
                        filter: blur(150px);
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

            <!-- Hero Section -->
            <div class="text-center mb-24 pt-10 relative z-10">
                
                <!-- Main Title -->
                <h1 class="text-7xl md:text-8xl font-bold mb-6 leading-tight">
                    <span class="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                        Selamat Datang
                    </span>
                    <br>
                    <span style="color: #f5f5f5;">di Quizinaja!</span>
                </h1>
                
                <p class="text-xl md:text-2xl mb-12 max-w-3xl mx-auto" style="color: rgba(245, 245, 245, 0.6);">
                    Platform quiz interaktif dengan pengalaman futuristik.<br>
                    Pilih kategori untuk memulai perjalanan belajar! 🚀
                </p>

                <!-- Stats Cards -->
                <div class="flex flex-wrap justify-center gap-6 mb-8">
                    <!-- Stat 1 -->
                    <div class="relative group">
                        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <div class="relative flex items-center gap-4 px-8 py-5 rounded-2xl" 
                             style="background: rgba(137, 44, 220, 0.1); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                            <div class="text-4xl">🧠</div>
                            <div class="text-left">
                                <div class="text-3xl font-bold" style="color: #f5f5f5;">${categories.length}</div>
                                <div class="text-sm" style="color: rgba(245, 245, 245, 0.6);">Kategori</div>
                            </div>
                        </div>
                    </div>

                    <!-- Stat 2 -->
                    <div class="relative group">
                        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <div class="relative flex items-center gap-4 px-8 py-5 rounded-2xl" 
                             style="background: rgba(137, 44, 220, 0.1); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                            <div class="text-4xl">📝</div>
                            <div class="text-left">
                                <div class="text-3xl font-bold" style="color: #f5f5f5;">${categories.reduce((sum, cat) => sum + cat.quizzes.length, 0)}</div>
                                <div class="text-sm" style="color: rgba(245, 245, 245, 0.6);">Quiz Tersedia</div>
                            </div>
                        </div>
                    </div>

                    <!-- Stat 3 -->
                    <div class="relative group">
                        <div class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <div class="relative flex items-center gap-4 px-8 py-5 rounded-2xl" 
                             style="background: rgba(137, 44, 220, 0.1); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                            <div class="text-4xl">🏆</div>
                            <div class="text-left">
                                <div class="text-3xl font-bold" style="color: #f5f5f5;">10K+</div>
                                <div class="text-sm" style="color: rgba(245, 245, 245, 0.6);">Active Players</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Categories Section Header -->
            <div class="text-center mb-16 relative z-10">
                <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: #f5f5f5;">
                    Kategori Quiz
                </h2>
                <p class="text-lg" style="color: rgba(245, 245, 245, 0.6);">
                    Mulai perjalanan belajar kamu sekarang
                </p>
            </div>

            <!-- Categories Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 mb-24">
                ${categories.map((category, index) => {
                    const gradients = [
                        'from-purple-600 to-pink-600',
                        'from-blue-600 to-purple-600',
                        'from-pink-600 to-purple-600',
                        'from-purple-600 to-indigo-600'
                    ];
                    const gradient = gradients[index % gradients.length];
                    
                    return `
                        <div class="category-card-wrapper relative group cursor-pointer"
                             onclick="app.router.navigate('quizList', {categoryId: '${category.id}'})"
                             data-index="${index}">
                            
                            <!-- Glow Effect on Hover -->
                            <div class="absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                            
                            <!-- Card -->
                            <div class="relative h-full p-8 rounded-3xl transition-all duration-300 group-hover:scale-105 group-hover:translate-y-[-8px] overflow-hidden"
                                 style="background: rgba(137, 44, 220, 0.05); border: 1px solid rgba(137, 44, 220, 0.2); backdrop-filter: blur(10px);">
                                
                                <!-- Shine Effect -->
                                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                
                                <!-- Icon Container -->
                                <div class="relative mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${gradient} p-0.5">
                                    <div class="w-full h-full rounded-2xl flex items-center justify-center" style="background: rgba(0, 0, 0, 0.8);">
                                        <span class="text-4xl">${category.icon}</span>
                                    </div>
                                </div>

                                <h3 class="text-2xl font-bold mb-3" style="color: #f5f5f5;">
                                    ${category.name}
                                </h3>
                                
                                <p class="text-sm mb-6" style="color: rgba(245, 245, 245, 0.6);">
                                    ${category.description}
                                </p>

                                <div class="flex items-center justify-between">
                                    <span class="text-sm" style="color: rgba(245, 245, 245, 0.4);">
                                        ${category.quizzes.length} Quiz
                                    </span>
                                    <div class="flex items-center gap-2 font-medium transition-all group-hover:gap-3" 
                                         style="color: #892CDC;">
                                        <span class="text-sm">Mulai</span>
                                        <span class="text-lg">→</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <!-- CTA Section -->
            <div class="relative z-10 mb-20">
                <div class="relative p-16 rounded-3xl text-center overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300"
                     style="background: rgba(137, 44, 220, 0.05); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                    
                    <!-- Animated Background Gradient -->
                    <div class="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 animate-pulse"></div>
                    
                    <!-- Content -->
                    <div class="relative z-10">
                        <div class="text-7xl mb-6 animate-bounce">🏆</div>
                        <h2 class="text-5xl font-bold mb-4" style="color: #f5f5f5;">
                            Siap Menjadi Quiz Master?
                        </h2>
                        <p class="text-xl mb-8 max-w-2xl mx-auto" style="color: rgba(245, 245, 245, 0.6);">
                            Bergabunglah dengan ribuan players lainnya dan buktikan pengetahuanmu!
                        </p>
                        <button class="relative px-12 py-5 rounded-full font-bold text-lg overflow-hidden group/btn transition-all hover:scale-110"
                                style="background: linear-gradient(135deg, #892CDC, #52057B); color: #f5f5f5; box-shadow: 0 10px 40px rgba(137, 44, 220, 0.4);">
                            <span class="relative z-10">Mulai Sekarang</span>
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Mouse tracking for dynamic glow
        const mouseGlow = document.getElementById('mouse-glow');
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
    }
};