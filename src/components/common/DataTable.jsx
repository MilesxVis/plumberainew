import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const DataTable = ({ columns = [], data = [], onSort }) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (key) => {
    const newDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDir(newDir);
    onSort && onSort(key, newDir);
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide
                  ${col.sortable ? 'cursor-pointer select-none hover:text-gray-700' : ''}`}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-400 text-sm">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={row.id || i} className="hover:bg-gray-50/70 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-gray-700">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
