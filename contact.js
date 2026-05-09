// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ⚙️  CONFIGURACIÓN EMAILJS — reemplaza los 3 valores
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const EMAILJS_PUBLIC_KEY = "6p5HFztqAfY4Xk_Ha"; // Account → API Keys
const EMAILJS_SERVICE_ID = "service_5k18i4q"; // Email Services → Service ID
const EMAILJS_TEMPLATE_ID = "template_0r8v5hy"; // Email Templates → Template ID
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

/* ── DOM refs ── */
const form = document.getElementById("contactForm");
const btnSubmit = document.getElementById("btnSubmit");
const btnText = document.getElementById("btnText");
const successOverlay = document.getElementById("successOverlay");
const btnReset = document.getElementById("btnReset");
const toastEl = document.getElementById("toast");

/* ── Validation rules ── */
const rules = {
	nombre: { required: true, minLen: 2, label: "Nombre" },
	correo: { required: true, email: true, label: "Correo" },
	asunto: { required: true, minLen: 3, label: "Asunto" },
	tipo: { required: true, label: "Tipo de misión" },
	mensaje: { required: true, minLen: 10, label: "Mensaje" },
};

function validateField(id) {
	const el = document.getElementById(id);
	const msg = document.getElementById("msg-" + id);
	const r = rules[id];
	let err = "";

	const val = el.value.trim();

	if (r.required && !val) {
		err = `${r.label} es obligatorio.`;
	} else if (r.minLen && val.length < r.minLen) {
		err = `Mínimo ${r.minLen} caracteres.`;
	} else if (r.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
		err = "Ingresa un correo válido.";
	}

	if (err) {
		el.classList.add("is-error");
		el.classList.remove("is-ok");
		msg.textContent = err;
		msg.className = "field-msg error";
		return false;
	} else {
		el.classList.remove("is-error");
		el.classList.add("is-ok");
		msg.textContent = "✓";
		msg.className = "field-msg ok";
		return true;
	}
}

/* Validate on blur */
Object.keys(rules).forEach((id) => {
	const el = document.getElementById(id);
	el.addEventListener("blur", () => validateField(id));
	el.addEventListener("input", () => {
		/* Clear error on typing */
		if (el.classList.contains("is-error")) validateField(id);
	});
});

/* ── Toast helper ── */
let toastTimer;
function showToast(msg) {
	toastEl.textContent = msg;
	toastEl.classList.add("show");
	clearTimeout(toastTimer);
	toastTimer = setTimeout(() => toastEl.classList.remove("show"), 4500);
}

/* ── Loading state ── */
function setLoading(loading) {
	btnSubmit.disabled = loading;
	btnText.innerHTML = loading
		? '<span class="spinner"></span> Enviando…'
		: "✉ Enviar mensaje";
}

/* ── Form submit ── */
form.addEventListener("submit", async (e) => {
	e.preventDefault();

	/* Validate all fields */
	const allValid = Object.keys(rules).map(validateField).every(Boolean);
	if (!allValid) {
		showToast("🚨 Revisa los campos antes de despegar.");
		return;
	}

	setLoading(true);

	/* Build template params — must match your EmailJS template variables */
	const params = {
		from_name: document.getElementById("nombre").value.trim(),
		from_email: document.getElementById("correo").value.trim(),
		subject: document.getElementById("asunto").value.trim(),
		mission: document.getElementById("tipo").value,
		message: document.getElementById("mensaje").value.trim(),
	};

	try {
		await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
		/* Show success */
		successOverlay.classList.add("visible");
		form.reset();
		Object.keys(rules).forEach((id) => {
			const el = document.getElementById(id);
			el.classList.remove("is-ok", "is-error");
			document.getElementById("msg-" + id).textContent = "";
			document.getElementById("msg-" + id).className = "field-msg";
		});
	} catch (err) {
		console.error("EmailJS error:", err);
		showToast("⚡ Error al enviar. Intenta de nuevo en unos segundos.");
	} finally {
		setLoading(false);
	}
});

/* ── Reset from success ── */
btnReset.addEventListener("click", () => {
	successOverlay.classList.remove("visible");
});
