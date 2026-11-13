import React, { useRef, useEffect } from 'react';

/**
 * HTML5 Canvas 2D Visualization Component.
 * Demonstrates Syllabus Unit:
 * - HTML5 <canvas> element
 * - 2D Rendering Context (canvas.getContext('2d'))
 * - Drawing paths, arcs, gradients, and typography directly with JavaScript Canvas API.
 */
export default function CanvasGauge({
  value = 0,
  max = 100,
  label = 'Savings Rate',
  color = '#4f46e5',
  size = 180,
  isDeficit = false,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.38;
    const lineWidth = 12;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // 1. Draw Background Track Arc (240 degrees, from 150 deg to 390 deg)
    const startAngle = (150 * Math.PI) / 180;
    const endAngle = (390 * Math.PI) / 180;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? '#232f45' : '#e2e8f0';
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();

    // 2. Draw Progress Indicator Arc
    const clampedValue = Math.max(0, Math.min(value, max));
    const progressRatio = max > 0 ? clampedValue / max : 0;
    const sweepAngle = (390 - 150) * (Math.PI / 180);
    const progressEndAngle = startAngle + sweepAngle * progressRatio;

    // Resolve color in case a CSS variable like 'var(--primary)' was passed
    let resolvedColor = color;
    if (typeof color === 'string' && color.includes('var(')) {
      const match = color.match(/var\(([^)]+)\)/);
      if (match && match[1]) {
        const computed = getComputedStyle(document.documentElement).getPropertyValue(match[1].trim()).trim();
        if (computed) resolvedColor = computed;
      }
    }
    if (!resolvedColor || resolvedColor.includes('var(')) {
      resolvedColor = '#4f46e5';
    }

    if (progressRatio > 0 && !isDeficit) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, progressEndAngle);

      // Create smooth radial/linear gradient
      try {
        const gradient = ctx.createLinearGradient(0, size, size, 0);
        gradient.addColorStop(0, resolvedColor);
        gradient.addColorStop(1, '#8b5cf6');
        ctx.strokeStyle = gradient;
      } catch {
        ctx.strokeStyle = resolvedColor;
      }

      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();
    } else if (isDeficit) {
      // Overspending Warning Arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // 3. Draw Center Numerical Value
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
    ctx.font = `700 ${size * 0.16}px 'Plus Jakarta Sans', sans-serif`;

    const displayText = isDeficit ? 'DEFICIT' : `${Math.round(clampedValue)}%`;
    ctx.fillText(displayText, centerX, centerY - size * 0.04);

    // 4. Draw Label underneath value
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.font = `600 ${size * 0.08}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText(label, centerX, centerY + size * 0.16);

  }, [value, max, label, color, size, isDeficit]);

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          display: 'block',
        }}
        title={`${label}: ${value}%`}
      />
    </div>
  );
}
