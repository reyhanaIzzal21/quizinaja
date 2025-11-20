let questionsData = null;
let answersData = null;

// 1. Load Soal (Dipanggil saat aplikasi start)
export async function loadQuestions() {
    try {
        const response = await fetch('././assets/data/quiz-questions.json');
        if (!response.ok) throw new Error("Gagal memuat soal");
        questionsData = await response.json();
        return questionsData;
    } catch (error) {
        console.error("Error loading questions:", error);
    }
}

// 2. Load Jawaban (HANYA Dipanggil saat user klik submit)
export async function loadAnswers() {
    try {
        // Tips: Ganti nama file ini jika ingin lebih aman
        const response = await fetch('././assets/data/quiz-answers.json');
        if (!response.ok) throw new Error("Gagal memuat kunci jawaban");
        answersData = await response.json();
        return answersData;
    } catch (error) {
        console.error("Error loading answers:", error);
        return null;
    }
}

// Helper functions
export function getCategories() {
    return questionsData ? questionsData.categories : [];
}

export function getCategoryById(categoryId) {
    return questionsData ? questionsData.categories.find(cat => cat.id === categoryId) : null;
}

export function getQuiz(categoryId, quizId) {
    const category = getCategoryById(categoryId);
    return category ? category.quizzes.find(q => q.id === quizId) : null;
}