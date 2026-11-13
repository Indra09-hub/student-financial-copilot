import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ReceiptText,
  Target,
  Sliders,
  Sparkles,
  Database,
  GraduationCap
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/expenses', label: 'Expenses', icon: ReceiptText },
  { path: '/goals', label: 'Savings Goals', icon: Target },
  { path: '/optimizer', label: 'Goal Optimizer', icon: Sliders },
  { path: '/ai-copilot', label: 'AI Copilot', icon: Sparkles, badge: 'Gemini' },
  { path: '/reports', label: 'JDBC Reports', icon: Database, badge: 'Syllabus' },
];

export default function Sidebar() {
  return (
    <aside
      className="sidebar"
      style={{
        width: 'var(--sidebar-width)',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem 1rem',
      }}
    >
      <div>
        {/* Brand Logo & Title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 0.75rem 1.75rem',
            borderBottom: '1px solid var(--border)',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--primary-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <GraduationCap size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
              Financial Copilot
            </h1>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Full-Stack Edition
            </span>
          </div>
        </div>

        {/* Navigation List (Semantic HTML <nav>) */}
        <nav aria-label="Main Navigation">
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {NAV_ITEMS.map(({ path, label, icon: Icon, badge }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === '/'}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'all var(--transition-fast)',
                    backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                    borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                  })}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={18} />
                    <span>{label}</span>
                  </div>
                  {badge && (
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.45rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: badge === 'Gemini' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                        color: badge === 'Gemini' ? 'var(--primary)' : 'var(--success)',
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer Info Box */}
      <div
        className="card"
        style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-surface-hover)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Stack Status
          </span>
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>
          Spring Boot 3 • MySQL 9.6 • React • JDBC + JPA
        </p>
      </div>
    </aside>
  );
}
