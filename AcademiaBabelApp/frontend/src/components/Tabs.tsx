import React, { useState, ReactNode } from 'react';

interface TabItem {
  label: string;
  value: string;
}

interface TabsProps {
  items: TabItem[];
  children: ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ items, children }) => {
  const [activeTab, setActiveTab] = useState(items[0]?.value || '');

  return (
    <div>
      <div className="flex border-b border-gray-300 mb-4">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => setActiveTab(item.value)}
            className={`px-4 py-2 font-medium ${
              activeTab === item.value
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
};
