import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, Cpu } from 'lucide-react';
import AiChatPanel from '../components/ai/AiChatPanel';

export default function AiCopilotPage() {
  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <Sparkles size={24} color="var(--primary)" />
          <h1 style={{ margin: 0 }}>AI Financial Copilot</h1>
        </div>
        <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)' }}>
          Personalized college financial guidance powered by Google Gemini, grounded in your real MySQL transaction data.
        </p>
      </div>

      {/* Trust & Architecture Notice */}
      <div
        className="card"
        style={{
          marginBottom: '1.5rem',
          padding: '1rem 1.25rem',
          backgroundColor: 'var(--primary-light)',
          borderLeft: '4px solid var(--primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <ShieldCheck size={22} color="var(--primary)" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1, fontSize: '0.85rem' }}>
          <strong style={{ color: 'var(--primary)' }}>Deterministic Grounding Architecture:</strong>{' '}
          All calculations (allowance, expense totals, net savings, savings rate, and goal feasibility) are computed authoritatively by the Java backend using <code>BigDecimal</code> before being passed to Google Gemini. The AI explains and recommends, but never guesses the math!
        </div>
      </div>

      {/* Main Interactive AI Panel */}
      <AiChatPanel />
    </div>
  );
}
