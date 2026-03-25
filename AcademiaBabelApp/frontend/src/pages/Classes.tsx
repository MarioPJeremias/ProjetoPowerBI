import React, { useEffect, useState } from 'react';
import { DataTable } from '../components/Common';
import { FormModal, FormField } from '../components/FormModal';
import { classService, courseService, employeeService } from '../services/api';
import { Plus } from 'lucide-react';

export const Classes: React.FC = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [classesRes, coursesRes, employeesRes] = await Promise.all([
        classService.getAll(),
        courseService.getAll(),
        employeeService.getAll(),
      ]);
      setClasses(classesRes.data);
      setCourses(coursesRes.data);
      setEmployees(employeesRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClass = async (data: any) => {
    try {
      await classService.create(data);
      await fetchData();
    } catch (error) {
      throw new Error('Falha ao adicionar turma');
    }
  };

  const formFields: FormField[] = [
    {
      name: 'id_curso',
      label: 'Curso',
      type: 'select',
      required: true,
      options: courses.map((c) => ({ value: c.id_curso, label: c.nome_curso })),
    },
    {
      name: 'id_instrutor',
      label: 'Instrutor',
      type: 'select',
      required: true,
      options: employees.map((e) => ({ value: e.id_funcionario, label: `${e.nome} ${e.sobrenome}` })),
    },
    { name: 'nome_turma', label: 'Nome da Turma', type: 'text', required: true },
    { name: 'data_inicio', label: 'Data de Início', type: 'date', required: true },
    { name: 'data_fim', label: 'Data de Término', type: 'date' },
    { name: 'capacidade_maxima', label: 'Capacidade Máxima', type: 'number', required: true },
  ];

  if (loading) {
    return <div className="page-container p-6">Carregando...</div>;
  }

  return (
    <div className="page-container p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Turmas</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Adicionar Turma
        </button>
      </div>

      <div className="card">
        <DataTable
          columns={[
            { header: 'Nome', accessor: 'nome_turma' },
            { header: 'Curso', accessor: 'nome_curso' },
            { header: 'Data de Início', accessor: 'data_inicio' },
            { header: 'Alunos', accessor: 'numero_alunos' },
            { header: 'Capacidade', accessor: 'capacidade_maxima' },
            { header: 'Estado', accessor: 'estado_turma' },
          ]}
          data={classes}
        />
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddClass}
        title="Adicionar Nova Turma"
        fields={formFields}
      />
    </div>
  );
};
