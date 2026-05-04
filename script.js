const button = document.getElementById('colorBtn');

button.addEventListener('click', () => {
    // Toggles a simple dark mode effect
    const isDark = document.body.style.backgroundColor === 'rgb(51, 51, 51)';
    document.body.style.backgroundColor = isDark ? '#f4f4f4' : '#333';
    document.body.style.color = isDark ? '#000' : '#fff';
});