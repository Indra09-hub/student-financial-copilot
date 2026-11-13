# Setup & Installation Guide: Student Financial Copilot

This guide provides step-by-step instructions to run **Student Financial Copilot** locally on macOS, Linux, or Windows.

---

## 1. Prerequisites

Ensure the following tools are installed on your machine:

| Component | Minimum Version | Verified Version | Verification Command |
|---|---|---|---|
| **Java JDK** | Java 21 LTS | Java 25 (Temurin) | `java -version` |
| **Apache Maven** | 3.8.x | 3.9.9 | `mvn -version` |
| **Node.js & npm** | Node 18+ / npm 9+ | Node 20+ / npm 10+ | `node -v && npm -v` |
| **MySQL Server** | MySQL 8.0+ / 9.x | MySQL 9.6.0 | `mysqld --version` |

---

## 2. Environment Configuration

### Optional: Google Gemini API Key
The application includes an intelligent offline rule-based financial advisor. If you wish to enable live generative AI responses from Google Gemini:

1. Obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/).
2. Export the environment variable in your terminal before launching the backend:
   ```bash
   export GEMINI_API_KEY="your-gemini-api-key-here"
   ```
*(If omitted, the backend will cleanly log a warning and activate the built-in offline expert advisor engine).*

---

## 3. Database Setup (MySQL on Port 3307)

The project includes pre-configured management scripts that run an isolated MySQL instance on port `3307` within the project directory, ensuring zero conflict with any existing system MySQL services.

### Option A: Using Project Scripts (Recommended)
From the repository root:

```bash
# 1. Start the isolated MySQL instance
./database/start-db.sh

# 2. Check that MySQL is listening on port 3307
lsof -i :3307
```

### Option B: Using an Existing MySQL Server (Port 3306)
If you prefer your existing MySQL service, update `backend/src/main/resources/application.properties` with your database credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_copilot?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
```
Then load the database schema and sample data:
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/sample-data.sql
```

---

## 4. Backend Setup (Spring Boot)

The backend is built with Spring Boot 3.3.4 and Java 25.

### 4.1 Build and Run Unit Tests
```bash
cd backend
mvn clean test
```
All 11 tests across financial calculation formulas, deficit detection, and REST controllers will execute.

### 4.2 Start the Backend Server
```bash
cd backend
mvn spring-boot:run
```
Or run the packaged JAR:
```bash
mvn package -DskipTests
java -jar target/student-financial-copilot-backend-1.0.0.jar
```

The Spring Boot application will start on **`http://localhost:8080`**.

### Verify Backend Health:
```bash
curl -s "http://localhost:8080/api/summary?userId=1" | jq
```

---

## 5. Frontend Setup (React + Vite)

The frontend is built with React 19, custom CSS3, and Vite.

### 5.1 Install Node Dependencies
```bash
cd frontend
npm install
```

### 5.2 Run Frontend Unit & Component Tests
```bash
cd frontend
npm test
```
All 10 tests verifying form validation, summary cards, and goal feasibility will execute.

### 5.3 Start Vite Development Server
```bash
cd frontend
npm run dev
```

The application will be accessible at:
👉 **`http://localhost:5173`**

*(All API calls to `/api/*` are automatically proxied by Vite to the Spring Boot server on `http://localhost:8080`).*

---

## 6. Verification Checklist

1. Open **`http://localhost:5173`** in your browser.
2. Verify **Dashboard** displays:
   - Student name: **Aarav Sharma**
   - Monthly Allowance: **₹15,000.00**
   - Total Expenses: **₹12,747.00**
   - Monthly Savings: **₹2,253.00**
   - Savings Rate: **15.02%**
   - HTML5 Canvas Gauge animating the savings capacity.
3. Navigate to **Expenses**:
   - Filter by category or search by keyword.
   - Click **Record Expense** to add a new transaction.
4. Navigate to **Savings Goals**:
   - Verify the **Laptop** goal (₹40,000 target, ₹3,000 saved, 6 months) displays feasibility calculations.
   - Click **Add Funds** to deposit savings toward the goal.
5. Navigate to **Goal Optimizer**:
   - Move the **Discretionary Spending Reduction** slider.
   - Observe real-time what-if recalculation of savings and goal timeline.
6. Navigate to **AI Financial Copilot**:
   - Click a quick prompt (e.g. *"Can I afford my Laptop goal in 6 months?"*).
   - Review the detailed Markdown response.
7. Navigate to **JDBC & Reports**:
   - View the monthly aggregate expense report generated directly via `PreparedStatement`.
   - Click **Run Atomic Transaction Demo** to observe `commit()` and `rollback()` handling.

---

## 7. Stopping the Services

To shut down the background processes:
```bash
# Stop MySQL instance
./database/stop-db.sh

# Stop Spring Boot and Vite
kill $(lsof -t -i:8080)
kill $(lsof -t -i:5173)
```
