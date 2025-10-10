    <script>
        // Typewriter effect
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

        // Toggle dark mode
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const icon = themeToggle.querySelector('i');
            
            if (body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });

        // Mobile menu toggle
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

        // Smooth scroll
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

        // Scroll reveal animation
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

        // Progress bars animation
        const progressBars = document.querySelectorAll('.progress-fill');
        
        function animateProgressBars() {
            progressBars.forEach(bar => {
                const barTop = bar.getBoundingClientRect().top;
                
                if (barTop < window.innerHeight - 100 && bar.style.width === '0px') {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                }
            });
        }
        
        window.addEventListener('scroll', animateProgressBars);
        animateProgressBars();

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Form validation
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (name.value.trim() === '') {
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
            if (message.value.trim() === '') {
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
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensaje Enviado';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 3000);
            }
        });

        // Download certificate buttons
        const downloadBtns = document.querySelectorAll('.download-btn');
        
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Descargado';
                btn.style.background = '#10b981';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 2000);
                
                // Aquí puedes agregar la lógica real de descarga
                // window.open('ruta-al-certificado.pdf', '_blank');
            });
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / 600);
            }
        });

        // Animate skill cards on hover
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.skill-icon i');
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.skill-icon i');
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Add transition to skill icons
        document.querySelectorAll('.skill-icon i').forEach(icon => {
            icon.style.transition = 'transform 0.3s ease';
        });
    </script>
