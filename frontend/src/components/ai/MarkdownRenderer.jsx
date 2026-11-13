import React from 'react';

/**
 * Lightweight Markdown Renderer for AI Advice.
 * Converts markdown headers, bolding, bullet points, blockquotes, and code blocks into semantic HTML.
 */
export default function MarkdownRenderer({ content = '' }) {
  if (!content) return null;

  // Split into paragraphs / lines
  const lines = content.split('\n');

  const renderedElements = [];
  let inList = false;
  let listItems = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      renderedElements.push(
        <ul key={`ul-${renderedElements.length}`} style={{ paddingLeft: '1.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {listItems.map((item, idx) => (
            <li key={idx} style={{ lineHeight: 1.5, fontSize: '0.925rem' }}>
              {formatInline(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const formatInline = (text) => {
    // Bold: **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushList();
      continue;
    }

    // Header 2: ## ...
    if (line.startsWith('## ')) {
      flushList();
      renderedElements.push(
        <h2 key={i} style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          {formatInline(line.replace('## ', ''))}
        </h2>
      );
    }
    // Header 3: ### ...
    else if (line.startsWith('### ')) {
      flushList();
      renderedElements.push(
        <h3 key={i} style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '1rem', marginBottom: '0.4rem', color: 'var(--primary)' }}>
          {formatInline(line.replace('### ', ''))}
        </h3>
      );
    }
    // Header 4: #### ...
    else if (line.startsWith('#### ')) {
      flushList();
      renderedElements.push(
        <h4 key={i} style={{ fontSize: '1rem', fontWeight: 700, marginTop: '0.75rem', marginBottom: '0.3rem', color: 'var(--text-primary)' }}>
          {formatInline(line.replace('#### ', ''))}
        </h4>
      );
    }
    // Blockquote: > ...
    else if (line.startsWith('> ')) {
      flushList();
      renderedElements.push(
        <blockquote
          key={i}
          style={{
            borderLeft: '4px solid var(--primary)',
            padding: '0.5rem 1rem',
            margin: '0.75rem 0',
            backgroundColor: 'var(--primary-light)',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            fontStyle: 'italic',
            fontSize: '0.9rem',
          }}
        >
          {formatInline(line.replace('> ', ''))}
        </blockquote>
      );
    }
    // Horizontal rule: ---
    else if (line === '---') {
      flushList();
      renderedElements.push(
        <hr key={i} style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.25rem 0' }} />
      );
    }
    // Bullet list: - ... or * ...
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      inList = true;
      listItems.push(line.substring(2));
    }
    // Regular paragraph
    else {
      flushList();
      renderedElements.push(
        <p key={i} style={{ fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          {formatInline(line)}
        </p>
      );
    }
  }

  flushList();

  return <div className="markdown-body">{renderedElements}</div>;
}
