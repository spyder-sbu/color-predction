// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
        }
    });
});

// Course Details Section
const courseDetails = document.querySelector('#course-details');
const learnMoreButton = document.querySelector('.course-button');
const closeDetailsButton = document.querySelector('.close-details');

learnMoreButton.addEventListener('click', (e) => {
    e.preventDefault();
    courseDetails.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

closeDetailsButton.addEventListener('click', () => {
    courseDetails.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close details when clicking outside
courseDetails.addEventListener('click', (e) => {
    if (e.target === courseDetails) {
        courseDetails.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Payment Modal
const paymentButton = document.getElementById('payment-button');
const paymentModal = document.querySelector('.payment-modal');
const closeModal = document.querySelector('.close-modal');

paymentButton.addEventListener('click', () => {
    paymentModal.classList.add('show');
    courseDetails.classList.remove('show');
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    paymentModal.classList.remove('show');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        paymentModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.course-card, .feature-item, .about-content, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.course-card, .feature-item, .about-content, .contact-form');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease-out';
    });
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
window.addEventListener('load', animateOnScroll);

// UPI Payment Confirmation
const upiConfirmButton = document.getElementById('upi-confirm');
upiConfirmButton.addEventListener('click', () => {
    // Here you would typically verify the payment with your server
    alert('Thank you for your payment! We will verify and confirm your access shortly.');
    paymentModal.classList.remove('show');
    document.body.style.overflow = '';
}); 