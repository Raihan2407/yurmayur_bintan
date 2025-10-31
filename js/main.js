// Jalankan kode setelah DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Ambil elemen mobile menu toggle dan navigation menu
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navigationMenu = document.getElementById('navigationMenu');
    
    // Toggle menu mobile saat hamburger diklik
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navigationMenu.classList.toggle('active'); // Buka/tutup menu
            mobileMenuToggle.classList.toggle('active'); // Animasi hamburger jadi X
        });
    }
    
    // Tutup menu saat link navigasi diklik (khusus mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) { // Cek apakah mobile view
                navigationMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
    
    // Tutup menu saat klik di luar area menu
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navigationMenu.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        // Tutup jika klik di luar menu dan menu sedang terbuka
        if (!isClickInsideNav && !isClickOnToggle && navigationMenu.classList.contains('active')) {
            navigationMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Tombol "Lihat Selengkapnya" di gallery preview (home page)
const viewGalleryBtn = document.querySelector('.view-gallery-btn');
if (viewGalleryBtn) {
    viewGalleryBtn.addEventListener('click', function() {
        window.location.href = 'gallery.html'; // Redirect ke halaman gallery
    });
}

// Gallery control arrows - placeholder untuk future carousel functionality
const controlArrows = document.querySelectorAll('.control-arrow');
controlArrows.forEach(arrow => {
    arrow.addEventListener('click', function() {
        console.log('Gallery arrow clicked'); // Log untuk debugging
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
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html'; // Ambil nama file saat ini
    const allNavLinks = document.querySelectorAll('.nav-link');
    
    allNavLinks.forEach(link => {
        link.classList.remove('active'); // Hapus active class dari semua link
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active'); // Tambah active class ke link saat ini
        }
    });
}
highlightActiveNav(); // Jalankan saat halaman dimuat

// Lazy loading images - Optimasi performance untuk gambar
const imageLazyLoader = new IntersectionObserver((entries, observer) => {
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
    imageLazyLoader.observe(img);
});

// Validasi form - untuk future development jika ada form pemesanan
function validateOrderForm(formId) {
    const orderForm = document.getElementById(formId);
    if (!orderForm) return; // Return jika form tidak ditemukan
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default submit
        
        // Cek semua input required
        const requiredInputs = orderForm.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) { // Jika input kosong
                isFormValid = false;
                input.classList.add('error'); // Tambah class error untuk styling
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isFormValid) {
            console.log('Form valid, ready to submit order');
            // orderForm.submit(); // Uncomment untuk submit form
        } else {
            alert('Mohon lengkapi semua field yang wajib diisi');
        }
    });
}

// Track klik pada contact links (untuk analytics)
const contactOptionLinks = document.querySelectorAll('.contact-option-card a');
contactOptionLinks.forEach(link => {
    link.addEventListener('click', function() {
        const contactMethod = this.closest('.contact-option-card').querySelector('h3').textContent;
        console.log(`User clicked contact method: ${contactMethod}`); // Log contact method yang diklik
        // TODO: Tambahkan Google Analytics tracking di sini
    });
});

// Animation on scroll - Reveal elements saat scroll
const animatedElements = document.querySelectorAll('.showcase-grid, .gallery-section, .store-info-section');
const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // Jika element masuk viewport
            entry.target.style.opacity = '1'; // Fade in
            entry.target.style.transform = 'translateY(0)'; // Slide up
        }
    });
}, { threshold: 0.1 }); // Trigger saat 10% element terlihat

// Setup animation untuk setiap element
animatedElements.forEach(element => {
    element.style.opacity = '0'; // Initial state: invisible
    element.style.transform = 'translateY(20px)'; // Initial state: shifted down
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Transition properties
    scrollAnimationObserver.observe(element); // Mulai observe
});

// Responsive navigation - Tutup menu mobile saat resize ke desktop
window.addEventListener('resize', function() {
    const navigationMenu = document.getElementById('navigationMenu');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    
    if (window.innerWidth > 768 && navigationMenu.classList.contains('active')) {
        navigationMenu.classList.remove('active'); // Tutup menu jika sudah desktop view
        mobileMenuToggle.classList.remove('active'); // Reset hamburger icon
    }
});

// Welcome message di console
console.log('%c🍲 Welcome to Yurmayur Bintan Website! 🍲', 'color: #2d5016; font-size: 20px; font-weight: bold;');
console.log('%cTaste the Authentic — Sambal Lingkung by Yurmayur', 'color: #666; font-size: 12px;');

// Performance monitoring - Log page load time
window.addEventListener('load', function() {
    const pageLoadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${pageLoadTime}ms`); // Log waktu loading halaman
    
    // Log untuk debugging - info halaman saat ini
    console.log(`Current page: ${window.location.pathname.split('/').pop() || 'index.html'}`);
});