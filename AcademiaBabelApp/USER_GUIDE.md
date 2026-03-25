# Academia Babel - User Guide & Features Overview

## 📱 Application Interface Overview

### Main Navigation

The application features a sleek sidebar with navigation to all modules:

```
┌─────────────────────────────────────────────────────────┐
│ SIDEBAR (Dark)                                           │
├─────────────────────────────────────────────────────────┤
│ Academia Babel                                           │
├─────────────────────────────────────────────────────────┤
│ 🏠 Dashboard                                             │
│ 👥 Alunos (Students)                                    │
│ 👔 Funcionários (Employees)                             │
│ 📚 Cursos (Courses)                                     │
│ 📖 Turmas (Classes)                                     │
│ 💰 Finanças (Financial)                                 │
│ 📄 Salários (Salaries)                                  │
└─────────────────────────────────────────────────────────┘
```

### Header
- Application title
- Mobile menu toggle
- User profile badge

---

## 🎯 Dashboard Module

**Purpose:** Central overview of your academy's operations

### Displayed Metrics

1. **Total de Receitas** (Total Revenue)
   - Shows total income from all sources
   - Includes trend indicator (↑ up or ↓ down)
   - Color: Blue

2. **Total de Despesas** (Total Expenses)
   - Shows total expenses and operational costs
   - Includes trend percentage
   - Color: Blue

3. **Alunos Ativos** (Active Students)
   - Current count of active students
   - Quick reference for enrollment status
   - Color: Green

4. **Turmas Ativas** (Active Classes)
   - Number of ongoing or planned classes
   - Real-time count
   - Color: Purple

5. **Lucro Líquido** (Net Profit)
   - Calculated as: Total Revenues - Total Expenses
   - Displayed prominently in large green text
   - Indicates financial health

### Quick Links
- Direct navigation to Student Management
- Quick access to Employee Management
- Fast links to Class Management
- Shortcut to Financial Module

---

## 👥 Student Management Module

### Features

**View All Students**
- Table displaying all registered students
- Columns: Name, Email, Phone, State, Registration Date
- Edit and delete options for each student

**Add New Student**
- Click "Adicionar Aluno" button
- Modal form opens with fields:
  - Nome (First Name) - required
  - Sobrenome (Last Name) - required
  - Data de Nascimento (Birth Date) - required
  - Gênero (Gender) - dropdown: Masculino/Feminino
  - Estado (State) - required
  - Email - required
  - Telefone (Phone) - optional

**Data Entry**
```
Form Fields:
┌─────────────────────────────────────────┐
│ Nome: [________________]                 │
│ Sobrenome: [________________]            │
│ Data de Nascimento: [____-____-____]    │
│ Gênero: [Selecione ▼]                   │
│ Estado: [________________]                │
│ Email: [________________]                 │
│ Telefone: [________________]              │
├─────────────────────────────────────────┤
│ [Cancelar]  [Salvar]                    │
└─────────────────────────────────────────┘
```

### Student Statuses
- **ATIVO**: Currently enrolled student
- **INATIVO**: Former or inactive student
- **CONCLUÍDO**: Completed all courses

---

## 👔 Employee Management Module

### Features

**View All Employees**
- Complete employee directory
- Columns: Name, Email, Phone, Salary, Hire Date
- Real-time salary information

**Add New Employee**
- Click "Adicionar Funcionário" button
- Form fields:
  - Nome (First Name) - required
  - Sobrenome (Last Name) - required
  - Data de Nascimento (Birth Date) - required
  - Gênero (Gender) - Masculino/Feminino
  - Estado (State) - required
  - Email - required
  - Telefone (Phone) - required
  - Salário (Salary) - required, decimal format

### Employee Types
- **Instructor** (Instrutor) - Teaches classes
- **Administrative Staff** - General operations
- **Support Staff** - Facilities and support

### Salary Information
- Stored in employee record
- Used for payroll calculations
- Can be updated individually or in batch

---

## 📚 Course Management Module

### Features

**View All Courses**
- List of all available courses
- Columns: Name, Duration (hours), Price, Status

**Add New Course**
- Click "Adicionar Curso" button
- Form fields:
  - Nome do Curso (Course Name) - required
  - Descrição (Description) - required, textarea
  - Duração em Horas (Duration) - required, number
  - Valor do Curso (Course Price) - required, decimal

### Course Information
```
Example Course:
┌──────────────────────────────┐
│ Curso: Python Avançado      │
│ Duração: 40 horas           │
│ Valor: R$ 500,00            │
│ Estado: ATIVO               │
└──────────────────────────────┘
```

### Course Statuses
- **ATIVO**: Available for enrollment
- **PLANEJADO**: In planning stage
- **FINALIZADO**: Course completed or archived

---

## 📖 Class Management Module (Turmas)

### Features

**View All Classes**
- Table showing all classes
- Columns: Name, Course, Start Date, Students, Capacity, Status

**Add New Class**
- Click "Adicionar Turma" button
- Form fields:
  - Curso (Course) - dropdown selection, required
  - Instrutor (Instructor) - dropdown from employees, required
  - Nome da Turma (Class Name) - required
  - Data de Início (Start Date) - required
  - Data de Término (End Date) - optional
  - Capacidade Máxima (Max Capacity) - required, number

**Enroll Students**
- Click on class → "Enroll Student"
- Select student from dropdown
- Automatic enrollment date assignment
- Class count updated automatically

### Class Status Workflow
```
PLANEJADA → EM_ANDAMENTO → CONCLUÍDA
(Planned)    (In Progress)  (Completed)
```

### Enrollment Tracking
- View all students in a class
- Track enrollment date
- Monitor grades and completion status
- Generate attendance reports

---

## 💰 Financial Module

### Dual-View Interface

#### Revenue Tab (Receitas)

**Record Revenue**
- Click "Adicionar Receita"
- Form fields:
  - Data (Date) - required
  - Categoria (Category) - dropdown:
    - MENSALIDADE (Monthly Fee)
    - CURSO (Course Payment)
    - OUTRA (Other)
  - Subcategoria (Subcategory) - text
  - Valor (Amount) - required, decimal
  - Descricao (Description) - textarea
  - Método de Pagamento (Payment Method) - dropdown:
    - DINHEIRO (Cash)
    - CARTAO (Card)
    - TRANSFERENCIA (Bank Transfer)
    - PIX (PIX)

**Revenue View**
```
Table Columns:
- Data (Date)
- Categoria (Category)
- Valor (Amount)
- Status (Received/Pending)
```

#### Expense Tab (Despesas)

**Record Expense**
- Click "Adicionar Despesa"
- Form fields:
  - Data (Date) - required
  - Categoria (Category) - dropdown:
    - ALUGUEL (Rent)
    - UTILIDADES (Utilities)
    - MATERIAL (Materials)
    - OUTRA (Other)
  - Subcategoria (Subcategory)
  - Valor (Amount) - required
  - Descricao (Description)

**Expense View**
```
Table Columns:
- Data (Date)
- Categoria (Category)
- Valor (Amount)
- Status (Pending/Paid)
```

### Financial Summary

Displays:
- Total Revenues (all received payments)
- Total Expenses (all recorded expenses)
- Net Profit (Revenues - Expenses)
- Active Students Count
- Active Classes Count

---

## 📄 Salary Management Module

### Individual Salary Payment

**Add Single Payment**
- Click "Novo Pagamento"
- Form fields:
  - Funcionário (Employee) - dropdown, required
  - Mês de Referência (Reference Month) - date, required
  - Valor do Salário (Gross Salary) - required
  - Desconto INSS (INSS Deduction) - optional, auto-calculated
  - Desconto IR (IR Deduction) - optional, auto-calculated
  - Outras Deduções (Other Deductions) - optional
  - Observações (Notes) - textarea

**Automatic Calculation**
```
Net Salary = Gross Salary - INSS - IR - Other Deductions

Example:
Gross: R$ 3.000,00
INSS (8%): R$ 240,00
IR (7.5%): R$ 225,00
Other: R$ 0,00
─────────────────────
Net: R$ 2.535,00
```

### Batch Processing

**Process Payroll for All Employees**
- Click "Processar Lote"
- Form fields:
  - Mês de Referência (Reference Month) - required
  - % INSS - percentage for INSS deduction
  - % IR - percentage for IR deduction

**Results**
- Creates salary payment records for all active employees
- Displays summary of processed payments
- Shows individual net amounts

### Salary Payment Status

**Status Values:**
- **PENDENTE** (Pending) - Not yet paid
- **PAGO** (Paid) - Payment completed
- **CANCELADO** (Cancelled) - Payment cancelled

### Salary Report

View aggregate salary information:
- Total number of payments in period
- Total gross salaries
- Total deductions (INSS, IR)
- Total net salaries paid
- Filter by reference month

---

## 🎨 UI/UX Design Features

### Color Scheme
- **Primary Blue** (#2563EB) - Buttons, highlights
- **Dark Gray** (#1F2937) - Sidebar, text
- **Light Gray** (#F3F4F6) - Background, cards
- **Green** (#10B981) - Success, positive metrics
- **Red** (#EF4444) - Danger, negative metrics

### Interactive Elements

**Buttons:**
```
Primary: Blue background, white text
         Hover: Darker blue

Secondary: Gray background
          Hover: Darker gray

Danger: Red background
       Hover: Darker red
```

**Input Fields:**
- Clean border styling
- Focus state with blue highlight
- Error messages in red
- Required field indicators (red *)

**Data Tables:**
- Striped row alternation
- Hover highlight effect
- Action buttons per row
- Sortable columns

**Modal Dialogs:**
- Centered overlay
- Semi-transparent backdrop
- Form validation
- Success/error messaging

### Responsive Design

**Desktop (1024px+):**
- Full sidebar visible
- Multi-column layouts
- Complete feature access

**Tablet (768px - 1023px):**
- Collapsible sidebar
- 2-column layouts where appropriate
- Touch-friendly buttons

**Mobile (<768px):**
- Hidden sidebar (toggle menu)
- Single column layouts
- Full-width tables with horizontal scroll
- Large tap targets

---

## 📊 Data Flow Diagram

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTP/HTTPS
       ▼
┌─────────────────┐
│  React Frontend │ (Port 3000)
│  - Pages        │
│  - Components   │
│  - Services     │
└────────┬────────┘
         │ REST API
         ▼
┌──────────────────┐
│ Express Backend  │ (Port 5000)
│ - Routes         │
│ - Controllers    │
│ - Validation     │
└────────┬─────────┘
         │ SQL
         ▼
┌──────────────────┐
│  Databricks SQL  │
│  - Tables        │
│  - Data Storage  │
│  - Analytics     │
└──────────────────┘
```

---

## 🔄 Typical Workflows

### Workflow 1: Adding a Student to a Class

1. **Go to Classes** (Turmas)
2. Click on desired class
3. Click "Enroll Student"
4. Select student from dropdown
5. Confirm enrollment
6. Student appears in class enrollment list

### Workflow 2: Processing Monthly Payroll

1. **Go to Salary** (Salários)
2. Click "Processar Lote"
3. Select reference month
4. Enter INSS and IR percentages
5. Click "Salvar"
6. All employee salary payments created
7. View in "Salary Payments" table

### Workflow 3: Recording Course Revenue

1. **Go to Financial** (Finanças)
2. Click "Adicionar Receita"
3. Select "CURSO" category
4. Enter amount and payment method
5. Assign to specific student/class (optional)
6. Save
7. Revenue appears in summary

### Workflow 4: Creating a New Course Offering

1. **Go to Courses** (Cursos)
2. Click "Adicionar Curso"
3. Enter course details
4. Click "Salvar"
5. **Go to Classes** (Turmas)
6. Click "Adicionar Turma"
7. Select the new course
8. Assign instructor
9. Set dates and capacity
10. Save

---

## 🎓 Best Practices

### Data Organization
- Keep course names descriptive
- Use consistent naming conventions
- Update statuses regularly
- Archive completed items

### Financial Tracking
- Record all transactions promptly
- Use consistent payment methods
- Keep expenses categorized
- Review reports monthly

### Employee Management
- Keep salary information current
- Process payroll on schedule
- Document deductions clearly
- Maintain accurate contact info

### Student Records
- Complete enrollment data
- Track status changes
- Record progress notes
- Maintain contact information

---

## ❓ Common Questions

**Q: Can I edit existing records?**
A: Yes, click "Edit" on any record in tables to modify.

**Q: How is net salary calculated?**
A: Gross Salary - INSS - IR - Other Deductions = Net Salary

**Q: Can I delete records?**
A: Delete buttons are available in data tables (use with caution).

**Q: How do I filter data?**
A: Use search and filter in table headers.

**Q: Can I export data?**
A: Current version displays data; export feature can be added.

---

**Version:** 1.0.0  
**Last Updated:** December 2024
