// ===== CHERRY BLOSSOM PETALS =====
function createPetals() {
    const container = document.getElementById('petals');
    const petalCount = 25;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (8 + Math.random() * 12) + 's';
        petal.style.animationDelay = (Math.random() * 15) + 's';
        petal.style.width = (8 + Math.random() * 10) + 'px';
        petal.style.height = petal.style.width;
        container.appendChild(petal);
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.month-card').forEach(card => {
        observer.observe(card);
    });
}

// ===== PARALLAX GLOW =====
function initParallax() {
    const heroGlow = document.querySelector('.hero-glow');
    if (!heroGlow) return;

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
}

// ===== SMOOTH SCROLL PROGRESS =====
function initScrollProgress() {
    const line = document.querySelector('.timeline-line');
    if (!line) return;

    window.addEventListener('scroll', () => {
        const timeline = document.querySelector('.timeline');
        const rect = timeline.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        const total = rect.height - window.innerHeight;
        const progress = Math.min(1, scrolled / total);

        line.style.background = `linear-gradient(180deg,
            var(--pink) 0%,
            var(--lavender) ${progress * 100}%,
            transparent ${progress * 100}%)`;
    });
}

// ===== CARD TILT EFFECT =====
function initTilt() {
    document.querySelectorAll('.month-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `translateY(-4px) scale(1.01) perspective(1000px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== TYPING EFFECT FOR HIGHLIGHTS =====
function initTypingEffect() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                entry.target.dataset.typed = 'true';
                const text = entry.target.innerHTML;
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.caption-text .highlight').forEach(el => {
        observer.observe(el);
    });
}

// ===== COUNTER ANIMATION FOR MONTH NUMBERS =====
function initMonthCounter() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const target = parseInt(entry.target.textContent);
                let current = 0;
                const duration = 800;
                const start = performance.now();

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    current = Math.round(eased * target);
                    entry.target.textContent = String(current).padStart(2, '0');
                    if (progress < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.month-number').forEach(el => {
        observer.observe(el);
    });
}

// ===== STAGGER ANIMATION FOR DETAILS =====
function initStaggerDetails() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.detail-item');
                items.forEach((item, i) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    item.style.transition = `all 0.5s ease ${i * 0.15 + 0.3}s`;
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 50);
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.card-details').forEach(el => {
        observer.observe(el);
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    createPetals();
    initScrollAnimations();
    initParallax();
    initScrollProgress();
    initTilt();
    initTypingEffect();
    initMonthCounter();
    initStaggerDetails();
});
