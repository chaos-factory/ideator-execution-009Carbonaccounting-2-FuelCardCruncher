// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const nav = document.getElementById('nav');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-menu-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#docs') {
            // Skip if it's a placeholder link or docs link
            return;
        }
        
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Dismissible announcement bar
const announcementBar = document.getElementById('announcement-bar');
const announcementClose = announcementBar?.querySelector('.announcement-close');

if (announcementClose && announcementBar) {
    // Check if announcement was previously dismissed
    const isDismissed = localStorage.getItem('announcementDismissed');
    if (isDismissed === 'true') {
        announcementBar.style.display = 'none';
    }

    announcementClose.addEventListener('click', () => {
        announcementBar.style.display = 'none';
        localStorage.setItem('announcementDismissed', 'true');
    });
}

// FAQ accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        
        // Close all other FAQs
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle current FAQ
        question.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Keyboard accessibility for FAQs
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// Header scroll effect
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 10) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Update "Launch in browser" links - placeholder for now
// In production, this would link to the actual app entry point
const launchButtons = document.querySelectorAll('a[href="#"]');
launchButtons.forEach(button => {
    if (button.textContent.includes('Launch in browser')) {
        button.addEventListener('click', (e) => {
            // TODO: Replace with actual app URL
            console.log('Launch in browser clicked - replace with actual app URL');
            // For now, prevent default to avoid jumping to top
            e.preventDefault();
            alert('FuelCard Cruncher app coming soon! This is a preview of the landing page.');
        });
    }
});

// Download sample CSV button handler
const sampleCsvButtons = document.querySelectorAll('a[href*="sample-schema-c.csv"]');
sampleCsvButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Check if file exists, otherwise show message
        fetch(button.getAttribute('href'))
            .then(response => {
                if (!response.ok) {
                    e.preventDefault();
                    console.log('Sample CSV download initiated');
                }
            })
            .catch(() => {
                // File will download if it exists
            });
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('FuelCard Cruncher landing page loaded');
    
    // Set initial aria-expanded states
    faqQuestions.forEach(q => {
        if (!q.hasAttribute('aria-expanded')) {
            q.setAttribute('aria-expanded', 'false');
        }
    });
    
    if (hamburger && !hamburger.hasAttribute('aria-expanded')) {
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable smooth scroll for users who prefer reduced motion
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#docs') {
                return;
            }
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'auto' // Instant scroll for reduced motion
                });
            }
        });
    });
}
