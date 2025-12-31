// ===== COUNTDOWN TIMER =====
function updateCountdown() {
    const newYear = new Date('2026-01-01T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = newYear - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = "🎉 Happy New Year 2026! 🎉";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML =
        `${days}d ${hours}h ${minutes}m ${seconds}s until 2026`;
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// ===== REVEAL MESSAGE =====
function revealMessage() {
    const messageSection = document.getElementById('messageSection');
    const photoGallery = document.getElementById('photoGallery');
    const gallerySection = document.getElementById('gallerySection');

    messageSection.classList.add('visible');

    // Scroll to message
    messageSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Show photo gallery after a delay
    setTimeout(() => {
        photoGallery.classList.add('visible');
    }, 800);

    // Show gallery after a delay
    setTimeout(() => {
        gallerySection.classList.add('visible');
    }, 1500);

    // Trigger fireworks
    createFireworks();

    // Create floating hearts
    createFloatingHearts();
}

// ===== FIREWORKS ANIMATION =====
function createFireworks() {
    const container = document.getElementById('fireworksContainer');
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ffd89b'];

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.6);

            for (let j = 0; j < 30; j++) {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = x + 'px';
                firework.style.top = y + 'px';
                firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

                const angle = (Math.PI * 2 * j) / 30;
                const velocity = 50 + Math.random() * 100;
                const xVel = Math.cos(angle) * velocity;
                const yVel = Math.sin(angle) * velocity;

                firework.style.setProperty('--x', xVel + 'px');
                firework.style.setProperty('--y', yVel + 'px');

                container.appendChild(firework);

                setTimeout(() => {
                    firework.remove();
                }, 1000);
            }
        }, i * 400);
    }
}

// ===== FLOATING HEARTS =====
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['💖', '💕', '💗', '💓', '💝'];

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (3 + Math.random() * 3) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';

            container.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, i * 200);
    }
}

// ===== PARTICLE CURSOR EFFECT =====
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.borderRadius = '50%';
        particle.style.background = 'rgba(102, 126, 234, 0.6)';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.animation = 'fadeOut 1s ease-out forwards';

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateY(-20px) scale(0);
        }
    }
`;
document.head.appendChild(style);

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe gallery cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach(card => observer.observe(card));
});

// ===== INTERACTIVE GALLERY CARDS =====
document.addEventListener('DOMContentLoaded', () => {
    const galleryCards = document.querySelectorAll('.gallery-card');

    galleryCards.forEach(card => {
        card.addEventListener('click', function () {
            // Create a burst of particles
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.borderRadius = '50%';
                particle.style.background = 'rgba(102, 126, 234, 0.8)';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';

                const angle = (Math.PI * 2 * i) / 20;
                const velocity = 50 + Math.random() * 50;
                const xVel = Math.cos(angle) * velocity;
                const yVel = Math.sin(angle) * velocity;

                particle.style.setProperty('--x', xVel + 'px');
                particle.style.setProperty('--y', yVel + 'px');
                particle.style.animation = 'explode 0.8s ease-out forwards';

                document.body.appendChild(particle);

                setTimeout(() => {
                    particle.remove();
                }, 800);
            }
        });
    });
});

// ===== AUTOMATIC FIREWORKS ON LOAD =====
window.addEventListener('load', () => {
    setTimeout(() => {
        createFireworks();
    }, 2000);
});

// ===== PERIODIC SPARKLES =====
setInterval(() => {
    if (Math.random() > 0.7) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkleAnimation 2s ease-out forwards';

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }
}, 3000);

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnimation {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== CONSOLE MESSAGE =====
console.log('%c🎉 Happy New Year 2026! 🎉', 'font-size: 24px; color: #667eea; font-weight: bold;');
console.log('%cMade with 💖 for someone special', 'font-size: 14px; color: #f5576c;');
