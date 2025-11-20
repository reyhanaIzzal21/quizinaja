export const Navbar = {
    render: function (containerId) {
        const nav = document.getElementById(containerId);
        if (nav) {
            nav.innerHTML = `
                <div class="container mx-auto px-4 py-4">
                    <div class="flex justify-between items-center">
                        <h1 class="text-2xl font-bold cursor-pointer" onclick="app.router.navigate('home')">Quizinaja</h1>
                        <div id="nav-info" class="text-sm"></div>
                    </div>
                </div>
            `;
        }
    }
};