import React from 'react';
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Users } from 'lucide-react';

interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
  };
}

export const Card: React.FC<CardProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.direction === 'up' ? (
                <ArrowUpRight size={16} className="text-green-500" />
              ) : (
                <ArrowDownLeft size={16} className="text-red-500" />
              )}
              <span className={trend.direction === 'up' ? 'text-green-500' : 'text-red-500'}>
                {trend.percentage}%
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-100 rounded-lg text-blue-600">{icon}</div>
      </div>
    </div>
  );
};

interface DataTableProps {
  columns: { header: string; accessor: string }[];
  data: any[];
  actions?: {
    label: string;
    onClick: (row: any) => void;
  }[];
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-700 font-semibold">
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3 text-left">{col.header}</th>
            ))}
            {actions && <th className="px-6 py-3 text-left">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="px-6 py-4 text-gray-800">
                  {row[col.accessor] || '-'}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {actions.map((action, actIdx) => (
                      <button
                        key={actIdx}
                        onClick={() => action.onClick(row)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
