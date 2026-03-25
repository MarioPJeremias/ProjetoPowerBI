import React, { useEffect, useState } from 'react';
import { DataTable } from '../components/Common';
import { FormModal, FormField } from '../components/FormModal';
import { salaryService, employeeService } from '../services/api';
import { Plus } from 'lucide-react';

export const Salary: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [payRes, empRes] = await Promise.all([
        salaryService.getPayments(),
        employeeService.getAll(),
      ]);
      setPayments(payRes.data);
      setEmployees(empRes.data);
    } catch (error) {
      console.error('Failed to fetch salary data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPayment = async (data: any) => {
    try {
      await salaryService.create(data);
      await fetchData();
    } catch (error) {
      throw new Error('Falha ao adicionar pagamento');
    }
  };

  const handleBatchPayment = async (data: any) => {
    try {
      await salaryService.processBatch(data);
      await fetchData();
    } catch (error) {
      throw new Error('Falha ao processar pagamentos em lote');
    }
  };

  const paymentFields: FormField[] = [
    {
      name: 'id_funcionario',
      label: 'Funcionário',
      type: 'select',
      required: true,
      options: employees.map((e) => ({
        value: e.id_funcionario,
        label: `${e.nome} ${e.sobrenome}`,
      })),
    },
    { name: 'mes_referencia', label: 'Mês de Referência', type: 'date', required: true },
    { name: 'valor_salario', label: 'Valor do Salário', type: 'number', required: true },
    { name: 'desconto_inss', label: 'Desconto INSS', type: 'number' },
    { name: 'desconto_ir', label: 'Desconto IR', type: 'number' },
    { name: 'outras_deducoes', label: 'Outras Deduções', type: 'number' },
    { name: 'observacoes', label: 'Observações', type: 'textarea' },
  ];

  const batchFields: FormField[] = [
    { name: 'mes_referencia', label: 'Mês de Referência', type: 'date', required: true },
    { name: 'desconto_inss_percentual', label: '% INSS', type: 'number', required: true },
    { name: 'desconto_ir_percentual', label: '% IR', type: 'number', required: true },
  ];

  if (loading) {
    return <div className="page-container p-6">Carregando...</div>;
  }

  return (
    <div className="page-container p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Salários</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Novo Pagamento
          </button>
          <button
            onClick={() => setIsBatchModalOpen(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <Plus size={20} />
            Processar Lote
          </button>
        </div>
      </div>

      <div className="card">
        <DataTable
          columns={[
            { header: 'Funcionário', accessor: 'nome' },
            { header: 'Mês Referência', accessor: 'mes_referencia' },
            { header: 'Salário', accessor: 'valor_salario' },
            { header: 'INSS', accessor: 'desconto_inss' },
            { header: 'IR', accessor: 'desconto_ir' },
            { header: 'Valor Líquido', accessor: 'valor_liquido' },
            { header: 'Status', accessor: 'status' },
          ]}
          data={payments}
        />
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPayment}
        title="Adicionar Pagamento de Salário"
        fields={paymentFields}
      />

      <FormModal
        isOpen={isBatchModalOpen}
        onClose={() => setIsBatchModalOpen(false)}
        onSubmit={handleBatchPayment}
        title="Processar Pagamentos em Lote"
        fields={batchFields}
      />
    </div>
  );
};
