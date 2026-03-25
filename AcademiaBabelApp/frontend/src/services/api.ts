import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Students
export const studentService = {
  getAll: () => api.get('/students'),
  getById: (id: number) => api.get(`/students/${id}`),
  create: (data: any) => api.post('/students', data),
  update: (id: number, data: any) => api.put(`/students/${id}`, data),
};

// Employees
export const employeeService = {
  getAll: () => api.get('/employees'),
  getById: (id: number) => api.get(`/employees/${id}`),
  create: (data: any) => api.post('/employees', data),
  update: (id: number, data: any) => api.put(`/employees/${id}`, data),
};

// Courses
export const courseService = {
  getAll: () => api.get('/courses'),
  getById: (id: number) => api.get(`/courses/${id}`),
  create: (data: any) => api.post('/courses', data),
  update: (id: number, data: any) => api.put(`/courses/${id}`, data),
};

// Classes
export const classService = {
  getAll: () => api.get('/classes'),
  create: (data: any) => api.post('/classes', data),
  update: (id: number, data: any) => api.put(`/classes/${id}`, data),
  enrollStudent: (classId: number, data: any) =>
    api.post(`/classes/${classId}/enroll`, data),
  getEnrollments: (classId: number) => api.get(`/classes/${classId}/enrollments`),
};

// Financial
export const financialService = {
  getRevenues: () => api.get('/financial/revenues'),
  createRevenue: (data: any) => api.post('/financial/revenues', data),
  getExpenses: () => api.get('/financial/expenses'),
  createExpense: (data: any) => api.post('/financial/expenses', data),
  getSummary: () => api.get('/financial/summary'),
};

// Salary
export const salaryService = {
  getPayments: () => api.get('/salary'),
  create: (data: any) => api.post('/salary', data),
  processBatch: (data: any) => api.post('/salary/batch', data),
  update: (id: number, data: any) => api.put(`/salary/${id}`, data),
  getReport: (mesReferencia?: string) =>
    api.get('/salary/report', { params: { mes_referencia: mesReferencia } }),
};

export default api;
