// Select the link by its ID
const communityChatBtn = document.getElementById('communityChatBtn');

// Add a click event listener
communityChatBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link behavior
    window.location.href = 'https://chat.whatsapp.com/BmNwwicyUQwLTV85lV1BFs'; // Redirect to the social media link
});
