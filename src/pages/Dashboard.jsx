import { useNavigate } from 'react-router-dom';
import { Building2, ClipboardCheck, Wrench, AlertTriangle, ArrowRight, Calendar, Plus } from 'lucide-react';
import KPICard from '../components/common/KPICard';
import StatusBadge from '../components/common/StatusBadge';
import ProgressBar from '../components/common/ProgressBar';
import { properties, inspections, workOrders, kpiData, upcomingInspections } from '../data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const recentInspections = [...inspections].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  const openWorkOrders = workOrders.filter((w) => w.status !== 'Completed').slice(0, 4);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">{today}</p>
        </div>
        <button
          onClick={() => navigate('/properties')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Property
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Properties"
          value={kpiData.totalProperties}
          icon={Building2}
          trend={kpiData.trends.totalProperties}
          trendLabel=" since last quarter"
          color="indigo"
        />
        <KPICard
          title="Pending Inspections"
          value={kpiData.pendingInspections}
          icon={ClipboardCheck}
          trend={kpiData.trends.pendingInspections}
          trendLabel=" since last month"
          color="yellow"
        />
        <KPICard
          title="Open Work Orders"
          value={kpiData.openWorkOrders}
          icon={Wrench}
          trend={kpiData.trends.openWorkOrders}
          trendLabel=" since last week"
          color="blue"
        />
        <KPICard
          title="Fixtures Needing Attention"
          value={kpiData.fixturesNeedingAttention}
          icon={AlertTriangle}
          trend={kpiData.trends.fixturesNeedingAttention}
          trendLabel=" since last inspection"
          color="red"
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inspections */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Recent Inspections</h2>
            <button onClick={() => navigate('/properties')} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Property', 'Date', 'Inspector', 'Score', 'Result'].map((h) => (
                    <th key={h} className="pb-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentInspections.map((insp) => (
                  <tr
                    key={insp.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/properties/${insp.propertyId}/inspection/${insp.id}`)}
                  >
                    <td className="py-3 font-medium text-gray-800">{insp.propertyName}</td>
                    <td className="py-3 text-gray-500">{insp.date}</td>
                    <td className="py-3 text-gray-500">{insp.inspector}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <ProgressBar
                          value={insp.score}
                          color={insp.score >= 80 ? 'green' : insp.score >= 60 ? 'yellow' : 'red'}
                          size="sm"
                        />
                        <span className="text-xs font-medium text-gray-600 w-6">{insp.score}</span>
                      </div>
                    </td>
                    <td className="py-3"><StatusBadge status={insp.result} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Inspections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Upcoming</h2>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          <div className="space-y-3">
            {upcomingInspections.map((u) => (
              <div
                key={u.id}
                className="flex flex-col gap-0.5 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/properties/${u.propertyId}`)}
              >
                <p className="text-sm font-medium text-gray-800">{u.propertyName}</p>
                <p className="text-xs text-gray-400">{u.scheduledDate} · {u.type}</p>
                <p className="text-xs text-indigo-600">{u.inspector}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Properties overview + Work Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property cards */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Properties Overview</h2>
            <button onClick={() => navigate('/properties')} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {properties.slice(0, 4).map((prop) => (
              <div
                key={prop.id}
                className="p-4 border border-gray-100 rounded-xl hover:shadow-sm cursor-pointer transition-all"
                onClick={() => navigate(`/properties/${prop.id}`)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{prop.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{prop.type} · {prop.units} units</p>
                  </div>
                  <StatusBadge status={prop.status} />
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Health Score</span>
                    <span className="font-medium">{prop.healthScore}%</span>
                  </div>
                  <ProgressBar
                    value={prop.healthScore}
                    color={prop.healthScore >= 80 ? 'green' : prop.healthScore >= 60 ? 'yellow' : 'red'}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Work Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Active Work Orders</h2>
            <button onClick={() => navigate('/work-orders')} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {openWorkOrders.map((wo) => (
              <div key={wo.id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => navigate('/work-orders')}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">{wo.title}</p>
                  <StatusBadge status={wo.priority} />
                </div>
                <p className="text-xs text-gray-400 mt-1">{wo.propertyName}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <StatusBadge status={wo.status} />
                  <span className="text-xs text-gray-400">{wo.assignedTo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Schedule Inspection', icon: ClipboardCheck, color: 'indigo', path: '/properties' },
            { label: 'Create Work Order',   icon: Wrench,         color: 'blue',   path: '/work-orders' },
            { label: 'Add Property',        icon: Building2,      color: 'green',  path: '/properties' },
            { label: 'View Reports',        icon: AlertTriangle,  color: 'orange', path: '/reports' },
          ].map(({ label, icon: Icon, color, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all hover:shadow-sm
                ${color === 'indigo' ? 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100' :
                  color === 'blue'   ? 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100' :
                  color === 'green'  ? 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100' :
                                       'bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100'}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;