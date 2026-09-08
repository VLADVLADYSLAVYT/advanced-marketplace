# 🏪 Advanced Marketplace

Сучасна платформа електронної комерції з динамічною ціноутворенням, аналітикою та управлінням користувачами.

## 🌟 Основні можливості

- **Динамічна ціноутворення** - ціни змінюються на основі попиту/пропозиції
- **Аналітика ринку** - графіки цін та індексів попиту/пропозиції
- **Історія транзакцій** - повний журнал усіх операцій
- **Профіль користувача** - управління даними та балансом
- **REST API** - повнофункціональний API для інтеграцій

## 📋 Вимоги

### Backend
- Java 17+
- Spring Boot 3.x
- PostgreSQL 12+
- Maven

### Frontend
- Node.js 16+ (опціонально)
- Сучасний браузер (Chrome, Firefox, Safari)
- Chart.js для графіків

## 🚀 Установка та запуск

### 1. Клонування репозиторію
```bash
git clone https://github.com/VLADVLADYSLAVYT/advanced-marketplace.git
cd advanced-marketplace
```

### 2. Backend Setup

```bash
cd backend

# Створити базу даних PostgreSQL
createdb marketplace_db

# Налаштувати application.properties
# backend/src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/marketplace_db
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

# Запустити додаток
mvn spring-boot:run
```

Backend буде доступний на `http://localhost:8080`

### 3. Frontend Setup

```bash
cd frontend

# Просто відкрити index.html у браузері
# ЛУЧШе використовувати локальний сервер:
python -m http.server 3000
# або
npm install -g http-server
http-server -p 3000
```

Frontend буде доступний на `http://localhost:3000`

## 📁 Структура проекту

```
advanced-marketplace/
├── backend/
│   ├── src/main/java/com/marketplace/
│   │   ├── model/          # JPA entities
│   │   ├── repository/     # Spring Data repositories
│   │   ├── service/        # Business logic
│   │   ├── controller/     # REST endpoints
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── exception/      # Exception handlers
│   │   └── config/        # Configuration classes
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── db/migration/   # Flyway migrations
│   └── pom.xml
│
└── frontend/
    ├── index.html          # Головна сторінка
    ├── analytics.html      # Аналітика
    ├── profile.html        # Профіль користувача
    ├── transactions.html   # Історія транзакцій
    ├── styles.css          # Глобальні стилі
    ├── script.js           # Головний скрипт
    ├── analytics.js        # Скрипт аналітики
    ├── profile.js          # Скрипт профілю
    └── transactions.js     # Скрипт транзакцій
```

## 🔌 API Endpoints

### Товари
- `GET /api/products` - Список усіх товарів
- `GET /api/products/{id}` - Деталі товару
- `POST /api/products` - Створити товар (admin)
- `PUT /api/products/{id}` - Оновити товар (admin)

### Ринок
- `GET /api/marketplace/trending` - Популярні товари
- `POST /api/marketplace/buy` - Купити товар
- `POST /api/marketplace/sell` - Продати товар

### Користувачі
- `GET /api/users/{id}` - Профіль користувача
- `GET /api/users/username/{username}` - Пошук за ім'ям
- `PUT /api/users/{id}` - Оновити профіль

### Транзакції
- `GET /api/transactions/user/{userId}` - Транзакції користувача
- `GET /api/transactions/product/{productId}` - Транзакції товару

### Аналітика
- `GET /api/analytics/price-history/{productId}` - Історія цін
- `GET /api/analytics/market-stats` - Статистика ринку

## 🎯 Функції динамічної ціноутворення

```
базова ціна × (1 + (попит - пропозиція) / 100)
```

Де:
- **попит** (demand) - 0-100 (активність покупців)
- **пропозиція** (supply) - 0-100 (кількість товару)

### Приклади
- Попит 80, пропозиція 20 → ціна ↑ на 60%
- Попит 30, пропозиція 70 → ціна ↓ на 40%

## 👥 Ролі користувачів

- **USER** - Звичайний користувач
- **SELLER** - Продавець товарів
- **ADMIN** - Адміністратор системи

## 📊 Бази даних

### Таблиці

#### users
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0,
    role VARCHAR(20),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### products
```sql
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(15,2) NOT NULL,
    current_price DECIMAL(15,2) NOT NULL,
    demand_index DECIMAL(5,2),
    supply_index DECIMAL(5,2),
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### transactions
```sql
CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    product_id BIGINT REFERENCES products(id),
    type VARCHAR(20), -- BUY, SELL
    quantity INT NOT NULL,
    price_per_unit DECIMAL(15,2),
    total_price DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### price_history
```sql
CREATE TABLE price_history (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
    price DECIMAL(15,2),
    demand_index DECIMAL(5,2),
    supply_index DECIMAL(5,2),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Безпека

- CORS налаштовано для localhost:3000
- SQL Injection захист (parameterized queries)
- XSS захист (HTML escaping)
- CSRF токени (конфігурація Spring Security)

## 🧪 Тестування

```bash
# Backend unit tests
mvn test

# Integration tests
mvn verify
```

## 🐛 Вирішення проблем

### Backend не запускається
1. Перевірте PostgreSQL запущена
2. Перевірте конфігурацію БД в application.properties
3. Перевірте порт 8080 не зайнятий

### Frontend не завантажує дані
1. Перевірте backend запущений на 8080
2. Перевірте CORS конфігурацію
3. Відкрийте console браузера (F12) для помилок

### Графіки не відображаються
1. Перевірте Chart.js завантажений
2. Перевірте є дані в price_history
3. Оновіть сторінку

## 📝 Ліцензія

MIT License - дивись LICENSE файл

## 👨‍💻 Автор

**VLADVLADYSLAVYT** - [GitHub](https://github.com/VLADVLADYSLAVYT)

## 🤝 Внески

Внески приймаються! Створіть Pull Request з описом змін.

## 📞 Контакти

- Email: vladvladislav377@gmail.com
- GitHub: @VLADVLADYSLAVYT

---

**Версія:** 1.0.0  
**Останнє оновлення:** Вересень 2024
