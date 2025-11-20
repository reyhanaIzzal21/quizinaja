import { generateQuizFromAI } from '../utils/gemini.js';
import { extractTextFromPDF } from '../utils/fileParser.js';
import { downloadQuizPDF } from '../utils/pdfGenerator.js';

export const Generator = {
    generatedQuestions: [],
    isLoading: false,

    render: function (container) {
        // Generate floating particles
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
                        opacity: ${Math.random() * 0.4 + 0.1};
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

                <!-- Static Gradient Orbs -->
                <div class="absolute w-96 h-96 rounded-full animate-pulse" 
                     style="
                        left: 20%; 
                        top: 10%;
                        background: radial-gradient(circle, rgba(137, 44, 220, 0.2) 0%, transparent 70%);
                        filter: blur(120px);
                        opacity: 0.5;
                     "></div>
                <div class="absolute rounded-full animate-pulse" 
                     style="
                        right: 20%; 
                        bottom: 20%;
                        width: 400px;
                        height: 400px;
                        background: radial-gradient(circle, rgba(82, 5, 123, 0.25) 0%, transparent 70%);
                        filter: blur(140px);
                        opacity: 0.5;
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

            <!-- Main Content -->
            <div class="max-w-5xl mx-auto relative z-10 py-8">
                
                <!-- Header Section -->
                <div class="text-center mb-12">
                    <!-- Badge -->
                    <div class="inline-flex items-center gap-3 px-6 py-3 mb-6 rounded-full relative overflow-hidden group cursor-pointer"
                         style="background: rgba(137, 44, 220, 0.1); border: 1px solid rgba(137, 44, 220, 0.3); backdrop-filter: blur(10px);">
                        <span class="text-2xl animate-bounce">🤖</span>
                        <span class="text-sm font-medium" style="color: #f5f5f5;">AI Powered Quiz Generator</span>
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>

                    <!-- Title -->
                    <h1 class="text-5xl md:text-6xl font-bold mb-4">
                        <span class="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                            AI Quiz Generator
                        </span>
                    </h1>
                    <p class="text-lg md:text-xl max-w-2xl mx-auto" style="color: rgba(245, 245, 245, 0.6);">
                        Upload materi atau paste teks, biarkan AI membuatkan soal quiz untuk Anda secara otomatis 🚀
                    </p>
                </div>

                <!-- Input Card -->
                <div class="relative mb-8">
                    <!-- Glow Effect -->
                    <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-20"></div>
                    
                    <!-- Card Content -->
                    <div class="relative p-8 rounded-3xl" 
                         style="background: rgba(137, 44, 220, 0.05); border: 1px solid rgba(137, 44, 220, 0.2); backdrop-filter: blur(10px);">
                        
                        <div class="space-y-8">
                            
                            <!-- Text Area Section -->
                            <div class="relative">
                                <label class="flex items-center gap-2 text-lg font-semibold mb-4" style="color: #f5f5f5;">
                                    <span class="text-2xl">📝</span>
                                    <span>Masukkan Teks Materi</span>
                                </label>
                                <textarea 
                                    id="inputText" 
                                    rows="8" 
                                    class="w-full p-6 rounded-2xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(137, 44, 220, 0.3);"
                                    placeholder="Paste materi pelajaran di sini... Minimal 50 karakter untuk hasil terbaik."></textarea>
                            </div>

                            <!-- Divider -->
                            <div class="relative">
                                <div class="absolute inset-0 flex items-center">
                                    <div class="w-full border-t" style="border-color: rgba(137, 44, 220, 0.3);"></div>
                                </div>
                                <div class="relative flex justify-center">
                                    <span class="px-6 py-2 rounded-full text-sm font-medium" 
                                          style="background: rgba(0, 0, 0, 0.8); color: rgba(245, 245, 245, 0.6); border: 1px solid rgba(137, 44, 220, 0.3);">
                                        ATAU
                                    </span>
                                </div>
                            </div>

                            <!-- File Upload Section -->
                            <div class="relative">
                                <label class="flex items-center gap-2 text-lg font-semibold mb-4" style="color: #f5f5f5;">
                                    <span class="text-2xl">📄</span>
                                    <span>Upload File PDF</span>
                                </label>
                                <div class="relative group">
                                    <!-- Custom File Upload UI -->
                                    <div id="fileDropArea" class="relative p-8 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer hover:border-purple-500"
                                         style="border-color: rgba(137, 44, 220, 0.4); background: rgba(0, 0, 0, 0.3);"
                                         onclick="document.getElementById('inputFile').click()">
                                        <div class="text-center">
                                            <div class="text-5xl mb-4">📤</div>
                                            <p class="text-lg font-medium mb-2" style="color: #f5f5f5;">Klik untuk upload atau drag & drop</p>
                                            <p class="text-sm" style="color: rgba(245, 245, 245, 0.5);">PDF hingga 10MB</p>
                                        </div>
                                        <input 
                                            type="file" 
                                            id="inputFile" 
                                            accept="application/pdf" 
                                            class="hidden"
                                            onchange="app.components.Generator.handleFileSelect(this)"
                                        />
                                    </div>
                                    <div id="fileName" class="mt-3 text-sm font-medium hidden" style="color: #892CDC;"></div>
                                </div>
                            </div>

                            <!-- Settings Row -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Number of Questions -->
                                <div>
                                    <label class="flex items-center gap-2 text-base font-semibold mb-3" style="color: #f5f5f5;">
                                        <span class="text-xl">🔢</span>
                                        <span>Jumlah Soal</span>
                                    </label>
                                    <select 
                                        id="numQuestions" 
                                        class="w-full p-4 rounded-xl text-white cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(137, 44, 220, 0.3);">
                                        <option value="5" style="background: #000;">5 Soal</option>
                                        <option value="10" style="background: #000;">10 Soal</option>
                                        <option value="15" style="background: #000;">15 Soal</option>
                                        <option value="20" style="background: #000;">20 Soal</option>
                                    </select>
                                </div>

                                <!-- Difficulty Level (Optional enhancement) -->
                                <div>
                                    <label class="flex items-center gap-2 text-base font-semibold mb-3" style="color: #f5f5f5;">
                                        <span class="text-xl">⚡</span>
                                        <span>Tingkat Kesulitan</span>
                                    </label>
                                    <select 
                                        id="difficulty" 
                                        class="w-full p-4 rounded-xl text-white cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(137, 44, 220, 0.3);">
                                        <option value="easy" style="background: #000;">Mudah</option>
                                        <option value="medium" style="background: #000;" selected>Sedang</option>
                                        <option value="hard" style="background: #000;">Sulit</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Generate Button -->
                            <button 
                                id="generateBtn" 
                                onclick="app.components.Generator.handleGenerate()" 
                                class="w-full py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                                style="background: linear-gradient(135deg, #892CDC, #52057B); color: #f5f5f5; box-shadow: 0 10px 40px rgba(137, 44, 220, 0.4);">
                                <span class="relative z-10 flex items-center justify-center gap-3">
                                    <span class="text-2xl">🚀</span>
                                    <span>Generate Quiz dengan AI</span>
                                </span>
                                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            </button>

                        </div>
                    </div>
                </div>

                <!-- Preview Section (Hidden by default) -->
                <div id="previewSection" class="hidden">
                    <!-- Header with Download Button -->
                    <div class="relative mb-8">
                        <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-20"></div>
                        <div class="relative flex flex-col md:flex-row justify-between items-center gap-4 p-6 rounded-3xl"
                             style="background: rgba(137, 44, 220, 0.05); border: 1px solid rgba(137, 44, 220, 0.2); backdrop-filter: blur(10px);">
                            <div class="flex items-center gap-3">
                                <span class="text-3xl">✨</span>
                                <h3 class="text-2xl font-bold" style="color: #f5f5f5;">Quiz Berhasil Dibuat!</h3>
                            </div>
                            <button 
                                onclick="app.components.Generator.downloadPDF()" 
                                class="px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 flex items-center gap-2 relative overflow-hidden group"
                                style="background: linear-gradient(135deg, #10b981, #059669); color: white; box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);">
                                <span class="relative z-10 flex items-center gap-2">
                                    <span class="text-xl">📥</span>
                                    <span>Download PDF</span>
                                </span>
                                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            </button>
                        </div>
                    </div>

                    <!-- Questions Container -->
                    <div id="questionsContainer" class="space-y-6"></div>

                    <!-- Generate Again Button -->
                    <div class="text-center mt-12">
                        <button 
                            onclick="document.getElementById('inputText').value = ''; document.getElementById('inputFile').value = ''; document.getElementById('previewSection').classList.add('hidden'); document.getElementById('fileName').classList.add('hidden');" 
                            class="px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                            style="background: rgba(137, 44, 220, 0.2); border: 1px solid rgba(137, 44, 220, 0.4); color: #f5f5f5;">
                            <span class="relative z-10 flex items-center gap-2">
                                <span class="text-xl">🔄</span>
                                <span>Generate Quiz Baru</span>
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        `;

        // Add drag and drop functionality
        const dropArea = document.getElementById('fileDropArea');
        const fileInput = document.getElementById('inputFile');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.style.borderColor = '#892CDC';
                dropArea.style.background = 'rgba(137, 44, 220, 0.1)';
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.style.borderColor = 'rgba(137, 44, 220, 0.4)';
                dropArea.style.background = 'rgba(0, 0, 0, 0.3)';
            }, false);
        });

        dropArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                fileInput.files = files;
                this.handleFileSelect(fileInput);
            }
        }, false);
    },

    handleFileSelect: function (input) {
        const fileName = document.getElementById('fileName');
        if (input.files.length > 0) {
            const file = input.files[0];
            fileName.textContent = `✓ File dipilih: ${file.name}`;
            fileName.classList.remove('hidden');
        }
    },

    handleGenerate: async function () {
        const textInput = document.getElementById('inputText').value;
        const fileInput = document.getElementById('inputFile').files[0];
        const numQuestions = document.getElementById('numQuestions').value;
        const btn = document.getElementById('generateBtn');

        let contentToProcess = "";

        // 1. Validasi Input
        if (!textInput && !fileInput) {
            this.showNotification("⚠️ Harap masukkan teks atau upload file PDF!", "warning");
            return;
        }

        // 2. Set Loading State
        this.isLoading = true;
        btn.disabled = true;
        btn.style.opacity = '0.7';
        btn.innerHTML = `
            <span class="relative z-10 flex items-center justify-center gap-3">
                <svg class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>AI sedang memproses materi...</span>
            </span>
        `;

        try {
            // 3. Ekstrak Konten
            if (fileInput) {
                contentToProcess = await extractTextFromPDF(fileInput);
            } else {
                contentToProcess = textInput;
            }

            if (contentToProcess.length < 50) {
                this.showNotification("⚠️ Teks terlalu pendek untuk dibuatkan soal (minimal 50 karakter).", "warning");
                throw new Error("Teks terlalu pendek");
            }

            // 4. Panggil Gemini AI
            this.generatedQuestions = await generateQuizFromAI(contentToProcess, numQuestions);

            // 5. Tampilkan Hasil
            this.showPreview();
            this.showNotification("✅ Quiz berhasil dibuat! Scroll ke bawah untuk melihat hasil.", "success");

        } catch (error) {
            console.error(error);
            this.showNotification("❌ Terjadi kesalahan: " + error.message, "error");
        } finally {
            this.isLoading = false;
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.innerHTML = `
                <span class="relative z-10 flex items-center justify-center gap-3">
                    <span class="text-2xl">🚀</span>
                    <span>Generate Quiz dengan AI</span>
                </span>
            `;
        }
    },

    showPreview: function () {
        const previewSection = document.getElementById('previewSection');
        const container = document.getElementById('questionsContainer');

        previewSection.classList.remove('hidden');

        container.innerHTML = this.generatedQuestions.map((q, index) => `
            <div class="relative group">
                <!-- Glow Effect -->
                <div class="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- Question Card -->
                <div class="relative p-6 rounded-2xl transition-all duration-300 group-hover:scale-105"
                     style="background: rgba(137, 44, 220, 0.05); border: 1px solid rgba(137, 44, 220, 0.2); backdrop-filter: blur(10px);">
                    
                    <!-- Question Number Badge -->
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                         style="background: linear-gradient(135deg, #892CDC, #52057B); color: #f5f5f5;">
                        <span class="font-bold">Soal ${index + 1}</span>
                    </div>

                    <!-- Question Text -->
                    <p class="text-lg font-semibold mb-4" style="color: #f5f5f5;">
                        ${q.question}
                    </p>

                    <!-- Options -->
                    <ul class="space-y-3">
                        ${q.options.map((opt, i) => {
            const isCorrect = String.fromCharCode(65 + i) === q.answer;
            return `
                                <li class="p-4 rounded-xl transition-all duration-300 ${isCorrect ? 'border-2' : 'border'}"
                                    style="
                                        background: ${isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0, 0, 0, 0.3)'};
                                        border-color: ${isCorrect ? '#10b981' : 'rgba(137, 44, 220, 0.2)'};
                                        color: ${isCorrect ? '#10b981' : 'rgba(245, 245, 245, 0.8)'};
                                    ">
                                    <div class="flex items-center gap-3">
                                        <span class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                                              style="background: ${isCorrect ? '#10b981' : 'rgba(137, 44, 220, 0.3)'}; color: ${isCorrect ? 'white' : '#f5f5f5'};">
                                            ${String.fromCharCode(65 + i)}
                                        </span>
                                        <span class="flex-1 ${isCorrect ? 'font-bold' : ''}">${opt}</span>
                                        ${isCorrect ? '<span class="text-xl">✓</span>' : ''}
                                    </div>
                                </li>
                            `;
        }).join('')}
                    </ul>
                </div>
            </div>
        `).join('');

        // Smooth scroll ke preview
        setTimeout(() => {
            previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    },

    downloadPDF: function () {
        if (this.generatedQuestions.length === 0) return;
        downloadQuizPDF(this.generatedQuestions);
        this.showNotification("📥 Quiz sedang didownload...", "success");
    },

    showNotification: function (message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 z-50 px-6 py-4 rounded-xl font-medium shadow-2xl transition-all duration-300 transform translate-x-0';

        const colors = {
            success: 'background: linear-gradient(135deg, #10b981, #059669); color: white;',
            error: 'background: linear-gradient(135deg, #ef4444, #dc2626); color: white;',
            warning: 'background: linear-gradient(135deg, #f59e0b, #d97706); color: white;',
            info: 'background: linear-gradient(135deg, #892CDC, #52057B); color: #f5f5f5;'
        };

        notification.style.cssText = colors[type] || colors.info;
        notification.innerHTML = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
};