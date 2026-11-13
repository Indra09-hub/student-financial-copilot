-- ==============================================================================
-- Student Financial Copilot - Demonstration Sample Data
-- ==============================================================================

USE student_copilot;

-- Disable foreign key checks for clean truncation / reload if needed
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE expenses;
TRUNCATE TABLE savings_goals;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Default Demo Student Profile
-- Allowance: ₹15,000 / month
INSERT INTO users (id, name, email, monthly_allowance) VALUES
(1, 'Aarav Sharma', 'aarav.sharma@college.edu', 15000.00);

-- 2. Insert Required Laptop Goal and Emergency Fund
-- Laptop: Target ₹40,000, Saved ₹3,000, Deadline ~6 months
-- Emergency Fund: Target ₹10,000, Saved ₹4,500, Deadline ~4 months
INSERT INTO savings_goals (id, user_id, goal_name, target_amount, current_savings, target_date, status) VALUES
(1, 1, 'Laptop', 40000.00, 3000.00, DATE_ADD(CURRENT_DATE, INTERVAL 6 MONTH), 'IN_PROGRESS'),
(2, 1, 'Emergency Buffer', 10000.00, 4500.00, DATE_ADD(CURRENT_DATE, INTERVAL 4 MONTH), 'IN_PROGRESS');

-- 3. Insert Realistic Student Monthly Expenses
-- Total: ₹11,947 (Essential: ₹9,649 | Discretionary: ₹2,298 | Net Savings: ₹3,053)
INSERT INTO expenses (user_id, name, amount, category, expense_type, expense_date, notes) VALUES
-- Essential Spending (Protected items: shelter, meals, study, connectivity)
(1, 'Hostel Room Sharing Rent', 4500.00, 'Housing', 'essential', CURRENT_DATE - INTERVAL 12 DAY, 'Fixed monthly hostel maintenance & bed rent'),
(1, 'Mess Food & Monthly Meal Plan', 3200.00, 'Food', 'essential', CURRENT_DATE - INTERVAL 10 DAY, 'Hostel mess breakfast, lunch & dinner card'),
(1, 'College Bus & Metro Pass', 800.00, 'Transport', 'essential', CURRENT_DATE - INTERVAL 8 DAY, 'Monthly student transit concession card'),
(1, 'Textbooks & Lab Practical Manuals', 650.00, 'Education', 'essential', CURRENT_DATE - INTERVAL 5 DAY, 'Data structures lab record & core textbook'),
(1, 'Mobile Data & Hostel WiFi Plan', 499.00, 'Utilities', 'essential', CURRENT_DATE - INTERVAL 4 DAY, 'Monthly 5G unlimited student plan'),

-- Discretionary Spending (Opportunities for savings optimization)
(1, 'Weekend Cafe & Snacks', 850.00, 'Food & Dining', 'discretionary', CURRENT_DATE - INTERVAL 7 DAY, 'Pizza and cold coffee with college project group'),
(1, 'OTT Streaming Subscriptions', 399.00, 'Entertainment', 'discretionary', CURRENT_DATE - INTERVAL 6 DAY, 'Shared student subscription bundle'),
(1, 'Movie Outing with Friends', 600.00, 'Entertainment', 'discretionary', CURRENT_DATE - INTERVAL 3 DAY, 'Weekend evening movie ticket & popcorn combo'),
(1, 'New Graphic T-Shirt', 799.00, 'Shopping', 'discretionary', CURRENT_DATE - INTERVAL 2 DAY, 'Campus cultural fest merchandise t-shirt'),
(1, 'Gaming & Tech Accessories', 450.00, 'Gadgets', 'discretionary', CURRENT_DATE - INTERVAL 1 DAY, 'Ergonomic mouse pad and replacement USB-C cable');
