const baseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: '6px',
  border: '1px solid transparent',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 1,
  transition: 'background-color 100ms ease, opacity 100ms ease',
  cursor: 'pointer',
};

const sizeStyles = {
  sm: {
    height: '32px',
    padding: '0 12px',
  },
  md: {
    height: '38px',
    padding: '0 16px',
  },
};

const variantStyles = {
  primary: {
    background: 'var(--color-accent)',
    color: 'var(--color-accent-fg)',
    border: '1px solid var(--color-accent)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-text-muted)',
    border: '1px solid var(--color-border)',
  },
  danger: {
    background: 'transparent',
    color: 'var(--color-expense)',
    border: '1px solid var(--color-expense)',
  },
};

const disabledStyle = {
  opacity: 0.4,
  cursor: 'not-allowed',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) => {
  const style = {
    ...baseStyle,
    ...(sizeStyles[size] ?? sizeStyles.md),
    ...(variantStyles[variant] ?? variantStyles.primary),
    ...(disabled ? disabledStyle : null),
  };

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export { Button };
