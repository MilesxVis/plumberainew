import { kpiData, properties, inspections } from '../data/mockData';
import ProgressBar from '../components/common/ProgressBar';
import { BarChart2, Building2, ClipboardCheck, Wrench, Calendar } from 'lucide-react';

const BarChartRow = ({ label, value, max, color = 'indigo' }) => (
  <div className="flex items-center gap-3">
    <span className="text-sm text-gray-600 w-36 text-right truncate">{label}</span>
    <div className="flex-1">
      <ProgressBar value={max > 0 ? (value / max) * 100 : 0} color={color} size="md" />
    </div>
    <span className="text-sm font-semibold text-gray-700 w-6 text-right">{value}</span>
  </div>
);

const Reports = () => {
  const { inspectionStats, workOrdersByStatus, fixturesByCondition } = kpiData;
  const sortedProperties = [...properties].sort((a, b) => b.healthScore - a.healthScore);

  const inspectorCounts = inspections.reduce((acc, insp) => {
    acc[insp.inspector] = (acc[insp.inspector] || 0) + 1;
    return acc;
  }, {});
  const maxInspections = Math.max(...Object.values(inspectorCounts));

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-sm text-gray-500">Portfolio-wide metrics and trends</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Inspections', value: inspectionStats.total, color: 'bg-indigo-50 text-indigo-700', icon: ClipboardCheck },
          { label: 'Passed',            value: inspectionStats.passed, color: 'bg-green-50 text-green-700', icon: ClipboardCheck },
          { label: 'Conditional',       value: inspectionStats.conditional, color: 'bg-orange-50 text-orange-700', icon: ClipboardCheck },
          { label: 'Failed',            value: inspectionStats.failed, color: 'bg-red-50 text-red-700', icon: ClipboardCheck },
        ].map(({ label, value, color, icon: Icon }) => (
          <div key={label} className={`rounded-xl p-4 ${color} flex items-center gap-3`}>
            <Icon className="w-8 h-8 opacity-60" />
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs font-medium opacity-80">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inspection Results */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <BarChart2 className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-semibold text-gray-900">Inspection Results</h2>
          </div>
          <div className="space-y-3">
            <BarChartRow label="Passed"      value={inspectionStats.passed}      max={inspectionStats.total} color="green" />
            <BarChartRow label="Conditional" value={inspectionStats.conditional} max={inspectionStats.total} color="orange" />
            <BarChartRow label="Failed"      value={inspectionStats.failed}      max={inspectionStats.total} color="red" />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Pass Rate</span>
              <span className="font-semibold text-green-600">
                {Math.round((inspectionStats.passed / inspectionStats.total) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Fixtures by Condition */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Wrench className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-semibold text-gray-900">Fixtures by Condition</h2>
          </div>
          <div className="space-y-3">
            <BarChartRow label="Good"             value={fixturesByCondition.good}         max={fixturesByCondition.good + fixturesByCondition.needsAttention + fixturesByCondition.critical} color="green" />
            <BarChartRow label="Needs Attention"  value={fixturesByCondition.needsAttention} max={fixturesByCondition.good + fixturesByCondition.needsAttention + fixturesByCondition.critical} color="yellow" />
            <BarChartRow label="Critical"         value={fixturesByCondition.critical}     max={fixturesByCondition.good + fixturesByCondition.needsAttention + fixturesByCondition.critical} color="red" />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Total Fixtures</span>
              <span className="font-semibold text-gray-700">
                {fixturesByCondition.good + fixturesByCondition.needsAttention + fixturesByCondition.critical}
              </span>
            </div>
          </div>
        </div>

        {/* Work Orders by Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <ClipboardCheck className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-semibold text-gray-900">Work Orders by Status</h2>
          </div>
          <div className="space-y-3">
            <BarChartRow label="Open"        value={workOrdersByStatus.open}        max={workOrdersByStatus.open + workOrdersByStatus.inProgress + workOrdersByStatus.completed} color="blue" />
            <BarChartRow label="In Progress" value={workOrdersByStatus.inProgress}  max={workOrdersByStatus.open + workOrdersByStatus.inProgress + workOrdersByStatus.completed} color="indigo" />
            <BarChartRow label="Completed"   value={workOrdersByStatus.completed}   max={workOrdersByStatus.open + workOrdersByStatus.inProgress + workOrdersByStatus.completed} color="green" />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Completion Rate</span>
              <span className="font-semibold text-green-600">
                {Math.round((workOrdersByStatus.completed / (workOrdersByStatus.open + workOrdersByStatus.inProgress + workOrdersByStatus.completed)) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Health Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Building2 className="w-4 h-4 text-indigo-600" />
          <h2 className="text-base font-semibold text-gray-900">Property Health Leaderboard</h2>
        </div>
        <div className="space-y-3">
          {sortedProperties.map((prop, idx) => (
            <div key={prop.id} className="flex items-center gap-4">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                ${idx === 0 ? 'bg-yellow-400 text-yellow-900' : idx === 1 ? 'bg-gray-300 text-gray-700' : idx === 2 ? 'bg-orange-300 text-orange-800' : 'bg-gray-100 text-gray-500'}`}>
                {idx + 1}
              </span>
              <span className="text-sm font-medium text-gray-700 w-48 truncate">{prop.name}</span>
              <div className="flex-1">
                <ProgressBar
                  value={prop.healthScore}
                  color={prop.healthScore >= 80 ? 'green' : prop.healthScore >= 60 ? 'yellow' : 'red'}
                  size="md"
                />
              </div>
              <span className={`text-sm font-bold w-10 text-right ${prop.healthScore >= 80 ? 'text-green-600' : prop.healthScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                {prop.healthScore}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Inspector Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <h2 className="text-base font-semibold text-gray-900">Inspector Activity</h2>
        </div>
        <div className="space-y-3">
          {Object.entries(inspectorCounts).map(([name, count]) => (
            <BarChartRow key={name} label={name} value={count} max={maxInspections} color="indigo" />
          ))}
        </div>
      </div>

      {/* Upcoming Maintenance Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <h2 className="text-base font-semibold text-gray-900">Upcoming Maintenance Schedule</h2>
        </div>
        <div className="space-y-2">
          {[
            { task: 'Annual Water Heater Flush & Inspection', property: 'Sunrise Apartments', due: '2025-01-20', priority: 'Medium' },
            { task: 'Backflow Preventer Annual Test',         property: 'Maple Grove Condos', due: '2025-01-25', priority: 'High' },
            { task: 'PRV Pressure Test & Calibration',       property: 'Downtown Office Tower', due: '2025-02-05', priority: 'High' },
            { task: 'Grease Trap Quarterly Pump-Out',        property: 'Riverside Retail Center', due: '2025-02-10', priority: 'High' },
            { task: 'Sump Pump Annual Inspection',           property: 'Maple Grove Condos', due: '2025-03-01', priority: 'Low' },
            { task: 'Irrigation System Spring Startup',      property: 'Cedar Valley Townhomes', due: '2025-03-15', priority: 'Low' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-800">{item.task}</p>
                <p className="text-xs text-gray-400">{item.property}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">{item.due}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full
                  ${item.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                    item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'}`}>
                  {item.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
