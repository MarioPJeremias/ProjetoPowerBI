import React, { useEffect, useState } from 'react';
import { DataTable, Card } from '../components/Common';
import { FormModal, FormField } from '../components/FormModal';
import { employeeService } from '../services/api';
import { Plus } from 'lucide-react';

export const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeService.getAll();
      setEmployees(response.data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (data: any) => {
    try {
      await employeeService.create(data);
      await fetchEmployees();
    } catch (error) {
      throw new Error('Falha ao adicionar funcionário');
    }
  };

  const formFields: FormField[] = [
    { name: 'nome', label: 'Nome', type: 'text', required: true },
    { name: 'sobrenome', label: 'Sobrenome', type: 'text', required: true },
    { name: 'data_nascimento', label: 'Data de Nascimento', type: 'date', required: true },
    {
      name: 'genero',
      label: 'Gênero',
      type: 'select',
      required: true,
      options: [
        { value: 'M', label: 'Masculino' },
        { value: 'F', label: 'Feminino' },
      ],
    },
    { name: 'estado', label: 'Estado', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'telefone', label: 'Telefone', type: 'text' },
    { name: 'salario', label: 'Salário', type: 'number', required: true },
  ];

  if (loading) {
    return <div className="page-container p-6">Carregando...</div>;
  }

  return (
    <div className="page-container p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Funcionários</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Adicionar Funcionário
        </button>
      </div>

      <div className="card">
        <DataTable
          columns={[
            { header: 'Nome', accessor: 'nome' },
            { header: 'Email', accessor: 'email' },
            { header: 'Telefone', accessor: 'telefone' },
            { header: 'Salário', accessor: 'salario' },
            { header: 'Data de Contratação', accessor: 'data_contratacao' },
          ]}
          data={employees}
          actions={[
            { label: 'Editar', onClick: (row) => console.log('Edit', row) },
            { label: 'Deletar', onClick: (row) => console.log('Delete', row) },
          ]}
        />
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEmployee}
        title="Adicionar Novo Funcionário"
        fields={formFields}
      />
    </div>
  );
};
