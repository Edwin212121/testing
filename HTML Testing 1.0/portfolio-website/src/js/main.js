// Main JavaScript file for portfolio website

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website initialized');
    initScrollAnimations();
    initSmoothScrolling();
    initFormValidation();
    initMobileMenu();
});

// Handle scroll animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Add scroll event
    window.addEventListener('scroll', revealOnScroll);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerOffset = 70; // Height of fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            let valid = true;
            
            if (name === '') {
                valid = false;
                showError('name', 'Please enter your name');
            } else {
                clearError('name');
            }
            
            if (email === '') {
                valid = false;
                showError('email', 'Please enter your email');
            } else if (!isValidEmail(email)) {
                valid = false;
                showError('email', 'Please enter a valid email address');
            } else {
                clearError('email');
            }
            
            if (message === '') {
                valid = false;
                showError('message', 'Please enter a message');
            } else {
                clearError('message');
            }
            
            if (valid) {
                // In a real scenario, you would send data to a backend
                // For this demo, just show a success message
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = field.parentElement.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    if (!field.parentElement.querySelector('.error-message')) {
        field.parentElement.appendChild(errorElement);
    }
    
    field.classList.add('error');
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = field.parentElement.querySelector('.error-message');
    
    if (errorElement) {
        field.parentElement.removeChild(errorElement);
    }
    
    field.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showSuccessMessage() {
    const formContainer = document.querySelector('.contact-content');
    const successElement = document.createElement('div');
    
    successElement.className = 'success-message animate-fade-in';
    successElement.innerHTML = `
        <h3>Thank you for your message!</h3>
        <p>I'll get back to you as soon as possible.</p>
    `;
    
    const form = document.getElementById('contact-form');
    form.style.display = 'none';
    formContainer.prepend(successElement);
    
    // Reset after 5 seconds
    setTimeout(() => {
        form.style.display = 'block';
        formContainer.removeChild(successElement);
    }, 5000);
}

// Mobile menu toggle
function initMobileMenu() {
    const header = document.getElementById('main-header');
    
    if (!header) return;
    
    // Add mobile menu toggle button if needed
    if (!document.querySelector('.mobile-menu-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-menu-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        toggleBtn.setAttribute('aria-label', 'Toggle menu');
        toggleBtn.setAttribute('aria-expanded', 'false');
        
        const nav = header.querySelector('nav');
        if (nav) {
            header.querySelector('.container').insertBefore(toggleBtn, nav);
            
            toggleBtn.addEventListener('click', function() {
                nav.classList.toggle('active');
                
                const isExpanded = nav.classList.contains('active');
                toggleBtn.setAttribute('aria-expanded', isExpanded);
                
                // Change icon based on state
                toggleBtn.innerHTML = isExpanded ? 
                    '<i class="fas fa-times"></i>' : 
                    '<i class="fas fa-bars"></i>';
            });
        }
    }
    
    // Close menu when clicking on a link
    const navLinks = header.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const nav = header.querySelector('nav');
            const toggleBtn = header.querySelector('.mobile-menu-toggle');
            
            if (window.innerWidth <= 600 && nav && toggleBtn) {
                nav.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
                toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Handle resize events
    window.addEventListener('resize', function() {
        const nav = header.querySelector('nav');
        const toggleBtn = header.querySelector('.mobile-menu-toggle');
        
        if (window.innerWidth > 600 && nav && toggleBtn) {
            nav.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}