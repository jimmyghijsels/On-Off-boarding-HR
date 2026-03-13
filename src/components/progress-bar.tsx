interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  className?: string;
  showPercentage?: boolean;
}

export function ProgressBar({ value, max, label, className = "", showPercentage = true }: ProgressBarProps) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[var(--neutral-700)]">{label}</span>
          {showPercentage && (
            <span className="text-sm text-[var(--neutral-500)]">{percentage}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-[var(--neutral-200)] rounded-full h-2">
        <div
          className="bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-600)] h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}