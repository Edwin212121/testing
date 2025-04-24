// This file contains JavaScript functions for handling animations on the website, enhancing user experience.

function fadeIn(element, duration = 500) {
    element.style.opacity = 0;
    element.style.display = 'block';

    let start = null;

    function animation(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        element.style.opacity = Math.min(progress / duration, 1);

        if (progress < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

function fadeOut(element, duration = 500) {
    element.style.opacity = 1;

    let start = null;

    function animation(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        element.style.opacity = Math.max(1 - progress / duration, 0);

        if (progress < duration) {
            requestAnimationFrame(animation);
        } else {
            element.style.display = 'none';
        }
    }

    requestAnimationFrame(animation);
}

function slideIn(element, duration = 500) {
    element.style.transform = 'translateX(-100%)';
    element.style.transition = `transform ${duration}ms ease-in-out`;
    element.style.display = 'block';
    requestAnimationFrame(() => {
        element.style.transform = 'translateX(0)';
    });
}

function slideOut(element, duration = 500) {
    element.style.transition = `transform ${duration}ms ease-in-out`;
    element.style.transform = 'translateX(-100%)';
    setTimeout(() => {
        element.style.display = 'none';
    }, duration);
}

// Exporting the animation functions for use in other modules
export { fadeIn, fadeOut, slideIn, slideOut };

// Animations JavaScript file - handles interactive animations

document.addEventListener('DOMContentLoaded', () => {
    initPageTransitions();
    initHoverEffects();
    initScrollFades();
    addAnimationClasses();
});

// Add animation classes to elements
function addAnimationClasses() {
    // Hero section animations
    const heroSection = document.querySelector('.hero h2');
    if (heroSection) {
        heroSection.classList.add('animate-fade-in');
    }
    
    const heroText = document.querySelector('.hero p');
    if (heroText) {
        heroText.classList.add('animate-slide-up', 'delay-100');
    }
    
    const heroBtn = document.querySelector('.hero .btn');
    if (heroBtn) {
        heroBtn.classList.add('animate-slide-up', 'delay-200', 'animated');
    }
    
    // Add animation classes to section titles
    const sectionTitles = document.querySelectorAll('section h2');
    sectionTitles.forEach(title => {
        title.classList.add('reveal', 'reveal-up');
    });
    
    // Skills items animation
    const skillItems = document.querySelectorAll('.skills li');
    skillItems.forEach((item, index) => {
        item.classList.add('reveal', 'reveal-right');
        item.style.transitionDelay = `${index * 100}ms`;
    });
    
    // About text animation
    const aboutText = document.querySelectorAll('.about-text p');
    aboutText.forEach((paragraph, index) => {
        paragraph.classList.add('reveal', 'reveal-left');
        paragraph.style.transitionDelay = `${index * 150}ms`;
    });
    
    // Contact form animation
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.classList.add('reveal', 'reveal-up');
        group.style.transitionDelay = `${index * 100}ms`;
    });
    
    // Contact information animation
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.classList.add('reveal', 'reveal-right');
        item.style.transitionDelay = `${index * 100}ms`;
    });
}

// Initialize page transition effects
function initPageTransitions() {
    // Add page transition element
    const transitionElement = document.createElement('div');
    transitionElement.className = 'page-transition';
    document.body.appendChild(transitionElement);
    
    // Handle link clicks for page transitions
    document.querySelectorAll('a[href^="http"], a[href^="/"]').forEach(link => {
        // Skip links with no-transition class or that open in new tab
        if (link.classList.contains('no-transition') || link.target === '_blank') {
            return;
        }
        
        link.addEventListener('click', function(e) {
            // Skip if modifier keys are pressed (new tab, download, etc.)
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
                return;
            }
            
            const href = this.getAttribute('href');
            
            // Skip for anchor links within the page
            if (href.startsWith('#')) {
                return;
            }
            
            e.preventDefault();
            
            // Animate transition
            transitionElement.classList.add('active');
            
            // Navigate after animation completes
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
}

// Initialize hover effects for interactive elements
function initHoverEffects() {
    // Add hover-lift class to cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('hover-lift');
    });
    
    // Custom button hover effects
    document.querySelectorAll('.btn').forEach(button => {
        // Skip buttons that already have animations
        if (button.classList.contains('animated')) {
            return;
        }
        
        button.addEventListener('mouseover', function() {
            this.classList.add('hover');
        });
        
        button.addEventListener('mouseout', function() {
            this.classList.remove('hover');
        });
    });
}

// Initialize scroll-triggered fade animations
function initScrollFades() {
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    
    // Add class if not already present
    if (fadeElements.length === 0) {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (!section.classList.contains('reveal')) {
                section.classList.add('fade-in-on-scroll');
            }
        });
    }
    
    const fadeInOnScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        
        document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
            const elementPosition = element.offsetTop + 100;
            
            if (scrollPosition > elementPosition) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check
    setTimeout(fadeInOnScroll, 100);
    
    // Add scroll event
    window.addEventListener('scroll', fadeInOnScroll);
}

// Typing animation for text elements
function createTypingAnimation(element, text, speed = 50) {
    if (!element) return;
    
    element.textContent = '';
    element.style.opacity = '1';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            // Add cursor blink effect after typing
            element.classList.add('typing-done');
        }
    }, speed);
}

// Cursor follow effect for hero section
function initCursorEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follow';
    hero.appendChild(cursor);
    
    hero.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    hero.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    hero.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
}