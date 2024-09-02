// app.js

// Function to set the language based on the user's preference
function setLanguage(language) {
    const englishTexts = document.querySelectorAll('.english');
    const farsiTexts = document.querySelectorAll('.farsi');
    const toggleButton = document.getElementById('language-toggle');

    if (language === 'farsi') {
        englishTexts.forEach(text => text.style.display = 'none');
        farsiTexts.forEach(text => text.style.display = 'inline');
        toggleButton.textContent = 'English';
    } else {
        englishTexts.forEach(text => text.style.display = 'inline');
        farsiTexts.forEach(text => text.style.display = 'none');
        toggleButton.textContent = 'فارسی';
    }

    // Save the preference in localStorage
    localStorage.setItem('preferredLanguage', language);
}

// Event listener for the toggle button
document.getElementById('language-toggle').addEventListener('click', () => {
    const currentLanguage = localStorage.getItem('preferredLanguage') || 'english';
    const newLanguage = currentLanguage === 'english' ? 'farsi' : 'english';
    setLanguage(newLanguage);
});

// On page load, apply the saved language preference or default to English
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'english';
    setLanguage(savedLanguage);
});
