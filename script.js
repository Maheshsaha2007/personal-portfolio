// 3D Tilt Effect
const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
    
    el.style.transition = 'transform 0.1s ease-out';
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('section');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 150;
        
        if (isVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for reveal
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s ease-out';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Run once on load

// Smooth transitions for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 3D Grid Scroll Parallax
const grid3D = document.querySelector('.grid-3d');
window.addEventListener('scroll', () => {
    if (grid3D) {
        // Move the grid down the Y-axis based on scroll for a forward motion effect
        // The numbers control speed and perspective
        const scrolled = window.scrollY;
        // Reset translation using modulo so it loops infinitely instead of rolling off screen!
        const yOffset = (scrolled * 0.8) % 80;
        grid3D.style.transform = `perspective(600px) rotateX(60deg) translateY(${scrolled * 0.5}px)`;
    }
});
