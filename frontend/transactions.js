const API_BASE = 'http://localhost:8080/api';
let currentPage = 0;
const pageSize = 20;

document.addEventListener('DOMContentLoaded', () => {
    loadTransactions(0);
});

async function loadTransactions(page) {
    try {
        const userId = localStorage.getItem('userId') || 1;
        const response = await fetch(`${API_BASE}/transactions/user/${userId}?page=${page}&size=${pageSize}`);
        const data = await response.json();
        
        displayTransactions(data.content);
        createPagination(data.totalPages, page);
        currentPage = page;
    } catch (error) {
        console.error('Error loading transactions:', error);
        document.getElementById('transactionsBody').innerHTML = 
            '<tr><td colspan="6" class="no-transactions">Помилка при завантаженні</td></tr>';
    }
}

function displayTransactions(transactions) {
    const tbody = document.getElementById('transactionsBody');
    
    if (!transactions || transactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-transactions">Немає транзакцій</td></tr>';
        return;
    }
    
    tbody.innerHTML = transactions.map(tx => `
        <tr>
            <td>${new Date(tx.createdAt).toLocaleString('uk-UA')}</td>
            <td>${tx.productName}</td>
            <td><span class="transaction-type type-${tx.type.toLowerCase()}">${tx.type === 'BUY' ? '🛒 Покупка' : '📦 Продаж'}</span></td>
            <td>${tx.quantity}</td>
            <td>${parseFloat(tx.pricePerUnit).toFixed(2)} грн</td>
            <td><strong>${parseFloat(tx.totalPrice).toFixed(2)} грн</strong></td>
        </tr>
    `).join('');
}

function createPagination(totalPages, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    for (let i = 0; i < totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i + 1;
        button.className = i === currentPage ? 'active' : '';
        button.onclick = () => loadTransactions(i);
        pagination.appendChild(button);
    }
}

function applyFilters() {
    const type = document.getElementById('filterType').value;
    const date = document.getElementById('filterDate').value;
    
    // Реалізація фільтрації на бекенді
    console.log('Filter by:', { type, date });
    loadTransactions(0);
}
