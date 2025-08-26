// DriveVision - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initializeAnimations();
    initializeSmoothScrolling();
    initializeParallaxEffects();
    initializeInteractiveElements();
    initializeEmojiAnimations();
    initializeGlassEffects();
});

// Animation System
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.car-card, .category-card, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // Floating shapes animation
    animateFloatingShapes();
    
    // Typing effect for hero title
    typeWriterEffect();
}

// Floating Shapes Animation
function animateFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const delay = index * 2;
        const duration = 20 + Math.random() * 10;
        
        shape.style.animationDelay = `${delay}s`;
        shape.style.animationDuration = `${duration}s`;
        
        // Add mouse interaction
        shape.addEventListener('mouseenter', () => {
            shape.style.transform = 'scale(1.2)';
            shape.style.transition = 'transform 0.3s ease';
        });
        
        shape.addEventListener('mouseleave', () => {
            shape.style.transform = 'scale(1)';
        });
    });
}

// Typing Effect
function typeWriterEffect() {
    const title = document.querySelector('.gradient-text');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '2px solid var(--primary-color)';
    
    let i = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Blinking cursor effect
            setInterval(() => {
                title.style.borderRight = title.style.borderRight === '2px solid var(--primary-color)' 
                    ? '2px solid transparent' 
                    : '2px solid var(--primary-color)';
            }, 500);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
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
}

// Parallax Effects
function initializeParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-car, .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Car card interactions
    document.querySelectorAll('.car-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--glass-shadow)';
        });
        
        // Click to expand details
        card.addEventListener('click', function() {
            showCarDetails(this);
        });
    });
    
    // Category card interactions
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.animated-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.animated-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Button interactions
    document.querySelectorAll('.cta-btn, .glass-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

// Ripple Effect
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Emoji Animations
function initializeEmojiAnimations() {
    // Add animated emojis to the page
    const emojis = ['🚗', '🏎️', '🚙', '🛻', '🚐', '🚚', '🚛', '🚜', '🏍️', '🛵'];
    const emojiContainer = document.createElement('div');
    emojiContainer.className = 'floating-emojis';
    emojiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(emojiContainer);
    
    // Create floating emojis
    for (let i = 0; i < 15; i++) {
        createFloatingEmoji(emojiContainer, emojis);
    }
}

function createFloatingEmoji(container, emojis) {
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.cssText = `
        position: absolute;
        font-size: ${20 + Math.random() * 30}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatEmoji ${10 + Math.random() * 20}s linear infinite;
        opacity: 0.3;

    `;
    
    container.appendChild(emoji);
    
    // Remove emoji after animation
    setTimeout(() => {
        emoji.remove();
        createFloatingEmoji(container, emojis);
    }, 30000);
}

// Glass Effects
function initializeGlassEffects() {
    // Dynamic glass blur based on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = scrolled / maxScroll;
        
        const glassElements = document.querySelectorAll('.glass-card, .glass-nav');
        glassElements.forEach(element => {
            const blurAmount = 20 + (scrollProgress * 10);
            element.style.backdropFilter = `blur(${blurAmount}px)`;
        });
    });
    
    // Mouse tracking for glass cards
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Car Details Modal
function showCarDetails(carCard) {
    const carName = carCard.querySelector('h3').textContent;
    const carPrice = carCard.querySelector('.price').textContent;
    const carCategory = carCard.querySelector('.car-category').textContent;
    
    const modal = document.createElement('div');
    modal.className = 'car-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content glass-card">
                <div class="modal-header">
                    <h2>${carName}</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="car-preview">
                        <i class="fas fa-car-side" style="font-size: 4rem; color: var(--primary-color);"></i>
                    </div>
                    <div class="car-details">
                        <p><strong>Category:</strong> ${carCategory}</p>
                        <p><strong>Price:</strong> ${carPrice}/day</p>
                        <p><strong>Availability:</strong> Available Now</p>
                    </div>
                    <div class="modal-actions">
                        <button class="cta-btn primary">Rent Now</button>
                        <button class="cta-btn secondary">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .car-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .modal-overlay {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .modal-content {
            max-width: 500px;
            width: 100%;
            padding: 2rem;
            animation: slideIn 0.3s ease-out;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: var(--text-secondary);
            transition: var(--transition);
        }
        
        .close-btn:hover {
            color: var(--error-color);
        }
        
        .car-preview {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        
        .car-details {
            margin-bottom: 2rem;
        }
        
        .car-details p {
            margin-bottom: 0.5rem;
            color: var(--text-secondary);
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(modalStyles);
    
    // Close modal functionality
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
        modalStyles.remove();
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            modal.remove();
            modalStyles.remove();
        }
    });
}

// Add CSS for floating emojis
const emojiStyles = document.createElement('style');
emojiStyles.textContent = `
    @keyframes floatEmoji {
        0% {
            transform: translateY(100vh);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100px);
            opacity: 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
`;

document.head.appendChild(emojiStyles);

// Performance optimization
let ticking = false;

function updateAnimations() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Update any performance-heavy animations here
            ticking = false;
        });
        ticking = true;
    }
}

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading animation styles
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--gradient-primary);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::after {
            content: '🚗';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            z-index: 10000;
            animation: loadingPulse 1.5s ease-in-out infinite;
        }
        
        @keyframes loadingPulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.2); }
        }
    `;
    
    document.head.appendChild(loadingStyles);
    
    setTimeout(() => {
        loadingStyles.remove();
    }, 1000);
});

console.log('🚗 DriveVision - Premium Car Rentals loaded successfully! 🏎️');
