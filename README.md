# 🎓 Student Financial Copilot

> An AI-assisted personal finance management, budgeting, and goal-planning web application built specifically for college students on a fixed monthly allowance.

[![Java](https://img.shields.io/badge/Java-25%20LTS-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-9.x%20%2F%208.x-blue.svg)](https://www.mysql.com/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 The Problem & Solution

The central question **Student Financial Copilot** answers is:

> **"Can I afford this goal, and what exact budget changes should I make to achieve it?"**

Most budgeting apps are designed for salaried adults with predictable incomes, credit cards, and investment portfolios. College students, however, receive a **fixed monthly allowance** and struggle with impulse discretionary spending.

**Student Financial Copilot** combines:
1. **Deterministic Financial Arithmetic:** All financial totals, net savings, savings rates, and goal feasibility formulas are calculated using Java `BigDecimal` with strict precision.
2. **Essential vs. Discretionary Expense Classification:** Protects non-negotiable living expenses (rent, mess food, medicine) while targeting flexible spending (parties, shopping, cafes).
3. **Goal Feasibility Engine:** Analyzes target amounts, deadlines, and current savings rates to mathematically verify whether a target (such as an academic laptop) is realistic.
4. **What-If Scenario Optimizer:** Interactive simulation sliders allow students to test spending cuts and see the exact impact on goal completion timelines without altering database records.
5. **Direct JDBC Demonstration Module:** Complete implementation of low-level `java.sql.*` queries, `PreparedStatement`, `ResultSet`, and manual transaction `commit`/`rollback` boundaries alongside Spring Data JPA.
6. **Google Gemini AI Integration:** Context-aware AI financial mentor grounded in verified transaction data, with automatic fallback to an intelligent offline rule engine.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Java 21+** (Java 25 verified)
- **Maven 3.8+** (Maven 3.9.9 verified)
- **Node.js 18+ & npm 9+**
- **MySQL 8.0+ or 9.x**

### 2. Start the Database (Port 3307)
The project includes self-contained scripts to launch an isolated MySQL instance on port `3307`:
```bash
./database/start-db.sh
```
*(Schema and sample student data for Aarav Sharma are automatically provisioned).*

### 3. Start the Spring Boot Backend (Port 8080)
```bash
cd backend
mvn clean test        # Run all 11 backend unit and integration tests
mvn spring-boot:run   # Launches Spring Boot on http://localhost:8080
```

### 4. Start the React Frontend (Port 5173)
```bash
cd frontend
npm install
npm test              # Run all 10 component and form validation tests
npm run dev           # Launches Vite on http://localhost:5173
```

Open **`http://localhost:5173`** in your browser!

---

## 📸 Key Features & Pages

| Page | Description | Key Technologies |
|---|---|---|
| **Dashboard** | Real-time allowance, expenses, savings rate, HTML5 Canvas radial meter, budget breakdown, and active goal previews. | React, Canvas 2D API, CSS Flex/Grid |
| **Expenses** | Full CRUD expense ledger with essential/discretionary tags, search, category filtering, and modal forms. | Controlled Forms, `useMemo`, Spring Data JPA |
| **Savings Goals** | Goal management with progress bars, deposit modal, required vs achievable savings, and feasibility alerts. | `BigDecimal` Math, Spring Data JPA |
| **Goal Optimizer** | Interactive what-if simulation sliders to simulate discretionary cuts and observe timeline acceleration. | Scenario Optimizer Service, React `useState` |
| **AI Copilot** | Grounded financial advice powered by Google Gemini, answering custom budget questions in clean Markdown. | Google Gemini API, Offline Rule Engine |
| **JDBC Reports** | Direct low-level JDBC monthly aggregation report and live atomic transaction (`commit`/`rollback`) demonstration. | `DriverManager`, `PreparedStatement`, `ResultSet` |

---

## 🏗️ Architecture & Project Structure

```
student-financial-copilot/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components (Dashboard, Goals, Expenses, AI, Canvas)
│   │   ├── pages/            # React Router page views (Dashboard, Expenses, Goals, Optimizer, AI, Reports)
│   │   ├── hooks/            # Custom hooks (useFinancialSummary, useExpenses, useGoals)
│   │   ├── context/          # FinancialContext for global reactive state
│   │   ├── services/         # Axios / Fetch API client
│   │   └── index.css         # CSS3 design tokens, variables, responsive media queries
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/main/java/com/copilot/
│   │   ├── controller/       # Spring REST controllers
│   │   ├── service/          # Business logic & deterministic BigDecimal calculation engine
│   │   ├── entity/           # JPA domain entities (User, Expense, SavingsGoal)
│   │   ├── repository/       # Spring Data JPA repositories
│   │   ├── dto/              # Strongly-typed request/response transfer objects
│   │   ├── jdbc/             # Dedicated Direct JDBC module (DriverManager, PreparedStatement)
│   │   ├── ai/               # Gemini AI client & offline rule-based fallback
│   │   └── exception/        # Global exception handler (@RestControllerAdvice)
│   ├── src/test/             # JUnit 5 & MockMvc unit and integration tests
│   └── pom.xml
├── database/
│   ├── schema.sql            # 3NF DDL schema with constraints and foreign keys
│   ├── sample-data.sql       # Demonstration data (Aarav Sharma, Laptop Goal, 10 Expenses)
│   ├── syllabus-queries.sql  # 10 categories of Syllabus SQL queries (JOINs, UNION, Subqueries, Aggregates)
│   ├── start-db.sh           # Isolated MySQL launcher on port 3307
│   └── stop-db.sh            # MySQL shutdown script
└── docs/
    ├── architecture.md       # High-level architecture and ER diagrams
    ├── setup.md              # Detailed local setup and troubleshooting
    ├── api-reference.md      # REST API endpoints and payloads
    ├── syllabus-mapping.md   # Complete Syllabus-to-Code mapping matrix
    └── viva-guide.md         # Comprehensive viva Q&A and examiner demonstration script
```

---

## 🧪 Testing Suite

### Backend Tests (JUnit 5 + SpringBootTest)
```bash
cd backend && mvn test
```
- **`FinancialCalculationServiceTest`**: Validates deterministic `BigDecimal` math, zero allowance, expenses exceeding allowance, deficit detection, remaining goal months, and feasibility formulas.
- **`FinancialApiControllerTest`**: Validates Spring MVC REST endpoints, DTO validation errors, and JSON responses via `MockMvc`.

### Frontend Tests (Vitest + React Testing Library)
```bash
cd frontend && npm test
```
- **`FinancialComponents.test.jsx`**: Validates expense form submission, negative number rejections, summary card metric rendering, goal progress and feasibility badges, and loading/error states.

---

## 🔒 Security & Best Practices

- **Zero API Key Exposure:** The `GEMINI_API_KEY` is loaded exclusively on the backend server from environment variables.
- **Offline Fault Tolerance:** If Gemini is unreachable or unconfigured, the system automatically falls back to an intelligent, rule-based algorithmic financial mentor.
- **SQL Injection Prevention:** Parameterized queries via `PreparedStatement` and Spring Data JPA.
- **Strict Data Isolation:** Sensitive files (`.env`, database runtime binaries, build outputs) are protected in `.gitignore`.

---

## 📚 Academic Documentation

- [Architecture Specification](docs/architecture.md)
- [Setup & Troubleshooting](docs/setup.md)
- [REST API Reference](docs/api-reference.md)
- [Syllabus to Code Mapping Matrix](docs/syllabus-mapping.md)
- [Technical Viva & Examination Guide](docs/viva-guide.md)
