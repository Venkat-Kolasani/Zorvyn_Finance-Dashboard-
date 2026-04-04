const variantStyles = {
  income: {
    background: 'var(--color-income-bg)',
    color: 'var(--color-income)',
  },
  expense: {
    background: 'var(--color-expense-bg)',
    color: 'var(--color-expense)',
  },
  neutral: {
    background: 'var(--color-surface-2)',
    color: 'var(--color-text-muted)',
  },
  default: {
    background: 'var(--color-accent)',
    color: 'var(--color-accent-fg)',
  },
  secondary: {
    background: 'var(--color-surface-2)',
    color: 'var(--color-text-muted)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--color-text-muted)',
    border: '1px solid var(--color-border)',
  },
};

const Badge = ({ children, variant = 'neutral' }) => {
  const style = variantStyles[variant] ?? variantStyles.neutral;

  return (
    <span
      style={{
        ...style,
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '999px',
        padding: '4px 8px',
        fontSize: '10px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
};

export { Badge };
