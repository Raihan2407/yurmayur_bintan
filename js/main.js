/* ===========================================
   YURMAYUR BINTAN - MAIN JAVASCRIPT
   File: js/main.js
   Deskripsi: Script utama untuk interaktivitas website
   =========================================== */

// Jalankan kode setelah DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Ambil elemen hamburger dan nav menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    // Toggle menu mobile saat hamburger diklik
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active'); // Buka/tutup menu
            hamburger.classList.toggle('active'); // Animasi hamburger jadi X
        });
    }
    
    // Tutup menu saat link navigasi diklik (khusus mobile)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) { // Cek apakah mobile view
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Tutup menu saat klik di luar area menu
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        // Tutup jika klik di luar menu dan menu sedang terbuka
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Tombol scroll to top (tidak digunakan di contact karena sudah diganti link ke home)
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll ke atas
    });
}

// Tombol "Lihat Selengkapnya" di gallery preview (home page)
const galleryBtn = document.querySelector('.gallery-btn');
if (galleryBtn) {
    galleryBtn.addEventListener('click', function() {
        window.location.href = 'gallery.html'; // Redirect ke halaman gallery
    });
}

// Gallery arrows - placeholder untuk future carousel functionality
const galleryArrows = document.querySelectorAll('.gallery-arrow');
galleryArrows.forEach(arrow => {
    arrow.addEventListener('click', function() {
        console.log('Gallery navigation clicked'); // Log untuk debugging
        // TODO: Bisa dikembangkan untuk image carousel/slider
    });
});

// Smooth scroll untuk semua anchor link (#)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default jump behavior
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Smooth scroll ke target
        }
    });
});

// Highlight active navigation link berdasarkan halaman saat ini
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html'; // Ambil nama file saat ini
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active'); // Hapus active class dari semua link
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active'); // Tambah active class ke link saat ini
        }
    });
}
setActiveNavLink(); // Jalankan saat halaman dimuat

// Lazy loading images - Optimasi performance untuk gambar
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // Jika gambar masuk viewport
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src; // Load gambar
                img.removeAttribute('data-src'); // Hapus attribute data-src
            }
            observer.unobserve(img); // Stop observing gambar ini
        }
    });
});

// Observe semua gambar dengan attribute data-src
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Validasi form - untuk future development jika ada form
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return; // Return jika form tidak ditemukan
    
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default submit
        
        // Cek semua input required
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) { // Jika input kosong
                isValid = false;
                input.classList.add('error'); // Tambah class error untuk styling
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            console.log('Form valid, ready to submit');
            // form.submit(); // Uncomment untuk submit form
        } else {
            alert('Mohon lengkapi semua field yang wajib diisi');
        }
    });
}

// Track klik pada contact links (untuk analytics)
const contactLinks = document.querySelectorAll('.contact-method a');
contactLinks.forEach(link => {
    link.addEventListener('click', function() {
        const contactType = this.closest('.contact-method').querySelector('h3').textContent;
        console.log(`User clicked: ${contactType}`); // Log contact type yang diklik
        // TODO: Tambahkan Google Analytics tracking di sini
    });
});

// Animation on scroll - Reveal elements saat scroll
const observeElements = document.querySelectorAll('.hero-content, .gallery-preview, .store-location');
const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // Jika element masuk viewport
            entry.target.style.opacity = '1'; // Fade in
            entry.target.style.transform = 'translateY(0)'; // Slide up
        }
    });
}, { threshold: 0.1 }); // Trigger saat 10% element terlihat

// Setup animation untuk setiap element
observeElements.forEach(element => {
    element.style.opacity = '0'; // Initial state: invisible
    element.style.transform = 'translateY(20px)'; // Initial state: shifted down
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Transition properties
    elementObserver.observe(element); // Mulai observe
});

// Responsive navigation - Tutup menu mobile saat resize ke desktop
window.addEventListener('resize', function() {
    const navMenu = document.getElementById('navMenu');
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active'); // Tutup menu jika sudah desktop view
    }
});

// Welcome message di console
console.log('%c🍲 Welcome to Yurmayur Bintan! 🍲', 'color: #2d5016; font-size: 20px; font-weight: bold;');
console.log('%cTaste the Authentic — Sambal Lingkung by Yurmayur', 'color: #666; font-size: 12px;');

// Performance monitoring - Log page load time
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`); // Log waktu loading halaman
});