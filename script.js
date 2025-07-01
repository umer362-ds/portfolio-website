// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Initialize all interactive features
    initMobileMenu();
    initProjectFiltering();
    initBlogFiltering();
    initContactForm();
    initScrollEffects();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Project Filtering Functionality
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.filter-item');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectItems.forEach(item => {
                    const categories = item.getAttribute('data-category');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        item.style.display = 'block';
                        item.classList.remove('hidden-item');
                        // Re-trigger AOS animation
                        item.classList.add('fade-in');
                    } else {
                        item.style.display = 'none';
                        item.classList.add('hidden-item');
                    }
                });
            });
        });
    }
}

// Blog Post Filtering Functionality
function initBlogFiltering() {
    const tagFilters = document.querySelectorAll('.tag-filter');
    const blogPosts = document.querySelectorAll('.filter-post');
    
    if (tagFilters.length > 0 && blogPosts.length > 0) {
        tagFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const tag = this.getAttribute('data-tag');
                
                // Update active filter
                tagFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                
                // Filter blog posts
                blogPosts.forEach(post => {
                    const tags = post.getAttribute('data-tags');
                    
                    if (tag === 'all' || tags.includes(tag)) {
                        post.style.display = 'block';
                        post.classList.remove('hidden-item');
                        post.classList.add('fade-in');
                    } else {
                        post.style.display = 'none';
                        post.classList.add('hidden-item');
                    }
                });
            });
        });
    }
}

// Contact Form Validation and Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearFormErrors();
            
            // Validate form
            if (validateContactForm()) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual submission logic)
                setTimeout(() => {
                    showFormSuccess();
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Form Validation Functions
function validateContactForm() {
    let isValid = true;
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const privacy = document.getElementById('privacy');
    
    // Validate name
    if (!name.value.trim()) {
        showFieldError(name, 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showFieldError(name, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showFieldError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showFieldError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showFieldError(message, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    // Validate privacy checkbox
    if (!privacy.checked) {
        showFieldError(privacy, 'You must agree to the privacy policy');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const fieldName = field.getAttribute('name');
    const value = field.value.trim();
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                showFieldError(field, 'Name is required');
                return false;
            } else if (value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters');
                return false;
            }
            break;
            
        case 'email':
            if (!value) {
                showFieldError(field, 'Email is required');
                return false;
            } else if (!isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            break;
            
        case 'message':
            if (!value) {
                showFieldError(field, 'Message is required');
                return false;
            } else if (value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters');
                return false;
            }
            break;
    }
    
    clearFieldError(field);
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    const errorId = field.getAttribute('id') + '-error';
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    field.classList.add('border-red-500');
    field.classList.remove('border-gray-300');
}

function clearFieldError(field) {
    const errorId = field.getAttribute('id') + '-error';
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    field.classList.remove('border-red-500');
    field.classList.add('border-gray-300');
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    
    const formFields = document.querySelectorAll('#contact-form input, #contact-form textarea');
    formFields.forEach(field => {
        field.classList.remove('border-red-500');
        field.classList.add('border-gray-300');
    });
}

function showFormSuccess() {
    const successElement = document.getElementById('form-success');
    const errorElement = document.getElementById('form-error');
    
    if (successElement) {
        successElement.classList.remove('hidden');
        successElement.style.display = 'block';
    }
    
    if (errorElement) {
        errorElement.classList.add('hidden');
        errorElement.style.display = 'none';
    }
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        if (successElement) {
            successElement.classList.add('hidden');
            successElement.style.display = 'none';
        }
    }, 5000);
}

function showFormError() {
    const successElement = document.getElementById('form-success');
    const errorElement = document.getElementById('form-error');
    
    if (errorElement) {
        errorElement.classList.remove('hidden');
        errorElement.style.display = 'block';
    }
    
    if (successElement) {
        successElement.classList.add('hidden');
        successElement.style.display = 'none';
    }
}

// Scroll Effects
function initScrollEffects() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 50) {
            navbar.classList.add('backdrop-blur-sm', 'bg-white/95');
        } else {
            navbar.classList.remove('backdrop-blur-sm', 'bg-white/95');
        }
    });
    
    // Smooth scroll for anchor links
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
}

// Newsletter Subscription (if implemented)
function initNewsletterForm() {
    const newsletterForm = document.querySelector('form[data-newsletter]');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (isValidEmail(email)) {
                // Handle newsletter subscription
                console.log('Newsletter subscription for:', email);
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Console Welcome Message
console.log('%c👋 Welcome to Muhammad Umer Ali\'s Portfolio!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 'color: #64748b; font-size: 14px;');
