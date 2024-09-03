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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('uploadForm');
    const uploadButton = document.querySelector('button[type="submit"]');

    console.log("DOM fully loaded and parsed");

    if (form && uploadButton) {
        console.log("Form and upload button found!");

        uploadButton.addEventListener('click', function(event) {
            alert("Button clicked!");  // Corrected from 'lert' to 'alert'
            event.preventDefault();
            console.log("Upload button clicked");
        
            const fileInput = document.getElementById('images');
            if (fileInput.files.length > 0) {
                console.log("Files selected:", fileInput.files);
                alert("Files selected: " + fileInput.files.length);
            } else {
                console.log("No file selected");
                alert("No file selected");
                return; // Stop if no files are selected
            }
        
            const formData = new FormData(form);
            const xhr = new XMLHttpRequest();
        
            // Display the progress container
            const progressContainer = document.getElementById('progressContainer');
            progressContainer.style.display = 'block';
        
            // Update the progress bar as the file uploads
            xhr.upload.addEventListener('progress', function(event) {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    console.log(`Upload Progress: ${percentComplete}%`);
                    const progressBar = document.getElementById('uploadProgress');
                    progressBar.value = percentComplete;
                }
            });
        
            // When the upload is complete
            xhr.addEventListener('load', function() {
                const uploadStatus = document.getElementById('uploadStatus');
                if (xhr.status >= 200 && xhr.status < 300) {
                    uploadStatus.textContent = 'Upload Complete!';
                    form.reset();
                } else {
                    uploadStatus.textContent = 'Upload Failed. Please try again.';
                }
                console.log("Upload finished with status:", xhr.status);
            });
        
            // Handle errors
            xhr.addEventListener('error', function() {
                const uploadStatus = document.getElementById('uploadStatus');
                uploadStatus.textContent = 'Upload Failed. Please try again.';
                console.error("Upload error occurred.");
            });
        
            // Prepare and send the request
            xhr.open('POST', '/', true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.send(formData);
        });
        
    } else {
        console.error('Form or upload button not found!');
    }
});

