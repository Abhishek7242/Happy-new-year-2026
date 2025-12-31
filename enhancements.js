// ===== BACKGROUND MUSIC =====
let backgroundMusic = null;
let isMusicPlaying = false;

function initMusic() {
    // Create audio element (you can replace with actual music file)
    backgroundMusic = new Audio();
    // For now, using a placeholder. Replace with actual music URL or file
    // backgroundMusic.src = 'path/to/your/music.mp3';
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;
}

function toggleMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const playIcon = musicToggle.querySelector('.play-icon');
    const pauseIcon = musicToggle.querySelector('.pause-icon');

    if (!backgroundMusic) {
        initMusic();
    }

    if (isMusicPlaying) {
        backgroundMusic.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        isMusicPlaying = false;
    } else {
        backgroundMusic.play().catch(e => {
            console.log('Music play failed:', e);
        });
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        isMusicPlaying = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }
});

// ===== CONFETTI ANIMATION =====
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ffd89b'];
    const confettiCount = 150;
    const container = document.body;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

// ===== FLOATING PARTICLES =====
function createFloatingParticles() {
    const particles = ['✨', '💫', '⭐', '🌟', '💖', '💕', '🎊', '🎉'];
    const container = document.getElementById('particlesContainer');

    setInterval(() => {
        if (Math.random() > 0.7) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
            container.appendChild(particle);

            setTimeout(() => particle.remove(), 7000);
        }
    }, 500);
}

// ===== INTERACTIVE HEARTS =====
function createHeartBurst(x, y) {
    const hearts = ['💖', '💕', '💗', '💓', '💝', '❤️'];

    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-burst';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';

        const angle = (Math.PI * 2 * i) / 12;
        const distance = 50 + Math.random() * 50;
        heart.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        heart.style.setProperty('--ty', Math.sin(angle) * distance + 'px');

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
}

// Click anywhere to create hearts
document.addEventListener('click', (e) => {
    if (!e.target.closest('button') && !e.target.closest('a')) {
        createHeartBurst(e.clientX, e.clientY);
    }
});

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
            createConfetti();
        }, 500);
    }, 1500);
});

// ===== SMOOTH SCROLL INDICATOR =====
function updateScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    if (scrollIndicator) {
        scrollIndicator.style.width = scrollPercentage + '%';
    }
}

window.addEventListener('scroll', updateScrollIndicator);

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== INITIALIZE PARTICLES =====
document.addEventListener('DOMContentLoaded', () => {
    createFloatingParticles();
});

// ===== TYPING ANIMATION FOR MESSAGE =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Apply typing effect when message section becomes visible
const messageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const heading = entry.target.querySelector('h2');
            if (heading && !heading.dataset.typed) {
                heading.dataset.typed = 'true';
                const originalText = heading.textContent;
                typeWriter(heading, originalText, 80);
            }
        }
    });
}, { threshold: 0.5 });

const messageSection = document.getElementById('messageSection');
if (messageSection) {
    messageObserver.observe(messageSection);
}

// ===== ENHANCED HOVER EFFECTS =====
document.querySelectorAll('.gallery-card, .carousel-btn').forEach(element => {
    element.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });

    element.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});
