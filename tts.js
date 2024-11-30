const speakBtn = document.getElementById('speak-btn');
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const rateSelect = document.getElementById('rate-select');
const pitchSelect = document.getElementById('pitch-select');
const statusText = document.getElementById('status');

let voices = [];
let speechSynthesis = window.speechSynthesis;

// Ovozlarni olish va ro'yxatga joylash
function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = ''; // Ro'yxatni tozalash
    voices.forEach(voice => {
        let option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.value = voice.name;
        voiceSelect.appendChild(option);
    });
}

// Ovozli xabarni aytish
function speakText() {
    const text = textInput.value.trim();
    if (!text) {
        statusText.textContent = 'Iltimos, matn kiriting!';
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voiceSelect.value;
    const selectedRate = parseFloat(rateSelect.value);
    const selectedPitch = parseFloat(pitchSelect.value);

    const voice = voices.find(voice => voice.name === selectedVoice);
    if (voice) {
        utterance.voice = voice;
    }
    utterance.rate = selectedRate;
    utterance.pitch = selectedPitch;

    speechSynthesis.speak(utterance);
    statusText.textContent = 'Ovoz chiqarilmoqda...';
}

// Yangi ovozlar yuklanadi
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

// Boshqa o'zgarishlarni amalga oshirish
speakBtn.addEventListener('click', speakText);

// Dastlabki ovozlar yuklanadi
loadVoices();
