export const Navbar = {
    render: function (containerId) {
        const nav = document.getElementById(containerId);
        if (nav) {
            nav.innerHTML = `
                <div class="container mx-auto px-4 py-4">
                    <div class="flex justify-between items-center">
                        <h1 class="text-2xl font-bold cursor-pointer flex items-center gap-2" onclick="app.router.navigate('home')">
                            Quizinaja
                        </h1>
                        <div class="flex gap-4">
                            <button onclick="app.router.navigate('generator')" class="bg-white text-indigo-600 px-4 py-1 rounded-full font-bold hover:bg-indigo-50 transition shadow">
                                ✨ Generate Quiz
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
};