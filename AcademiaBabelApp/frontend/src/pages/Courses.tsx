import React, { useEffect, useState } from 'react';
import { DataTable } from '../components/Common';
import { FormModal, FormField } from '../components/FormModal';
import { courseService } from '../services/api';
import { Plus } from 'lucide-react';

export const Courses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseService.getAll();
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (data: any) => {
    try {
      await courseService.create(data);
      await fetchCourses();
    } catch (error) {
      throw new Error('Falha ao adicionar curso');
    }
  };

  const formFields: FormField[] = [
    { name: 'nome_curso', label: 'Nome do Curso', type: 'text', required: true },
    { name: 'descricao', label: 'Descrição', type: 'textarea', required: true },
    { name: 'duracao_horas', label: 'Duração (horas)', type: 'number', required: true },
    { name: 'valor_curso', label: 'Valor do Curso', type: 'number', required: true },
  ];

  if (loading) {
    return <div className="page-container p-6">Carregando...</div>;
  }

  return (
    <div className="page-container p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cursos</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Adicionar Curso
        </button>
      </div>

      <div className="card">
        <DataTable
          columns={[
            { header: 'Nome', accessor: 'nome_curso' },
            { header: 'Duração (horas)', accessor: 'duracao_horas' },
            { header: 'Valor', accessor: 'valor_curso' },
            { header: 'Estado', accessor: 'estado_curso' },
          ]}
          data={courses}
        />
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCourse}
        title="Adicionar Novo Curso"
        fields={formFields}
      />
    </div>
  );
};
