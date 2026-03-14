import { ChevronRight, ChevronDown, Building2, Layers, MapPin, Wrench, Package } from 'lucide-react';

const CONDITION_STYLES = {
  Good:             { border: 'border-green-300',  bg: 'bg-green-50',  dot: 'bg-green-500',  text: 'text-green-700' },
  'Needs Attention':{ border: 'border-yellow-300', bg: 'bg-yellow-50', dot: 'bg-yellow-500', text: 'text-yellow-700' },
  Critical:         { border: 'border-red-300',    bg: 'bg-red-50',    dot: 'bg-red-500',    text: 'text-red-700' },
  'Not Inspected':  { border: 'border-gray-200',   bg: 'bg-gray-50',   dot: 'bg-gray-400',   text: 'text-gray-500' },
};

const TYPE_ICONS = {
  property: Building2,
  system:   Layers,
  zone:     MapPin,
  fixture:  Wrench,
  part:     Package,
};

const TreeNode = ({ node, onToggle, onSelect, selectedId, depth = 0 }) => {
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;
  const cond = CONDITION_STYLES[node.condition] || CONDITION_STYLES['Not Inspected'];
  const Icon = TYPE_ICONS[node.type] || Wrench;

  return (
    <div className="flex flex-col items-start">
      {/* Node card */}
      <div
        className={`relative flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all min-w-[180px] max-w-[220px]
          ${cond.border} ${cond.bg}
          ${isSelected ? 'ring-2 ring-indigo-400 shadow-md' : 'hover:shadow-sm'}
        `}
        onClick={() => onSelect(node)}
      >
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cond.dot}`} />
        <Icon className={`w-4 h-4 flex-shrink-0 ${cond.text}`} />
        <span className="text-xs font-medium text-gray-800 truncate flex-1">{node.name}</span>
        {hasChildren && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(node.id); }}
            className="ml-1 p-0.5 rounded hover:bg-white/60 transition-colors flex-shrink-0"
          >
            {node.expanded
              ? <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              : <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            }
          </button>
        )}
      </div>

      {/* Children */}
      {hasChildren && node.expanded && (
        <div className="flex flex-row gap-4 mt-1 ml-4 relative pt-3">
          {/* Horizontal connector line */}
          <div
            className="absolute top-0 left-0 h-px bg-gray-300"
            style={{ width: `calc(100% - 0px)` }}
          />
          {node.children.map((child, idx) => (
            <div key={child.id} className="flex flex-col items-start relative">
              {/* Vertical connector line */}
              <div className="absolute -top-3 left-[calc(50%-0.5px)] w-px h-3 bg-gray-300" />
              <TreeNode
                node={child}
                onToggle={onToggle}
                onSelect={onSelect}
                selectedId={selectedId}
                depth={depth + 1}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
