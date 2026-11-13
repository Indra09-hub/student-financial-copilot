-- ==============================================================================
-- Student Financial Copilot - Database Syllabus Demonstration Queries
-- Covers: CREATE TABLE, INSERT, SELECT, UPDATE, DELETE, JOIN, UNION,
--         INTERSECT, EXCEPT, SUBQUERIES, AGGREGATE FUNCTIONS, ALTER TABLE
-- ==============================================================================

USE student_copilot;

-- ==============================================================================
-- 1. DDL: CREATE TABLE Demonstration
-- ==============================================================================
-- Creating a temporary demonstration audit table to log budget changes
CREATE TABLE IF NOT EXISTS budget_audit_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    old_value DECIMAL(12,2),
    new_value DECIMAL(12,2),
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==============================================================================
-- 2. DDL: ALTER TABLE Demonstration
-- Adding, modifying, and dropping a column / constraint
-- ==============================================================================
-- A. Add a new column to budget_audit_log
ALTER TABLE budget_audit_log ADD COLUMN remarks VARCHAR(255) DEFAULT 'Automated log entry';

-- B. Modify column definition
ALTER TABLE budget_audit_log MODIFY COLUMN remarks VARCHAR(500) NULL;

-- C. Drop the column to demonstrate reverse migration
ALTER TABLE budget_audit_log DROP COLUMN remarks;

-- ==============================================================================
-- 3. DML: INSERT Demonstration
-- ==============================================================================
-- Inserting an audit record for user 1
INSERT INTO budget_audit_log (user_id, action_type, old_value, new_value)
VALUES (1, 'ALLOWANCE_UPDATE', 12000.00, 15000.00);

-- ==============================================================================
-- 4. DML: SELECT with Filtering and Ordering
-- ==============================================================================
-- Retrieve all discretionary expenses above ₹500, ordered by amount descending
SELECT id, name, amount, category, expense_date
FROM expenses
WHERE expense_type = 'discretionary' AND amount > 500.00
ORDER BY amount DESC;

-- ==============================================================================
-- 5. DML: UPDATE Demonstration
-- ==============================================================================
-- Update an expense note by ID
UPDATE expenses
SET notes = 'Updated: Split bill with roommate'
WHERE id = 6 AND user_id = 1;

-- ==============================================================================
-- 6. DML: DELETE Demonstration
-- ==============================================================================
-- Delete temporary audit log entries older than today
DELETE FROM budget_audit_log
WHERE logged_at < CURRENT_DATE;

-- ==============================================================================
-- 7. SQL AGGREGATE FUNCTIONS (SUM, AVG, COUNT, MIN, MAX, GROUP BY, HAVING)
-- ==============================================================================
-- Category-wise spending report with count, total, average, and peak expense
SELECT 
    category,
    expense_type,
    COUNT(*) AS total_transactions,
    SUM(amount) AS total_spent,
    ROUND(AVG(amount), 2) AS average_amount,
    MIN(amount) AS min_amount,
    MAX(amount) AS max_amount
FROM expenses
WHERE user_id = 1
GROUP BY category, expense_type
HAVING SUM(amount) > 500.00
ORDER BY total_spent DESC;

-- Total Essential vs Discretionary breakdown
SELECT 
    expense_type,
    COUNT(*) AS transaction_count,
    SUM(amount) AS type_total,
    ROUND(SUM(amount) * 100.0 / (SELECT SUM(amount) FROM expenses WHERE user_id = 1), 2) AS percentage_of_total
FROM expenses
WHERE user_id = 1
GROUP BY expense_type;

-- ==============================================================================
-- 8. SQL JOINS (INNER JOIN and LEFT JOIN)
-- ==============================================================================
-- A. INNER JOIN: Combine user profile with their recorded goals
SELECT 
    u.id AS student_id,
    u.name AS student_name,
    u.monthly_allowance,
    g.goal_name,
    g.target_amount,
    g.current_savings,
    (g.target_amount - g.current_savings) AS remaining_to_save,
    g.target_date
FROM users u
INNER JOIN savings_goals g ON u.id = g.user_id
WHERE u.id = 1;

-- B. LEFT JOIN: Aggregate total expenses per user (even if a user has 0 expenses)
SELECT 
    u.id,
    u.name,
    u.monthly_allowance,
    COALESCE(SUM(e.amount), 0.00) AS total_expenses,
    (u.monthly_allowance - COALESCE(SUM(e.amount), 0.00)) AS monthly_net_savings
FROM users u
LEFT JOIN expenses e ON u.id = e.user_id
GROUP BY u.id, u.name, u.monthly_allowance;

-- ==============================================================================
-- 9. SUBQUERIES (Scalar, Correlated, and IN-clause)
-- ==============================================================================
-- A. Scalar Subquery in WHERE: Find all expenses that cost more than the average expense
SELECT id, name, amount, category
FROM expenses
WHERE amount > (SELECT AVG(amount) FROM expenses WHERE user_id = 1)
ORDER BY amount DESC;

-- B. Correlated Subquery: Select expenses that exceed the average for THEIR OWN category
SELECT e1.id, e1.name, e1.category, e1.amount
FROM expenses e1
WHERE e1.amount > (
    SELECT AVG(e2.amount)
    FROM expenses e2
    WHERE e2.category = e1.category AND e2.user_id = e1.user_id
);

-- ==============================================================================
-- 10. SET OPERATIONS: UNION, INTERSECT, and EXCEPT
-- ==============================================================================
-- A. UNION: Combine distinct categories present in both Essential & Discretionary expenses
SELECT DISTINCT category, 'Essential Category' AS source
FROM expenses
WHERE expense_type = 'essential'
UNION
SELECT DISTINCT category, 'Discretionary Category' AS source
FROM expenses
WHERE expense_type = 'discretionary';

-- B. INTERSECT:
-- MySQL 8.0.31+ supports INTERSECT natively.
-- Query: Find any category present in BOTH essential and discretionary spending
SELECT category FROM expenses WHERE expense_type = 'essential'
INTERSECT
SELECT category FROM expenses WHERE expense_type = 'discretionary';

-- Equivalent query for database versions lacking native INTERSECT (using INNER JOIN / IN):
SELECT DISTINCT e1.category
FROM expenses e1
WHERE e1.expense_type = 'essential'
  AND e1.category IN (
      SELECT e2.category 
      FROM expenses e2 
      WHERE e2.expense_type = 'discretionary'
  );

-- C. EXCEPT (MINUS):
-- MySQL 8.0.31+ supports EXCEPT natively.
-- Query: Categories in Essential that have NO Discretionary expenses
SELECT category FROM expenses WHERE expense_type = 'essential'
EXCEPT
SELECT category FROM expenses WHERE expense_type = 'discretionary';

-- Equivalent query for database versions lacking native EXCEPT (using LEFT JOIN / NOT IN):
SELECT DISTINCT e1.category
FROM expenses e1
WHERE e1.expense_type = 'essential'
  AND e1.category NOT IN (
      SELECT COALESCE(e2.category, '') 
      FROM expenses e2 
      WHERE e2.expense_type = 'discretionary'
  );
