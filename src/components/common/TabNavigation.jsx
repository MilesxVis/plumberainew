const TabNavigation = ({ tabs = [], activeTab, onTabChange }) => (
  <div className="flex gap-1 border-b border-gray-200">
    {tabs.map(({ id, label, icon: Icon }) => {
      const active = activeTab === id;
      return (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap
            ${active
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
        >
          {Icon && <Icon className="w-4 h-4" />}
          {label}
        </button>
      );
    })}
  </div>
);

export default TabNavigation;
