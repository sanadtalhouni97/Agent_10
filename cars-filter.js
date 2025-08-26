// Car Filtering and Sorting System
document.addEventListener('DOMContentLoaded', function() {
    initializeCarFilters();
    initializePagination();
    initializeSearchFunctionality();
});

// Filter System
function initializeCarFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');
    const filterBtn = document.querySelector('.filter-btn');
    const carsContainer = document.getElementById('cars-container');
    
    let currentFilters = {
        category: '',
        priceRange: '',
        sortBy: 'name'
    };
    
    // Apply filters function
    function applyFilters() {
        const cars = Array.from(carsContainer.querySelectorAll('.car-card'));
        
        cars.forEach(car => {
            let showCar = true;
            const category = car.dataset.category;
            const price = parseInt(car.dataset.price);
            
            // Category filter
            if (currentFilters.category && category !== currentFilters.category) {
                showCar = false;
            }
            
            // Price filter
            if (currentFilters.priceRange) {
                const [min, max] = currentFilters.priceRange.split('-').map(p => 
                    p === '+' ? Infinity : parseInt(p)
                );
                if (price < min || (max !== Infinity && price > max)) {
                    showCar = false;
                }
            }
            
            // Show/hide car with animation
            if (showCar) {
                car.style.display = 'block';
                car.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                car.style.display = 'none';
            }
        });
        
        // Sort cars
        sortCars();
        
        // Update car count
        updateCarCount();
    }
    
    // Sort cars function
    function sortCars() {
        const cars = Array.from(carsContainer.querySelectorAll('.car-card:not([style*="display: none"])'));
        
        cars.sort((a, b) => {
            const nameA = a.querySelector('h3').textContent.toLowerCase();
            const nameB = b.querySelector('h3').textContent.toLowerCase();
            const priceA = parseInt(a.dataset.price);
            const priceB = parseInt(b.dataset.price);
            
            switch (currentFilters.sortBy) {
                case 'name':
                    return nameA.localeCompare(nameB);
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'popularity':
                    // Simulate popularity based on price (higher price = more popular)
                    return priceB - priceA;
                default:
                    return 0;
            }
        });
        
        // Reorder cars in DOM
        cars.forEach(car => {
            carsContainer.appendChild(car);
        });
    }
    
    // Update car count
    function updateCarCount() {
        const visibleCars = carsContainer.querySelectorAll('.car-card:not([style*="display: none"])').length;
        const totalCars = carsContainer.querySelectorAll('.car-card').length;
        
        // Add count display if it doesn't exist
        let countDisplay = document.querySelector('.car-count-display');
        if (!countDisplay) {
            countDisplay = document.createElement('div');
            countDisplay.className = 'car-count-display glass-card';
            countDisplay.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem;
                z-index: 1000;
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border: 1px solid var(--glass-border);
                border-radius: var(--border-radius);
                font-weight: 600;
                color: var(--text-primary);
            `;
            document.body.appendChild(countDisplay);
        }
        
        countDisplay.textContent = `${visibleCars} of ${totalCars} cars`;
        
        // Animate count change
        countDisplay.style.transform = 'scale(1.1)';
        setTimeout(() => {
            countDisplay.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Event listeners
    categoryFilter.addEventListener('change', (e) => {
        currentFilters.category = e.target.value;
        applyFilters();
    });
    
    priceFilter.addEventListener('change', (e) => {
        currentFilters.priceRange = e.target.value;
        applyFilters();
    });
    
    sortFilter.addEventListener('change', (e) => {
        currentFilters.sortBy = e.target.value;
        applyFilters();
    });
    
    filterBtn.addEventListener('click', () => {
        applyFilters();
        
        // Add filter animation
        filterBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            filterBtn.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Initialize
    updateCarCount();
}

// Pagination System
function initializePagination() {
    const carsPerPage = 12;
    const carsContainer = document.getElementById('cars-container');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageNumbers = document.querySelectorAll('.page-number');
    
    let currentPage = 1;
    const cars = Array.from(carsContainer.querySelectorAll('.car-card'));
    const totalPages = Math.ceil(cars.length / carsPerPage);
    
    function showPage(page) {
        const startIndex = (page - 1) * carsPerPage;
        const endIndex = startIndex + carsPerPage;
        
        cars.forEach((car, index) => {
            if (index >= startIndex && index < endIndex) {
                car.style.display = 'block';
                car.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                car.style.display = 'none';
            }
        });
        
        // Update page numbers
        pageNumbers.forEach((num, index) => {
            num.classList.toggle('active', index + 1 === page);
        });
        
        // Update button states
        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === totalPages;
        
        currentPage = page;
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });
    
    pageNumbers.forEach((num, index) => {
        num.addEventListener('click', () => {
            showPage(index + 1);
        });
    });
    
    // Initialize first page
    showPage(1);
}

// Search Functionality
function initializeSearchFunctionality() {
    // Add search input to filters
    const filtersContainer = document.querySelector('.filters-container');
    const searchGroup = document.createElement('div');
    searchGroup.className = 'filter-group';
    searchGroup.innerHTML = `
        <label for="search-input">Search Cars</label>
        <input type="text" id="search-input" class="search-input" placeholder="Search by name, brand, or features...">
    `;
    
    filtersContainer.insertBefore(searchGroup, filtersContainer.firstChild);
    
    const searchInput = document.getElementById('search-input');
    
    // Add search input styles
    const searchStyles = document.createElement('style');
    searchStyles.textContent = `
        .search-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid var(--glass-border);
            border-radius: var(--border-radius);
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            color: var(--text-primary);
            font-size: 1rem;
            transition: var(--transition);
        }
        
        .search-input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .search-input::placeholder {
            color: var(--text-secondary);
        }
        
        .filter-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .filter-group label {
            font-weight: 600;
            color: var(--text-primary);
            font-size: 0.9rem;
        }
        
        .filter-select {
            padding: 0.75rem 1rem;
            border: 1px solid var(--glass-border);
            border-radius: var(--border-radius);
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            color: var(--text-primary);
            font-size: 1rem;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .filter-select:focus {
            outline: none;
            border-color: var(--primary-color);
        }
        
        .filters-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            align-items: end;
            padding: 2rem;
            margin-bottom: 3rem;
        }
        
        .filter-btn {
            height: fit-content;
            align-self: end;
        }
        
        .pagination-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            margin: 3rem 0;
        }
        
        .page-numbers {
            display: flex;
            gap: 0.5rem;
        }
        
        .page-number {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            cursor: pointer;
            transition: var(--transition);
            font-weight: 600;
        }
        
        .page-number:hover,
        .page-number.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
        
        .pagination-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .pagination-btn:disabled:hover {
            transform: none;
        }
    `;
    document.head.appendChild(searchStyles);
    
    // Search functionality
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase();
            const cars = Array.from(document.querySelectorAll('.car-card'));
            
            cars.forEach(car => {
                const carName = car.querySelector('h3').textContent.toLowerCase();
                const carCategory = car.querySelector('.car-category').textContent.toLowerCase();
                const carFeatures = Array.from(car.querySelectorAll('.car-features span'))
                    .map(span => span.textContent.toLowerCase()).join(' ');
                
                const matches = carName.includes(searchTerm) || 
                               carCategory.includes(searchTerm) || 
                               carFeatures.includes(searchTerm);
                
                if (matches) {
                    car.style.display = 'block';
                    car.style.animation = 'fadeInUp 0.3s ease-out';
                } else {
                    car.style.display = 'none';
                }
            });
            
            updateCarCount();
        }, 300);
    });
}

// Advanced Filter Features
function initializeAdvancedFilters() {
    // Add advanced filter toggle
    const filtersContainer = document.querySelector('.filters-container');
    const advancedToggle = document.createElement('button');
    advancedToggle.className = 'advanced-toggle glass-btn';
    advancedToggle.innerHTML = `
        <i class="fas fa-sliders-h"></i>
        <span>Advanced Filters</span>
    `;
    
    filtersContainer.appendChild(advancedToggle);
    
    // Advanced filters panel
    const advancedPanel = document.createElement('div');
    advancedPanel.className = 'advanced-filters glass-card';
    advancedPanel.style.cssText = `
        display: none;
        margin-top: 1rem;
        padding: 2rem;
        grid-column: 1 / -1;
    `;
    
    advancedPanel.innerHTML = `
        <div class="advanced-filters-grid">
            <div class="filter-group">
                <label>Fuel Type</label>
                <div class="checkbox-group">
                    <label><input type="checkbox" value="gas"> Gas</label>
                    <label><input type="checkbox" value="electric"> Electric</label>
                    <label><input type="checkbox" value="hybrid"> Hybrid</label>
                </div>
            </div>
            <div class="filter-group">
                <label>Seats</label>
                <div class="checkbox-group">
                    <label><input type="checkbox" value="2"> 2 Seats</label>
                    <label><input type="checkbox" value="4"> 4 Seats</label>
                    <label><input type="checkbox" value="5"> 5+ Seats</label>
                </div>
            </div>
            <div class="filter-group">
                <label>Features</label>
                <div class="checkbox-group">
                    <label><input type="checkbox" value="4wd"> 4WD/AWD</label>
                    <label><input type="checkbox" value="automatic"> Automatic</label>
                    <label><input type="checkbox" value="convertible"> Convertible</label>
                </div>
            </div>
        </div>
    `;
    
    filtersContainer.appendChild(advancedPanel);
    
    // Toggle advanced filters
    advancedToggle.addEventListener('click', () => {
        const isVisible = advancedPanel.style.display !== 'none';
        advancedPanel.style.display = isVisible ? 'none' : 'block';
        advancedToggle.innerHTML = isVisible ? 
            '<i class="fas fa-sliders-h"></i><span>Advanced Filters</span>' :
            '<i class="fas fa-times"></i><span>Hide Advanced</span>';
    });
    
    // Add advanced filter styles
    const advancedStyles = document.createElement('style');
    advancedStyles.textContent = `
        .advanced-filters-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
        }
        
        .checkbox-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .checkbox-group label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            font-weight: 400;
        }
        
        .checkbox-group input[type="checkbox"] {
            width: 16px;
            height: 16px;
            accent-color: var(--primary-color);
        }
    `;
    document.head.appendChild(advancedStyles);
}

// Initialize advanced filters
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeAdvancedFilters, 1000);
});



console.log('🚗 Car filtering system loaded successfully! 🏎️');
