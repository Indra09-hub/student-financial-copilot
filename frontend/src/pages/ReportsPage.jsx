import React, { useState, useEffect } from 'react';
import { Database, Play, CheckCircle2, FileText, Code2, ShieldAlert } from 'lucide-react';
import { api } from '../services/api';
import { useFinancial } from '../context/FinancialContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';

export default function ReportsPage() {
  const { userId, showToast } = useFinancial();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [txDemoRunning, setTxDemoRunning] = useState(false);
  const [txDemoResult, setTxDemoResult] = useState(null);

  const fetchJdbcReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getMonthlyJdbcReport(userId);
      setReport(data);
    } catch (err) {
      console.error('Failed to load JDBC report:', err);
      setError(err.message || 'Error generating direct JDBC report');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJdbcReport();
  }, [userId]);

  const handleRunTransactionDemo = async () => {
    try {
      setTxDemoRunning(true);
      const res = await api.runJdbcTransactionDemo(userId);
      setTxDemoResult(res);
      showToast('JDBC Transaction demonstration executed and committed successfully!', 'success');
      await fetchJdbcReport();
    } catch (err) {
      showToast(err.message || 'JDBC Transaction failed', 'danger');
    } finally {
      setTxDemoRunning(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={24} color="var(--primary)" />
            <h1 style={{ margin: 0 }}>Direct JDBC Reporting & Syllabus Module</h1>
          </div>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)' }}>
            Demonstrates direct <code>java.sql.DriverManager</code>, <code>Connection</code>, <code>PreparedStatement</code>, and <code>ResultSet</code> operations.
          </p>
        </div>

        <button
          onClick={handleRunTransactionDemo}
          disabled={txDemoRunning}
          className="btn btn-primary"
        >
          <Play size={16} /> {txDemoRunning ? 'Executing Transaction...' : 'Run Live JDBC Transaction Demo'}
        </button>
      </div>

      {/* Transaction Demo Result Banner */}
      {txDemoResult && (
        <div
          className="card"
          style={{
            marginBottom: '1.5rem',
            backgroundColor: 'var(--success-light)',
            borderLeft: '4px solid var(--success)',
            padding: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <CheckCircle2 size={22} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: 'var(--success)', fontWeight: 700, margin: 0 }}>
                {txDemoResult.status}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0.5rem' }}>
                Demonstrated topics:
              </p>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {txDemoResult.demonstratedConcepts?.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {error && <ErrorAlert message={error} onRetry={fetchJdbcReport} />}

      {loading && !report && (
        <LoadingSpinner message="Executing direct JDBC PreparedStatement on MySQL..." />
      )}

      {report && (
        <>
          {/* Metadata Card: Proving Direct JDBC */}
          <div
            className="card"
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--bg-surface-hover)',
              marginBottom: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Execution Engine: <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>{report.executionMethod}</span>
              </span>
              <span className="badge badge-info">
                Driver: {report.driverClass}
              </span>
            </div>

            {/* Display Executed SQL */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                <Code2 size={14} /> Exact Parameterized SQL Executed:
              </div>
              <pre
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                  overflowX: 'auto',
                  border: '1px solid var(--border)',
                }}
              >
                {report.executedSql}
              </pre>
            </div>
          </div>

          {/* Metric Summary from JDBC ResultSet */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div className="card" style={{ padding: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Transactions Counted (SQL COUNT)</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.2rem' }}>
                {report.totalTransactions}
              </div>
            </div>

            <div className="card" style={{ padding: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Spent (SQL SUM)</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }}>
                ₹{Number(report.totalSpent).toLocaleString('en-IN')}
              </div>
            </div>

            <div className="card" style={{ padding: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average Expense (SQL AVG)</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                ₹{Number(report.avgExpense).toLocaleString('en-IN')}
              </div>
            </div>

            <div className="card" style={{ padding: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Largest Expense (SQL MAX)</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--danger)', marginTop: '0.2rem' }}>
                ₹{Number(report.maxExpense).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Category Breakdown Table from ResultSet */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
              Category Aggregation (ResultSet Iterator)
            </h3>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Classification</th>
                    <th style={{ textAlign: 'right' }}>Transactions</th>
                    <th style={{ textAlign: 'right' }}>Total (SUM)</th>
                    <th style={{ textAlign: 'right' }}>Average (AVG)</th>
                  </tr>
                </thead>
                <tbody>
                  {report.categoryBreakdown?.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600 }}>{item.category}</td>
                      <td>
                        <span className={`badge ${item.expenseType?.toLowerCase() === 'essential' ? 'badge-essential' : 'badge-discretionary'}`}>
                          {item.expenseType}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>{item.count}</td>
                      <td style={{ textAlign: 'right', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        ₹{Number(item.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                        ₹{Number(item.avgAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Educational Comparison: JDBC vs Spring Data JPA */}
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem' }}>
              📚 Technical Architecture: Direct JDBC vs Spring Data JPA
            </h3>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Aspect</th>
                    <th>Direct JDBC (Demonstrated in this Report)</th>
                    <th>Spring Data JPA (Primary App Persistence)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Driver & Connectivity</strong></td>
                    <td><code>DriverManager.getConnection()</code> loading MySQL Connector/J</td>
                    <td>HikariCP connection pool managed by Spring Boot auto-configuration</td>
                  </tr>
                  <tr>
                    <td><strong>Query Execution</strong></td>
                    <td>Explicit <code>PreparedStatement</code> with indexed parameter binding (<code>ps.setLong(1, id)</code>)</td>
                    <td>Method-name derived queries (e.g. <code>findByUserId</code>) and JPQL <code>@Query</code></td>
                  </tr>
                  <tr>
                    <td><strong>Result Mapping</strong></td>
                    <td>Manual cursor iteration with <code>while(rs.next())</code> and typed getters</td>
                    <td>Automatic Object-Relational Mapping (ORM) to Entity objects via Hibernate</td>
                  </tr>
                  <tr>
                    <td><strong>Transactions</strong></td>
                    <td>Manual <code>conn.setAutoCommit(false)</code>, <code>conn.commit()</code>, <code>conn.rollback()</code></td>
                    <td>Declarative transaction demarcation with <code>@Transactional</code></td>
                  </tr>
                  <tr>
                    <td><strong>SQL Injection Prevention</strong></td>
                    <td>Parameter placeholders (<code>?</code>) compiled before value substitution</td>
                    <td>Hibernate parameterized queries and sanitized Criteria API</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
