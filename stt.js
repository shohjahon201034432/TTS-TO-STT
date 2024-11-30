// app.js
document.getElementById('start-btn').addEventListener('click', startRecognition);
document.getElementById('stop-btn').addEventListener('click', stopRecognition);

let recognition;
let isRecognizing = false;

// Web Speech API'ni qo'llab-quvvatlovchi brauzerlar uchun
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'uz-UZ';  // O'zbek tilini tanlash
    recognition.interimResults = true; // Yordamchi natijalar
    recognition.continuous = true; // Bir vaqtning o'zida bir nechta qatorlarni tanish

    recognition.onstart = () => {
        isRecognizing = true;
        document.getElementById('start-btn').disabled = true;
        document.getElementById('stop-btn').disabled = false;
    };

    recognition.onend = () => {
        isRecognizing = false;
        document.getElementById('start-btn').disabled = false;
        document.getElementById('stop-btn').disabled = true;
    };

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        document.getElementById('text-output').textContent = transcript;
    };

    recognition.onerror = (event) => {
        console.error('Ovozli matnni tanishda xatolik yuz berdi:', event.error);
    };
} else {
    alert('Sizning brauzeringizda Web Speech API mavjud emas. Iltimos, Google Chrome yoki Opera-dan foydalaning.');
}

function startRecognition() {
    recognition.start(); // Ovozli tanishni boshlash
}

function stopRecognition() {
    recognition.stop();  // Ovozli tanishni to'xtatish
}
