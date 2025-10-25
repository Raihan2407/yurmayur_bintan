/* ===========================================
   YURMAYUR BINTAN - MAIN JAVASCRIPT
   File: js/main.js
   Deskripsi: Script utama untuk interaktivitas website
   =========================================== */

// ========================================
// HAMBURGER MENU TOGGLE (Mobile Navigation)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    // Toggle menu saat hamburger diklik
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animasi hamburger menjadi X
            hamburger.classList.toggle('active');
        });
    }
    
    // Tutup menu saat link diklik (untuk mobile)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Tutup menu saat klik di luar menu
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ========================================
// SCROLL TO TOP BUTTON (Contact Page)
// ========================================
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// GALLERY NAVIGATION BUTTONS
// ========================================
const galleryBtn = document.querySelector('.gallery-btn');
if (galleryBtn) {
    galleryBtn.addEventListener('click', function() {
        window.location.href = 'gallery.html';
    });
}

// Gallery arrows (untuk future development - carousel)
const galleryArrows = document.querySelectorAll('.gallery-arrow');
galleryArrows.forEach(arrow => {
    arrow.addEventListener('click', function() {
        // Placeholder untuk carousel functionality
        console.log('Gallery navigation clicked');
        // Bisa dikembangkan untuk image carousel
    });
});

// ========================================
// SMOOTH SCROLL untuk anchor links
// ========================================
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

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================
// Highlight nav link berdasarkan halaman saat ini
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Jalankan saat halaman dimuat
setActiveNavLink();

// ========================================
// LAZY LOADING IMAGES (Performance Optimization)
// ========================================
// Menggunakan Intersection Observer untuk lazy load gambar
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
});

// Observe semua gambar dengan data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ========================================
// FORM VALIDATION (Jika ada form di masa depan)
// ========================================
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validasi input fields
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Submit form atau kirim data
            console.log('Form valid, ready to submit');
            // form.submit();
        } else {
            alert('Mohon lengkapi semua field yang wajib diisi');
        }
    });
}

// ========================================
// CONTACT METHODS - WhatsApp & Phone Click Tracking
// ========================================
const contactLinks = document.querySelectorAll('.contact-method a');
contactLinks.forEach(link => {
    link.addEventListener('click', function() {
        const contactType = this.closest('.contact-method').querySelector('h3').textContent;
        console.log(`User clicked: ${contactType}`);
        // Bisa ditambahkan analytics tracking di sini
    });
});

// ========================================
// ANIMATION ON SCROLL (Reveal Elements)
// ========================================
const observeElements = document.querySelectorAll('.hero-content, .gallery-preview, .store-location');

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

observeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    elementObserver.observe(element);
});

// ========================================
// RESPONSIVE NAVIGATION HEIGHT FIX
// ========================================
// Fix untuk mobile navigation height saat keyboard muncul
window.addEventListener('resize', function() {
    const navMenu = document.getElementById('navMenu');
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// ========================================
// CONSOLE WELCOME MESSAGE
// ========================================
console.log('%c🍲 Welcome to Yurmayur Bintan! 🍲', 'color: #2d5016; font-size: 20px; font-weight: bold;');
console.log('%cTaste the Authentic — Sambal Lingkung by Yurmayur', 'color: #666; font-size: 12px;');

// ========================================
// PERFORMANCE MONITORING (Optional)
// ========================================
window.addEventListener('load', function() {
    // Log page load time
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});