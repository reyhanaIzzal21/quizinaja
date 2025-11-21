// Masukkan API KEY Google AI Studio Anda di sini
const API_KEY = "AIzaSyARYJ81kD4sivP2jpVGbNzsmCqjrEor5C0"; 

export async function generateQuizFromAI(text, numQuestions) {
    // Gunakan model yang BENAR-BENAR tersedia: gemini-2.0-flash atau gemini-1.5-flash
    // Coba dulu dengan gemini-1.5-flash (lebih stabil)
    const modelName = "gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

    // Prompt Engineering (Diperketat agar JSON valid)
    const prompt = `
        Buatkan saya ${numQuestions} soal pilihan ganda (multiple choice) berdasarkan teks materi di bawah.
        Bahasa harus Indonesia.
        
        PENTING: Output HARUS HANYA berupa JSON Array murni. 
        JANGAN gunakan markdown formatting (seperti \`\`\`json). 
        JANGAN ada kata-kata pembuka atau penutup. Langsung mulai dengan [ dan akhiri dengan ].

        Struktur JSON harus persis seperti ini:
        [
            {
                "question": "Pertanyaan...",
                "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
                "answer": "A" 
            }
        ]
        (Note: "answer" harus satu huruf kapital: A, B, C, atau D)

        Teks Materi:
        "${text.substring(0, 25000)}" 
    `;

    const requestBody = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    try {
        console.log("Mengirim request ke:", url);
        
        // Request ke Gemini API
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        console.log("Response status:", response.status);

        // Jika masih error, coba dengan model gemini-2.0-flash
        if (!response.ok) {
            console.warn("Mencoba dengan gemini-2.0-flash...");
            const alternateUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
            
            const retryResponse = await fetch(alternateUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            if (!retryResponse.ok) {
                const errorData = await retryResponse.json();
                throw new Error(`API Error: ${errorData.error?.message || retryResponse.statusText}`);
            }

            const data = await retryResponse.json();
            return processGeminiResponse(data);
        }

        const data = await response.json();
        return processGeminiResponse(data);

    } catch (error) {
        console.error("Gemini Error Detail:", error);
        throw new Error("Gagal memproses AI: " + error.message);
    }
}

// Fungsi helper untuk memproses response dari Gemini
function processGeminiResponse(data) {
    if (!data.candidates || data.candidates.length === 0) {
        throw new Error("Gagal mendapatkan respons dari AI (No candidates).");
    }

    let rawText = data.candidates[0].content.parts[0].text;

    // PEMBERSIHAN DATA (Cleaning)
    // Terkadang AI masih nakal kasih markdown ```json, kita hapus paksa
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

    // Hapus karakter aneh di awal/akhir jika ada
    const firstBracket = rawText.indexOf('[');
    const lastBracket = rawText.lastIndexOf(']');
    
    if (firstBracket !== -1 && lastBracket !== -1) {
        rawText = rawText.substring(firstBracket, lastBracket + 1);
    }

    return JSON.parse(rawText);
}