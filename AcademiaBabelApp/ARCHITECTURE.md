# Academia Babel - System Architecture & Technical Design

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER BROWSER / CLIENT                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    FRONTEND APPLICATION                         │   │
│  │                    (React + TypeScript)                         │   │
│  ├─────────────────────────────────────────────────────────────────┤   │
│  │ Pages:                                                          │   │
│  │  • Dashboard.tsx       • Students.tsx      • Courses.tsx        │   │
│  │  • Employees.tsx       • Classes.tsx       • Financial.tsx      │   │
│  │  • Salary.tsx                                                   │   │
│  │                                                                  │   │
│  │ Components:                                                     │   │
│  │  • Layout.tsx          • FormModal.tsx     • Common.tsx         │   │
│  │  • Tabs.tsx                                                     │   │
│  │                                                                  │   │
│  │ Services:                                                       │   │
│  │  • api.ts (Axios HTTP client)                                   │   │
│  │                                                                  │   │
│  │ Styling: Tailwind CSS + React Router Navigation                │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                           │
│                     ↕ HTTP/REST (Port 3000)                              │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                 ↓
                    ┌────────────────────────┐
                    │  CORS & PROXY LAYER    │
                    │  (Vite Dev Server)     │
                    └────────────────────────┘
                                 ↓
                    ┌────────────────────────┐
                    │  HTTP/REST API         │
                    │  (Port 5000)           │
                    └────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                         BACKEND APPLICATION                              │
│                    (Node.js + Express + TypeScript)                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                      API ROUTES LAYER                            │  │
│  │  ┌──────────────┬──────────────┬──────────────┐                  │  │
│  │  │   Students   │  Employees   │   Courses    │                  │  │
│  │  └──────────────┴──────────────┴──────────────┘                  │  │
│  │  ┌──────────────┬──────────────┬──────────────┐                  │  │
│  │  │   Classes    │  Financial   │   Salary     │                  │  │
│  │  └──────────────┴──────────────┴──────────────┘                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                ↓                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │              CONTROLLER LAYER (Business Logic)                   │  │
│  │  ┌──────────────┬──────────────┬──────────────┐                  │  │
│  │  │ Student      │ Employee     │ Course       │                  │  │
│  │  │ Controller   │ Controller   │ Controller   │                  │  │
│  │  └──────────────┴──────────────┴──────────────┘                  │  │
│  │  ┌──────────────┬──────────────┬──────────────┐                  │  │
│  │  │ Class        │ Financial    │ Salary       │                  │  │
│  │  │ Controller   │ Controller   │ Controller   │                  │  │
│  │  └──────────────┴──────────────┴──────────────┘                  │  │
│  │                                                                   │  │
│  │  Functions:                                                      │  │
│  │  • getAll() / getById() / create() / update()                    │  │
│  │  • Validation and error handling                                 │  │
│  │  • Complex operations (batch processing, calculations)           │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                ↓                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │            DATABASE ACCESS LAYER                                 │  │
│  │  ┌───────────────────────────────────────┐                       │  │
│  │  │   databricks.ts                       │                       │  │
│  │  │   • Connection management            │                       │  │
│  │  │   • Query execution                  │                       │  │
│  │  │   • Error handling                   │                       │  │
│  │  └───────────────────────────────────────┘                       │  │
│  │                                                                   │  │
│  │  ┌───────────────────────────────────────┐                       │  │
│  │  │   schema.ts                           │                       │  │
│  │  │   • Table initialization              │                       │  │
│  │  │   • SQL schema creation               │                       │  │
│  │  └───────────────────────────────────────┘                       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                ↓                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                 ↓
                    ┌────────────────────────┐
                    │   SQL Queries (HTTPS)  │
                    └────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    DATABRICKS SQL WAREHOUSE                              │
│                          (Cloud Database)                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Tables:                          Relationships:                         │
│  ┌────────────────────────┐       ┌─────────────────────────────────┐  │
│  │ funcionarios (8)        │       │ funcionarios ← turmas (1:N)     │  │
│  │ alunos (7)              │       │ funcionarios ← pagamentos (1:N) │  │
│  │ cursos (6)              │       │ alunos ← inscricoes (1:N)       │  │
│  │ turmas (12)             │       │ cursos ← turmas (1:N)           │  │
│  │ inscricoes (10)         │       │ turmas ← inscricoes (1:N)       │  │
│  │ receitas (15)           │       │ alunos ← receitas (1:N)         │  │
│  │ despesas (12)           │       │ turmas ← receitas (1:N)         │  │
│  │ pagamentos_salario (20) │       │ funcionarios ← despesas (1:N)   │  │
│  └────────────────────────┘       └─────────────────────────────────┘  │
│                                                                           │
│  Features:                                                               │
│  • Auto-incrementing IDs • Timestamps (created_at, updated_at)          │
│  • Foreign key constraints • Referential integrity                       │
│  • Indexed primary keys • Status tracking fields                         │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request/Response Flow

### Example: Creating a Student

```
1. USER ACTION
   ↓
   User clicks "Adicionar Aluno" button on Students page
   ↓
2. FRONTEND
   ↓
   FormModal component opens
   User fills form and clicks "Salvar"
   ↓
3. API CALL (Axios)
   ↓
   POST /api/students
   Headers: { 'Content-Type': 'application/json' }
   Body: { nome: "João", sobrenome: "Silva", ... }
   ↓
4. BACKEND ROUTING
   ↓
   Express router intercepts POST /api/students
   Routes to studentRoutes.ts
   ↓
5. CONTROLLER
   ↓
   studentController.createStudent() executes
   ↓
6. VALIDATION
   ↓
   Validates input data
   Generates unique ID
   ↓
7. DATABASE
   ↓
   Executes SQL INSERT:
   INSERT INTO alunos (...) VALUES (...)
   ↓
8. RESPONSE
   ↓
   Database returns success
   ↓
9. BACKEND RESPONSE
   ↓
   HTTP 201 Created
   Body: { id_aluno: 123456, message: "Student created successfully" }
   ↓
10. FRONTEND HANDLING
    ↓
    Axios .then() receives response
    FormModal closes
    Table refreshes with new student
    Success notification shown
    ↓
11. USER SEES
    ↓
    New student appears in table
    Form is cleared
    Page is updated
```

---

## 📡 API Communication Patterns

### GET Request (List Students)
```
CLIENT: GET http://localhost:5000/api/students
         ↓
SERVER: SELECT * FROM alunos ORDER BY nome
         ↓
RESPONSE: [{ id_aluno: 1, nome: "João", ... }, ...]
```

### POST Request (Create Student)
```
CLIENT: POST http://localhost:5000/api/students
        Content-Type: application/json
        { nome: "Maria", ... }
         ↓
SERVER: Validate input
        Generate ID
        INSERT INTO alunos ...
         ↓
RESPONSE: { id_aluno: 2, message: "Success" }
```

### PUT Request (Update Student)
```
CLIENT: PUT http://localhost:5000/api/students/1
        { email: "newemail@example.com" }
         ↓
SERVER: UPDATE alunos SET email = ? WHERE id_aluno = ?
         ↓
RESPONSE: { message: "Student updated successfully" }
```

---

## 🗄️ Database Schema Relationships

### Foreign Key Relationships
```
┌─────────────────────────────────────────────────────────┐
│                    RELATIONSHIP DIAGRAM                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  funcionarios (1) ─────────► turmas (N)                 │
│      │                          │                        │
│      │                          ├─► inscricoes           │
│      │                          │                        │
│      └─► pagamentos_salario(N) │                        │
│                                 │                        │
│  cursos (1) ─────────► turmas (N) ◄─ alunos (via       │
│                           │           inscricoes)       │
│                           │                             │
│                           ├─► receitas (N)              │
│                           │                             │
│  alunos (1) ─────────► inscricoes (N)                   │
│      │                    │                             │
│      └─► receitas (N) ────┘                             │
│                                                          │
│  funcionarios (1) ─────────► despesas (N)               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Data Model Example
```
Student (João Silva)
  ├── id_aluno: 123456
  ├── nome: "João"
  ├── email: "joao@example.com"
  └── Enrollments
      └── Enrollment 1
          ├── id_inscricao: 789
          ├── id_turma: 75001 (Python - Turma A)
          ├── status: "ATIVA"
          └── Revenues
              └── Payment 1
                  ├── id_receita: 90001
                  ├── valor: 500.00
                  ├── data: 2024-01-15
                  └── status: "RECEBIDO"
```

---

## 🔐 Data Security Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                        │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  Layer 1: CLIENT SECURITY                                │
│  ├─ HTTPS/SSL encryption (recommended)                   │
│  ├─ Input validation in forms                            │
│  ├─ XSS protection via React                             │
│  └─ CSRF tokens (recommended to add)                     │
│                                                            │
│  Layer 2: API SECURITY                                   │
│  ├─ CORS validation                                      │
│  ├─ Request validation                                   │
│  ├─ Error handling (no sensitive data in errors)         │
│  ├─ Rate limiting (recommended)                          │
│  └─ Authentication (recommended)                         │
│                                                            │
│  Layer 3: DATABASE SECURITY                              │
│  ├─ SQL parameterized queries (prevents SQL injection)   │
│  ├─ Environment variables for credentials                │
│  ├─ Databricks authentication tokens                     │
│  ├─ Encrypted connections                                │
│  └─ Access control at warehouse level                    │
│                                                            │
│  Layer 4: APPLICATION SECURITY                           │
│  ├─ TypeScript for type safety                           │
│  ├─ Error handling and logging                           │
│  ├─ Input sanitization                                   │
│  └─ Secure dependency management                         │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

---

## 📊 Data Processing Workflow Examples

### Example 1: Salary Batch Processing
```
User clicks "Processar Lote" → 
  ↓
Frontend sends POST /api/salary/batch
  {
    mes_referencia: "2024-02-01",
    desconto_inss_percentual: 8.0,
    desconto_ir_percentual: 7.5
  }
  ↓
Backend salaryController.processSalaryBatch()
  ├─ Fetch all ATIVO employees
  ├─ For each employee:
  │   ├─ Calculate INSS: salary × 8%
  │   ├─ Calculate IR: salary × 7.5%
  │   ├─ Net = salary - INSS - IR
  │   └─ INSERT INTO pagamentos_salario
  ↓
Database creates 5 payment records (for 5 employees)
  ↓
Response: { message: "5 payments created", payments: [...] }
  ↓
Frontend displays result
User sees all salary payments in table
```

### Example 2: Financial Summary Calculation
```
User views Dashboard →
  ↓
Frontend requests GET /api/financial/summary
  ↓
Backend executes complex query:
  SELECT
    SUM(valor) FROM receitas WHERE status = 'RECEBIDO' → total_receitas
    SUM(valor) FROM despesas WHERE status != 'CANCELADO' → total_despesas
    COUNT(*) FROM alunos WHERE status = 'ATIVO' → total_alunos_ativos
    COUNT(*) FROM turmas WHERE estado_turma IN (...) → turmas_ativas
  ↓
Database aggregates data
  ↓
Backend calculates:
  lucro_liquido = total_receitas - total_despesas
  ↓
Response includes:
  {
    total_receitas: 10000.00,
    total_despesas: 5000.00,
    lucro_liquido: 5000.00,
    total_alunos_ativos: 25,
    turmas_ativas: 3
  }
  ↓
Frontend displays metrics on Dashboard
```

---

## 🚀 Deployment Architecture (Production)

```
┌─────────────────────────────────────────────────────────────┐
│                      PRODUCTION DEPLOYMENT                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  USERS                                                       │
│    ↓                                                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           CLOUD PROVIDER (AWS/Azure/GCP)            │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                       │  │
│  │  ┌─────────────────┐      ┌─────────────────┐       │  │
│  │  │  CDN/Cloudflare │  →   │  Load Balancer  │       │  │
│  │  └─────────────────┘      └─────────────────┘       │  │
│  │         ↓                           ↓               │  │
│  │  ┌───────────────────────────────────────────┐      │  │
│  │  │  Frontend Containers (React + Nginx)      │      │  │
│  │  │  • API routes to backend                  │      │  │
│  │  │  • Static file serving                    │      │  │
│  │  │  • SSL/TLS termination                    │      │  │
│  │  └───────────────────────────────────────────┘      │  │
│  │         ↓                                            │  │
│  │  ┌───────────────────────────────────────────┐      │  │
│  │  │  Backend Containers (Node + Express)      │      │  │
│  │  │  • API endpoints                          │      │  │
│  │  │  • Business logic                         │      │  │
│  │  │  • Database connection pooling            │      │  │
│  │  │  • Horizontal scaling                     │      │  │
│  │  └───────────────────────────────────────────┘      │  │
│  │         ↓                                            │  │
│  │  ┌───────────────────────────────────────────┐      │  │
│  │  │  Databricks SQL Warehouse (Cloud)         │      │  │
│  │  │  • Data storage & analytics               │      │  │
│  │  │  • Automatic scaling                      │      │  │
│  │  │  • Backup & disaster recovery             │      │  │
│  │  └───────────────────────────────────────────┘      │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  MONITORING & LOGGING                                       │
│  ├─ CloudWatch / DataDog                                   │
│  ├─ Error tracking                                         │
│  ├─ Performance monitoring                                 │
│  └─ Automated alerts                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 💾 Data Persistence Strategy

```
┌──────────────────────────────────────────────────────┐
│           DATA STORAGE ARCHITECTURE                  │
├──────────────────────────────────────────────────────┤
│                                                       │
│  OPERATIONAL DATA (Hot Storage)                      │
│  ├─ Recent transactions                             │
│  ├─ Active student records                          │
│  ├─ Current payroll                                 │
│  └─ Stored in Databricks (immediate access)         │
│                                                       │
│  HISTORICAL DATA (Warm Storage)                     │
│  ├─ Archived courses                                │
│  ├─ Completed classes                               │
│  ├─ Old enrollments                                 │
│  └─ Retained in Databricks (indexed)                │
│                                                       │
│  BACKUP & ARCHIVE (Cold Storage)                    │
│  ├─ Monthly backups                                 │
│  ├─ Yearly archives                                 │
│  ├─ Compliance records                              │
│  └─ Stored separately (cost-effective)              │
│                                                       │
└──────────────────────────────────────────────────────┘
```

---

## 🔌 Integration Points

```
┌─────────────────────────────────────────────────────────┐
│              CURRENT & FUTURE INTEGRATIONS              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  CURRENT:                                               │
│  ✓ Databricks SQL (database)                           │
│  ✓ React (frontend framework)                          │
│  ✓ Express (backend framework)                         │
│  ✓ TypeScript (language)                               │
│  ✓ Tailwind CSS (styling)                              │
│                                                          │
│  READY TO ADD:                                         │
│  ⊙ Email service (Sendgrid, AWS SES)                   │
│  ⊙ Payment gateway (Stripe, PayPal)                    │
│  ⊙ SMS service (Twilio)                                │
│  ⊙ Authentication (Auth0, Firebase)                    │
│  ⊙ File storage (AWS S3)                               │
│  ⊙ Analytics (Mixpanel, Google Analytics)              │
│                                                          │
│  FUTURE CONSIDERATION:                                 │
│  ◯ Video hosting (Vimeo, YouTube)                      │
│  ◯ Real-time messaging (Socket.io)                     │
│  ◯ Machine learning (TensorFlow)                       │
│  ◯ Mobile apps (React Native)                          │
│  ◯ AI assistance (OpenAI)                              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📈 Scalability Roadmap

```
Current State (100-1,000 users)
├─ Single backend instance
├─ Single database connection
├─ File storage local
└─ ✓ This setup works

Phase 1 (1,000-10,000 users)
├─ Load balancer
├─ Database connection pooling
├─ Redis cache layer
└─ Multiple backend instances

Phase 2 (10,000-100,000 users)
├─ Microservices architecture
├─ Message queue (RabbitMQ)
├─ CDN for static files
├─ Separate read/write databases
└─ Advanced caching strategies

Phase 3 (100,000+ users)
├─ Multi-region deployment
├─ Data sharding
├─ Event-driven architecture
├─ Real-time analytics
└─ Enterprise features
```

---

**Architecture Version:** 1.0  
**Last Updated:** December 2024  
**Diagram Style:** ASCII Flow Charts & Relationship Diagrams
