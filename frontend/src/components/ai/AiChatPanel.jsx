import React, { useState } from 'react';
import { Sparkles, Send, Copy, Check, RefreshCw, XCircle, Bot, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { useFinancial } from '../../context/FinancialContext';
import MarkdownRenderer from './MarkdownRenderer';
import LoadingSpinner from '../common/LoadingSpinner';

const SUGGESTIONS = [
  'Can I afford my Laptop goal in 6 months?',
  'What should I change to save ₹2,000 more per month?',
  'How do I trim discretionary expenses without ruining campus life?',
  'Explain how my savings rate and goal feasibility are calculated.',
];

export default function AiChatPanel() {
  const { userId, summary } = useFinancial();
  const [customQuestion, setCustomQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [adviceData, setAdviceData] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateAdvice = async (questionToAsk) => {
    const q = questionToAsk !== undefined ? questionToAsk : customQuestion;

    try {
      setLoading(true);
      setError(null);
      const res = await api.getAiAdvice(userId, { customQuestion: q });
      setAdviceData(res);
    } catch (err) {
      console.error('Failed to generate AI advice:', err);
      setError(err.message || 'Failed to connect to AI advisory service');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (adviceData?.adviceMarkdown) {
      navigator.clipboard.writeText(adviceData.adviceMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="card" style={{ padding: '1.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              padding: '0.6rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-gradient)',
              color: '#ffffff',
            }}
          >
            <Bot size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
              AI Financial Copilot
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Powered by Google Gemini & Deterministic Verification
            </span>
          </div>
        </div>

        {adviceData && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handleCopy}
              className="btn btn-secondary"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
              title="Copy Advice to Clipboard"
            >
              {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Advice'}
            </button>
            <button
              onClick={() => setAdviceData(null)}
              className="btn-icon"
              title="Clear Advice"
            >
              <XCircle size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Verified Data Snapshot Chips */}
      {summary && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--bg-surface-hover)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            marginBottom: '1.5rem',
            fontSize: '0.8rem',
          }}
        >
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Active Financial Context:</span>
          <span>Allowance: <strong>₹{Number(summary.monthlyAllowance).toLocaleString('en-IN')}</strong></span>
          <span>•</span>
          <span>Expenses: <strong>₹{Number(summary.totalExpenses).toLocaleString('en-IN')}</strong></span>
          <span>•</span>
          <span>Savings: <strong style={{ color: summary.isDeficit ? 'var(--danger)' : 'var(--success)' }}>
            ₹{Number(summary.monthlySavings).toLocaleString('en-IN')} ({summary.savingsRate}%)
          </strong></span>
          <span>•</span>
          <span>Goals: <strong>{summary.activeGoalsCount} active</strong></span>
        </div>
      )}

      {/* Suggested Questions */}
      <div style={{ marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
          Suggested Questions
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {SUGGESTIONS.map((text, i) => (
            <button
              key={i}
              type="button"
              disabled={loading}
              onClick={() => {
                setCustomQuestion(text);
                handleGenerateAdvice(text);
              }}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.color = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Question Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerateAdvice();
        }}
        style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}
      >
        <input
          type="text"
          className="form-input"
          placeholder="Ask a specific budget question (e.g. Can I afford a weekend trip to Goa?)"
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{ minWidth: '130px' }}
        >
          {loading ? (
            <RefreshCw size={16} className="animate-spin" />
          ) : (
            <>
              <Send size={16} /> Ask Copilot
            </>
          )}
        </button>
      </form>

      {/* Loading State */}
      {loading && (
        <LoadingSpinner message="Consulting verified budget data and synthesizing financial advice..." />
      )}

      {/* Error State */}
      {error && !loading && (
        <div
          className="card"
          style={{
            backgroundColor: 'var(--danger-light)',
            borderLeft: '4px solid var(--danger)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertCircle size={20} color="var(--danger)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{error}</span>
          </div>
          <button
            onClick={() => handleGenerateAdvice()}
            className="btn btn-secondary"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Advice Result Rendered */}
      {adviceData && !loading && (
        <div
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface-hover)',
            border: '1px solid var(--border)',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Engine: <strong>{adviceData.modelUsed}</strong></span>
            <span>{adviceData.offlineFallback ? 'Offline Mode' : 'Live Gemini AI'}</span>
          </div>

          <MarkdownRenderer content={adviceData.adviceMarkdown} />
        </div>
      )}
    </div>
  );
}
