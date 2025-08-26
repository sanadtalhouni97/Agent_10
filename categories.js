// Categories Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeCategoryAnimations();
    initializeCategoryInteractions();
    initializeComparisonTable();
    initializeCategoryNavigation();
});

// Category Animations
function initializeCategoryAnimations() {
    const categoryCards = document.querySelectorAll('.category-detail');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe category cards
    categoryCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(card);
    });
    
    // Animate category icons
    animateCategoryIcons();
}

// Animate category icons
function animateCategoryIcons() {
    const icons = document.querySelectorAll('.category-icon-large .animated-icon');
    
    icons.forEach((icon, index) => {
        // Add different animation delays
        icon.style.animationDelay = `${index * 0.5}s`;
        
        // Add hover effects
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Category Interactions
function initializeCategoryInteractions() {
    const categoryCards = document.querySelectorAll('.category-detail');
    
    categoryCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            
            // Animate features
            const features = this.querySelectorAll('.feature-item');
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(10px)';
                    feature.style.opacity = '1';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--glass-shadow)';
            
            // Reset features
            const features = this.querySelectorAll('.feature-item');
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
                feature.style.opacity = '0.8';
            });
        });
        
        // Add click to expand functionality
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.cta-btn')) {
                expandCategoryCard(this);
            }
        });
    });
}

// Expand category card
function expandCategoryCard(card) {
    const isExpanded = card.classList.contains('expanded');
    
    if (!isExpanded) {
        // Add expanded class
        card.classList.add('expanded');
        
        // Add expanded content
        const expandedContent = document.createElement('div');
        expandedContent.className = 'expanded-content';
        expandedContent.innerHTML = `
            <div class="expanded-details">
                <h4>Detailed Information</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <i class="fas fa-info-circle"></i>
                        <div>
                            <strong>Insurance Coverage</strong>
                            <p>Comprehensive coverage included with all rentals</p>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <div>
                            <strong>24/7 Support</strong>
                            <p>Round-the-clock customer service available</p>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div>
                            <strong>Multiple Locations</strong>
                            <p>Pick up and drop off at any of our locations</p>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-credit-card"></i>
                        <div>
                            <strong>Flexible Payment</strong>
                            <p>Multiple payment options available</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        card.appendChild(expandedContent);
        
        // Animate expansion
        expandedContent.style.opacity = '0';
        expandedContent.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            expandedContent.style.opacity = '1';
            expandedContent.style.transform = 'translateY(0)';
            expandedContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }, 100);
        
    } else {
        // Remove expanded content
        const expandedContent = card.querySelector('.expanded-content');
        if (expandedContent) {
            expandedContent.style.opacity = '0';
            expandedContent.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                expandedContent.remove();
                card.classList.remove('expanded');
            }, 300);
        }
    }
}

// Comparison Table
function initializeComparisonTable() {
    const table = document.querySelector('.comparison-table');
    if (!table) return;
    
    // Add hover effects to table rows
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'background-color 0.3s ease, transform 0.3s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Animate popularity bars
    const popularityBars = table.querySelectorAll('.popularity-bar');
    popularityBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = bar.style.width;
            bar.style.transition = 'width 1s ease-out';
        }, index * 200);
    });
    
    // Add sorting functionality
    addTableSorting(table);
}

// Add table sorting
function addTableSorting(table) {
    const headers = table.querySelectorAll('th');
    
    headers.forEach((header, index) => {
        if (index > 0) { // Skip first column (category names)
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                sortTable(table, index);
            });
            
            // Add sort indicator
            const sortIcon = document.createElement('i');
            sortIcon.className = 'fas fa-sort';
            sortIcon.style.marginLeft = '5px';
            sortIcon.style.opacity = '0.5';
            header.appendChild(sortIcon);
        }
    });
}

// Sort table function
function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Get current sort direction
    const currentDirection = table.dataset.sortDirection === 'asc' ? 'desc' : 'asc';
    table.dataset.sortDirection = currentDirection;
    
    // Sort rows
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent;
        const bValue = b.cells[columnIndex].textContent;
        
        if (currentDirection === 'asc') {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });
    
    // Reorder rows with animation
    rows.forEach((row, index) => {
        setTimeout(() => {
            tbody.appendChild(row);
            row.style.animation = 'fadeInUp 0.3s ease-out';
        }, index * 50);
    });
    
    // Update sort indicators
    const headers = table.querySelectorAll('th');
    headers.forEach((header, index) => {
        const icon = header.querySelector('i');
        if (icon) {
            icon.className = index === columnIndex ? 
                `fas fa-sort-${currentDirection === 'asc' ? 'up' : 'down'}` : 
                'fas fa-sort';
            icon.style.opacity = index === columnIndex ? '1' : '0.5';
        }
    });
}

// Category Navigation
function initializeCategoryNavigation() {
    // Add category quick navigation
    const quickNav = document.createElement('div');
    quickNav.className = 'category-quick-nav glass-card';
    quickNav.innerHTML = `
        <h3>Quick Navigation</h3>
        <div class="quick-nav-buttons">
            <button class="quick-nav-btn" data-category="luxury">
                <i class="fas fa-crown"></i>
                <span>Luxury</span>
            </button>
            <button class="quick-nav-btn" data-category="electric">
                <i class="fas fa-bolt"></i>
                <span>Electric</span>
            </button>
            <button class="quick-nav-btn" data-category="sports">
                <i class="fas fa-tachometer-alt"></i>
                <span>Sports</span>
            </button>
            <button class="quick-nav-btn" data-category="suv">
                <i class="fas fa-truck"></i>
                <span>SUV</span>
            </button>
            <button class="quick-nav-btn" data-category="compact">
                <i class="fas fa-car"></i>
                <span>Compact</span>
            </button>
            <button class="quick-nav-btn" data-category="family">
                <i class="fas fa-home"></i>
                <span>Family</span>
            </button>
        </div>
    `;
    
    // Insert after page header
    const pageHeader = document.querySelector('.page-header');
    pageHeader.parentNode.insertBefore(quickNav, pageHeader.nextSibling);
    
    // Add quick nav styles
    const quickNavStyles = document.createElement('style');
    quickNavStyles.textContent = `
        .category-quick-nav {
            margin: 2rem 0;
            padding: 2rem;
            text-align: center;
        }
        
        .category-quick-nav h3 {
            margin-bottom: 1.5rem;
            color: var(--text-primary);
        }
        
        .quick-nav-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .quick-nav-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: var(--border-radius);
            color: var(--text-primary);
            cursor: pointer;
            transition: var(--transition);
            min-width: 100px;
        }
        
        .quick-nav-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-5px);
        }
        
        .quick-nav-btn.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
        
        .quick-nav-btn i {
            font-size: 1.5rem;
        }
        
        .quick-nav-btn span {
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        .category-detail {
            margin-bottom: 3rem;
        }
        
        .category-header {
            display: flex;
            align-items: center;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .category-icon-large {
            font-size: 4rem;
            color: var(--primary-color);
            min-width: 80px;
        }
        
        .category-info h2 {
            margin-bottom: 1rem;
            color: var(--text-primary);
        }
        
        .category-info p {
            color: var(--text-secondary);
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .category-stats {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap;
        }
        
        .category-stats span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        
        .category-features {
            margin-bottom: 2rem;
        }
        
        .category-features h3 {
            margin-bottom: 1rem;
            color: var(--text-primary);
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .feature-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: var(--border-radius);
            transition: var(--transition);
        }
        
        .feature-item:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateX(5px);
        }
        
        .feature-item i {
            color: var(--primary-color);
            font-size: 1.2rem;
        }
        
        .category-cars {
            margin-bottom: 2rem;
        }
        
        .category-cars h3 {
            margin-bottom: 1rem;
            color: var(--text-primary);
        }
        
        .car-preview-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
        }
        
        .car-preview {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: var(--border-radius);
            text-align: center;
            transition: var(--transition);
        }
        
        .car-preview:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-5px);
        }
        
        .car-preview i {
            font-size: 2rem;
            color: var(--primary-color);
        }
        
        .car-preview span {
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .car-preview small {
            color: var(--text-secondary);
        }
        
        .category-actions {
            text-align: center;
        }
        
        .comparison-table-container {
            padding: 2rem;
            margin: 3rem 0;
            overflow-x: auto;
        }
        
        .comparison-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .comparison-table th,
        .comparison-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid var(--glass-border);
        }
        
        .comparison-table th {
            background: var(--glass-bg);
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .popularity-bar {
            height: 8px;
            background: var(--gradient-primary);
            border-radius: 4px;
            width: 0;
        }
        
        .expanded-content {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid var(--glass-border);
        }
        
        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
        }
        
        .detail-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .detail-item i {
            color: var(--primary-color);
            font-size: 1.5rem;
            margin-top: 0.25rem;
        }
        
        .detail-item strong {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }
        
        .detail-item p {
            color: var(--text-secondary);
            line-height: 1.5;
        }
        
        @media (max-width: 768px) {
            .category-header {
                flex-direction: column;
                text-align: center;
                gap: 1rem;
            }
            
            .category-stats {
                justify-content: center;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
            
            .car-preview-grid {
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            }
            
            .quick-nav-buttons {
                gap: 0.5rem;
            }
            
            .quick-nav-btn {
                min-width: 80px;
                padding: 0.75rem;
            }
        }
    `;
    document.head.appendChild(quickNavStyles);
    
    // Add quick navigation functionality
    const quickNavBtns = quickNav.querySelectorAll('.quick-nav-btn');
    const categoryCards = document.querySelectorAll('.category-detail');
    
    quickNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            // Update active button
            quickNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Scroll to category
            const targetCard = Array.from(categoryCards).find(card => {
                const categoryName = card.querySelector('h2').textContent.toLowerCase();
                return categoryName.includes(category);
            });
            
            if (targetCard) {
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Highlight the card briefly
                targetCard.style.border = '2px solid var(--primary-color)';
                setTimeout(() => {
                    targetCard.style.border = '1px solid var(--glass-border)';
                }, 2000);
            }
        });
    });
}

// Add category-specific animations
function addCategorySpecificAnimations() {
    // Luxury category - golden shimmer effect
    const luxuryCard = document.querySelector('.category-detail:has(.fa-crown)');
    if (luxuryCard) {
        luxuryCard.addEventListener('mouseenter', () => {
            luxuryCard.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 255, 255, 0.1))';
        });
        
        luxuryCard.addEventListener('mouseleave', () => {
            luxuryCard.style.background = 'var(--glass-bg)';
        });
    }
    
    // Electric category - electric pulse effect
    const electricCard = document.querySelector('.category-detail:has(.fa-bolt)');
    if (electricCard) {
        const boltIcon = electricCard.querySelector('.fa-bolt');
        setInterval(() => {
            boltIcon.style.color = boltIcon.style.color === 'var(--accent-color)' ? 
                'var(--primary-color)' : 'var(--accent-color)';
        }, 1000);
    }
    
    // Sports category - speed lines effect
    const sportsCard = document.querySelector('.category-detail:has(.fa-tachometer-alt)');
    if (sportsCard) {
        sportsCard.addEventListener('mouseenter', () => {
            sportsCard.style.transform = 'scale(1.02) translateX(10px)';
        });
        
        sportsCard.addEventListener('mouseleave', () => {
            sportsCard.style.transform = 'scale(1) translateX(0)';
        });
    }
}

// Initialize category-specific animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addCategorySpecificAnimations, 1000);
});

console.log('🏁 Categories page loaded successfully! 🚗');
