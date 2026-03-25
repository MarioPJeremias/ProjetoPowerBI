import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs';
import { DataTable } from '../components/Common';
import { FormModal, FormField } from '../components/FormModal';
import { financialService, studentService, classService } from '../services/api';
import { Plus } from 'lucide-react';

export const Financial: React.FC = () => {
  const [revenues, setRevenues] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'revenue' | 'expense'>('revenue');
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [revRes, expRes, stuRes, classRes] = await Promise.all([
        financialService.getRevenues(),
        financialService.getExpenses(),
        studentService.getAll(),
        classService.getAll(),
      ]);
      setRevenues(revRes.data);
      setExpenses(expRes.data);
      setStudents(stuRes.data);
      setClasses(classRes.data);
    } catch (error) {
      console.error('Failed to fetch financial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRevenue = async (data: any) => {
    try {
      await financialService.createRevenue(data);
      await fetchData();
    } catch (error) {
      throw new Error('Falha ao registrar receita');
    }
  };

  const handleAddExpense = async (data: any) => {
    try {
      await financialService.createExpense(data);
      await fetchData();
    } catch (error) {
      throw new Error('Falha ao registrar despesa');
    }
  };

  const revenueFields: FormField[] = [
    { name: 'data_receita', label: 'Data', type: 'date', required: true },
    {
      name: 'categoria',
      label: 'Categoria',
      type: 'select',
      required: true,
      options: [
        { value: 'MENSALIDADE', label: 'Mensalidade' },
        { value: 'CURSO', label: 'Curso' },
        { value: 'OUTRA', label: 'Outra' },
      ],
    },
    { name: 'subcategoria', label: 'Subcategoria', type: 'text' },
    { name: 'valor', label: 'Valor', type: 'number', required: true },
    { name: 'descricao', label: 'Descrição', type: 'textarea' },
    {
      name: 'metodo_pagamento',
      label: 'Método de Pagamento',
      type: 'select',
      options: [
        { value: 'DINHEIRO', label: 'Dinheiro' },
        { value: 'CARTAO', label: 'Cartão' },
        { value: 'TRANSFERENCIA', label: 'Transferência' },
        { value: 'PIX', label: 'PIX' },
      ],
    },
  ];

  const expenseFields: FormField[] = [
    { name: 'data_despesa', label: 'Data', type: 'date', required: true },
    {
      name: 'categoria',
      label: 'Categoria',
      type: 'select',
      required: true,
      options: [
        { value: 'ALUGUEL', label: 'Aluguel' },
        { value: 'UTILIDADES', label: 'Utilidades' },
        { value: 'MATERIAL', label: 'Material' },
        { value: 'OUTRA', label: 'Outra' },
      ],
    },
    { name: 'subcategoria', label: 'Subcategoria', type: 'text' },
    { name: 'valor', label: 'Valor', type: 'number', required: true },
    { name: 'descricao', label: 'Descrição', type: 'textarea' },
  ];

  if (loading) {
    return <div className="page-container p-6">Carregando...</div>;
  }

  return (
    <div className="page-container p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Finanças</h1>

      <div className="card">
        <div className="flex gap-4">
          <button
            onClick={() => {
              setModalType('revenue');
              setIsModalOpen(true);
            }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Adicionar Receita
          </button>
          <button
            onClick={() => {
              setModalType('expense');
              setIsModalOpen(true);
            }}
            className="btn-secondary flex items-center gap-2"
          >
            <Plus size={20} />
            Adicionar Despesa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Receitas</h2>
          <DataTable
            columns={[
              { header: 'Data', accessor: 'data_receita' },
              { header: 'Categoria', accessor: 'categoria' },
              { header: 'Valor', accessor: 'valor' },
              { header: 'Status', accessor: 'status' },
            ]}
            data={revenues.slice(0, 10)}
          />
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Despesas</h2>
          <DataTable
            columns={[
              { header: 'Data', accessor: 'data_despesa' },
              { header: 'Categoria', accessor: 'categoria' },
              { header: 'Valor', accessor: 'valor' },
              { header: 'Status', accessor: 'status' },
            ]}
            data={expenses.slice(0, 10)}
          />
        </div>
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={modalType === 'revenue' ? handleAddRevenue : handleAddExpense}
        title={modalType === 'revenue' ? 'Adicionar Receita' : 'Adicionar Despesa'}
        fields={modalType === 'revenue' ? revenueFields : expenseFields}
      />
    </div>
  );
};

