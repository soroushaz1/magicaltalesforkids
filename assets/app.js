document.getElementById('generate-story').addEventListener('click', async () => {
    document.getElementById('story-container').innerText = "Generating your story...";
    
    const response = await fetch('https://magicaltalesforkids.org/generate-story');
    const story = await response.text();
    
    document.getElementById('story-container').innerText = story;
});
