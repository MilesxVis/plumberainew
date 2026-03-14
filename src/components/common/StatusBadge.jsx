const STATUS_STYLES = {
  Good:             'bg-green-100 text-green-800',
  'Needs Attention':'bg-yellow-100 text-yellow-800',
  Critical:         'bg-red-100 text-red-800',
  Pending:          'bg-blue-100 text-blue-800',
  Passed:           'bg-green-100 text-green-800',
  Failed:           'bg-red-100 text-red-800',
  Conditional:      'bg-orange-100 text-orange-800',
  Open:             'bg-blue-100 text-blue-800',
  'In Progress':    'bg-purple-100 text-purple-800',
  Completed:        'bg-green-100 text-green-800',
  Low:              'bg-gray-100 text-gray-700',
  Medium:           'bg-yellow-100 text-yellow-800',
  High:             'bg-orange-100 text-orange-800',
  Emergency:        'bg-red-100 text-red-800',
  'Not Inspected':  'bg-gray-100 text-gray-500',
};

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] || 'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
