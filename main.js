// Работаем с Telegram WebApp API
const tg = window.Telegram.WebApp;

function init() {
    // Расширяем приложение на всю доступную высоту
    tg.expand();

    // Применяем тему (светлая / тёмная) через CSS‑класс
    const body = document.body;
    if (tg.colorScheme === "dark") {
        body.classList.add("theme-dark");
    } else {
        body.classList.add("theme-light");
    }

    // Заполняем данные пользователя
    const user = tg.initDataUnsafe?.user;
    if (user) {
        document.getElementById("username").textContent =
            (user.first_name || "") + " " + (user.last_name || "");
        document.getElementById("userid").textContent = user.id;
    }

    // Обработка клика по кнопке
    const sendBtn = document.getElementById("sendBtn");
    sendBtn.addEventListener("click", () => {
        const note = document.getElementById("note").value.trim();

        const payload = {
            note: note || null,
            time: new Date().toISOString(),
        };

        // Отправляем данные в бота
        tg.sendData(JSON.stringify(payload));

        // Показываем нотификацию внутри мини‑аппки
        tg.showPopup({
            title: "Отправлено",
            message: "Данные отправлены боту. Можешь вернуться в чат.",
            buttons: [{ id: "ok", type: "close", text: "Ок" }],
        });
    });
}

document.addEventListener("DOMContentLoaded", init);
