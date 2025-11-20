export const Result = {
    render: function (container, score, total, questions = [], userAnswers = [], correctAnswers = []) {
        const totalQuestions = total || 5;
        const percentage = (score / totalQuestions) * 100;
        let grade, message, color, emoji, gradient;

        // Menentukan Grade dengan tema Web3
        if (percentage >= 80) {
            grade = 'Legendary! 🏆';
            message = 'Outstanding performance! You are a true Quiz Master!';
            color = 'text-yellow-400';
            emoji = '🌟';
            gradient = 'from-yellow-500 to-orange-500';
        } else if (percentage >= 60) {
            grade = 'Epic! 💎';
            message = 'Great job! Keep pushing to reach legendary status!';
            color = 'text-blue-400';
            emoji = '💎';
            gradient = 'from-blue-500 to-purple-500';
        } else {
            grade = 'Keep Fighting! ⚔️';
            message = 'Every master was once a beginner. Try again!';
            color = 'text-purple-400';
            emoji = '🔥';
            gradient = 'from-purple-500 to-pink-500';
        }

        // Generate floating particles for background
        const particles = Array.from({ length: 30 }, (_, i) => {
            const delay = Math.random() * 3;
            const duration = 3 + Math.random() * 3;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const size = Math.random() * 2 + 1;
            return `
                <div class="absolute rounded-full bg-purple-500 animate-pulse" 
                     style="
                        left: ${left}%; 
                        top: ${top}%; 
                        width: ${size}px; 
                        height: ${size}px;
                        animation-delay: ${delay}s; 
                        animation-duration: ${duration}s;
                        opacity: ${Math.random() * 0.3 + 0.1};
                     "></div>
            `;
        }).join('');

        // Generate HTML untuk List Soal
        const recapHTML = questions.map((q, index) => {
            const userAns = userAnswers[index] || "-";
            const correctAns = correctAnswers[index];
            const isCorrect = userAns === correctAns;

            const cardBorderClass = isCorrect 
                ? 'border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5' 
                : 'border-red-500/30 bg-gradient-to-br from-red-500/5 to-pink-500/5';
            
            const statusIcon = isCorrect ? '✓' : '✗';
            const statusColor = isCorrect ? 'text-green-400' : 'text-red-400';
            const statusBg = isCorrect ? 'bg-green-500/20' : 'bg-red-500/20';

            return `
                <div class="relative group">
                    <!-- Glow Effect -->
                    <div class="absolute -inset-1 bg-gradient-to-r ${isCorrect ? 'from-green-600 to-emerald-600' : 'from-red-600 to-pink-600'} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    
                    <!-- Card -->
                    <div class="relative rounded-2xl p-6 border ${cardBorderClass} transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                         style="background: rgba(137, 44, 220, 0.03); backdrop-filter: blur(10px);">
                        
                        <!-- Shine Effect -->
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        <!-- Header -->
                        <div class="relative flex items-center justify-between mb-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
                                     style="background: rgba(137, 44, 220, 0.2); color: #892CDC;">
                                    ${index + 1}
                                </div>
                                <span class="text-sm font-medium" style="color: rgba(245, 245, 245, 0.6);">
                                    Question ${index + 1}
                                </span>
                            </div>
                            <div class="flex items-center gap-2 px-4 py-2 rounded-full ${statusBg}">
                                <span class="text-xl ${statusColor}">${statusIcon}</span>
                                <span class="text-sm font-bold ${statusColor}">
                                    ${isCorrect ? 'Correct' : 'Wrong'}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Question -->
                        <p class="text-lg mb-6 font-medium" style="color: #f5f5f5;">
                            ${q.question}
                        </p>

                        <!-- Options -->
                        <div class="space-y-3">
                            ${q.options.map((opt, optIndex) => {
                                const letter = String.fromCharCode(65 + optIndex);
                                let optionClass = "relative p-4 rounded-xl border transition-all duration-300";
                                let icon = "";
                                let iconColor = "";
                                let borderColor = "border-purple-500/20";
                                let bgColor = "rgba(137, 44, 220, 0.05)";

                                if (letter === userAns) {
                                    if (isCorrect) {
                                        optionClass += " border-green-500/50 shadow-lg shadow-green-500/20";
                                        icon = "✓";
                                        iconColor = "text-green-400";
                                        bgColor = "rgba(34, 197, 94, 0.1)";
                                    } else {
                                        optionClass += " border-red-500/50 shadow-lg shadow-red-500/20";
                                        icon = "✗";
                                        iconColor = "text-red-400";
                                        bgColor = "rgba(239, 68, 68, 0.1)";
                                    }
                                } else if (letter === correctAns && !isCorrect) {
                                    optionClass += " border-green-500/30 border-dashed";
                                    icon = "✓";
                                    iconColor = "text-green-400";
                                    bgColor = "rgba(34, 197, 94, 0.05)";
                                }

                                return `
                                    <div class="${optionClass}" style="background: ${bgColor};">
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-3 flex-1">
                                                <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                                                     style="background: rgba(137, 44, 220, 0.2); color: #892CDC;">
                                                    ${letter}
                                                </div>
                                                <span style="color: #f5f5f5;">${opt}</span>
                                            </div>
                                            ${icon ? `
                                                <div class="flex items-center gap-2">
                                                    <span class="text-2xl ${iconColor}">${icon}</span>
                                                    ${letter === userAns ? `
                                                        <span class="text-xs font-semibold px-2 py-1 rounded-full" 
                                                              style="background: ${isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}; color: ${isCorrect ? '#4ade80' : '#f87171'};">
                                                            Your Answer
                                                        </span>
                                                    ` : letter === correctAns ? `
                                                        <span class="text-xs font-semibold px-2 py-1 rounded-full" 
                                                              style="background: rgba(34, 197, 94, 0.2); color: #4ade80;">
                                                            Correct Answer
                                                        </span>
                                                    ` : ''}
                                                </div>
                                            ` : ''}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Render HTML Utama
        container.innerHTML = `
            <!-- Animated Background -->
            <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div class="absolute inset-0">${particles}</div>
                
                <!-- Gradient Orbs -->
                <div class="absolute w-96 h-96 rounded-full animate-pulse" 
                     style="left: 10%; top: 20%; background: radial-gradient(circle, rgba(137, 44, 220, 0.2) 0%, transparent 70%); filter: blur(150px);"></div>
                <div class="absolute w-96 h-96 rounded-full animate-pulse" 
                     style="right: 10%; top: 40%; background: radial-gradient(circle, rgba(82, 5, 123, 0.2) 0%, transparent 70%); filter: blur(150px);"></div>
            </div>

            <div class="max-w-5xl mx-auto pb-20 pt-8 relative z-10">
                <!-- Header Score Card -->
                <div class="relative mb-12 group">
                    <!-- Glow Effect -->
                    <div class="absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                    
                    <!-- Main Card -->
                    <div class="relative rounded-3xl p-10 overflow-hidden"
                         style="background: rgba(137, 44, 220, 0.05); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(20px);">
                        
                        <!-- Animated Background -->
                        <div class="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-pink-600/5"></div>
                        
                        <!-- Content -->
                        <div class="relative text-center">
                            <!-- Trophy Animation -->
                            <div class="mb-6 inline-block animate-bounce">
                                <div class="text-8xl mb-2 drop-shadow-2xl">${emoji}</div>
                            </div>

                            <!-- Grade -->
                            <h2 class="text-5xl md:text-6xl font-bold mb-4 ${color} drop-shadow-lg">
                                ${grade}
                            </h2>

                            <!-- Score Display -->
                            <div class="flex items-center justify-center gap-4 mb-6">
                                <div class="text-7xl md:text-8xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent drop-shadow-2xl">
                                    ${score}
                                </div>
                                <div class="text-4xl font-bold" style="color: rgba(245, 245, 245, 0.3);">/</div>
                                <div class="text-5xl md:text-6xl font-bold" style="color: rgba(245, 245, 245, 0.5);">
                                    ${totalQuestions}
                                </div>
                            </div>

                            <!-- Message -->
                            <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto" style="color: rgba(245, 245, 245, 0.7);">
                                ${message}
                            </p>

                            <!-- Progress Bar -->
                            <div class="relative w-full h-6 rounded-full mb-8 overflow-hidden"
                                 style="background: rgba(137, 44, 220, 0.1);">
                                <div class="absolute inset-0 rounded-full overflow-hidden">
                                    <div class="h-full bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out flex items-center justify-end pr-4 relative"
                                         style="width: ${percentage}%;">
                                        <!-- Shine Effect -->
                                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                                        <span class="relative text-sm font-bold text-white drop-shadow-lg z-10">
                                            ${percentage.toFixed(0)}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Stats Row -->
                            <div class="flex flex-wrap justify-center gap-6 mb-8">
                                <!-- Correct Answers -->
                                <div class="flex items-center gap-3 px-6 py-3 rounded-xl"
                                     style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3);">
                                    <span class="text-2xl">✓</span>
                                    <div class="text-left">
                                        <div class="text-2xl font-bold text-green-400">${score}</div>
                                        <div class="text-xs" style="color: rgba(245, 245, 245, 0.5);">Correct</div>
                                    </div>
                                </div>

                                <!-- Wrong Answers -->
                                <div class="flex items-center gap-3 px-6 py-3 rounded-xl"
                                     style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3);">
                                    <span class="text-2xl">✗</span>
                                    <div class="text-left">
                                        <div class="text-2xl font-bold text-red-400">${totalQuestions - score}</div>
                                        <div class="text-xs" style="color: rgba(245, 245, 245, 0.5);">Wrong</div>
                                    </div>
                                </div>

                                <!-- Accuracy -->
                                <div class="flex items-center gap-3 px-6 py-3 rounded-xl"
                                     style="background: rgba(137, 44, 220, 0.1); border: 1px solid rgba(137, 44, 220, 0.3);">
                                    <span class="text-2xl">🎯</span>
                                    <div class="text-left">
                                        <div class="text-2xl font-bold" style="color: #892CDC;">${percentage.toFixed(0)}%</div>
                                        <div class="text-xs" style="color: rgba(245, 245, 245, 0.5);">Accuracy</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex flex-wrap justify-center gap-4">
                                <button onclick="app.router.navigate('home')"
                                        class="relative group/btn px-8 py-4 rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105"
                                        style="background: rgba(137, 44, 220, 0.2); border: 2px solid rgba(137, 44, 220, 0.5); color: #f5f5f5;">
                                    <span class="relative z-10 flex items-center gap-2">
                                        <span>Back to Home</span>
                                    </span>
                                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                                </button>

                                <button onclick="location.reload()"
                                        class="relative group/btn px-8 py-4 rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105"
                                        style="background: linear-gradient(135deg, #892CDC, #52057B); color: #f5f5f5; box-shadow: 0 10px 30px rgba(137, 44, 220, 0.3);">
                                    <span class="relative z-10 flex items-center gap-2">
                                        <span>Try Another Quiz</span>
                                    </span>
                                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Review Section Header -->
                <div class="flex items-center justify-between mb-8 px-2">
                    <div>
                        <h2 class="text-3xl md:text-4xl font-bold mb-2" style="color: #f5f5f5;">
                            📝 Answer Review
                        </h2>
                        <p class="text-sm md:text-base" style="color: rgba(245, 245, 245, 0.5);">
                            Detailed breakdown of your performance
                        </p>
                    </div>
                </div>

                <!-- Questions List -->
                <div class="space-y-6 mb-16">
                    ${recapHTML}
                </div>

                <!-- Bottom CTA -->
                <div class="relative group">
                    <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div class="relative p-8 rounded-2xl text-center"
                         style="background: rgba(137, 44, 220, 0.05); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                        <div class="text-5xl mb-4">🚀</div>
                        <h3 class="text-2xl font-bold mb-2" style="color: #f5f5f5;">
                            Ready for Next Challenge?
                        </h3>
                        <p class="mb-6" style="color: rgba(245, 245, 245, 0.6);">
                            Keep learning and improve your skills!
                        </p>
                        <button onclick="app.router.navigate('home')"
                                class="px-8 py-3 rounded-xl font-bold transition-all hover:scale-105"
                                style="background: linear-gradient(135deg, #892CDC, #52057B); color: #f5f5f5; box-shadow: 0 8px 25px rgba(137, 44, 220, 0.3);">
                            Explore More Quizzes
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};