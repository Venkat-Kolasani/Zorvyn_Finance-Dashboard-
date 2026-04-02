const Card = ({ children, className = '' }) => {
  return (
    <div
      className={className}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding: '24px',
      }}
    >
      {children}
    </div>
  );
};

export { Card };
