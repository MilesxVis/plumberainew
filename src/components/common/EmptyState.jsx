const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    {Icon && (
      <div className="p-4 rounded-full bg-gray-100 mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
    )}
    <h3 className="text-base font-semibold text-gray-700 mb-1">{title}</h3>
    {description && <p className="text-sm text-gray-400 max-w-xs">{description}</p>}
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
