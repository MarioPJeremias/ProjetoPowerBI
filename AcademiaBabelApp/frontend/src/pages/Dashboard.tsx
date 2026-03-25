import React, { useEffect, useState } from 'react';
import { Card, DataTable } from '../components/Common';
import { financialService, studentService, classService } from '../services/api';
import { DollarSign, Users, BookOpen, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await financialService.getSummary();
        setSummary(response.data);
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="page-container p-6">Carregando...</div>;
  }

  return (
    <div className="page-container p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          title="Total de Receitas"
          value={`R$ ${summary?.total_receitas?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || 0}`}
          icon={<DollarSign size={24} />}
          trend={{ direction: 'up', percentage: 12 }}
        />
        <Card
          title="Total de Despesas"
          value={`R$ ${summary?.total_despesas?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || 0}`}
          icon={<TrendingUp size={24} />}
          trend={{ direction: 'down', percentage: 5 }}
        />
        <Card
          title="Alunos Ativos"
          value={summary?.total_alunos_ativos || 0}
          icon={<Users size={24} />}
        />
        <Card
          title="Turmas Ativas"
          value={summary?.turmas_ativas || 0}
          icon={<BookOpen size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Lucro Líquido</h2>
          <div className="text-4xl font-bold text-green-600">
            R$ {summary?.lucro_liquido?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || 0}
          </div>
          <p className="text-gray-600 text-sm mt-2">Receitas - Despesas</p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Atalhos Rápidos</h2>
          <div className="space-y-2">
            <a href="/students" className="block p-2 hover:bg-gray-100 rounded text-blue-600">
              → Gerenciar Alunos
            </a>
            <a href="/employees" className="block p-2 hover:bg-gray-100 rounded text-blue-600">
              → Gerenciar Funcionários
            </a>
            <a href="/classes" className="block p-2 hover:bg-gray-100 rounded text-blue-600">
              → Gerenciar Turmas
            </a>
            <a href="/financial" className="block p-2 hover:bg-gray-100 rounded text-blue-600">
              → Finanças
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
