export async function extractTextFromPDF(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async function () {
            try {
                const typedarray = new Uint8Array(this.result);
                const pdf = await pdfjsLib.getDocument(typedarray).promise;

                let fullText = "";

                // Loop semua halaman PDF
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(" ");
                    fullText += pageText + " ";
                }

                resolve(fullText);
            } catch (e) {
                reject(e);
            }
        };

        reader.readAsArrayBuffer(file);
    });
}