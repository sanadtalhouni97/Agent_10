// Compare functionality for cars
document.addEventListener('DOMContentLoaded', function() {
    const compareInputs = document.querySelectorAll('.compare-input');
    const compareBtn = document.getElementById('compare-btn');
    const compareCount = document.getElementById('compare-count');
    let selectedCars = [];

    // Handle compare checkbox changes
    compareInputs.forEach((input, index) => {
        input.addEventListener('change', function() {
            if (this.checked) {
                if (selectedCars.length < 3) {
                    selectedCars.push({
                        id: this.id,
                        name: this.closest('.car-card').querySelector('h3').textContent,
                        price: this.closest('.car-card').querySelector('.price').textContent,
                        category: this.closest('.car-card').querySelector('.car-category').textContent
                    });
                } else {
                    this.checked = false;
                    alert('You can only compare up to 3 cars at a time.');
                    return;
                }
            } else {
                selectedCars = selectedCars.filter(car => car.id !== this.id);
            }

            updateCompareButton();
        });
    });

    // Update compare button visibility and count
    function updateCompareButton() {
        if (selectedCars.length > 0) {
            compareBtn.style.display = 'flex';
            compareCount.textContent = selectedCars.length;
        } else {
            compareBtn.style.display = 'none';
        }
    }

    // Handle compare button click
    compareBtn.addEventListener('click', function() {
        if (selectedCars.length > 0) {
            showCompareModal();
        }
    });

    // Show compare modal
    function showCompareModal() {
        const modal = document.createElement('div');
        modal.className = 'compare-modal';
        modal.innerHTML = `
            <div class="compare-modal-content">
                <div class="compare-modal-header">
                    <h2>Compare Cars</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="compare-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                ${selectedCars.map(car => `<th>${car.name}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Price</td>
                                ${selectedCars.map(car => `<td>${car.price}</td>`).join('')}
                            </tr>
                            <tr>
                                <td>Category</td>
                                ${selectedCars.map(car => `<td>${car.category}</td>`).join('')}
                            </tr>
                            <tr>
                                <td>Availability</td>
                                ${selectedCars.map(() => `<td>Available</td>`).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="compare-modal-footer">
                    <button class="glass-btn" onclick="closeCompareModal()">Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', closeCompareModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCompareModal();
            }
        });
    }

    // Close compare modal
    window.closeCompareModal = function() {
        const modal = document.querySelector('.compare-modal');
        if (modal) {
            modal.remove();
        }
    };
});

// Add CSS for compare modal
const compareModalCSS = `
.compare-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-out;
}

.compare-modal-content {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius);
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    animation: slideIn 0.3s ease-out;
}

.compare-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--glass-border);
}

.compare-modal-header h2 {
    color: var(--text-white);
    margin: 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.close-modal {
    background: none;
    border: none;
    color: var(--text-white);
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: var(--transition);
}

.close-modal:hover {
    background: rgba(255, 255, 255, 0.1);
}

.compare-table {
    padding: 2rem;
}

.compare-table table {
    width: 100%;
    border-collapse: collapse;
    color: var(--text-white);
}

.compare-table th,
.compare-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--glass-border);
}

.compare-table th {
    background: rgba(255, 255, 255, 0.1);
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.compare-table td {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.compare-modal-footer {
    padding: 1.5rem 2rem;
    border-top: 1px solid var(--glass-border);
    text-align: right;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = compareModalCSS;
document.head.appendChild(style);
