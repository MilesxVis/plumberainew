const COLOR_MAP = {
  green:  'bg-green-500',
  yellow: 'bg-yellow-400',
  red:    'bg-red-500',
  blue:   'bg-blue-500',
  indigo: 'bg-indigo-600',
  orange: 'bg-orange-400',
  gray:   'bg-gray-400',
};

const SIZE_MAP = {
  sm:  'h-1.5',
  md:  'h-2.5',
  lg:  'h-4',
};

const ProgressBar = ({ value = 0, color = 'indigo', showLabel = false, size = 'md' }) => {
  const pct = Math.min(100, Math.max(0, value));
  const barColor = COLOR_MAP[color] || COLOR_MAP.indigo;
  const barSize  = SIZE_MAP[size]  || SIZE_MAP.md;

  return (
    <div className="flex items-center gap-2 w-full">
      <div className={`flex-1 bg-gray-100 rounded-full overflow-hidden ${barSize}`}>
        <div
          className={`${barColor} h-full rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && <span className="text-xs text-gray-500 w-8 text-right">{pct}%</span>}
    </div>
  );
};

export default ProgressBar;
