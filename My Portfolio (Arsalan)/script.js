/* ============================================
   ARSALAN'S PORTFOLIO - JAVASCRIPT
   Interactive Features & Animations
   ============================================ */

// ==========================================
// 1. INITIALIZATION - DOM Ready
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    hidePageLoader();
    initializeNavigation();
    initializeScrollReveal();
    initializeTooltips();
    initializeFormHandler();
    initializeNavActiveState();
    setupScrollAnimations();
});

// ==========================================
// 2. PAGE LOADER - Initial Load Animation
// ==========================================

/**
 * Hide the page loader after content is loaded
 * Creates a smooth fade-out effect
 */
function hidePageLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;

    // Add a small delay for better UX
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
    }, 500);
}

// ==========================================
// 3. NAVIGATION - Smooth Scrolling & Active State
// ==========================================

/**
 * Handle smooth navigation scrolling
 * Updates active nav link on navigation
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-smooth');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }

                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active link
                updateActiveNavLink(targetId);
            }
        });
    });
}

/**
 * Update active navigation link based on current section
 * @param {string} targetId - ID of the target section
 */
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-smooth');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize navigation active state on scroll
 * Highlights the current section in navigation
 */
function initializeNavActiveState() {
    window.addEventListener('scroll', () => {
        let current = '';

        // Get all sections
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // If section is in viewport
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        // Update active link
        const navLinks = document.querySelectorAll('.nav-smooth');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================
// 4. SCROLL REVEAL - Intersection Observer
// ==========================================

/**
 * Initialize scroll reveal animations using Intersection Observer
 * Elements with .scroll-reveal class animate when they come into view
 */
function initializeScrollReveal() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: make all elements visible
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        return;
    }

    // Create Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation delay based on element position
                const delay = Array.from(entry.target.parentElement.children)
                    .indexOf(entry.target) * 0.1;

                entry.target.style.animationDelay = delay + 's';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Stop observing after animation completes
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// 5. SETUP SCROLL ANIMATIONS
// ==========================================

/**
 * Setup additional scroll animations
 * Including navbar blur effect and fade-in elements
 */
function setupScrollAnimations() {
    const navbar = document.querySelector('.navbar');
    const fadeInElements = document.querySelectorAll('.fade-in-up, .fade-in-right');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-blur');
        } else {
            navbar.classList.remove('nav-blur');
        }
    });

    // Set initial animation delays for fade-in elements
    fadeInElements.forEach((el, index) => {
        const delay = (el.style.animationDelay || '0s').replace('s', '');
        const newDelay = parseFloat(delay) + index * 0.1;
        el.style.animationDelay = newDelay + 's';
    });
}

// ==========================================
// 6. BOOTSTRAP TOOLTIPS INITIALIZATION
// ==========================================

/**
 * Initialize Bootstrap tooltips
 * Required for data-bs-toggle="tooltip" elements
 */
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// ==========================================
// 7. FORM HANDLING - Contact Form
// ==========================================

/**
 * Initialize contact form handler
 * Validates form and displays success/error messages
 */
function initializeFormHandler() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        // Validate form
        if (!validateForm(name, email, message)) {
            return;
        }

        // Show success message
        showFormSuccess();

        // Reset form
        contactForm.reset();

        // In production, you would send this data to a server
        console.log('Form Data:', { name, email, message });
    });
}

/**
 * Validate contact form data
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} message - User message
 * @returns {boolean} - True if valid, false otherwise
 */
function validateForm(name, email, message) {
    // Check if fields are empty
    if (!name || !email || !message) {
        showFormError('Please fill in all fields');
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormError('Please enter a valid email address');
        return false;
    }

    // Validate message length
    if (message.length < 10) {
        showFormError('Message must be at least 10 characters long');
        return false;
    }

    return true;
}

/**
 * Show success message in contact form
 */
function showFormSuccess() {
    const form = document.getElementById('contactForm');
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success alert-dismissible fade show';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>Message Sent!</strong> Thanks for reaching out. I'll get back to you soon.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Insert before form
    form.insertAdjacentElement('beforebegin', successDiv);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

/**
 * Show error message in contact form
 * @param {string} errorMessage - Error message to display
 */
function showFormError(errorMessage) {
    const form = document.getElementById('contactForm');

    // Remove existing error messages
    const existingError = form.querySelector('.alert-danger');
    if (existingError) {
        existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger alert-dismissible fade show';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle me-2"></i>
        <strong>Error!</strong> ${errorMessage}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Insert before form
    form.insertAdjacentElement('beforebegin', errorDiv);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 4000);
}

// ==========================================
// 8. UTILITY FUNCTIONS
// ==========================================

/**
 * Throttle function to limit function calls
 * Useful for scroll events
 * @param {Function} func - Function to throttle
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Debounce function to delay function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==========================================
// 9. ADVANCED ANIMATIONS
// ==========================================

/**
 * Add parallax effect to hero section
 * Creates depth effect as user scrolls
 */
function initializeParallax() {
    const heroSection = document.querySelector('.hero-section');
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;

        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1); // Different speeds for each shape
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 15));
}

// Initialize parallax on page load
document.addEventListener('DOMContentLoaded', initializeParallax);

// ==========================================
// 10. SMOOTH SCROLL ENHANCEMENT
// ==========================================

/**
 * Enhance smooth scrolling with custom easing
 * Provides smoother scroll behavior
 */
function smoothScrollTo(element, duration = 1000) {
    const start = window.pageYOffset;
    const target = element.offsetTop;
    const distance = target - start;
    let startTime = null;

    function easeInOutQuad(time, start, distance, duration) {
        time /= duration / 2;
        if (time < 1) return distance / 2 * time * time + start;
        time--;
        return -distance / 2 * (time * (time - 2) - 1) + start;
    }

    function scroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        window.scrollTo(0, easeInOutQuad(elapsed, start, distance, duration));

        if (elapsed < duration) {
            requestAnimationFrame(scroll);
        }
    }

    requestAnimationFrame(scroll);
}

// ==========================================
// 11. PERFORMANCE OPTIMIZATION
// ==========================================

/**
 * Lazy load images (if needed in future)
 * Improves page load performance
 */
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// ==========================================
// 12. ANALYTICS & TRACKING (Optional)
// ==========================================

/**
 * Track page views and user interactions
 * Can be integrated with Google Analytics or other services
 */
const Analytics = {
    trackEvent: function(category, action, label) {
        console.log(`Event: ${category} - ${action} - ${label}`);
        // In production, send to analytics service
        // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
    },

    trackNavigation: function(target) {
        this.trackEvent('Navigation', 'Link Click', target);
    },

    trackFormSubmit: function() {
        this.trackEvent('Form', 'Contact Form Submitted', 'Contact');
    }
};

// Track form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', () => {
            Analytics.trackFormSubmit();
        });
    }
});

// ==========================================
// 13. MOBILE MENU ENHANCEMENT
// ==========================================

/**
 * Enhance mobile menu behavior
 * Closes menu on click and provides better UX
 */
function initializeMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeMobileMenu);

// ==========================================
// 14. KEYBOARD ACCESSIBILITY
// ==========================================

/**
 * Improve keyboard navigation
 * Handle keyboard events for better accessibility
 */
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            document.querySelector('.navbar-toggler').click();
        }
    }
});

// ==========================================
// 15. DARK MODE PREFERENCE
// ==========================================

/**
 * Detect and respect user's dark mode preference
 * Can be extended for light mode support
 */
function initializeDarkModePreference() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (prefersLight) {
        // Light mode
        document.documentElement.style.setProperty('--background', '#f8fafc');
        console.log('Light mode detected');
    } else if (prefersDark) {
        // Dark mode (already default)
        console.log('Dark mode detected');
    }
}

document.addEventListener('DOMContentLoaded', initializeDarkModePreference);

// ==========================================
// 16. WINDOW RESIZE HANDLING
// ==========================================

/**
 * Handle window resize events
 * Update layouts and animations based on viewport size
 */
const handleResize = debounce(() => {
    console.log('Window resized:', window.innerWidth, window.innerHeight);
    // Update any resize-dependent features here
}, 250);

window.addEventListener('resize', handleResize);

// ==========================================
// 17. EXTERNAL LINK HANDLING
// ==========================================

/**
 * Handle external links
 * Open in new tab and track clicks
 */
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');

    if (!link) return;

    const href = link.getAttribute('href');

    // Check if it's an external link
    if (href && (href.startsWith('http') || href.startsWith('//'))) {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');

            // Track external link click
            const domain = new URL(href).hostname;
            Analytics.trackEvent('External Link', 'Click', domain);
        }
    }
});

// ==========================================
// 18. CONSOLE MESSAGES & DEBUGGING
// ==========================================

// Welcome message in console
console.log(
    '%c✨ Welcome to Arsalan\'s Portfolio! ✨',
    'color: #00d9ff; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cPython Developer | Aspiring Odoo Developer',
    'color: #a78bfa; font-size: 14px; font-weight: 500;'
);
console.log(
    '%cGitHub: https://github.com',
    'color: #fb923c; font-size: 12px;'
);

// ==========================================
// 19. EXPORT FUNCTIONS FOR EXTERNAL USE
// ==========================================

// Make functions available globally if needed
window.PortfolioApp = {
    smoothScrollTo: smoothScrollTo,
    trackEvent: Analytics.trackEvent.bind(Analytics),
    validateForm: validateForm
};

// ==========================================
// 20. ADDITIONAL HELPER FUNCTIONS
// ==========================================

/**
 * Get current viewport width
 * @returns {string} - Viewport size category
 */
function getViewportSize() {
    const width = window.innerWidth;
    if (width < 576) return 'xs';
    if (width < 768) return 'sm';
    if (width < 992) return 'md';
    if (width < 1200) return 'lg';
    if (width < 1400) return 'xl';
    return 'xxl';
}

/**
 * Check if element is in viewport
 * @param {Element} element - DOM element to check
 * @returns {boolean} - True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Format date in readable format
 * @param {Date} date - Date object
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ==========================================
// End of Script
// ==========================================
