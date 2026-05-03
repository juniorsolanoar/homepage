function toggleMenu() {
	mobileMenu.classList.toggle("open");
	burger.classList.toggle("active");
}

function openModal() {
	modal.classList.add("open");
}

function closeModal() {
	modal.classList.remove("open");
}

// easter egg "dev"
let typed = "";
window.addEventListener("keydown", (e) => {
	typed += e.key.toLowerCase();
	if (typed.includes("dev")) {
		alert("Modo developer activado 😏");
		typed = "";
	}
});

const now = new Date();
const options = { year: "numeric", month: "long" };
copyright.textContent = `© ${now.toLocaleDateString("es-ES", options)} - Junior Solano.`;

// Sistema de validación de páginas y redirección a 404
document.addEventListener("click", async (e) => {
	const link = e.target.closest("a");
	if (!link) return;

	const href = link.getAttribute("href");

	// Solo validar enlaces externos (que terminan en .html)
	// Ignorar enlaces internos (#), javascript:, y enlaces sin href
	if (
		!href ||
		href.startsWith("#") ||
		href.startsWith("javascript:") ||
		href === "/" ||
		href === ""
	) {
		return;
	}

	// Si es una página HTML, validar que exista
	if (href.endsWith(".html")) {
		e.preventDefault();

		try {
			const response = await fetch(href, { method: "HEAD" });

			if (response.status === 404 || !response.ok) {
				// Página no existe, redirigir a 404
				window.location.href = "/404.html";
			} else {
				// Página existe, navegar normalmente
				window.location.href = href;
			}
		} catch (error) {
			// Si hay error en la solicitud, asumir que no existe y redirigir a 404
			window.location.href = "/404.html";
		}
	}
});
