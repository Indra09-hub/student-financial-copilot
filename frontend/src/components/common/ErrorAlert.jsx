import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorAlert({ message, onRetry }) {
  return (
    <div
      className="card"
      style={{
        borderLeft: '4px solid var(--danger)',
        backgroundColor: 'var(--danger-light)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}
      role="alert"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <AlertCircle size={22} color="var(--danger)" style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--danger)', margin: 0 }}>
            Unable to load data
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.2rem 0 0' }}>
            {message || 'An error occurred while communicating with the Spring Boot server.'}
          </p>
        </div>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-secondary"
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          <RefreshCw size={14} /> Retry
        </button>
      )}
    </div>
  );
}
