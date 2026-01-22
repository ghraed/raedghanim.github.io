// Smooth section navigation
function navigateTo(sectionId) {
    // Remove active class from all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Add active class to corresponding nav link
    const navLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (navLink) {
        navLink.classList.add('active');
    }
}

// Navigation link click handlers
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        navigateTo(sectionId);
    });
});

// Animated text for hero section
function animateHeroText() {
    const heroTitle = document.getElementById('heroTitle');
    const texts = ['Hello, I\'m', 'Raed Ghanim'];

    texts.forEach((text, textIndex) => {
        const line = document.createElement('div');
        heroTitle.appendChild(line);

        const chars = text.split('');
        chars.forEach((char, charIndex) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${(textIndex * 0.3) + (charIndex * 0.03)}s`;
            line.appendChild(span);
        });

        if (textIndex < texts.length - 1) {
            heroTitle.appendChild(document.createElement('br'));
        }
    });
}

// Form submission handler
function handleSubmit(e) {
    e.preventDefault();
    alert('Message sent successfully! (Demo)');
    e.target.reset();
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    animateHeroText();

    // Re-trigger animations when navigating to sections
    document.querySelectorAll('.section').forEach(section => {
        section.addEventListener('transitionend', function () {
            if (this.classList.contains('active')) {
                // Re-animate child elements
                this.querySelectorAll('.project-card, .skill-card').forEach((card, index) => {
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
                    }, 10);
                });
            }
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
    const activeSection = document.querySelector('.section.active');
    const currentIndex = sections.indexOf(activeSection?.id);

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % sections.length;
        navigateTo(sections[nextIndex]);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
        navigateTo(sections[prevIndex]);
    }
});