const API_BASE = 'http://localhost:8080/api';

document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
});

async function loadUserProfile() {
    try {
        const userId = localStorage.getItem('userId') || 1;
        const response = await fetch(`${API_BASE}/users/${userId}`);
        const user = await response.json();
        
        document.getElementById('userName').textContent = user.username;
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('userRole').textContent = user.role;
        document.getElementById('userBalance').textContent = parseFloat(user.balance).toFixed(2) + ' грн';
        document.getElementById('userId').textContent = user.id;
        document.getElementById('userStatus').textContent = user.active ? '✅ Активний' : '❌ Неактивний';
        
        const firstLetter = user.username.charAt(0).toUpperCase();
        document.getElementById('userAvatar').textContent = firstLetter;
    } catch (error) {
        console.error('Error loading profile:', error);
        alert('Помилка при завантаженні профілю');
    }
}

function addFunds() {
    const amount = prompt('Введіть суму для поповнення (грн):');
    if (amount && !isNaN(amount)) {
        alert(`Додано ${amount} грн! (Функція на розробці)`);
    }
}

function logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}
