const LoadingSkeleton = () => {
  return (
    <div className="skeleton-card" aria-label="Loading Pokemon data">
      <div className="skeleton skeleton-image" />
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-row" />
      <div className="skeleton skeleton-row" />
      <div className="skeleton skeleton-row" />
    </div>
  );
};

export default LoadingSkeleton;
