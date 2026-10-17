import React from 'react';

export const Badge = ({
  children,
  variant = 'yellow', // 'yellow', 'navy', 'red', 'green', 'cream'
  size = 'md',        // 'sm', 'md'
  icon: Icon = null,
  className = ''
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'yellow':
        return {
          backgroundColor: 'var(--color-yellow)',
          color: 'var(--color-navy)',
          borderColor: 'var(--color-navy)'
        };
      case 'red':
        return {
          backgroundColor: 'var(--color-red-light)',
          color: 'var(--color-red)',
          borderColor: 'var(--color-red)'
        };
      case 'navy':
        return {
          backgroundColor: 'var(--color-navy)',
          color: '#FFFFFF',
          borderColor: 'var(--color-navy)'
        };
      case 'green':
        return {
          backgroundColor: 'var(--color-green-light)',
          color: '#065F46',
          borderColor: '#10B981'
        };
      case 'cream':
      default:
        return {
          backgroundColor: '#FFFFFF',
          color: 'var(--color-navy)',
          borderColor: 'var(--color-navy)'
        };
    }
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: size === 'sm' ? '0.2rem 0.6rem' : '0.35rem 0.9rem',
        borderRadius: 'var(--radius-pill)',
        border: '2px solid',
        fontFamily: 'var(--font-display)',
        fontSize: size === 'sm' ? '0.75rem' : '0.85rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
        boxShadow: '2px 2px 0px rgba(27, 42, 74, 0.4)',
        userSelect: 'none',
        ...getStyles()
      }}
      className={`comic-badge ${className}`}
    >
      {Icon && <Icon size={size === 'sm' ? 12 : 14} />}
      {children}
    </span>
  );
};
