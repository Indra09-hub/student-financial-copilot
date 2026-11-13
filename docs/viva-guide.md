# Technical Viva & Examination Guide: Student Financial Copilot

This guide is prepared for technical presentations, code reviews, and viva examinations for **Student Financial Copilot**. It covers all architectural decisions, core formulas, code walk-throughs, and expected examiner questions with model answers.

---

## 1. Project Objective & Problem Statement

### Central Question:
> **"Can I afford this goal, and what exact budget changes should I make to achieve it?"**

### The Core Problem:
College students operate under unique financial conditions:
1. **Fixed Limited Allowance:** Income arrives once a month as a fixed transfer from parents or financial aid, not as hourly wages or investments.
2. **High Impulse Spending:** Without immediate feedback on how discretionary purchases (cafeteria snacks, shopping, parties) degrade savings, students frequently run out of money mid-month.
3. **Ambiguous Goal Timelines:** Students set ambitious goals (e.g. buying a ₹40,000 laptop for campus coursework) without mathematically knowing whether their monthly savings can achieve it before the semester ends.

### The Solution:
Student Financial Copilot combines:
- **Deterministic financial arithmetic** using Java `BigDecimal` to ensure zero rounding or hallucination errors.
- **Categorization of expenses into Essential (protected) vs. Discretionary (flexible)**.
- **Goal Feasibility Engine** calculating exact required savings vs. achievable savings and remaining months.
- **What-If Scenario Optimizer** allowing students to simulate expense cuts before committing to changes.
- **Google Gemini AI Integration** acting as an empathetic, context-aware financial mentor grounded in verified transaction data.

---

## 2. Technology Stack & Justification

| Technology | Role | Justification |
|---|---|---|
| **Java 25 (LTS baseline: Java 21)** | Backend Language | Strong type safety, pattern matching, records, robust memory management, and enterprise standard. |
| **Spring Boot 3.3.4** | Backend Framework | Rapid API development, dependency injection (`@Autowired`/constructor injection), auto-configuration, robust test support (`MockMvc`). |
| **MySQL 9.x / 8.x** | Relational Database | Strict ACID compliance, relational integrity with foreign keys, decimal precision for monetary storage, and native support for complex aggregations and set queries. |
| **Spring Data JPA & Hibernate** | Persistence Layer (CRUD) | High productivity, object-relational mapping, automatic query generation, and seamless integration with HikariCP connection pooling. |
| **Direct JDBC (`java.sql.*`)** | Reporting & Transaction Demonstration | Low-level control demonstrating database driver handshakes, `PreparedStatement`, `ResultSet`, and manual transaction boundaries (`commit`/`rollback`). |
| **React 19 & Vite** | Frontend Framework | Fast component-based reactive UI, hooks for state and lifecycle, lightning-fast HMR with Vite, lightweight bundle size. |
| **Vanilla CSS3** | Styling & Design System | Complete control over CSS box model, Flexbox, CSS Grid, custom properties (light/dark theme tokens), and micro-animations without bloated utility classes. |
| **Google Gemini 1.5 / 2.5 Flash** | AI Copilot | Fast multimodal LLM with large context window for synthesizing complex financial advice. |

---

## 3. Mathematical Formulas (Deterministic Service)

Implemented in [FinancialCalculationService.java](file:///Users/arnabhazra/student-financial-copilot-2/backend/src/main/java/com/copilot/service/FinancialCalculationService.java):

### 1. Total Monthly Expenses
$$\text{Total Expenses} = \sum_{i=1}^{n} \text{Expense}_i$$

### 2. Monthly Net Savings
$$\text{Monthly Savings} = \text{Monthly Allowance} - \text{Total Expenses}$$

### 3. Savings Rate Percentage
$$\text{Savings Rate} = \begin{cases} 
\left(\frac{\text{Monthly Savings}}{\text{Monthly Allowance}}\right) \times 100 & \text{if Allowance} > 0 \\ 
0\% & \text{otherwise} 
\end{cases}$$
*(If Total Expenses exceed Monthly Allowance, the application flags a **Deficit** and displays overspending clearly).*

### 4. Remaining Goal Amount
$$\text{Remaining Amount} = \max(\text{Target Amount} - \text{Current Savings}, 0)$$

### 5. Required Monthly Savings
$$\text{Required Monthly Savings} = \frac{\text{Remaining Amount}}{\max(\text{Remaining Months}, 1)}$$

### 6. Estimated Months to Goal Completion
$$\text{Estimated Months} = \begin{cases} 
\left\lceil \frac{\text{Remaining Amount}}{\text{Achievable Monthly Savings}} \right\rceil & \text{if Achievable Monthly Savings} > 0 \\ 
\infty \text{ (Deficit / Impossible)} & \text{otherwise} 
\end{cases}$$

### 7. Goal Feasibility Criteria
A goal is **feasible** (`isFeasible = true`) if and only if:
$$\text{Achievable Monthly Savings} \ge \text{Required Monthly Savings} \quad \text{AND} \quad \text{Achievable Monthly Savings} > 0$$

---

## 4. JDBC vs. Spring Data JPA: Deep Comparison

Examiners frequently ask to contrast these two technologies:

| Dimension | Direct JDBC (`com.copilot.jdbc`) | Spring Data JPA (`com.copilot.repository`) |
|---|---|---|
| **Abstraction Level** | Low-level API (`java.sql.*`). You write raw SQL strings directly. | High-level ORM framework. Abstracted via interfaces and entity annotations (`@Entity`, `@Table`). |
| **Connection Handling** | Manual via `DriverManager.getConnection()` or raw `DataSource`. | Managed automatically via Spring Boot's `HikariCP` connection pool. |
| **Query Execution** | Explicit `PreparedStatement.executeQuery()` or `executeUpdate()`. | Derived methods (e.g. `findByUserId`) or JPQL (`@Query("SELECT e FROM Expense e ...")`). |
| **Object Mapping** | Manual loop over `ResultSet` calling `rs.getString()`, `rs.getBigDecimal()`. | Automated by Hibernate: rows automatically hydrate into Java entity instances. |
| **Transaction Management** | Explicit method calls: `conn.setAutoCommit(false)`, `conn.commit()`, `conn.rollback()`. | Declarative via `@Transactional` annotation with AOP proxy interception. |
| **Performance Profile** | Zero ORM overhead; ideal for high-throughput batch aggregations and complex analytical reporting. | Ideal for complex domain models, dirty checking, entity lifecycles, and caching. |
| **Role in this Project** | Used in `JdbcFinancialReportDao` for monthly category aggregations and transaction demos. | Used for all core entity operations across `users`, `expenses`, and `savings_goals`. |

---

## 5. Typical Viva Questions & High-Scoring Answers

### Q1: Why did you use `BigDecimal` instead of `double` or `float` for monetary calculations?
**Answer:**
> "Floating-point primitives (`float` and `double`) use binary IEEE 754 representations, which cannot represent base-10 fractional numbers like `0.1` or `0.05` exactly. This introduces silent cumulative rounding errors (e.g. `0.1 + 0.2 = 0.30000000000000004`), which is unacceptable in financial applications. `java.math.BigDecimal` provides arbitrary-precision signed decimal arithmetic with explicit rounding modes (`RoundingMode.HALF_UP`), ensuring mathematical accuracy and regulatory compliance."

---

### Q2: How does your application prevent SQL Injection?
**Answer:**
> "We enforce parameterized queries across both layers:
> 1. In our **Direct JDBC Module** (`JdbcFinancialReportDao.java`), we strictly use `PreparedStatement` with typed placeholders (`?`), calling `pstmt.setLong(1, userId)` and `pstmt.setDate(2, startDate)`. The database engine compiles the SQL query plan before binding the input as literal data, preventing arbitrary command execution.
> 2. In **Spring Data JPA**, all repository queries use Hibernate's parameter binding or derived methods, which sanitize and escape inputs automatically."

---

### Q3: How is Google Gemini integrated safely without exposing credentials or causing service outages?
**Answer:**
> "The integration adheres to three defense-in-depth principles:
> 1. **Zero Frontend Exposure:** The `GEMINI_API_KEY` is stored in an environment variable read only by the backend Spring Boot server. The frontend never has access to the key.
> 2. **Deterministic Grounding:** We do not allow the LLM to perform calculations. The backend calculates verifiable metrics (`BigDecimal` savings, feasibility, deficit) first and passes the verified snapshot in the prompt.
> 3. **Fault Tolerance (Offline Fallback):** If the Gemini API key is missing, network is down, or Google returns a 503/429 error, the `AiCopilotService` catches the exception and falls back to an intelligent, rule-based algorithmic financial mentor. The application never crashes."

---

### Q4: Explain the difference between `Statement` and `PreparedStatement` in JDBC.
**Answer:**
> "1. `Statement` compiles and executes raw SQL strings on every call. It does not support parameter placeholders and is highly vulnerable to SQL injection if user strings are concatenated.
> 2. `PreparedStatement` is pre-compiled by the database engine once. Parameters are passed using `?` placeholders. It is faster for repeated executions due to query plan caching and is immune to SQL injection because inputs are treated strictly as data, not executable code."

---

### Q5: Explain the React hooks used in your frontend and why they were necessary.
**Answer:**
> "- **`useState`**: Stores local component state, such as form input values, modal visibility toggles, and simulation slider values.
> - **`useEffect`**: Synchronizes components with external systems, specifically dispatching asynchronous HTTP requests to fetch expenses and goals on initial render or filter change.
> - **`useMemo`**: Caches expensive client-side operations (such as multi-criteria expense filtering and sorting) so that typing in an unrelated input field does not recompute the sorted array.
> - **`useRef`**: Maintains direct mutable references to DOM elements without triggering re-renders, used here for the HTML5 Canvas 2D context and auto-scrolling chat history.
> - **`useContext`**: Provides a global reactive store (`FinancialContext`) to broadcast allowance updates and trigger refresh signals across disjoint components (like Navbar, SummaryCards, and Goals).
> - **`useDebugValue`**: Embedded in our custom hooks (`useExpenses`, `useGoals`) to display helpful diagnostics in the React DevTools inspector."

---

### Q6: What is a Three-Tier Architecture, and how does your project implement it?
**Answer:**
> "A Three-Tier Architecture separates concerns into three distinct layers:
> 1. **Presentation Layer (Web Tier):** Spring REST Controllers (`ExpenseController`, `SavingsGoalController`) which parse HTTP requests, validate incoming DTOs, and serialize responses to JSON.
> 2. **Business Logic Layer (Service Tier):** Service classes (`FinancialCalculationService`, `ScenarioOptimizerService`) that enforce domain rules, execute financial formulas, and coordinate transactions.
> 3. **Data Access Layer (Persistence Tier):** Repositories (`ExpenseRepository`) and DAOs (`JdbcFinancialReportDao`) that communicate directly with MySQL via JPA/Hibernate and JDBC."

---

### Q7: How does your What-If Scenario Optimizer work without corrupting the database?
**Answer:**
> "The Scenario Optimizer is a pure read-and-simulate function. When a student adjusts the discretionary spending reduction slider (e.g. 25% cut) or simulates an allowance increase, the request is sent to `POST /api/scenarios/simulate`. The `ScenarioOptimizerService` reads the student's current baseline data from MySQL, computes the new hypothetical savings rate, and calculates how many months sooner the target goal can be reached. The database is never altered during simulation. The new budget is only applied if the student clicks 'Apply New Budget'."

---

## 6. Live Demonstration Script for Examiners

Follow this step-by-step sequence to demonstrate the project smoothly:

```
Step 1: Open http://localhost:5173
  -> Show the Dashboard with Aarav Sharma (Allowance ₹15,000, Expenses ₹12,747, Savings ₹2,253).
  -> Point out the HTML5 Canvas 2D radial gauge rendering the savings rate (15.02%).
  -> Toggle the Dark/Light mode theme switch to show CSS3 design tokens.

Step 2: Navigate to 'Expenses'
  -> Demonstrate category filtering (select "Food & Dining") and keyword search.
  -> Click "Record Expense" to open the modal.
  -> Submit an invalid amount (-50) to demonstrate immediate validation errors.
  -> Enter a valid expense (e.g. "Library Photostat", ₹120, Education, Essential).
  -> Show the table update and summary cards instantly reflect the change.

Step 3: Navigate to 'Savings Goals'
  -> Show the "Laptop" goal: ₹40,000 target, ₹3,000 current savings, 6 months remaining.
  -> Explain the feasibility badge: It shows "Off Track" because required savings (₹6,166.67/mo) exceeds current savings (₹2,253.00/mo).
  -> Click "Add Funds" to deposit ₹1,000 and show immediate recalculation.

Step 4: Navigate to 'Goal Optimizer'
  -> Drag the "Discretionary Spending Reduction" slider to 50%.
  -> Show the comparison card: Simulated savings jumps from ₹2,253 to ₹3,802/mo.
  -> Point out the Months Saved metric: Laptop completion timeline drops significantly.

Step 5: Navigate to 'AI Financial Copilot'
  -> Click "Can I afford my Laptop goal in 6 months?"
  -> Show the structured Markdown response referencing the student's actual ₹15,000 allowance and ₹12,747 spending.
  -> Explain that the LLM is guided by the verified calculation snapshot.

Step 6: Navigate to 'JDBC & Reports'
  -> Show the Monthly Category Aggregation Table.
  -> Explain: "This data was computed not by Hibernate, but directly via java.sql.PreparedStatement and ResultSet aggregation."
  -> Click "Run Atomic Transaction Demo" to demonstrate low-level commit and rollback handling.
```
