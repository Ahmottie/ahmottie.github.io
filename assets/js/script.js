// Simple Fade-in effect for project cards
const cards = document.querySelectorAll('.project-card');

const revealOnScroll = () => {
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 100;

        if (cardTop < triggerPoint) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
};

// Initial styles for the cards
cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.6s ease-out";
});

window.addEventListener('scroll', revealOnScroll);
// Run once on load
revealOnScroll();