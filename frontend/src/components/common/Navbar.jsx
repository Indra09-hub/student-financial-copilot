import React, { useState } from 'react';
import { Sun, Moon, Wallet, UserCircle, Edit3 } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';
import AllowanceModal from '../dashboard/AllowanceModal';

export default function Navbar() {
  const { summary, theme, toggleTheme } = useFinancial();
  const [isAllowanceModalOpen, setIsAllowanceModalOpen] = useState(false);

  const formattedAllowance = summary?.monthlyAllowance != null
    ? `₹${Number(summary.monthlyAllowance).toLocaleString('en-IN')}`
    : '₹0';

  return (
    <>
      <header
        style={{
          height: '70px',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--bg-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Left: Quick Breadcrumb / Greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
              Welcome back, {summary?.userName || 'Aarav'}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              College Budget & Savings Copilot
            </p>
          </div>
        </div>

        {/* Right: Allowance Badge, Theme Switcher, Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Allowance quick button */}
          <button
            onClick={() => setIsAllowanceModalOpen(true)}
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.9rem',
              cursor: 'pointer',
              backgroundColor: 'var(--bg-surface-hover)',
              borderRadius: 'var(--radius-sm)',
            }}
            title="Click to update monthly allowance"
          >
            <Wallet size={16} color="var(--primary)" />
            <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Monthly Allowance</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{formattedAllowance}</span>
            </div>
            <Edit3 size={13} color="var(--text-muted)" style={{ marginLeft: '0.25rem' }} />
          </button>

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="btn-icon"
            style={{
              padding: '0.6rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
            }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
          </button>

          {/* Student Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--primary-gradient)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
              }}
            >
              AS
            </div>
          </div>
        </div>
      </header>

      {/* Allowance Adjustment Modal */}
      <AllowanceModal
        isOpen={isAllowanceModalOpen}
        onClose={() => setIsAllowanceModalOpen(false)}
        currentAllowance={summary?.monthlyAllowance || 0}
      />
    </>
  );
}
