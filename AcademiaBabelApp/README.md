# Academia Babel - Comprehensive Management System

A complete full-stack web application for managing an educational institution, including student registration, employee management, course administration, and financial operations including salary management.

## 🎯 Features

### Student Management
- Register and manage student information
- Track student enrollment in courses
- Monitor student status and attendance
- Store contact information and personal details

### Employee Management
- Manage employee records and contracts
- Track salaries and employment status
- Store employee contact and personal information
- Assign instructors to classes

### Course Management
- Create and manage courses
- Track course duration and pricing
- Update course status and description
- Link courses to classes/turmas

### Class Management
- Create and organize classes (turmas)
- Assign instructors to classes
- Manage student enrollment in classes
- Track class capacity and enrollment numbers
- Set class dates and schedules

### Financial Management
- Record revenues from student payments
- Track expenses by category
- Generate financial reports
- Monitor profit/loss
- Track payment methods

### Salary Management
- Process individual salary payments
- Batch process salaries for all employees
- Calculate deductions (INSS, IR)
- Generate salary reports
- Track payment status

## 🏗️ Architecture

### Tech Stack

**Backend:**
- Node.js with Express.js
- TypeScript
- Databricks SQL for database
- RESTful API

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- Lucide React for icons

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Databricks account with SQL warehouse access
- Personal Access Token from Databricks

## 🚀 Installation & Setup

### 1. Databricks Configuration

First, set up your Databricks SQL warehouse:

1. Create a Databricks workspace or use an existing one
2. Create a SQL warehouse (if not already created)
3. Generate a Personal Access Token:
   - Go to Settings → User Settings → Access Tokens
   - Click "Generate New Token"
   - Copy the token

4. Get your workspace URL:
   - From your Databricks URL (e.g., `https://your-workspace.cloud.databricks.com`)

5. Get your HTTP Path:
   - In SQL warehouses, find your warehouse and copy the HTTP Path

### 2. Backend Setup

```bash
cd AcademiaBabelApp/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your Databricks credentials
# DATABRICKS_HOST=your-workspace.cloud.databricks.com
# DATABRICKS_TOKEN=dapi...
# DATABRICKS_HTTP_PATH=/sql/1.0/warehouses/...
# DATABRICKS_CATALOG=main
# DATABRICKS_SCHEMA=academia_babel

# Start development server (runs on port 5000)
npm run dev
```

### 3. Frontend Setup

```bash
cd AcademiaBabelApp/frontend

# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev
```

## 📊 Database Schema

### Tables

#### Funcionários (Employees)
- `id_funcionario`: Primary key
- `nome`, `sobrenome`: Full name
- `data_nascimento`: Birth date
- `genero`: Gender
- `estado`: State
- `email`, `telefone`: Contact info
- `salario`: Monthly salary
- `data_contratacao`: Hire date
- `status`: Employment status

#### Alunos (Students)
- `id_aluno`: Primary key
- `nome`, `sobrenome`: Full name
- `data_nascimento`: Birth date
- `genero`: Gender
- `data_inscricao`: Registration date
- `estado`: State
- `email`, `telefone`: Contact info
- `status`: Student status

#### Cursos (Courses)
- `id_curso`: Primary key
- `nome_curso`: Course name
- `descricao`: Description
- `duracao_horas`: Duration in hours
- `valor_curso`: Course price
- `estado_curso`: Course status

#### Turmas (Classes)
- `id_turma`: Primary key
- `id_curso`: Foreign key to Cursos
- `id_instrutor`: Foreign key to Funcionários
- `nome_turma`: Class name
- `data_inicio`, `data_fim`: Start and end dates
- `capacidade_maxima`: Maximum capacity
- `numero_alunos`: Current enrollment
- `estado_turma`: Class status

#### Inscrições (Enrollments)
- `id_inscricao`: Primary key
- `id_aluno`: Foreign key to Alunos
- `id_turma`: Foreign key to Turmas
- `data_inscricao`: Enrollment date
- `status`: Enrollment status
- `nota_final`: Final grade
- `data_conclusao`: Completion date

#### Receitas (Revenues)
- `id_receita`: Primary key
- `data_receita`: Revenue date
- `categoria`, `subcategoria`: Classification
- `quantidade`, `valor`: Amount and quantity
- `descricao`: Description
- `id_aluno`, `id_turma`: References
- `metodo_pagamento`: Payment method
- `status`: Payment status

#### Despesas (Expenses)
- `id_despesa`: Primary key
- `data_despesa`: Expense date
- `categoria`, `subcategoria`: Classification
- `quantidade`, `valor`: Amount and quantity
- `descricao`: Description
- `id_funcionario`: Reference to employee
- `metodo_pagamento`: Payment method
- `status`: Expense status

#### Pagamentos_Salario (Salary Payments)
- `id_pagamento`: Primary key
- `id_funcionario`: Foreign key to Funcionários
- `mes_referencia`: Reference month
- `valor_salario`: Gross salary
- `desconto_inss`: INSS deduction
- `desconto_ir`: IR deduction
- `outras_deducoes`: Other deductions
- `valor_liquido`: Net salary
- `data_pagamento`: Payment date
- `status`: Payment status

## 🔌 API Endpoints

### Students
- `GET /api/students` - List all students
- `POST /api/students` - Create new student
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student

### Employees
- `GET /api/employees` - List all employees
- `POST /api/employees` - Create new employee
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee

### Courses
- `GET /api/courses` - List all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/:id` - Get course by ID
- `PUT /api/courses/:id` - Update course

### Classes
- `GET /api/classes` - List all classes
- `POST /api/classes` - Create new class
- `PUT /api/classes/:id` - Update class
- `POST /api/classes/:classId/enroll` - Enroll student in class
- `GET /api/classes/:classId/enrollments` - Get class enrollments

### Financial
- `GET /api/financial/revenues` - List revenues
- `POST /api/financial/revenues` - Create revenue
- `GET /api/financial/expenses` - List expenses
- `POST /api/financial/expenses` - Create expense
- `GET /api/financial/summary` - Get financial summary

### Salary
- `GET /api/salary` - List salary payments
- `POST /api/salary` - Create salary payment
- `POST /api/salary/batch` - Process batch payments
- `PUT /api/salary/:id` - Update salary payment
- `GET /api/salary/report` - Get salary report

## 💻 User Interface

### Dashboard
- Financial overview (revenues, expenses, profit)
- Active students and classes count
- Quick navigation links

### Student Management Page
- Table of all students
- Add new student form
- Search and filter capabilities
- Edit and delete options

### Employee Management Page
- List of all employees
- Add new employee form
- Employee details and contact info
- Salary information

### Course Management Page
- List of all courses
- Add new course
- Course details and pricing

### Class Management Page
- List of all classes
- Create new class
- Enroll students in classes
- View class enrollments

### Financial Module
- Revenue tracking
- Expense tracking
- Financial reports and summary
- Income vs. Expenses visualization

### Salary Module
- Individual salary payments
- Batch payment processing
- Deduction calculations (INSS, IR)
- Salary reports and history

## 🔧 Configuration

### Environment Variables

Create `.env` file in backend directory:

```env
# Databricks Configuration
DATABRICKS_HOST=your-workspace.cloud.databricks.com
DATABRICKS_TOKEN=your-personal-access-token
DATABRICKS_HTTP_PATH=/sql/1.0/warehouses/your-warehouse-id
DATABRICKS_CATALOG=main
DATABRICKS_SCHEMA=academia_babel

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 📦 Building for Production

### Backend Build

```bash
cd backend
npm run build
npm start
```

### Frontend Build

```bash
cd frontend
npm run build
# Static files will be in dist/ directory
```

## 🧪 Testing

To test the application:

1. Start backend: `npm run dev` (from backend directory)
2. Start frontend: `npm run dev` (from frontend directory)
3. Access application at `http://localhost:3000`
4. Test data entry in each module

## 📱 Module Navigation

The sidebar provides access to all modules:
- Dashboard - Overview and summary
- Alunos (Students) - Student management
- Funcionários (Employees) - Employee management
- Cursos (Courses) - Course management
- Turmas (Classes) - Class management
- Finanças (Financial) - Financial tracking
- Salários (Salaries) - Salary management

## 🎨 UI/UX Features

- Responsive design (mobile, tablet, desktop)
- Clean and intuitive interface
- Form validation
- Error handling and user feedback
- Modal dialogs for data entry
- Data tables with sorting and filtering
- Card-based dashboard layout
- Color-coded metrics and indicators

## 🔐 Security Considerations

For production deployment:

1. Use environment variables for all sensitive data
2. Implement authentication and authorization
3. Use HTTPS for all API calls
4. Add rate limiting
5. Validate all user inputs
6. Implement proper CORS policies
7. Use API keys or JWT for authentication
8. Encrypt sensitive data in database
9. Regular security audits
10. Implement logging and monitoring

## 🚢 Deployment

### Docker Deployment (Optional)

Create Dockerfile for backend:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["node", "dist/server.js"]
```

### Cloud Deployment Options

- AWS (EC2, ECS, Elastic Beanstalk)
- Google Cloud (App Engine, Cloud Run)
- Azure (App Service)
- Heroku
- DigitalOcean

## 📝 Notes

- IDs are auto-generated using random numbers
- All timestamps include created_at and updated_at
- Status fields track entity state (ATIVO/INATIVO)
- Foreign keys maintain referential integrity
- Financial records are immutable (no deletion)

## 🤝 Support

For issues or questions:
1. Check the documentation
2. Review API endpoint structure
3. Check browser console for frontend errors
4. Check server logs for backend errors
5. Verify Databricks connection

## 📄 License

This project is provided as-is for Academia Babel management.

---

**Last Updated:** December 2024
**Version:** 1.0.0
