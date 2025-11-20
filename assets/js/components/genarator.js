import { generateQuizFromAI } from '../utils/gemini.js';
import { extractTextFromPDF } from '../utils/fileParser.js';
import { downloadQuizPDF } from '../utils/pdfGenerator.js';

export const Generator = {
    generatedQuestions: [],
    isLoading: false,

    render: function (container) {
        container.innerHTML = `
            <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 class="text-3xl font-bold text-indigo-600 mb-6 text-center">✨ AI Quiz Generator</h2>
                <p class="text-gray-600 mb-8 text-center">Upload materi atau paste teks, biarkan AI membuatkan soal untuk Anda.</p>

                <!-- Input Section -->
                <div class="space-y-6 mb-8">
                    
                    <!-- Text Area -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Masukkan Teks Materi</label>
                        <textarea id="inputText" rows="6" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Paste materi pelajaran di sini..."></textarea>
                    </div>

                    <div class="text-center text-gray-500">- ATAU -</div>

                    <!-- File Input -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Upload File (PDF)</label>
                        <input type="file" id="inputFile" accept="application/pdf" class="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-indigo-50 file:text-indigo-700
                            hover:file:bg-indigo-100
                        "/>
                    </div>

                    <!-- Settings -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Jumlah Soal</label>
                        <select id="numQuestions" class="w-full p-3 border border-gray-300 rounded-lg">
                            <option value="5">5 Soal</option>
                            <option value="10">10 Soal</option>
                        </select>
                    </div>

                    <!-- Action Button -->
                    <button id="generateBtn" onclick="app.components.Generator.handleGenerate()" 
                        class="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md flex justify-center items-center">
                        🚀 Generate Quiz
                    </button>
                </div>

                <!-- Preview Section (Hidden by default) -->
                <div id="previewSection" class="hidden border-t pt-8 mt-8">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-bold text-gray-800">Preview Quiz</h3>
                        <button onclick="app.components.Generator.downloadPDF()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
                            📥 Download PDF
                        </button>
                    </div>
                    <div id="questionsContainer" class="space-y-6"></div>
                </div>
            </div>
        `;
    },

    handleGenerate: async function () {
        const textInput = document.getElementById('inputText').value;
        const fileInput = document.getElementById('inputFile').files[0];
        const numQuestions = document.getElementById('numQuestions').value;
        const btn = document.getElementById('generateBtn');

        let contentToProcess = "";

        // 1. Validasi Input
        if (!textInput && !fileInput) {
            alert("Harap masukkan teks atau upload file PDF!");
            return;
        }

        // 2. Set Loading State
        this.isLoading = true;
        btn.disabled = true;
        btn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sedang Memproses (AI)...`;

        try {
            // 3. Ekstrak Konten
            if (fileInput) {
                contentToProcess = await extractTextFromPDF(fileInput);
            } else {
                contentToProcess = textInput;
            }

            if (contentToProcess.length < 50) {
                alert("Teks terlalu pendek untuk dibuatkan soal.");
                throw new Error("Teks terlalu pendek");
            }

            // 4. Panggil Gemini AI
            this.generatedQuestions = await generateQuizFromAI(contentToProcess, numQuestions);

            // 5. Tampilkan Hasil
            this.showPreview();

        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan: " + error.message);
        } finally {
            this.isLoading = false;
            btn.disabled = false;
            btn.innerHTML = "🚀 Generate Quiz";
        }
    },

    showPreview: function () {
        const previewSection = document.getElementById('previewSection');
        const container = document.getElementById('questionsContainer');

        previewSection.classList.remove('hidden');
        container.innerHTML = this.generatedQuestions.map((q, index) => `
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p class="font-bold text-gray-800 mb-2">${index + 1}. ${q.question}</p>
                <ul class="space-y-1 ml-4">
                    ${q.options.map((opt, i) => `
                        <li class="${String.fromCharCode(65 + i) === q.answer ? 'text-green-600 font-bold' : 'text-gray-600'}">
                            ${String.fromCharCode(65 + i)}. ${opt}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        // Scroll ke bawah
        previewSection.scrollIntoView({ behavior: 'smooth' });
    },

    downloadPDF: function () {
        if (this.generatedQuestions.length === 0) return;
        downloadQuizPDF(this.generatedQuestions);
    }
};