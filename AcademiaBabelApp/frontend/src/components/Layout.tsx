import React, { useState, ReactNode } from 'react';
import { Menu, X, Home, Users, BookOpen, DollarSign, FileText, LogOut } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: Home, href: '/' },
    { label: 'Alunos', icon: Users, href: '/students' },
    { label: 'Funcionários', icon: Users, href: '/employees' },
    { label: 'Cursos', icon: BookOpen, href: '/courses' },
    { label: 'Turmas', icon: BookOpen, href: '/classes' },
    { label: 'Finanças', icon: DollarSign, href: '/financial' },
    { label: 'Salários', icon: FileText, href: '/salary' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform duration-300 md:translate-x-0 md:static`}
      >
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Academia Babel</h1>
        </div>
        <nav className="p-4">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 w-full">
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Academia Babel Management System</h2>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
              AB
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
