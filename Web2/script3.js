const openBtn = document.querySelector('#openForm');
const overlay = document.querySelector('#overlay');
const form = document.querySelector('#contactForm');

const fio = document.querySelector('#fio');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const message = document.querySelector('#message');
const agree = document.querySelector('#agree');

function openPopup(push = true) {
    overlay.classList.remove('hidden');
    if (push) history.pushState({form: true}, "", "?form=open");
}

function closePopup() {
    overlay.classList.add('hidden');
}

openBtn.addEventListener('click', () => openPopup());


window.addEventListener('popstate', () => {
    closePopup();
});

if (location.search.includes("form=open")) {
    openPopup(false);
}

// ---- Валидация ----
function validFio(v) {
    return /^[А-Яа-яA-Za-z\s\-]{3,}$/.test(v);
}

function validPhone(v) {
    return /^[0-9+\-\s()]{7,}$/.test(v);
}

function validEmail(v) {
    return /^[\w.-]+@[\w.-]+\.\w+$/.test(v);
}

// ---- LocalStorage ----
function saveLS() {
    const data = {
        fio: fio.value,
        email: email.value,
        phone: phone.value,
        message: message.value,
        agree: agree.checked
    };
    localStorage.setItem("simpleForm", JSON.stringify(data));
}

function loadLS() {
    const saved = localStorage.getItem("simpleForm");
    if (!saved) return;
    const d = JSON.parse(saved);

    fio.value = d.fio || "";
    email.value = d.email || "";
    phone.value = d.phone || "";
    message.value = d.message || "";
    agree.checked = d.agree || false;
}

form.querySelectorAll("input, textarea").forEach(el =>
    el.addEventListener("input", saveLS)
);

loadLS();

// ---- Отправка ----
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validFio(fio.value)) return alert("Неверное ФИО");
    if (!validEmail(email.value)) return alert("Неверный email");
    if (!validPhone(phone.value)) return alert("Неверный телефон");
    if (!agree.checked) return alert("Нужно согласие на обработку данных");

    const fd = new FormData(form);

    try {
        let res = await fetch("https://formcarry.com/s/TCLq7rJRkwy", {
            method: "POST",
            body: fd,
            headers: { "Accept": "application/json" }
        });

        if (!res.ok) throw new Error();

        alert("Отправлено!");
        form.reset();
        localStorage.removeItem("simpleForm");

    } catch {
        alert("Ошибка отправки");
    }
});
