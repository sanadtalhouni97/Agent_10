// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeFAQInteractions();
    initializeLocationInteractions();
    initializeSupportFeatures();
    initializeContactAnimations();
});

// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Handle form submission
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = `
        <div class="loading"></div>
        <span>Sending...</span>
    `;
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Add success animation
        submitBtn.style.background = 'var(--success-color)';
        setTimeout(() => {
            submitBtn.style.background = '';
        }, 2000);
        
    }, 2000);
}

// Validate form field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'phone':
            if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = 'var(--error-color)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--error-color);
        font-size: 0.8rem;
        margin-top: 0.25rem;
        animation: fadeIn 0.3s ease-out;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.style.borderColor = '';
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
}

// Remove notification
function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// FAQ Interactions
function initializeFAQInteractions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        // Initially hide answers
        answer.style.display = 'none';
        answer.style.opacity = '0';
        answer.style.transform = 'translateY(-10px)';
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('open');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    
                    otherAnswer.style.display = 'none';
                    otherAnswer.style.opacity = '0';
                    otherAnswer.style.transform = 'translateY(-10px)';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            if (isOpen) {
                item.classList.remove('open');
                answer.style.display = 'none';
                answer.style.opacity = '0';
                answer.style.transform = 'translateY(-10px)';
                icon.style.transform = 'rotate(0deg)';
            } else {
                item.classList.add('open');
                answer.style.display = 'block';
                
                setTimeout(() => {
                    answer.style.opacity = '1';
                    answer.style.transform = 'translateY(0)';
                    answer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                }, 10);
                
                icon.style.transform = 'rotate(180deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
    });
}

// Location Interactions
function initializeLocationInteractions() {
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach(card => {
        const directionsBtn = card.querySelector('.location-btn');
        
        directionsBtn.addEventListener('click', function() {
            const locationName = card.querySelector('h3').textContent;
            const address = card.querySelector('.location-details p:first-child').textContent.replace('📍 ', '');
            
            // Open Google Maps with the address
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            window.open(mapsUrl, '_blank');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--glass-shadow)';
        });
    });
}

// Support Features
function initializeSupportFeatures() {
    // Live chat button
    const liveChatBtn = document.getElementById('liveChatBtn');
    if (liveChatBtn) {
        liveChatBtn.addEventListener('click', function() {
            showLiveChatModal();
        });
    }
    
    // Support cards hover effects
    const supportCards = document.querySelectorAll('.support-card');
    supportCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            
            const icon = this.querySelector('.support-icon i');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--glass-shadow)';
            
            const icon = this.querySelector('.support-icon i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Show live chat modal
function showLiveChatModal() {
    const modal = document.createElement('div');
    modal.className = 'live-chat-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content glass-card">
                <div class="modal-header">
                    <h2>Live Chat</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="chat-container">
                    <div class="chat-messages">
                        <div class="message agent">
                            <div class="message-content">
                                <p>Hello! Welcome to DriveVision support. How can I help you today?</p>
                                <span class="message-time">Just now</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="Type your message..." id="chatInput">
                        <button class="send-btn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add chat modal styles
    const chatStyles = document.createElement('style');
    chatStyles.textContent = `
        .live-chat-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .chat-container {
            height: 400px;
            display: flex;
            flex-direction: column;
        }
        
        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: var(--border-radius);
            margin-bottom: 1rem;
        }
        
        .message {
            margin-bottom: 1rem;
            display: flex;
        }
        
        .message.user {
            justify-content: flex-end;
        }
        
        .message-content {
            max-width: 70%;
            padding: 0.75rem 1rem;
            border-radius: var(--border-radius);
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
        }
        
        .message.user .message-content {
            background: var(--primary-color);
            color: white;
        }
        
        .message-time {
            font-size: 0.7rem;
            opacity: 0.7;
            margin-top: 0.25rem;
            display: block;
        }
        
        .chat-input {
            display: flex;
            gap: 0.5rem;
        }
        
        .chat-input input {
            flex: 1;
            padding: 0.75rem;
            border: 1px solid var(--glass-border);
            border-radius: var(--border-radius);
            background: var(--glass-bg);
            color: var(--text-primary);
        }
        
        .send-btn {
            padding: 0.75rem 1rem;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: var(--transition);
        }
        
        .send-btn:hover {
            background: var(--secondary-color);
        }
    `;
    document.head.appendChild(chatStyles);
    
    // Chat functionality
    const chatInput = modal.querySelector('#chatInput');
    const sendBtn = modal.querySelector('.send-btn');
    const chatMessages = modal.querySelector('.chat-messages');
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate agent response
            setTimeout(() => {
                const responses = [
                    "Thank you for your message! Our team will get back to you shortly.",
                    "I understand your concern. Let me help you with that.",
                    "That's a great question! Here's what you need to know...",
                    "I'm here to help! Could you provide more details?"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'agent');
            }, 1000);
        }
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">Just now</span>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Close modal
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
        chatStyles.remove();
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            modal.remove();
            chatStyles.remove();
        }
    });
}

// Contact Animations
function initializeContactAnimations() {
    // Animate contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            method.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            method.style.opacity = '1';
            method.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate location cards
    const locationCards = document.querySelectorAll('.location-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    locationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(card);
    });
}

// Add contact page specific styles
const contactStyles = document.createElement('style');
contactStyles.textContent = `
    .contact-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        margin-bottom: 4rem;
    }
    
    .contact-info h2 {
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .contact-info p {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    
    .contact-methods {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .contact-method {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: var(--border-radius);
        transition: var(--transition);
    }
    
    .contact-method:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateX(10px);
    }
    
    .method-icon {
        font-size: 2rem;
        color: var(--primary-color);
        min-width: 60px;
    }
    
    .method-details h3 {
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }
    
    .method-details p {
        margin-bottom: 0.25rem;
        color: var(--text-secondary);
    }
    
    .method-details small {
        color: var(--text-light);
        font-size: 0.8rem;
    }
    
    .contact-form-container h2 {
        margin-bottom: 2rem;
        color: var(--text-primary);
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
        font-weight: 600;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid var(--glass-border);
        border-radius: var(--border-radius);
        background: var(--glass-bg);
        color: var(--text-primary);
        font-size: 1rem;
        transition: var(--transition);
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    
    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    .checkbox-label input[type="checkbox"] {
        width: auto;
        margin: 0;
    }
    
    .submit-btn {
        width: 100%;
        margin-top: 1rem;
    }
    
    .locations-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 4rem;
    }
    
    .location-card {
        padding: 2rem;
    }
    
    .location-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .location-icon {
        font-size: 2rem;
        color: var(--primary-color);
    }
    
    .location-info h3 {
        margin-bottom: 0.25rem;
        color: var(--text-primary);
    }
    
    .location-info p {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    .location-details {
        margin-bottom: 1.5rem;
    }
    
    .location-details p {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-secondary);
    }
    
    .location-details i {
        color: var(--primary-color);
        width: 16px;
    }
    
    .location-actions {
        text-align: center;
    }
    
    .faq-container {
        margin-bottom: 4rem;
    }
    
    .faq-item {
        margin-bottom: 1rem;
    }
    
    .faq-question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .faq-question:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .faq-question h3 {
        margin: 0;
        color: var(--text-primary);
    }
    
    .faq-question i {
        color: var(--primary-color);
        transition: var(--transition);
    }
    
    .faq-answer {
        padding: 0 1.5rem 1.5rem;
    }
    
    .faq-answer p {
        color: var(--text-secondary);
        line-height: 1.6;
        margin: 0;
    }
    
    .support-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 4rem;
    }
    
    .support-card {
        padding: 2rem;
        text-align: center;
    }
    
    .support-icon {
        font-size: 2.5rem;
        color: var(--primary-color);
        margin-bottom: 1.5rem;
    }
    
    .support-card h3 {
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .support-card p {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }
    
    .support-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: var(--border-radius);
        color: var(--text-primary);
        text-decoration: none;
        transition: var(--transition);
        cursor: pointer;
    }
    
    .support-link:hover {
        background: var(--primary-color);
        color: white;
        transform: translateY(-2px);
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .contact-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .contact-method {
            flex-direction: column;
            text-align: center;
        }
        
        .locations-grid {
            grid-template-columns: 1fr;
        }
        
        .support-grid {
            grid-template-columns: 1fr;
        }
    }
`;

document.head.appendChild(contactStyles);

console.log('📞 Contact page loaded successfully! 🚗');
