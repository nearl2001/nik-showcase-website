// Predefined phrases
import { phrases } from './phraseDict.js';
  
// DOM Elements
const targetTextEl = document.getElementById("target-text");
const typedTextEl = document.getElementById("typed-text");
const inputBox = document.getElementById("input-box");
const wpmEl = document.getElementById("wpm");
const resetButton = document.getElementById("reset-button");
const activeReportingToggle = document.getElementById("activeToggleSwitch");
const body = document.body;

let currentPhrase = "";
let startTime;

// Helper function to pick a random phrase
function pickRandomPhrase() {
return phrases[Math.floor(Math.random() * phrases.length)];
}

// Initialize game
function init() {
currentPhrase = pickRandomPhrase();
targetTextEl.textContent = currentPhrase;
typedTextEl.innerHTML = ""; // Clear previous typed text
inputBox.value = ""; // Clear input box
wpmEl.textContent = "WPM: ---";
startTime = null; // Reset start time
}

body.addEventListener("click", (e) => {
    inputBox.focus()
})

inputBox.addEventListener("keypress", (e) => {
if (e.key === "Enter") {
    console.log("Enter key pressed!")
    const elapsedTime = (new Date() - startTime) / 1000; // Time in seconds
    const wordsTyped = inputBox.value.split(" ").length;
    const wpm = Math.round((wordsTyped / elapsedTime) * 60); // WPM calculation
    wpmEl.textContent = `WPM: ${wpm}`;
    startTime = new Date();
    inputBox.disabled = true;
    console.log(inputBox.value)
}
})

activeReportingToggle.addEventListener("click", (e) => {
    if (activeReportingToggle.checked) {
        wpmEl.textContent = `WPM: ∞`;
    } else {
        wpmEl.textContent = `WPM: ---`;
    }
    
})

// Typing logic
inputBox.addEventListener("input", (e) => {
const typedText = e.target.value;

if (!startTime) {
    console.log('Starting Timer')
    startTime = new Date(); // Start timing on first input
}

if (typedText === '') {
    startTime = null
}

// Highlight typed text
typedTextEl.innerHTML = currentPhrase
    .split("")
    .map((char, index) => {
    const typedChar = typedText[index];
    if (typedChar == null) return `<span>${char}</span>`; // Not yet typed
    if (typedChar.toLocaleLowerCase() === char.toLocaleLowerCase() || typedChar === '\'') return `<span class="correct">${char}</span>`; // Correct
    return `<span class="wrong">${char}</span>`; // Incorrect
    })
    .join("");

if (activeReportingToggle.checked) {
    const elapsedTime = (new Date() - startTime) / 1000; // Time in seconds
    const wordsTyped = currentPhrase.split(" ").length;
    const wpm = Math.round((wordsTyped / elapsedTime) * 60); // WPM calculation
    wpmEl.textContent = `WPM: ${wpm}`;
}

// End of phrase
if (typedText.toLocaleLowerCase() === currentPhrase.toLocaleLowerCase()) {
    const elapsedTime = (new Date() - startTime) / 1000; // Time in seconds
    const wordsTyped = currentPhrase.split(" ").length;
    const wpm = Math.round((wordsTyped / elapsedTime) * 60); // WPM calculation
    wpmEl.textContent = `WPM: ${wpm}`;
    inputBox.disabled = true; // Disable further typing
}
});

// Restart game
resetButton.addEventListener("click", () => {
init();
inputBox.disabled = false;
inputBox.focus();
});

// Start the game on load
init();
  