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

// Event listener for the form submission to handle file upload and progress bar
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();

    // Display the progress container
    document.getElementById('progressContainer').style.display = 'block';

    // Update the progress bar as the file uploads
    xhr.upload.addEventListener('progress', function(event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            document.getElementById('uploadProgress').value = percentComplete;
        }
    });

    // When the upload is complete
    xhr.addEventListener('load', function() {
        if (xhr.status === 200) {
            document.getElementById('uploadStatus').textContent = 'Upload Complete!';
        } else {
            document.getElementById('uploadStatus').textContent = 'Upload Failed. Please try again.';
        }
    });

    // Handle errors
    xhr.addEventListener('error', function() {
        document.getElementById('uploadStatus').textContent = 'Upload Failed. Please try again.';
    });

    // Prepare and send the request
    xhr.open('POST', '/', true); // This should be correct for Netlify
    xhr.setRequestHeader('Accept', 'application/json'); // Necessary for Netlify to process the form
    xhr.send(formData);
});
