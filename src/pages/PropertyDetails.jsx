import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Calendar, Wrench, ClipboardCheck, AlertTriangle } from 'lucide-react';
import TabNavigation from '../components/common/TabNavigation';
import StatusBadge from '../components/common/StatusBadge';
import ProgressBar from '../components/common/ProgressBar';
import FixtureTreeView from '../components/FixtureTree/FixtureTreeView';
import { properties, inspections, fixtures, workOrders, fixtureHierarchy } from '../data/mockData';

const TABS = [
  { id: 'overview',   label: 'Overview',        icon: Building2 },
  { id: 'fixtures',   label: 'Fixtures',         icon: Wrench },
  { id: 'inspections',label: 'Inspections',      icon: ClipboardCheck },
  { id: 'workorders', label: 'Work Orders',       icon: AlertTriangle },
  { id: 'model',      label: 'Plumbing Model',   icon: MapPin },
];

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');

  const property = properties.find((p) => p.id === id);
  if (!property) return (
    <div className="p-6 text-center text-gray-500">
      Property not found. <button onClick={() => navigate('/properties')} className="text-indigo-600 underline ml-1">Back to Properties</button>
    </div>
  );

  const propInspections = inspections.filter((i) => i.propertyId === id);
  const propFixtures = fixtures.filter((f) => f.propertyId === id);
  const propWorkOrders = workOrders.filter((w) => w.propertyId === id);
  const goodCount = propFixtures.filter((f) => f.condition === 'Good').length;
  const attnCount = propFixtures.filter((f) => f.condition === 'Needs Attention').length;
  const critCount = propFixtures.filter((f) => f.condition === 'Critical').length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex-shrink-0">
        <button onClick={() => navigate('/properties')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-3 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">{property.name}</h1>
                <StatusBadge status={property.status} />
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5" /> {property.address}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xs text-gray-400">Health Score</p>
              <p className={`text-2xl font-bold ${property.healthScore >= 80 ? 'text-green-600' : property.healthScore >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                {property.healthScore}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Type</p>
              <p className="text-sm font-semibold text-gray-700">{property.type}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Units</p>
              <p className="text-sm font-semibold text-gray-700">{property.units}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <TabNavigation tabs={TABS} activeTab={tab} onTabChange={setTab} />
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* ── Overview ── */}
        {tab === 'overview' && (
          <div className="space-y-6 max-w-5xl">
            {/* Summary stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Total Fixtures', value: property.fixtureCount, color: 'indigo' },
                { label: 'Inspections',    value: propInspections.length, color: 'blue' },
                { label: 'Work Orders',    value: propWorkOrders.length,  color: 'yellow' },
                { label: 'Last Inspected', value: property.lastInspection, color: 'green' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <p className="text-xs text-gray-400 mb-1">{label}</p>
                  <p className={`text-lg font-bold ${color === 'indigo' ? 'text-indigo-700' : color === 'blue' ? 'text-blue-700' : color === 'yellow' ? 'text-yellow-600' : 'text-green-600'}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Fixture health */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Fixture Condition Summary</h2>
              <div className="space-y-3">
                {[
                  { label: 'Good', count: goodCount, color: 'green', total: propFixtures.length },
                  { label: 'Needs Attention', count: attnCount, color: 'yellow', total: propFixtures.length },
                  { label: 'Critical', count: critCount, color: 'red', total: propFixtures.length },
                ].map(({ label, count, color, total }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-36">{label}</span>
                    <div className="flex-1">
                      <ProgressBar value={total > 0 ? (count / total) * 100 : 0} color={color} size="md" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 w-8 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Property Information</h2>
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { term: 'Property Name', def: property.name },
                  { term: 'Property Type', def: property.type },
                  { term: 'Number of Units', def: property.units },
                  { term: 'Total Fixtures', def: property.fixtureCount },
                  { term: 'Last Inspection', def: property.lastInspection },
                  { term: 'Health Status', def: property.status },
                ].map(({ term, def }) => (
                  <div key={term} className="bg-gray-50 rounded-lg p-3">
                    <dt className="text-xs text-gray-400 mb-0.5">{term}</dt>
                    <dd className="text-sm font-semibold text-gray-700">{def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}

        {/* ── Fixtures ── */}
        {tab === 'fixtures' && (
          <div className="max-w-4xl space-y-4">
            <h2 className="text-base font-semibold text-gray-900">Fixtures ({propFixtures.length})</h2>
            {propFixtures.length === 0 ? (
              <div className="text-sm text-gray-400">No fixtures found for this property.</div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Name', 'Type', 'Location', 'Brand', 'Condition', 'Last Inspected'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {propFixtures.map((f) => (
                      <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-800">{f.name}</td>
                        <td className="px-4 py-3 text-gray-500">{f.type}</td>
                        <td className="px-4 py-3 text-gray-500">{f.location}</td>
                        <td className="px-4 py-3 text-gray-500">{f.brand}</td>
                        <td className="px-4 py-3"><StatusBadge status={f.condition} /></td>
                        <td className="px-4 py-3 text-gray-500">{f.lastInspected}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── Inspections ── */}
        {tab === 'inspections' && (
          <div className="max-w-4xl space-y-4">
            <h2 className="text-base font-semibold text-gray-900">Inspections ({propInspections.length})</h2>
            <div className="space-y-3">
              {propInspections.map((insp) => (
                <div
                  key={insp.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md cursor-pointer transition-all"
                  onClick={() => navigate(`/properties/${id}/inspection/${insp.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <ClipboardCheck className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{insp.date}</p>
                        <p className="text-xs text-gray-500">Inspector: {insp.inspector}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Score</p>
                        <p className={`font-bold ${insp.score >= 80 ? 'text-green-600' : insp.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{insp.score}</p>
                      </div>
                      <StatusBadge status={insp.result} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Work Orders ── */}
        {tab === 'workorders' && (
          <div className="max-w-4xl space-y-4">
            <h2 className="text-base font-semibold text-gray-900">Work Orders ({propWorkOrders.length})</h2>
            <div className="space-y-3">
              {propWorkOrders.map((wo) => (
                <div key={wo.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-gray-800">{wo.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{wo.description}</p>
                      <p className="text-xs text-gray-400 mt-1">Assigned to: {wo.assignedTo} · Created: {wo.createdAt}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <StatusBadge status={wo.priority} />
                      <StatusBadge status={wo.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Plumbing Model ── */}
        {tab === 'model' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: '600px' }}>
            <FixtureTreeView data={fixtureHierarchy} propertyId={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;