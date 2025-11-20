export const Result = {
    render: function (container, score, total, questions = [], userAnswers = [], correctAnswers = []) {
        // Fallback
        const totalQuestions = total || 5;
        const percentage = (score / totalQuestions) * 100;
        let grade, message, color;

        // Menentukan Grade (Sama seperti sebelumnya)
        if (percentage >= 80) {
            grade = 'Excellent! 🌟';
            message = 'Luar biasa! Anda menguasai materi dengan sangat baik!';
            color = 'text-green-600';
        } else if (percentage >= 60) {
            grade = 'Good! 👍';
            message = 'Bagus! Terus tingkatkan pemahaman Anda!';
            color = 'text-blue-600';
        } else {
            grade = 'Keep Learning! 📚';
            message = 'Jangan menyerah! Terus belajar dan coba lagi!';
            color = 'text-orange-600';
        }

        // Generate HTML untuk List Soal (Recap)
        const recapHTML = questions.map((q, index) => {
            const userAns = userAnswers[index] || "-"; // Jawaban user
            const correctAns = correctAnswers[index];  // Jawaban benar
            const isCorrect = userAns === correctAns;

            // Styling Card: Hijau jika benar, Merah jika salah
            const cardBorderClass = isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50';
            const statusIcon = isCorrect ? '✅ Benar' : '❌ Salah';
            const statusColor = isCorrect ? 'text-green-700' : 'text-red-700';

            return `
                <div class="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 ${cardBorderClass}">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">Soal ${index + 1}</h3>
                        <span class="text-sm font-bold ${statusColor} px-3 py-1 rounded-full bg-white shadow-sm">
                            ${statusIcon}
                        </span>
                    </div>
                    
                    <p class="text-gray-700 mb-4 text-lg">${q.question}</p>

                    <div class="space-y-2">
                        ${q.options.map((opt, optIndex) => {
                const letter = String.fromCharCode(65 + optIndex);
                let optionClass = "p-3 rounded-lg border border-gray-200 flex justify-between items-center";
                let icon = "";

                // Logika Visual Pilihan Jawaban
                if (letter === userAns) {
                    // Ini pilihan user
                    if (isCorrect) {
                        // User Benar (Hijau)
                        optionClass = "p-3 rounded-lg border-2 border-green-500 bg-green-100 font-semibold text-green-800";
                        icon = "✓ Jawaban Anda";
                    } else {
                        // User Salah (Merah)
                        optionClass = "p-3 rounded-lg border-2 border-red-500 bg-red-100 font-semibold text-red-800";
                        icon = "Your Choice";
                    }
                } else if (letter === correctAns && !isCorrect) {
                    // Jika user salah, kita kasih highlight tipis ke jawaban yang BENAR (Opsional, biar user tau jawabannya)
                    optionClass = "p-3 rounded-lg border border-green-300 bg-green-50 text-green-700 border-dashed";
                    icon = "Kunci Jawaban";
                }

                return `
                                <div class="${optionClass}">
                                    <div>
                                        <span class="font-bold mr-2">${letter}.</span> ${opt}
                                    </div>
                                    ${icon ? `<span class="text-sm font-bold">${icon}</span>` : ''}
                                </div>
                            `;
            }).join('')}
                    </div>
                </div>
            `;
        }).join('');

        // Render HTML Utama
        container.innerHTML = `
            <div class="max-w-3xl mx-auto pb-10">
                <!-- Bagian Score (Header) -->
                <div class="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
                    <h2 class="text-4xl font-bold ${color} mb-4">${grade}</h2>
                    <div class="text-6xl font-bold text-gray-800 mb-4">
                        ${score}/${totalQuestions}
                    </div>
                    <p class="text-xl text-gray-600 mb-6">${message}</p>
                    
                    <div class="w-full bg-gray-200 rounded-full h-6 mb-8">
                        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 h-6 rounded-full transition-all flex items-center justify-center text-white font-bold" 
                             style="width: ${percentage}%">
                            ${percentage.toFixed(0)}%
                        </div>
                    </div>

                    <div class="space-x-4">
                        <button onclick="app.router.navigate('home')"
                                class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-md">
                            Kembali ke Home
                        </button>
                        <button onclick="location.reload()"
                                class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold shadow-md">
                            Coba Quiz Lain
                        </button>
                    </div>
                </div>

                <!-- Bagian Judul Rekapan -->
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">📝 Analisis Jawaban</h2>
                    <span class="text-sm text-gray-500">Review hasil pekerjaan Anda</span>
                </div>

                <!-- Bagian List Soal (Recap Cards) -->
                <div class="space-y-6 fade-in">
                    ${recapHTML}
                </div>
                
                <div class="text-center mt-8 text-gray-400 text-sm">
                    End of Results
                </div>
            </div>
        `;
    }
};