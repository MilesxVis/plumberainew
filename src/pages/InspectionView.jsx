import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, ChevronDown, ChevronRight, Droplets, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import ProgressBar from '../components/common/ProgressBar';
import FixtureTreeView from '../components/FixtureTree/FixtureTreeView';
import { inspections, findings, fixtureHierarchy, properties } from '../data/mockData';

const SEVERITY_COLOR = {
  Critical: 'border-red-200 bg-red-50',
  High:     'border-orange-200 bg-orange-50',
  Medium:   'border-yellow-200 bg-yellow-50',
  Low:      'border-green-200 bg-green-50',
};

const RoomRow = ({ room }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          {open ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
          <span className="font-medium text-gray-800 text-sm">{room.name}</span>
          <span className="text-xs text-gray-400">{room.fixtures} fixtures</span>
        </div>
        <StatusBadge status={room.condition} />
      </button>
      {open && (
        <div className="p-4 bg-white">
          <p className="text-sm text-gray-600">{room.notes || 'No additional notes.'}</p>
        </div>
      )}
    </div>
  );
};

const InspectionView = () => {
  const { id, inspectionId } = useParams();
  const navigate = useNavigate();

  const inspection = inspections.find((i) => i.id === inspectionId);
  const property = properties.find((p) => p.id === id);
  const inspectionFindings = findings.filter((f) => f.inspectionId === inspectionId);

  if (!inspection) return (
    <div className="p-6 text-center text-gray-500">
      Inspection not found. <button onClick={() => navigate(`/properties/${id}`)} className="text-indigo-600 underline ml-1">Back</button>
    </div>
  );

  const resultIcon = inspection.result === 'Passed'
    ? <CheckCircle className="w-5 h-5 text-green-500" />
    : inspection.result === 'Failed'
    ? <XCircle className="w-5 h-5 text-red-500" />
    : <AlertTriangle className="w-5 h-5 text-orange-500" />;

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex-shrink-0 print:hidden">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(`/properties/${id}`)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Property
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-4 h-4" /> Print Report
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-5xl mx-auto w-full">
        {/* Inspection Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {resultIcon}
                <h1 className="text-xl font-bold text-gray-900">Inspection Report</h1>
                <StatusBadge status={inspection.result} />
              </div>
              <p className="text-lg font-medium text-gray-700">{inspection.propertyName}</p>
              <p className="text-sm text-gray-400 mt-0.5">Inspected by {inspection.inspector} on {inspection.date}</p>
            </div>
            <div className={`flex items-center justify-center w-24 h-24 rounded-full border-4 flex-shrink-0
              ${inspection.score >= 80 ? 'border-green-300' : inspection.score >= 60 ? 'border-yellow-300' : 'border-red-300'}`}>
              <div className="text-center">
                <p className={`text-2xl font-bold ${inspection.score >= 80 ? 'text-green-600' : inspection.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {inspection.score}
                </p>
                <p className="text-xs text-gray-400">/ 100</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Water Pressure', value: inspection.waterPressure, icon: Droplets, color: 'blue' },
            { label: 'Drainage',       value: inspection.drainage,       icon: CheckCircle, color: inspection.drainage === 'Good' ? 'green' : 'yellow' },
            { label: 'Leaks Found',    value: inspection.leaksFound,     icon: AlertTriangle, color: inspection.leaksFound > 0 ? 'red' : 'green' },
            { label: 'Fixtures Inspected', value: inspection.fixturesInspected, icon: CheckCircle, color: 'indigo' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${color === 'blue' ? 'text-blue-500' : color === 'green' ? 'text-green-500' : color === 'red' ? 'text-red-500' : color === 'yellow' ? 'text-yellow-500' : 'text-indigo-500'}`} />
                <span className="text-xs text-gray-400">{label}</span>
              </div>
              <p className="font-semibold text-gray-800 text-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* Rooms */}
        {inspection.rooms && inspection.rooms.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Room-by-Room Breakdown</h2>
            <div className="space-y-2">
              {inspection.rooms.map((room) => <RoomRow key={room.id} room={room} />)}
            </div>
          </div>
        )}

        {/* Findings */}
        {inspectionFindings.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Findings & Recommendations ({inspectionFindings.length})</h2>
            <div className="space-y-3">
              {inspectionFindings.map((f) => (
                <div key={f.id} className={`rounded-xl border p-4 ${SEVERITY_COLOR[f.severity] || 'border-gray-100 bg-gray-50'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <StatusBadge status={f.severity} />
                      </div>
                      <p className="text-sm font-medium text-gray-800 mb-1">{f.description}</p>
                      <p className="text-xs text-gray-600"><span className="font-medium">Recommendation:</span> {f.recommendation}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-gray-400">Est. Cost</p>
                      <p className="font-semibold text-gray-800">${f.estimatedCost.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end pt-2 border-t border-gray-100">
                <div className="text-right">
                  <p className="text-xs text-gray-400">Total Estimated Cost</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${inspectionFindings.reduce((s, f) => s + f.estimatedCost, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fixture Tree */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">Fixture Model</h2>
            <p className="text-sm text-gray-400 mt-0.5">Interactive view of inspected fixtures</p>
          </div>
          <div style={{ height: '500px' }}>
            <FixtureTreeView data={fixtureHierarchy} propertyId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionView;
