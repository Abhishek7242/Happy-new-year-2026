// ===== 3D ROTATING CAROUSEL =====
let currentRotation = 0;
let autoRotateInterval;

// Rotate carousel
function rotateCarousel(direction) {
    const carousel = document.getElementById('carousel3d');
    if (!carousel) return;

    currentRotation += direction * 90;
    carousel.style.transform = `rotateY(${currentRotation}deg)`;
}

// Start auto-rotation when gallery becomes visible
const photoGalleryObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('photo-gallery-section') &&
            mutation.target.classList.contains('visible')) {
            setTimeout(() => {
                autoRotateInterval = setInterval(() => {
                    rotateCarousel(1);
                }, 2000);
            }, 1000);
        }
    });
});

// Observe photo gallery section
const photoGallery = document.getElementById('photoGallery');
if (photoGallery) {
    photoGalleryObserver.observe(photoGallery, {
        attributes: true,
        attributeFilter: ['class']
    });
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        rotateCarousel(-1);
    } else if (e.key === 'ArrowRight') {
        rotateCarousel(1);
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');

    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - rotate right
            rotateCarousel(1);
        } else {
            // Swipe right - rotate left
            rotateCarousel(-1);
        }
    }
}
