import { useState, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize2, RefreshCw, Info } from 'lucide-react';
import TreeNode from './TreeNode';
import NodeDetailPanel from './NodeDetailPanel';

// Deep clone tree and set expanded state
const setAllExpanded = (node, expanded) => ({
  ...node,
  expanded,
  children: node.children ? node.children.map((c) => setAllExpanded(c, expanded)) : [],
});

const toggleNodeById = (node, targetId) => {
  if (node.id === targetId) return { ...node, expanded: !node.expanded };
  return {
    ...node,
    children: node.children ? node.children.map((c) => toggleNodeById(c, targetId)) : [],
  };
};

const findNodeById = (node, id) => {
  if (node.id === id) return node;
  if (!node.children) return null;
  for (const child of node.children) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  return null;
};

const FixtureTreeView = ({ data, propertyId }) => {
  const [tree, setTree] = useState(data ? setAllExpanded(data, true) : null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [scale, setScale] = useState(1);

  const handleToggle = useCallback((id) => {
    setTree((prev) => toggleNodeById(prev, id));
  }, []);

  const handleSelect = useCallback((node) => {
    setSelectedId(node.id);
    setSelectedNode(node);
  }, []);

  const handleExpandAll = () => setTree((prev) => setAllExpanded(prev, true));
  const handleCollapseAll = () => setTree((prev) => setAllExpanded(prev, false));
  const handleZoomIn = () => setScale((s) => Math.min(1.5, s + 0.1));
  const handleZoomOut = () => setScale((s) => Math.max(0.5, s - 0.1));
  const handleReset = () => { setScale(1); setSelectedId(null); setSelectedNode(null); };

  if (!tree) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        No fixture hierarchy data available.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100 bg-gray-50 flex-shrink-0">
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
          <button onClick={handleZoomOut} title="Zoom Out" className="p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-500 px-1 min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
          <button onClick={handleZoomIn} title="Zoom In" className="p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors">
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
        <button onClick={handleExpandAll} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
          <Maximize2 className="w-3.5 h-3.5" /> Expand All
        </button>
        <button onClick={handleCollapseAll} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
          Collapse All
        </button>
        <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
          <RefreshCw className="w-3.5 h-3.5" /> Reset
        </button>

        {/* Legend */}
        <div className="flex items-center gap-3 ml-auto text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Good</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" /> Needs Attention</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Critical</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-400 inline-block" /> Not Inspected</span>
        </div>
      </div>

      {/* Tree + Detail Panel */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', transition: 'transform 0.2s ease' }}>
            <TreeNode
              node={tree}
              onToggle={handleToggle}
              onSelect={handleSelect}
              selectedId={selectedId}
              depth={0}
            />
          </div>
        </div>

        {selectedNode && (
          <NodeDetailPanel
            node={selectedNode}
            onClose={() => { setSelectedId(null); setSelectedNode(null); }}
          />
        )}
      </div>

      {!selectedNode && (
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border-t border-blue-100 text-xs text-blue-600">
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          Click any node to view details. Use the ▶ / ▼ buttons to expand or collapse branches.
        </div>
      )}
    </div>
  );
};

export default FixtureTreeView;
