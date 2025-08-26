// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAboutAnimations();
    initializeTeamInteractions();
    initializeTimelineAnimations();
    initializeAchievementAnimations();
    initializeValueCards();
});

// About Page Animations
function initializeAboutAnimations() {
    // Animate stats on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
    
    // Animate mission/vision cards
    const missionCards = document.querySelectorAll('.mission-card, .vision-card');
    missionCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Animate number counting
function animateNumber(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// Team Interactions
function initializeTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        // Add hover effects
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            
            // Animate social links
            const socialLinks = this.querySelectorAll('.member-social a');
            socialLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'scale(1.2)';
                    link.style.color = 'var(--primary-color)';
                }, index * 100);
            });
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--glass-shadow)';
            
            // Reset social links
            const socialLinks = this.querySelectorAll('.member-social a');
            socialLinks.forEach(link => {
                link.style.transform = 'scale(1)';
                link.style.color = 'var(--text-secondary)';
            });
        });
        
        // Add click to expand bio
        member.addEventListener('click', function(e) {
            if (!e.target.closest('.member-social')) {
                expandMemberBio(this);
            }
        });
    });
}

// Expand team member bio
function expandMemberBio(member) {
    const isExpanded = member.classList.contains('expanded');
    
    if (!isExpanded) {
        member.classList.add('expanded');
        
        const expandedContent = document.createElement('div');
        expandedContent.className = 'expanded-bio';
        expandedContent.innerHTML = `
            <div class="bio-details">
                <h4>More About ${member.querySelector('h3').textContent}</h4>
                <div class="bio-grid">
                    <div class="bio-item">
                        <i class="fas fa-graduation-cap"></i>
                        <div>
                            <strong>Education</strong>
                            <p>Stanford University, Computer Science</p>
                        </div>
                    </div>
                    <div class="bio-item">
                        <i class="fas fa-briefcase"></i>
                        <div>
                            <strong>Experience</strong>
                            <p>15+ years in automotive and tech industries</p>
                        </div>
                    </div>
                    <div class="bio-item">
                        <i class="fas fa-trophy"></i>
                        <div>
                            <strong>Achievements</strong>
                            <p>Multiple industry awards and patents</p>
                        </div>
                    </div>
                    <div class="bio-item">
                        <i class="fas fa-heart"></i>
                        <div>
                            <strong>Passion</strong>
                            <p>Sustainable transportation and innovation</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        member.appendChild(expandedContent);
        
        // Animate expansion
        expandedContent.style.opacity = '0';
        expandedContent.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            expandedContent.style.opacity = '1';
            expandedContent.style.transform = 'translateY(0)';
            expandedContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }, 100);
        
    } else {
        const expandedContent = member.querySelector('.expanded-bio');
        if (expandedContent) {
            expandedContent.style.opacity = '0';
            expandedContent.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                expandedContent.remove();
                member.classList.remove('expanded');
            }, 300);
        }
    }
}

// Timeline Animations
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(item);
    });
}

// Achievement Animations
function initializeAchievementAnimations() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 300);
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            
            const icon = this.querySelector('.achievement-icon i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--glass-shadow)';
            
            const icon = this.querySelector('.achievement-icon i');
            icon.style.transform = 'scale(1)';
        });
    });
}

// Value Cards Interactions
function initializeValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach((card, index) => {
        // Add staggered animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            
            const icon = this.querySelector('.value-icon i');
            icon.style.transform = 'scale(1.3)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--glass-shadow)';
            
            const icon = this.querySelector('.value-icon i');
            icon.style.transform = 'scale(1)';
        });
    });
}

// Add about page specific styles
const aboutStyles = document.createElement('style');
aboutStyles.textContent = `
    .about-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        margin-bottom: 4rem;
    }
    
    .about-text h2 {
        margin-bottom: 1.5rem;
        color: var(--text-primary);
    }
    
    .about-text p {
        color: var(--text-secondary);
        line-height: 1.8;
        margin-bottom: 1rem;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
    
    .stat-card {
        text-align: center;
        padding: 2rem;
        background: var(--glass-bg);
        border-radius: var(--border-radius);
        border: 1px solid var(--glass-border);
        transition: var(--transition);
    }
    
    .stat-card:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.2);
    }
    
    .stat-icon {
        font-size: 2.5rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }
    
    .stat-label {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    .mission-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 4rem;
    }
    
    .mission-card,
    .vision-card {
        padding: 2rem;
        text-align: center;
    }
    
    .mission-icon,
    .vision-icon {
        font-size: 3rem;
        color: var(--primary-color);
        margin-bottom: 1.5rem;
    }
    
    .mission-card h3,
    .vision-card h3 {
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .mission-card p,
    .vision-card p {
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    .values-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 4rem;
    }
    
    .value-card {
        padding: 2rem;
        text-align: center;
    }
    
    .value-icon {
        font-size: 2.5rem;
        color: var(--primary-color);
        margin-bottom: 1.5rem;
    }
    
    .value-card h3 {
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .value-card p {
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 4rem;
    }
    
    .team-member {
        padding: 2rem;
        text-align: center;
    }
    
    .member-avatar {
        font-size: 4rem;
        color: var(--primary-color);
        margin-bottom: 1.5rem;
    }
    
    .member-info h3 {
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }
    
    .member-role {
        color: var(--primary-color);
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .member-bio {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }
    
    .member-social {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
    
    .member-social a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 50%;
        color: var(--text-secondary);
        transition: var(--transition);
    }
    
    .member-social a:hover {
        background: var(--primary-color);
        color: white;
        transform: translateY(-2px);
    }
    
    .achievements-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 4rem;
    }
    
    .achievement-card {
        padding: 2rem;
        text-align: center;
    }
    
    .achievement-icon {
        font-size: 2.5rem;
        color: var(--primary-color);
        margin-bottom: 1.5rem;
    }
    
    .achievement-card h3 {
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .achievement-card p {
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    .timeline-container {
        position: relative;
        margin-bottom: 4rem;
    }
    
    .timeline-container::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        background: var(--gradient-primary);
        transform: translateX(-50%);
    }
    
    .timeline-item {
        position: relative;
        margin-bottom: 2rem;
        width: 45%;
    }
    
    .timeline-item:nth-child(odd) {
        margin-left: 0;
        margin-right: auto;
    }
    
    .timeline-item:nth-child(even) {
        margin-left: auto;
        margin-right: 0;
    }
    
    .timeline-date {
        position: absolute;
        top: 1rem;
        background: var(--primary-color);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.9rem;
    }
    
    .timeline-item:nth-child(odd) .timeline-date {
        right: -80px;
    }
    
    .timeline-item:nth-child(even) .timeline-date {
        left: -80px;
    }
    
    .timeline-content {
        padding: 2rem;
    }
    
    .timeline-content h3 {
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .timeline-content p {
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    .cta-container {
        text-align: center;
        padding: 3rem;
        margin-bottom: 4rem;
    }
    
    .cta-container h2 {
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .cta-container p {
        color: var(--text-secondary);
        margin-bottom: 2rem;
        line-height: 1.6;
    }
    
    .cta-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    .expanded-bio {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid var(--glass-border);
    }
    
    .bio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
    }
    
    .bio-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
    }
    
    .bio-item i {
        color: var(--primary-color);
        font-size: 1.5rem;
        margin-top: 0.25rem;
    }
    
    .bio-item strong {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }
    
    .bio-item p {
        color: var(--text-secondary);
        line-height: 1.5;
    }
    
    @media (max-width: 768px) {
        .about-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .mission-container {
            grid-template-columns: 1fr;
        }
        
        .stats-grid {
            grid-template-columns: 1fr;
        }
        
        .timeline-container::before {
            left: 20px;
        }
        
        .timeline-item {
            width: calc(100% - 40px);
            margin-left: 40px !important;
            margin-right: 0 !important;
        }
        
        .timeline-date {
            left: -60px !important;
            right: auto !important;
        }
    }
`;

document.head.appendChild(aboutStyles);

console.log('🏢 About page loaded successfully! 🚗');
