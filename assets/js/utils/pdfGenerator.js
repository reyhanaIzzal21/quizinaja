export function downloadQuizPDF(questions) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let yPos = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const lineHeight = 7;

    doc.setFontSize(18);
    doc.text("Generated Quiz", 105, yPos, { align: "center" });
    yPos += 15;

    doc.setFontSize(12);

    questions.forEach((q, index) => {
        // Cek jika halaman penuh
        if (yPos > pageHeight - 40) {
            doc.addPage();
            yPos = 20;
        }

        // Tulis Pertanyaan (Word Wrap)
        const questionText = `${index + 1}. ${q.question}`;
        const splitQuestion = doc.splitTextToSize(questionText, 170);
        doc.text(splitQuestion, margin, yPos);
        yPos += (splitQuestion.length * lineHeight);

        // Tulis Opsi
        q.options.forEach((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const optText = `   ${letter}. ${opt}`;
            doc.text(optText, margin, yPos);
            yPos += lineHeight;
        });

        yPos += 5; // Spasi antar soal
    });

    // Halaman Kunci Jawaban
    doc.addPage();
    doc.setFontSize(16);
    doc.text("Kunci Jawaban", 105, 20, { align: "center" });

    let keyY = 40;
    questions.forEach((q, index) => {
        doc.setFontSize(12);
        doc.text(`${index + 1}. ${q.answer}`, margin, keyY);
        keyY += 10;
    });

    doc.save("quiz-otomatis.pdf");
}