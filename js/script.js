// Menu Hambúrguer
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Dropdown functionality
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = toggle.closest('.dropdown');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown').forEach(d => {
            if (d !== dropdown) {
                d.classList.remove('active');
                const otherMenu = d.querySelector('.dropdown-menu');
                if (otherMenu) {
                    otherMenu.style.opacity = '0';
                    otherMenu.style.visibility = 'hidden';
                    otherMenu.style.transform = 'translateY(-10px)';
                    otherMenu.style.display = 'none';
                }
            }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
        
        // Toggle inline styles for dropdown menu
        if (dropdown.classList.contains('active')) {
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
            dropdownMenu.style.display = 'block';
        } else {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            dropdownMenu.style.transform = 'translateY(-10px)';
            dropdownMenu.style.display = 'none';
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(-10px)';
                dropdownMenu.style.display = 'none';
            }
        });
    }
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Scroll suave para sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animação de elementos ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.course-card, .feature, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Informações dos cursos VR
const courseInfo = {
    'matemática': {
        title: 'Matemática em Realidade Virtual',
        content: 'Nossas aulas de matemática usam RV para transformar conceitos abstratos em experiências visuais e interativas. Explore geometria 3D, visualize funções matemáticas e manipule equações em um ambiente imersivo. Ideal para alunos que aprendem melhor através da visualização e interação prática.'
    },
    'ciências': {
        title: 'Laboratório Virtual de Ciências',
        content: 'Conducta experimentos científicos seguros em nosso laboratório virtual. Explore reações químicas, investiga fenômenos físicos e viaja pelo corpo humano em escala molecular. A RV permite experiências que seriam impossíveis ou perigosas em um laboratório tradicional.'
    },
    'tecnologia': {
        title: 'Programação e Desenvolvimento VR/AR',
        content: 'Aprenda a programar enquanto cria suas próprias experiências de realidade virtual e aumentada. Nossos cursos cobrem desde conceitos básicos de programação até desenvolvimento avançado de aplicações VR/AR usando tecnologias como A-Frame, Unity e WebXR.'
    }
};

// Função para mostrar informações dos cursos VR
function showInfo(course) {
    const info = courseInfo[course];
    if (info) {
        const infoPanel = document.getElementById('info-panel');
        const infoTitle = document.getElementById('info-title');
        const infoContent = document.getElementById('info-content');
        
        // Adicionar classe de animação
        infoPanel.style.transform = 'scale(0.95)';
        infoPanel.style.opacity = '0.7';
        
        setTimeout(() => {
            infoTitle.textContent = info.title;
            infoContent.textContent = info.content;
            
            infoPanel.style.transform = 'scale(1)';
            infoPanel.style.opacity = '1';
            infoPanel.style.transition = 'all 0.3s ease';
            
            // Scroll suave para o painel de informações
            infoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);
    }
}

// Inicializar EmailJS após carregar a página
document.addEventListener('DOMContentLoaded', function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("F7fAxdkOjcbHD0ut4");
        console.log('EmailJS inicializado com sucesso');
    } else {
        console.error('EmailJS não carregou corretamente');
    }
});

// Validação e envio do formulário de contato
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validação básica
    if (!data.name || !data.email || !data.message) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    // Enviar com EmailJS
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    console.log('Enviando email com dados:', {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'Não informado',
        message: data.message,
        to_email: 'cognitaestudo@gmail.com'
    });
    
    emailjs.send('service_u2laeol', 'template_ruhfzvx', {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'Não informado',
        message: data.message,
        to_email: 'cognitaestudo@gmail.com' // Seu email de destino
    })
    .then(function(response) {
        console.log('Email enviado com sucesso:', response);
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        document.getElementById('contact-form').reset();
    })
    .catch(function(error) {
        console.error('Erro ao enviar email:', error);
        showNotification('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
    })
    .finally(function() {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remover notificações existentes
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Cor conforme o tipo
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(45deg, #dc3545, #c82333)';
            break;
        default:
            notification.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
    }
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Animação dos números (contador)
function animateNumbers() {
    const numbers = document.querySelectorAll('[data-number]');
    
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-number'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += step;
            if (current < target) {
                number.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target;
            }
        };
        
        updateNumber();
    });
}

// Parallax effect para hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading animation para A-Frame scenes
document.addEventListener('DOMContentLoaded', () => {
    const scenes = document.querySelectorAll('a-scene');
    scenes.forEach(scene => {
        scene.addEventListener('loaded', () => {
            console.log('A-Frame scene loaded successfully');
        });
        
        scene.addEventListener('error', (error) => {
            console.error('A-Frame scene loading error:', error);
            showNotification('Erro ao carregar cena 3D. Por favor, recarregue a página.', 'error');
        });
    });
});

// Adicionar interatividade aos cards de cursos
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        
        // Se for #home, vai para o topo da página
        if (target === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Para outras sections, usa o comportamento normal
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
        // Fechar menu móvel se estiver aberto
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Detectar quando a página está pronta
window.addEventListener('load', () => {
    // Remover loading screen se existir
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Iniciar animações
    animateNumbers();
    
    console.log('Centro Explica - Site carregado com sucesso!');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC para fechar menu móvel
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Performance optimization - Lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Worker registration para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
