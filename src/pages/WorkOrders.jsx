import { useState } from 'react';
import { ChevronDown, ChevronRight, SlidersHorizontal, Wrench } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import SearchBar from '../components/common/SearchBar';
import EmptyState from '../components/common/EmptyState';
import { workOrders, properties } from '../data/mockData';

const STATUSES  = ['All', 'Open', 'In Progress', 'Completed'];
const PRIORITIES = ['All', 'Emergency', 'High', 'Medium', 'Low'];

const PRIORITY_BORDER = {
  Emergency: 'border-l-red-500',
  High:      'border-l-orange-400',
  Medium:    'border-l-yellow-400',
  Low:       'border-l-gray-300',
};

const WorkOrderCard = ({ wo }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 ${PRIORITY_BORDER[wo.priority] || 'border-l-gray-300'} overflow-hidden`}>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start gap-3 min-w-0">
          <div className="mt-0.5">
            {expanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{wo.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{wo.propertyName} · Created {wo.createdAt}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
          <StatusBadge status={wo.priority} />
          <StatusBadge status={wo.status} />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Description</p>
            <p className="text-sm text-gray-700">{wo.description}</p>
          </div>
          {wo.notes && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-700 mb-1">Notes</p>
              <p className="text-xs text-blue-600">{wo.notes}</p>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Assigned To', value: wo.assignedTo },
              { label: 'Property', value: wo.propertyName },
              { label: 'Priority', value: wo.priority },
              { label: 'Status', value: wo.status },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white rounded-lg p-2 border border-gray-100">
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium text-gray-700 mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const WorkOrders = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [propertyFilter, setPropertyFilter] = useState('All');

  const filtered = workOrders.filter((wo) => {
    const matchSearch = wo.title.toLowerCase().includes(search.toLowerCase()) ||
      wo.description.toLowerCase().includes(search.toLowerCase()) ||
      wo.assignedTo.toLowerCase().includes(search.toLowerCase());
    const matchStatus   = statusFilter   === 'All' || wo.status   === statusFilter;
    const matchPriority = priorityFilter === 'All' || wo.priority === priorityFilter;
    const matchProperty = propertyFilter === 'All' || wo.propertyId === propertyFilter;
    return matchSearch && matchStatus && matchPriority && matchProperty;
  });

  const counts = {
    open:       workOrders.filter((w) => w.status === 'Open').length,
    inProgress: workOrders.filter((w) => w.status === 'In Progress').length,
    completed:  workOrders.filter((w) => w.status === 'Completed').length,
    emergency:  workOrders.filter((w) => w.priority === 'Emergency').length,
  };

  return (
    <div className="p-6 space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Work Orders</h1>
        <p className="text-sm text-gray-500">{workOrders.length} total work orders</p>
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Open',        value: counts.open,       color: 'bg-blue-50 text-blue-700 border-blue-100' },
          { label: 'In Progress', value: counts.inProgress, color: 'bg-purple-50 text-purple-700 border-purple-100' },
          { label: 'Completed',   value: counts.completed,  color: 'bg-green-50 text-green-700 border-green-100' },
          { label: 'Emergency',   value: counts.emergency,  color: 'bg-red-50 text-red-700 border-red-100' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium ${color}`}>
            <span className="text-lg font-bold">{value}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-48">
            <SearchBar value={search} onChange={setSearch} placeholder="Search work orders…" />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <select value={propertyFilter} onChange={(e) => setPropertyFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-200">
              <option value="All">All Properties</option>
              {properties.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-gray-500 font-medium self-center">Status:</span>
          {STATUSES.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${statusFilter === s ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {s}
            </button>
          ))}
          <span className="text-xs text-gray-500 font-medium self-center ml-3">Priority:</span>
          {PRIORITIES.map((p) => (
            <button key={p} onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${priorityFilter === p ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState icon={Wrench} title="No work orders found" description="Try adjusting your filters." />
      ) : (
        <div className="space-y-3">
          {filtered.map((wo) => <WorkOrderCard key={wo.id} wo={wo} />)}
        </div>
      )}
    </div>
  );
};

export default WorkOrders;
