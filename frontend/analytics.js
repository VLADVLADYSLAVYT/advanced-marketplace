const API_BASE = 'http://localhost:8080/api';
let priceChart = null;
let indicesChart = null;

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

async function loadProducts() {
    try {
        const response = await fetch(`${API_BASE}/products`);
        const products = await response.json();
        
        const select = document.getElementById('productSelect');
        select.innerHTML = '<option value="">Виберіть товар...</option>';
        
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

async function loadProductAnalytics() {
    const productId = document.getElementById('productSelect').value;
    if (!productId) return;

    try {
        // Завантажуємо інформацію про товар
        const productResponse = await fetch(`${API_BASE}/products/${productId}`);
        const product = await productResponse.json();

        // Оновлюємо метрики
        document.getElementById('currentPrice').textContent = parseFloat(product.currentPrice).toFixed(2) + ' грн';
        document.getElementById('basePrice').textContent = parseFloat(product.basePrice).toFixed(2) + ' грн';
        document.getElementById('demandIndex').textContent = parseFloat(product.demandIndex).toFixed(2);
        document.getElementById('supplyIndex').textContent = parseFloat(product.supplyIndex).toFixed(2);

        // Завантажуємо історію цін
        const historyResponse = await fetch(`${API_BASE}/analytics/price-history/${productId}?days=7`);
        const history = await historyResponse.json();

        updateCharts(history);
    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

function updateCharts(history) {
    const ctx1 = document.getElementById('priceChart').getContext('2d');
    const ctx2 = document.getElementById('indicesChart').getContext('2d');

    const labels = history.map(h => new Date(h.recordedAt).toLocaleDateString('uk-UA'));
    const prices = history.map(h => parseFloat(h.price));
    const demands = history.map(h => parseFloat(h.demandIndex));
    const supplies = history.map(h => parseFloat(h.supplyIndex));

    if (priceChart) priceChart.destroy();
    if (indicesChart) indicesChart.destroy();

    priceChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Ціна',
                data: prices,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    indicesChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Індекс попиту',
                    data: demands,
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Індекс пропозиції',
                    data: supplies,
                    borderColor: '#f093fb',
                    backgroundColor: 'rgba(240, 147, 251, 0.1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}
