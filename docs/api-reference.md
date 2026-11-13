# REST API Reference: Student Financial Copilot

Base URL: `http://localhost:8080/api` (or `/api` via Vite reverse proxy)

All responses follow a standard envelope format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "timestamp": "2026-10-15T02:00:00"
}
```

---

## 1. Allowance Management

### `GET /api/allowance`
Retrieves the user's current monthly allowance.

- **Query Parameters**: `userId` (Long, optional, default: `1`)
- **Response**:
```json
{
  "success": true,
  "message": "Allowance fetched successfully",
  "data": {
    "userId": 1,
    "userName": "Aarav Sharma",
    "monthlyAllowance": 15000.00
  }
}
```

### `PUT /api/allowance`
Updates the student's monthly allowance and recalculates financial metrics.

- **Query Parameters**: `userId` (Long, optional, default: `1`)
- **Request Body**:
```json
{
  "monthlyAllowance": 16500.00
}
```
- **Validation**: `@NotNull`, `@Positive`

---

## 2. Expense Management

### `GET /api/expenses`
Retrieves filtered and sorted expenses for a student.

- **Query Parameters**:
  - `userId` (Long, default: `1`)
  - `category` (String, optional)
  - `startDate` (ISO Date `YYYY-MM-DD`, optional)
  - `endDate` (ISO Date `YYYY-MM-DD`, optional)
  - `search` (String keyword search against expense name or notes, optional)
- **Response**: Array of `ExpenseResponse` DTOs.

### `POST /api/expenses`
Records a new expense transaction.

- **Query Parameters**: `userId` (Long, default: `1`)
- **Request Body**:
```json
{
  "name": "Data Structures & Algorithms Textbook",
  "amount": 650.00,
  "category": "Education",
  "expenseType": "ESSENTIAL",
  "expenseDate": "2026-10-10",
  "notes": "Purchased from college bookstore"
}
```
- **Validation Rules**:
  - `name`: `@NotBlank`, max 100 characters.
  - `amount`: `@NotNull`, `@Positive` (monetary checks).
  - `category`: `@NotBlank`.
  - `expenseType`: Must be `ESSENTIAL` or `DISCRETIONARY`.
  - `expenseDate`: `@NotNull`.

### `PUT /api/expenses/{id}`
Updates an existing expense transaction by ID.

### `DELETE /api/expenses/{id}`
Permanently deletes an expense transaction.

---

## 3. Savings Goals Management

### `GET /api/goals`
Retrieves all savings goals with calculated feasibility and remaining metrics.

- **Response**:
```json
[
  {
    "id": 1,
    "goalName": "Laptop",
    "targetAmount": 40000.00,
    "currentSavings": 3000.00,
    "remainingAmount": 37000.00,
    "targetDate": "2027-04-14",
    "status": "IN_PROGRESS",
    "remainingMonths": 6,
    "requiredMonthlySavings": 6166.67,
    "achievableMonthlySavings": 2253.00,
    "estimatedMonths": 17,
    "completionPercentage": 7.50,
    "feasibilityMessage": "Off track. You need ₹6166.67/mo but currently save ₹2253.00/mo. Estimated completion: 17 months.",
    "isFeasible": false
  }
]
```

### `POST /api/goals`
Creates a new student savings target.

- **Request Body**:
```json
{
  "goalName": "Noise Cancelling Headphones",
  "targetAmount": 8000.00,
  "currentSavings": 1500.00,
  "targetDate": "2027-01-31"
}
```

### `POST /api/goals/{id}/deposit`
Deposits money into an active savings goal.

- **Query Parameters**: `amount` (`BigDecimal`, must be positive)

---

## 4. Financial Summary

### `GET /api/summary`
Generates the authoritative financial snapshot using deterministic calculations.

- **Response Attributes**:
  - `monthlyAllowance`: `15000.00`
  - `totalExpenses`: `12747.00`
  - `monthlySavings`: `2253.00`
  - `savingsRate`: `15.02`
  - `deficitAmount`: `0.00`
  - `essentialExpenses`: `9649.00`
  - `discretionaryExpenses`: `3098.00`
  - `essentialPercentage`: `75.70`
  - `discretionaryPercentage`: `24.30`
  - `categoryBreakdown`: `{ "Housing": 4500, "Food": 3200, ... }`
  - `goalsFeasibility`: Detailed feasibility array for all active goals.

---

## 5. Scenario Simulation & Optimization

### `POST /api/scenarios/simulate`
Simulates alternative financial scenarios without modifying database state.

- **Request Body**:
```json
{
  "discretionaryReductionPercent": 30.0,
  "allowanceAdjustment": 1000.00,
  "targetGoalId": 1
}
```
- **Response**:
```json
{
  "baselineSavings": 2253.00,
  "simulatedSavings": 4182.40,
  "savingsDifference": 1929.40,
  "baselineSavingsRate": 15.02,
  "simulatedSavingsRate": 26.14,
  "simulatedDiscretionarySpending": 2168.60,
  "targetGoalId": 1,
  "baselineCompletionMonths": 17,
  "simulatedCompletionMonths": 9,
  "monthsSaved": 8
}
```

### `GET /api/scenarios/opportunities`
Returns deterministic, rule-based suggestions for cutting discretionary costs.

---

## 6. Direct JDBC Reporting & Demonstrations

### `GET /api/reports/jdbc/monthly`
Generates a monthly expense summary executed directly via raw `PreparedStatement` and `ResultSet` iteration.

### `POST /api/reports/jdbc/transaction-demo`
Runs a live JDBC transaction demonstration verifying `setAutoCommit(false)`, `commit()`, and `rollback()` handling.

---

## 7. AI Financial Copilot

### `POST /api/ai/advice`
Requests personalized financial guidance from Google Gemini.

- **Request Body**:
```json
{
  "userQuestion": "How can I adjust my discretionary expenses to buy the Laptop in 6 months?"
}
```
- **Behavior**:
  - Spring Boot loads the student's pre-calculated financial snapshot.
  - Constructs a grounded prompt including allowance, essential spending, discretionary spending, active goals, and feasibility.
  - Dispatches to Google Gemini API via server-side HTTP client.
  - If the Gemini API is unreachable or unconfigured, returns intelligent advice from the built-in offline expert rule engine.
  - Response formatted in GitHub-compatible Markdown.
