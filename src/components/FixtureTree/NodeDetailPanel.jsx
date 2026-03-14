import { X, Calendar, Tag, AlertCircle, Package, CheckCircle } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const NodeDetailPanel = ({ node, onClose }) => {
  if (!node) return null;

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="w-72 flex-shrink-0 bg-white border-l border-gray-100 shadow-lg flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{node.name}</h3>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Type & Condition */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 capitalize">
            <Tag className="w-3 h-3" />
            {node.type}
          </span>
          {node.condition && <StatusBadge status={node.condition} />}
        </div>

        {/* Details */}
        <div className="space-y-2">
          {node.brand && (
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Brand</span>
              <span className="font-medium text-gray-700">{node.brand}</span>
            </div>
          )}
          {node.model && (
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Model</span>
              <span className="font-medium text-gray-700">{node.model}</span>
            </div>
          )}
          {node.lastInspected && (
            <div className="flex justify-between text-xs">
              <span className="text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" />Last Inspected</span>
              <span className="font-medium text-gray-700">{node.lastInspected}</span>
            </div>
          )}
        </div>

        {/* Condition indicator */}
        <div className={`rounded-lg p-3 text-xs ${
          node.condition === 'Good' ? 'bg-green-50 border border-green-100' :
          node.condition === 'Needs Attention' ? 'bg-yellow-50 border border-yellow-100' :
          node.condition === 'Critical' ? 'bg-red-50 border border-red-100' :
          'bg-gray-50 border border-gray-100'
        }`}>
          <div className="flex items-center gap-2">
            {node.condition === 'Good'
              ? <CheckCircle className="w-4 h-4 text-green-600" />
              : <AlertCircle className={`w-4 h-4 ${node.condition === 'Critical' ? 'text-red-600' : 'text-yellow-600'}`} />
            }
            <span className="font-medium">
              {node.condition === 'Good' ? 'No issues detected'
               : node.condition === 'Needs Attention' ? 'Attention required'
               : node.condition === 'Critical' ? 'Critical – immediate action'
               : 'Not yet inspected'}
            </span>
          </div>
        </div>

        {/* Children list */}
        {hasChildren && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
              <Package className="w-3 h-3" />
              Sub-components ({node.children.length})
            </p>
            <ul className="space-y-1">
              {node.children.map((child) => (
                <li key={child.id} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-gray-50">
                  <span className="text-gray-700">{child.name}</span>
                  {child.condition && <StatusBadge status={child.condition} />}
                </li>
              ))}
            </ul>
          </div>
        )}

        {node.notes && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-700">
            <p className="font-medium mb-1">Notes</p>
            <p>{node.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeDetailPanel;
