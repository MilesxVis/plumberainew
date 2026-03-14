import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const KPICard = ({ title, value, icon: Icon, trend, trendLabel, color = 'indigo' }) => {
  const colorMap = {
    indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', ring: 'ring-indigo-100' },
    green:  { bg: 'bg-green-50',  icon: 'text-green-600',  ring: 'ring-green-100' },
    yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600', ring: 'ring-yellow-100' },
    red:    { bg: 'bg-red-50',    icon: 'text-red-600',    ring: 'ring-red-100' },
    blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600',   ring: 'ring-blue-100' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', ring: 'ring-purple-100' },
  };
  const c = colorMap[color] || colorMap.indigo;

  const TrendIcon = trend?.direction === 'up' ? TrendingUp : trend?.direction === 'down' ? TrendingDown : Minus;
  const trendColor = trend?.direction === 'up' ? 'text-green-600' : trend?.direction === 'down' ? 'text-red-500' : 'text-gray-400';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {Icon && (
          <div className={`p-2 rounded-lg ${c.bg} ring-1 ${c.ring}`}>
            <Icon className={`w-5 h-5 ${c.icon}`} />
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {trend && (
        <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
          <TrendIcon className="w-3.5 h-3.5" />
          <span className="font-medium">{trend.value}</span>
          {trendLabel && <span className="text-gray-400">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
};

export default KPICard;
