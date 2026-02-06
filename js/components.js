document.addEventListener('DOMContentLoaded', () => {
    loadComponent('navbar', 'components/navbar.html', initNavbar);
    loadComponent('social-bar', 'components/social-bar.html');
});

async function loadComponent(elementId, filePath, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        const text = await response.text();
        element.innerHTML = text;
        
        if (callback) callback();
    } catch (error) {
        console.error(`Error loading component ${filePath}:`, error);
    }
}

function initNavbar() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Close mobile nav when clicking on a link
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Page transition functionality
    // Note: We attach this to all links that navigate to internal pages we want to fade
    const fadeLinks = document.querySelectorAll('a[href="project.html"], a[href="index.html"], a[href^="project-detail"]');
    
    fadeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const destination = this.href;
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = destination;
            }, 500); // Match the animation duration
        });
    });

    // Highlight active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    
    navLinks.forEach(link => {
        // Simple check: if href matches current path (considering relative paths)
        // Adjust logic if needed for complex paths
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active'); // Style this in CSS if desired
            link.style.color = 'var(--accent-color)'; // Direct style appication for compatibility
        }
    });
}
