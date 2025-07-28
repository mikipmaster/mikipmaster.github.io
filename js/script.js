// ===============================
// NAWIGACJA MOBILNA
// ===============================

// Pobierz elementy nawigacji
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobilnego
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animacja hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });
}

// Zamknij menu po kliknięciu w link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
        
        const bars = navToggle ? navToggle.querySelectorAll('.bar') : [];
        bars.forEach(bar => bar.classList.remove('active'));
    });
});

// ===============================
// SMOOTH SCROLLING
// ===============================

// Płynne przewijanie dla wszystkich linków z #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // 70px dla navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===============================
// NAVBAR PRZY SCROLLOWANIU
// ===============================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Zmiana tła navbar przy scroll
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===============================
// AKTYWNY LINK W NAWIGACJI
// ===============================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// ===============================
// ANIMACJE PRZY PRZEWIJANIU
// ===============================

// Intersection Observer dla animacji
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Dodaj animacje do sekcji
document.querySelectorAll('.section-animate').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(section);
});

// ===============================
// ANIMACJA UMIEJĘTNOŚCI
// ===============================

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');
            
            skillItems.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.opacity = '1';
                    skill.style.transform = 'scale(1) translateY(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    // Przygotuj umiejętności do animacji
    const skillItems = skillsSection.querySelectorAll('.skill-item');
    skillItems.forEach(skill => {
        skill.style.opacity = '0';
        skill.style.transform = 'scale(0.8) translateY(20px)';
        skill.style.transition = 'all 0.3s ease';
    });
    
    skillsObserver.observe(skillsSection);
}

// ===============================
// PROGRESS BARS – ANIMACJA
// ===============================

const progressObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target.querySelector('.progress-fill');
            if (bar) {
                const target = bar.dataset.width;
                if (target) {
                    bar.style.width = target + '%';
                }
            }
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

// Obsługa progress bars - z zabezpieczeniem
document.querySelectorAll('.progress-item').forEach(item => {
    const fill = item.querySelector('.progress-fill');
    if (fill && fill.getAttribute('data-width')) {
        fill.dataset.width = fill.getAttribute('data-width');
        progressObserver.observe(item);
    }
});

// ===============================
// ANIMACJA PROJEKTÓW (BEZPIECZNA)
// ===============================

const projectCards = document.querySelectorAll('.project-card');

// Tylko jeśli istnieją karty projektów
if (projectCards.length > 0) {
    projectCards.forEach((card, index) => {
        // Przygotuj karty do animacji
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    // Observer dla projektów
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.project-card');
                cards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }
        });
    }, { threshold: 0.1 });

    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
        projectsObserver.observe(projectsSection);
    }
}

// ===============================
// PROJECT FILTER – BEZPIECZNA WERSJA
// ===============================

const filterBtns = document.querySelectorAll('.filter-btn');

// Tylko jeśli istnieją przyciski filtra I karty projektów
if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // aktywny przycisk
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const category = card.dataset.category;
                card.style.display = (filter === 'all' || filter === category) ? 'block' : 'none';
            });
        });
    });
}

// ===============================
// FORMULARZ KONTAKTOWY
// ===============================

const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            
            // Zmień tekst przycisku
            submitBtn.textContent = 'Wysyłanie...';
            submitBtn.disabled = true;
            
            // Symulacja wysyłania (Formspree obsłuży faktyczne wysłanie)
            setTimeout(() => {
                submitBtn.textContent = 'Wysłano ✓';
                submitBtn.style.background = '#10b981';
                
                // Resetuj po 3 sekundach
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1000);
        }
    });
    
    // Walidacja pól w czasie rzeczywistym
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#ef4444';
                this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else {
                this.style.borderColor = '#10b981';
                this.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#6366f1';
            this.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
        });
    });
}

// ===============================
// BACK TO TOP BUTTON
// ===============================

// Stwórz przycisk "Powrót na górę"
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.setAttribute('aria-label', 'Powrót na górę');
backToTopButton.classList.add('back-to-top');

// Style dla przycisku
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(backToTopButton);

// Pokaż/ukryj przycisk przy przewijaniu
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// Funkcjonalność powrotu na górę
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect dla przycisku
backToTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
});

backToTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
});

// ===============================
// TYPING ANIMATION
// ===============================

function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uruchom animację po załadowaniu strony
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// ===============================
// STATYSTYKI COUNTER
// ===============================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Observer dla statystyk
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent.replace(/\D/g, ''));
                if (target) {
                    animateCounter(stat, target, 1500);
                }
            });
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// ===============================
// KONSOLA DEVELOPER
// ===============================

console.log(`
🚀 Portfolio Website Loaded Successfully!
📧 Contact: mikipmaster@example.com
💼 GitHub: https://github.com/mikipmaster
🎯 Looking for Junior Developer opportunities!

Built with ❤️ using HTML, CSS & JavaScript
`);

// ===============================
// ERROR HANDLING
// ===============================

window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});
 