/* ══════════════════════════════════════════════════════════════════════════════
   NAVIGATION & MENU
   ═════════════════════════════════════════════════════════════════════════════ */

function toggleMenu() {
	const mobileMenu = document.getElementById("mobileMenu");
	const mobileOverlay = document.getElementById("mobileMenuOverlay");
	const burger = document.getElementById("burger");
	mobileMenu.classList.toggle("open");
	mobileOverlay.classList.toggle("open");
	burger.classList.toggle("active");
	document.body.classList.toggle("menu-open");
}

function closeMenu() {
	const mobileMenu = document.getElementById("mobileMenu");
	const mobileOverlay = document.getElementById("mobileMenuOverlay");
	const burger = document.getElementById("burger");
	mobileMenu.classList.remove("open");
	mobileOverlay.classList.remove("open");
	burger.classList.remove("active");
	document.body.classList.remove("menu-open");
}

document.querySelectorAll(".mobile-menu a").forEach((link) => {
	link.addEventListener("click", closeMenu);
});

window.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		closeMenu();
	}
});

/* ══════════════════════════════════════════════════════════════════════════════
   MODAL
   ═════════════════════════════════════════════════════════════════════════════ */

function openModal() {
	const modal = document.getElementById("modal");
	modal.classList.add("open");
}

function closeModal() {
	const modal = document.getElementById("modal");
	modal.classList.remove("open");
}

/* ══════════════════════════════════════════════════════════════════════════════
   EASTER EGG
   ═════════════════════════════════════════════════════════════════════════════ */

let typed = "";
window.addEventListener("keydown", (e) => {
	typed += e.key.toLowerCase();
	if (typed.includes("dev")) {
		alert("Modo developer activado 😏");
		typed = "";
	}
});

/* ══════════════════════════════════════════════════════════════════════════════
   FOOTER COPYRIGHT
   ═════════════════════════════════════════════════════════════════════════════ */

const now = new Date();
const options = { year: "numeric", month: "long" };
const copyrightElement = document.getElementById("copyright");
if (copyrightElement) {
	copyrightElement.textContent = `© ${now.toLocaleDateString("es-ES", options)} - Junior Solano.`;
}

/* ══════════════════════════════════════════════════════════════════════════════
   LINK VALIDATION & NAVIGATION
   ═════════════════════════════════════════════════════════════════════════════ */

document.addEventListener("click", async (e) => {
	const link = e.target.closest("a");
	if (!link) return;

	const href = link.getAttribute("href");

	// Ignorar enlaces internos, javascript:, y enlaces sin href
	if (
		!href ||
		href.startsWith("#") ||
		href.startsWith("javascript:") ||
		href === "/" ||
		href === ""
	) {
		return;
	}

	// Validar páginas HTML
	if (href.endsWith(".html")) {
		e.preventDefault();

		try {
			const response = await fetch(href, { method: "HEAD" });

			if (response.status === 404 || !response.ok) {
				window.location.href = "/404.html";
			} else {
				window.location.href = href;
			}
		} catch (error) {
			window.location.href = "/404.html";
		}
	}
});
