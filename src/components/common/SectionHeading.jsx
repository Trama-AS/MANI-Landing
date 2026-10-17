import React from 'react';
import { Badge } from './Badge';

export const SectionHeading = ({
  kicker,
  title,
  subtitle,
  badgeIcon = null,
  align = 'center', // 'center' | 'left'
  className = ''
}) => {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: align === 'center' ? '760px' : '100%',
        margin: align === 'center' ? '0 auto 3rem auto' : '0 0 2.5rem 0'
      }}
      className={`section-header ${className}`}
    >
      {kicker && (
        <div style={{ marginBottom: '0.8rem' }}>
          <Badge variant="yellow" icon={badgeIcon}>
            {kicker}
          </Badge>
        </div>
      )}

      <h2
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '700',
          color: 'var(--color-navy)',
          letterSpacing: '-0.02em',
          marginBottom: '1rem',
          textTransform: 'uppercase'
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: 'var(--color-navy-muted)',
            fontWeight: '500',
            lineHeight: 1.5
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
