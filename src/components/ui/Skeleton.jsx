import React from 'react';

const Skeleton = ({ width, height, className = '' }) => {
  return (
    <div
      className={`skeleton-base ${className}`}
      style={{
        width: width,
        height: height,
      }}
    />
  );
};

export { Skeleton };
