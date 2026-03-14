import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Building2, SlidersHorizontal } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import SearchBar from '../components/common/SearchBar';
import ProgressBar from '../components/common/ProgressBar';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import { properties } from '../data/mockData';

const STATUSES = ['All', 'Good', 'Needs Attention', 'Critical'];
const TYPES = ['All', 'Residential', 'Commercial'];

const AddPropertyForm = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', address: '', type: 'Residential', units: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
        <input value={form.name} onChange={set('name')} required placeholder="e.g. Sunrise Apartments"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input value={form.address} onChange={set('address')} required placeholder="Full address"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select value={form.type} onChange={set('type')}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
            <option>Residential</option>
            <option>Commercial</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
          <input value={form.units} onChange={set('units')} type="number" min="1" placeholder="24"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button type="submit"
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          Add Property
        </button>
      </div>
    </form>
  );
};

const Properties = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [showModal, setShowModal] = useState(false);

  const filtered = properties
    .filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.address.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchType = typeFilter === 'All' || p.type === typeFilter;
      return matchSearch && matchStatus && matchType;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'health') return b.healthScore - a.healthScore;
      if (sortBy === 'fixtures') return b.fixtureCount - a.fixtureCount;
      return 0;
    });

  return (
    <div className="p-6 space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-sm text-gray-500">{properties.length} properties total</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Property
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-48">
          <SearchBar value={search} onChange={setSearch} placeholder="Search properties…" />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500 font-medium">Status:</span>
          <div className="flex gap-1">
            {STATUSES.map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                  ${statusFilter === s ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Type:</span>
          <div className="flex gap-1">
            {TYPES.map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                  ${typeFilter === t ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-gray-500">Sort:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-200">
            <option value="name">Name</option>
            <option value="health">Health Score</option>
            <option value="fixtures">Fixtures</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState icon={Building2} title="No properties found" description="Try adjusting your filters or search terms." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((prop) => (
            <div
              key={prop.id}
              onClick={() => navigate(`/properties/${prop.id}`)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 cursor-pointer hover:shadow-md hover:border-indigo-100 transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{prop.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{prop.type}</p>
                  </div>
                </div>
                <StatusBadge status={prop.status} />
              </div>

              {/* Address */}
              <p className="text-xs text-gray-500 mb-3 truncate">{prop.address}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-400">Units</p>
                  <p className="font-semibold text-gray-700 text-sm">{prop.units}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-400">Fixtures</p>
                  <p className="font-semibold text-gray-700 text-sm">{prop.fixtureCount}</p>
                </div>
              </div>

              {/* Health score */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Health Score</span>
                  <span className={`font-semibold ${prop.healthScore >= 80 ? 'text-green-600' : prop.healthScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {prop.healthScore}%
                  </span>
                </div>
                <ProgressBar
                  value={prop.healthScore}
                  color={prop.healthScore >= 80 ? 'green' : prop.healthScore >= 60 ? 'yellow' : 'red'}
                  size="sm"
                />
              </div>

              <p className="text-xs text-gray-400 mt-3">Last inspected: {prop.lastInspection}</p>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Property">
        <AddPropertyForm onClose={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default Properties;
