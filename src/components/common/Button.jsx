import React from 'react';

/**
 * Botón con estilo Retro Cómic / Neo-Brutalista representativo de MANI
 */
export const Button = ({
  children,
  onClick,
  variant = 'primary', // 'primary' (rojo), 'secondary' (mostaza), 'navy' (tinta azul), 'outline', 'ghost'
  size = 'md',        // 'sm', 'md', 'lg', 'xl'
  fullWidth = false,
  icon: Icon = null,
  iconRight: IconRight = null,
  disabled = false,
  type = 'button',
  className = '',
  title = ''
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-red)',
          color: '#FFFFFF',
          border: 'var(--border-thick)',
          boxShadow: 'var(--shadow-md)'
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--color-yellow)',
          color: 'var(--color-navy)',
          border: 'var(--border-thick)',
          boxShadow: 'var(--shadow-md)'
        };
      case 'navy':
        return {
          backgroundColor: 'var(--color-navy)',
          color: '#FFFFFF',
          border: 'var(--border-thick)',
          boxShadow: 'var(--shadow-yellow-md)'
        };
      case 'outline':
        return {
          backgroundColor: '#FFFFFF',
          color: 'var(--color-navy)',
          border: 'var(--border-thick)',
          boxShadow: 'var(--shadow-md)'
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-navy)',
          border: '2px solid transparent',
          boxShadow: 'none'
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '0.45rem 0.9rem', fontSize: '0.875rem' };
      case 'lg':
        return { padding: '0.9rem 1.8rem', fontSize: '1.15rem' };
      case 'xl':
        return { padding: '1.15rem 2.2rem', fontSize: '1.3rem' };
      case 'md':
      default:
        return { padding: '0.7rem 1.4rem', fontSize: '1rem' };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.6rem',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-display)',
        fontWeight: '700',
        letterSpacing: '0.02em',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'var(--transition-bounce)',
        width: fullWidth ? '100%' : 'auto',
        textTransform: 'uppercase',
        userSelect: 'none',
        ...getVariantStyles(),
        ...getSizeStyles()
      }}
      className={`mani-btn ${className}`}
      onMouseDown={(e) => {
        if (!disabled && variant !== 'ghost') {
          e.currentTarget.style.transform = 'translate(3px, 3px)';
          e.currentTarget.style.boxShadow = '1px 1px 0px var(--color-navy)';
        }
      }}
      onMouseUp={(e) => {
        if (!disabled && variant !== 'ghost') {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        }
      }}
      onMouseEnter={(e) => {
        if (!disabled && variant !== 'ghost') {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && variant !== 'ghost') {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = getVariantStyles().boxShadow || 'none';
        }
      }}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 22 : size === 'xl' ? 26 : 18} />}
      <span>{children}</span>
      {IconRight && <IconRight size={size === 'sm' ? 16 : size === 'lg' ? 22 : size === 'xl' ? 26 : 18} />}
    </button>
  );
};
