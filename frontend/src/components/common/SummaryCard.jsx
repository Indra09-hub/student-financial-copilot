import React from 'react';

export default function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'primary',
  badge,
  onClick,
}) {
  const colorMap = {
    primary: { bg: 'var(--primary-light)', text: 'var(--primary)' },
    success: { bg: 'var(--success-light)', text: 'var(--success)' },
    danger: { bg: 'var(--danger-light)', text: 'var(--danger)' },
    warning: { bg: 'var(--warning-light)', text: 'var(--warning)' },
    essential: { bg: 'var(--essential-light)', text: 'var(--essential-color)' },
    discretionary: { bg: 'var(--discretionary-light)', text: 'var(--discretionary-color)' },
  };

  const scheme = colorMap[color] || colorMap.primary;

  return (
    <article
      className={`card ${onClick ? 'card-interactive' : ''}`}
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {title}
          </span>
          <h3 style={{ fontSize: '1.65rem', fontWeight: 800, marginTop: '0.25rem', letterSpacing: '-0.02em' }}>
            {value}
          </h3>
        </div>

        {Icon && (
          <div
            style={{
              padding: '0.65rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: scheme.bg,
              color: scheme.text,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={22} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        {subtitle && (
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            {subtitle}
          </p>
        )}
        {badge && (
          <span className={`badge badge-${color}`} style={{ fontSize: '0.7rem' }}>
            {badge}
          </span>
        )}
      </div>
    </article>
  );
}
