-- ==============================================================================
-- Student Financial Copilot - Database Schema Definition
-- Target Database: MySQL 8.x / 9.x
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS student_copilot
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE student_copilot;

-- ------------------------------------------------------------------------------
-- Table: users
-- Stores student profiles and their fixed monthly allowance
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    monthly_allowance DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_positive_allowance CHECK (monthly_allowance >= 0.00)
) ENGINE=InnoDB;

-- ------------------------------------------------------------------------------
-- Table: expenses
-- Records financial transactions with essential vs discretionary classification
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS expenses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(150) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    expense_type ENUM('essential', 'discretionary') NOT NULL DEFAULT 'discretionary',
    expense_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_expenses_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_positive_expense CHECK (amount > 0.00)
) ENGINE=InnoDB;

-- Indexing for rapid queries, reporting, and filtering
CREATE INDEX idx_expenses_user_date ON expenses(user_id, expense_date);
CREATE INDEX idx_expenses_category ON expenses(category);
CREATE INDEX idx_expenses_type ON expenses(expense_type);

-- ------------------------------------------------------------------------------
-- Table: savings_goals
-- Tracks financial targets, deadlines, and current progress
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS savings_goals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    goal_name VARCHAR(100) NOT NULL,
    target_amount DECIMAL(12, 2) NOT NULL,
    current_savings DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    target_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_goals_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_target_amount CHECK (target_amount > 0.00),
    CONSTRAINT chk_current_savings CHECK (current_savings >= 0.00)
) ENGINE=InnoDB;

CREATE INDEX idx_goals_user ON savings_goals(user_id);
CREATE INDEX idx_goals_status ON savings_goals(status);
