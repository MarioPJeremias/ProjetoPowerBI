import React, { useEffect, useState } from 'react';
import { DataTable, Card } from '../components/Common';
import { FormModal, FormField } from '../components/FormModal';
import { studentService } from '../services/api';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const Students: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await studentService.getAll();
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (data: any) => {
    try {
      await studentService.create(data);
      await fetchStudents();
    } catch (error) {
      throw new Error('Falha ao adicionar aluno');
    }
  };

  const formFields: FormField[] = [
    { name: 'nome', label: 'Nome', type: 'text', required: true, placeholder: 'Nome do aluno' },
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
    { name: 'estado', label: 'Estado', type: 'text', required: true, placeholder: 'SP, RJ, etc' },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'telefone', label: 'Telefone', type: 'text' },
  ];

  if (loading) {
    return <div className="page-container p-6">Carregando...</div>;
  }

  return (
    <div className="page-container p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Alunos</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Adicionar Aluno
        </button>
      </div>

      <div className="card">
        <DataTable
          columns={[
            { header: 'Nome', accessor: 'nome' },
            { header: 'Email', accessor: 'email' },
            { header: 'Telefone', accessor: 'telefone' },
            { header: 'Estado', accessor: 'estado' },
            { header: 'Data de Inscrição', accessor: 'data_inscricao' },
          ]}
          data={students}
          actions={[
            { label: 'Editar', onClick: (row) => console.log('Edit', row) },
            { label: 'Deletar', onClick: (row) => console.log('Delete', row) },
          ]}
        />
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
        title="Adicionar Novo Aluno"
        fields={formFields}
      />
    </div>
  );
};
