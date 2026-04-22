// Generar estrellas de fondo
function createStars() {
	const starsContainer = document.getElementById("stars");
	for (let i = 0; i < 50; i++) {
		const star = document.createElement("div");
		star.className = "star";
		star.style.width = Math.random() * 3 + "px";
		star.style.height = star.style.width;
		star.style.left = Math.random() * 100 + "%";
		star.style.top = Math.random() * 100 + "%";
		star.style.animationDelay = Math.random() * 3 + "s";
		starsContainer.appendChild(star);
	}
}

// Emojis que caen
function createEmojiRain() {
	const container = document.getElementById("emojiContainer");
	const emojis = ["🌟", "💫", "🎯", "🎪", "🎨"];

	emojis.forEach((emoji) => {
		const span = document.createElement("span");
		span.className = "emoji-rain";
		span.textContent = emoji;
		container.appendChild(span);
	});

	// Reiniciar animación
	setInterval(() => {
		const emojisHTML = container.querySelectorAll(".emoji-rain");
		emojisHTML.forEach((e) => {
			e.style.animation = "none";
			setTimeout(() => {
				e.style.animation = "";
			}, 10);
		});
	}, 3000);
}

// Easter egg - click en el cohete
document.getElementById("easterEgg").addEventListener("click", function () {
	alert(
		"🚀 ¡Felicidades! ¡Encontraste el easter egg!\n\n" +
			"Parece que eres un verdadero aventurero del espacio digital. 🌌\n\n" +
			"Sigue explorando y quizás encuentres más sorpresas... 👀",
	);
});

// Inicializar
createStars();
createEmojiRain();

// Efecto de fondo interactivo
document.addEventListener("mousemove", (e) => {
	const x = e.clientX / window.innerWidth;
	const y = e.clientY / window.innerHeight;
	document.body.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(124, 58, 237, 0.1), var(--bg))`;
});
