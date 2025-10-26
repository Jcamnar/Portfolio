    // ========== TYPEWRITER EFFECT ==========
const phrases = [
    "Comprometido con la calidad del software",
    "Especializado en pruebas manuales",
    "Enfocado en la mejora continua",
    "Apasionado por encontrar defectos"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, typingSpeed);
}

typeWriter();

// ========== ANIMATED COUNTERS ==========
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

function animateCounters() {
    const triggerBottom = window.innerHeight * 0.8;
    
    counters.forEach(counter => {
        const rect = counter.getBoundingClientRect().top;
        
        if (rect < triggerBottom && !counterAnimated) {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            let count = 0;
            
            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCounter();
            counterAnimated = true;
        }
    });
}

window.addEventListener('scroll', animateCounters);
animateCounters();

// ========== DARK MODE TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
    }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== SCROLL REVEAL ANIMATION ==========
const reveals = document.querySelectorAll('.reveal');

function checkReveal() {
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
checkReveal();

// ========== PROGRESS BARS ANIMATION ==========
const progressBars = document.querySelectorAll('.progress-fill');
let progressAnimated = false;

function animateProgressBars() {
    progressBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const barVisible = window.innerHeight - 100;
        
        if (barTop < barVisible && bar.style.width === '') {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 200);
        }
    });
}

window.addEventListener('scroll', animateProgressBars);
animateProgressBars();

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
    
    // Add shadow to nav on scroll
    const nav = document.querySelector('nav');
    if (window.pageYOffset > 100) {
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== FORM VALIDATION ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (name.value.trim() === '' || name.value.trim().length < 3) {
        nameError.textContent = 'Por favor ingresa tu nombre completo (mínimo 3 caracteres)';
        nameError.style.display = 'block';
        name.style.borderColor = '#ef4444';
        isValid = false;
    } else {
        nameError.style.display = 'none';
        name.style.borderColor = '';
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        emailError.style.display = 'block';
        email.style.borderColor = '#ef4444';
        isValid = false;
    } else {
        emailError.style.display = 'none';
        email.style.borderColor = '';
    }
    
    // Validate subject
    const subject = document.getElementById('subject');
    const subjectError = document.getElementById('subjectError');
    if (subject.value.trim() === '') {
        subjectError.style.display = 'block';
        subject.style.borderColor = '#ef4444';
        isValid = false;
    } else {
        subjectError.style.display = 'none';
        subject.style.borderColor = '';
    }
    
    // Validate message
    const message = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    if (message.value.trim() === '' || message.value.trim().length < 10) {
        messageError.textContent = 'Por favor ingresa un mensaje (mínimo 10 caracteres)';
        messageError.style.display = 'block';
        message.style.borderColor = '#ef4444';
        isValid = false;
    } else {
        messageError.style.display = 'none';
        message.style.borderColor = '';
    }
    
    if (isValid) {
        // Success animation
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span>¡Mensaje Enviado Exitosamente!</span>';
        submitBtn.style.background = '#10b981';
        submitBtn.disabled = true;
        
        // Create success notification
        showNotification('¡Gracias por contactarme! Te responderé pronto.', 'success');
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 4000);
    } else {
        showNotification('Por favor corrige los errores en el formulario', 'error');
    }
});

// Real-time validation
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    const errorElement = document.getElementById(input.id + 'Error');
    
    if (input.id === 'name') {
        if (input.value.trim().length >= 3) {
            errorElement.style.display = 'none';
            input.style.borderColor = '';
        }
    } else if (input.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input.value)) {
            errorElement.style.display = 'none';
            input.style.borderColor = '';
        }
    } else if (input.id === 'subject') {
        if (input.value.trim() !== '') {
            errorElement.style.display = 'none';
            input.style.borderColor = '';
        }
    } else if (input.id === 'message') {
        if (input.value.trim().length >= 10) {
            errorElement.style.display = 'none';
            input.style.borderColor = '';
        }
    }
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 0.8rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ========== DOWNLOAD CERTIFICATE BUTTONS ==========
const downloadBtns = document.querySelectorAll('.download-btn');

downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const originalText = btn.innerHTML;
        const certificateName = btn.closest('.education-info').querySelector('h3').textContent;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Descargando...';
        btn.disabled = true;
        
    const downloadBtns = document.querySelectorAll('.download-btn');

downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const originalText = btn.innerHTML;
        const certificateName = btn.closest('.education-info').querySelector('h3').textContent;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abriendo...';
        btn.disabled = true;

        // Definir rutas a tus PDFs según el título del certificado
        const pdfs = {
            "Técnico en Procesamiento de Pruebas de Software": "assets/PROCESAMIENTO EN PRUEBAS DE SOFTWARE.pdf",
            "Manejo de Pruebas de Software": "assets/MANEJO DE PRUEBAS DE SOFTWARE..pdf",
            "Proceso para Software de Calidad": "assets/PROCESOS PARA PRUEBAS DE SOFTWARE.pdf",
            "Calidad en el Desarrollo de Software": "assets/CALIDAD EN EL DESARROLLO DE SOFTWARE.pdf",
            "Aplicación de la Calidad en el Desarrollo de Software": "assets/APLICACION DE LA CALIDAD DEL SOFTWARE EN EL PROCESO DE DESARROLLO.pdf"
        };

        const pdfURL = pdfs[certificateName];

        if (pdfURL) {
            // ✅ Opción 1: abrir en nueva pestaña sin descarga
            window.open(pdfURL, '_blank');

            // ✅ Opción 2: forzar descarga (si prefieres)
            // const link = document.createElement('a');
            // link.href = pdfURL;
            // link.download = certificateName + '.pdf';
            // link.click();

            showNotification(`Certificado "${certificateName}" abierto correctamente`, 'success');
        } else {
            showNotification('No se encontró el archivo del certificado', 'error');
        }

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 2000);
    });
});

    });
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 800);
    }
});

// ========== SKILL CARDS ANIMATION ==========
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.skill-icon i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.skill-icon i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Add transition to skill icons
document.querySelectorAll('.skill-icon i').forEach(icon => {
    icon.style.transition = 'transform 0.3s ease';
});

// ========== ACTIVE NAVIGATION HIGHLIGHT ==========
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-links a');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksArray.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--secondary-color)';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);
highlightNavigation();

// ========== LAZY LOADING IMAGES ==========
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                img.style.opacity = '1';
            }, 100);
            
            observer.unobserve(img);
        }
    });
}, {
    threshold: 0.1
});

images.forEach(img => imageObserver.observe(img));

// ========== CURSOR EFFECT (OPTIONAL) ==========
const cursor = document.createElement('div');
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid var(--secondary-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease, opacity 0.2s ease;
    opacity: 0;
`;
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

function animateCursor() {
    const diffX = mouseX - cursorX;
    const diffY = mouseY - cursorY;
    
    cursorX += diffX * 0.1;
    cursorY += diffY * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Scale cursor on interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-card, .hobby-card, .education-card');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background = 'rgba(59, 130, 246, 0.2)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'transparent';
    });
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
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

// Apply debounce to expensive scroll operations
window.addEventListener('scroll', debounce(() => {
    checkReveal();
    animateProgressBars();
    highlightNavigation();
}, 10));

// ========== CONSOLE MESSAGE ==========
console.log('%c¡Hola! 👋', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%c¿Interesado en el código? Este portafolio fue desarrollado con HTML, CSS y JavaScript puro.', 'color: #64748b; font-size: 14px;');
console.log('%cSi quieres contactarme, usa el formulario en la página. ¡Gracias por visitar! 🚀', 'color: #10b981; font-size: 14px;');

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! ✨');
    
    // Trigger initial animations
    setTimeout(() => {
        checkReveal();
        animateProgressBars();
    }, 100);
});
