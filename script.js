// ============================================
// KORAY VATAN PORTFOLIO - INTERACTIONS
// ============================================

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate children with stagger effect
            const children = entry.target.querySelectorAll('.timeline-item, .startup-card, .stat-card');
            children.forEach((child, index) => {
                child.style.animationDelay = `${index * 0.1}s`;
                child.classList.add('animate-in');
            });
        }
    });
};

const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

// Observe sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about, .experience, .startups, .contact');
    sections.forEach(section => {
        scrollObserver.observe(section);
    });
    
    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item, .startup-card, .stat-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .timeline-item.animate-in, 
        .startup-card.animate-in, 
        .stat-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.style.background = 'rgba(10, 10, 11, 0.95)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'rgba(10, 10, 11, 0.8)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Typing effect for code block (optional enhancement)
const codeBlock = document.querySelector('.code-block code');
if (codeBlock) {
    const originalText = codeBlock.innerHTML;
    
    // Add cursor blink effect
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.innerHTML = '|';
    cursor.style.cssText = `
        animation: blink 1s infinite;
        color: var(--accent-primary);
        font-weight: bold;
    `;
    
    // Add blink animation
    const blinkStyle = document.createElement('style');
    blinkStyle.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(blinkStyle);
}

// Parallax effect for background grid
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const bgGrid = document.querySelector('.bg-grid');
            if (bgGrid) {
                bgGrid.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// 3D Card Effect - Cursor Following
const codeBlock = document.querySelector('.code-block');

if (codeBlock) {
    // Add shine overlay
    const shine = document.createElement('div');
    shine.className = 'code-shine';
    shine.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(255, 255, 255, 0.1) 0%,
            transparent 40%
        );
        pointer-events: none;
        z-index: 10;
        border-radius: 16px;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    codeBlock.appendChild(shine);
    
    codeBlock.addEventListener('mouseenter', () => {
        shine.style.opacity = '1';
    });
    
    codeBlock.addEventListener('mouseleave', () => {
        shine.style.opacity = '0';
        codeBlock.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        codeBlock.style.transition = 'transform 0.6s ease-out';
    });
    
    codeBlock.addEventListener('mousemove', (e) => {
        const rect = codeBlock.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        
        codeBlock.style.transition = 'transform 0.1s ease-out';
        codeBlock.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(1.02)
        `;
        
        // Update shine position
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        shine.style.setProperty('--mouse-x', `${percentX}%`);
        shine.style.setProperty('--mouse-y', `${percentY}%`);
    });
}

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styles
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
    .nav-links a.active {
        color: var(--text-primary);
    }
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeLinkStyle);

// Console easter egg
console.log(`
%c<K,V>
%cKoray Vatan's Portfolio
%c
Looking at the code? Nice! 
Feel free to reach out at korayvatan01@gmail.com
`, 
'font-size: 24px; font-weight: bold; color: #ff6b4a;',
'font-size: 14px; color: #00d4aa;',
'font-size: 12px; color: #a1a1aa;'
);

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Check if mobile menu button already exists
    if (document.querySelector('.mobile-menu-btn')) return;
    
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    menuBtn.style.cssText = `
        display: none;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 10px;
    `;
    
    // Add responsive styles
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: flex !important;
            }
            .mobile-menu-btn span {
                width: 24px;
                height: 2px;
                background: var(--text-primary);
                transition: all 0.3s ease;
            }
            .nav-links.active {
                display: flex !important;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                flex-direction: column;
                background: rgba(10, 10, 11, 0.98);
                padding: 20px;
                gap: 20px;
                border-bottom: 1px solid var(--border-subtle);
            }
        }
    `;
    document.head.appendChild(mobileStyle);
    
    nav.appendChild(menuBtn);
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
};

// Initialize mobile menu
createMobileMenu();

// Preloader (optional - can be uncommented if needed)
/*
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
*/

