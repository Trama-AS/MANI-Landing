import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  bgColor = '#FFFFFF',
  borderColor = 'var(--color-navy)',
  shadowType = 'md', // 'sm', 'md', 'lg', 'none'
  padding = '1.75rem',
  style = {}
}) => {
  const getShadow = () => {
    switch (shadowType) {
      case 'sm': return 'var(--shadow-sm)';
      case 'lg': return 'var(--shadow-lg)';
      case 'none': return 'none';
      case 'md':
      default: return 'var(--shadow-md)';
    }
  };

  return (
    <div
      style={{
        backgroundColor: bgColor,
        border: `3px solid ${borderColor}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: getShadow(),
        padding: padding,
        transition: 'var(--transition-bounce)',
        position: 'relative',
        ...style
      }}
      className={`comic-card ${className}`}
      onMouseEnter={(e) => {
        if (hoverEffect && shadowType !== 'none') {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverEffect && shadowType !== 'none') {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = getShadow();
        }
      }}
    >
      {children}
    </div>
  );
};
