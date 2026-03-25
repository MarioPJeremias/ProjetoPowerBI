# Academia Babel - API Documentation

## Overview

Complete REST API documentation for Academia Babel Management System. All endpoints return JSON and support CORS.

**Base URL:** `http://localhost:5000/api`

## Response Format

### Success Response
```json
{
  "data": {},
  "message": "Success"
}
```

### Error Response
```json
{
  "error": "Error message describing what went wrong"
}
```

## Status Codes
- `200 OK` - Request successful
- `201 Created` - Resource created
- `400 Bad Request` - Invalid data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Students API

### GET /students
List all students

**Response:**
```json
[
  {
    "id_aluno": 123456,
    "nome": "João",
    "sobrenome": "Silva",
    "data_nascimento": "1990-05-15",
    "genero": "M",
    "data_inscricao": "2024-01-10",
    "estado": "SP",
    "email": "joao@example.com",
    "telefone": "11999999999",
    "status": "ATIVO",
    "created_at": "2024-01-10T10:00:00Z",
    "updated_at": "2024-01-10T10:00:00Z"
  }
]
```

### POST /students
Create new student

**Request:**
```json
{
  "nome": "Maria",
  "sobrenome": "Santos",
  "data_nascimento": "1995-08-20",
  "genero": "F",
  "estado": "RJ",
  "email": "maria@example.com",
  "telefone": "21999999999"
}
```

**Response (201):**
```json
{
  "id_aluno": 789456,
  "message": "Student created successfully"
}
```

### GET /students/:id
Get student by ID

**Parameters:**
- `id` (path) - Student ID

**Response:**
```json
{
  "id_aluno": 123456,
  "nome": "João",
  "sobrenome": "Silva",
  ...
}
```

### PUT /students/:id
Update student

**Request:**
```json
{
  "email": "newemail@example.com",
  "telefone": "11999888888",
  "status": "INATIVO"
}
```

**Response:**
```json
{
  "message": "Student updated successfully"
}
```

---

## Employees API

### GET /employees
List all employees

**Response:**
```json
[
  {
    "id_funcionario": 100001,
    "nome": "Carlos",
    "sobrenome": "Oliveira",
    "data_nascimento": "1980-03-10",
    "genero": "M",
    "estado": "SP",
    "email": "carlos@academia.com",
    "telefone": "11988888888",
    "salario": 3500.00,
    "data_contratacao": "2020-01-15",
    "status": "ATIVO",
    "created_at": "2020-01-15T10:00:00Z",
    "updated_at": "2024-01-10T10:00:00Z"
  }
]
```

### POST /employees
Create new employee

**Request:**
```json
{
  "nome": "Ana",
  "sobrenome": "Costa",
  "data_nascimento": "1988-07-22",
  "genero": "F",
  "estado": "MG",
  "email": "ana@academia.com",
  "telefone": "31987654321",
  "salario": 3000.00
}
```

**Response (201):**
```json
{
  "id_funcionario": 100002,
  "message": "Employee created successfully"
}
```

### GET /employees/:id
Get employee by ID

### PUT /employees/:id
Update employee details

---

## Courses API

### GET /courses
List all courses

**Response:**
```json
[
  {
    "id_curso": 50001,
    "nome_curso": "Python Fundamentals",
    "descricao": "Introduction to Python programming",
    "duracao_horas": 40,
    "valor_curso": 500.00,
    "estado_curso": "ATIVO",
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-01T10:00:00Z"
  }
]
```

### POST /courses
Create new course

**Request:**
```json
{
  "nome_curso": "JavaScript Web Development",
  "descricao": "Learn modern JavaScript for web development",
  "duracao_horas": 50,
  "valor_curso": 600.00
}
```

**Response (201):**
```json
{
  "id_curso": 50002,
  "message": "Course created successfully"
}
```

### GET /courses/:id
Get course by ID

### PUT /courses/:id
Update course

---

## Classes API

### GET /classes
List all classes with course information

**Response:**
```json
[
  {
    "id_turma": 75001,
    "id_curso": 50001,
    "nome_curso": "Python Fundamentals",
    "id_instrutor": 100001,
    "nome_turma": "Python - Turma A",
    "data_inicio": "2024-02-01",
    "data_fim": "2024-03-15",
    "capacidade_maxima": 30,
    "numero_alunos": 25,
    "estado_turma": "EM_ANDAMENTO",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-02-01T10:00:00Z"
  }
]
```

### POST /classes
Create new class

**Request:**
```json
{
  "id_curso": 50001,
  "id_instrutor": 100001,
  "nome_turma": "Python - Turma B",
  "data_inicio": "2024-03-01",
  "data_fim": "2024-04-15",
  "capacidade_maxima": 25
}
```

**Response (201):**
```json
{
  "id_turma": 75002,
  "message": "Class created successfully"
}
```

### POST /classes/:classId/enroll
Enroll student in class

**Request:**
```json
{
  "id_aluno": 123456,
  "id_turma": 75001
}
```

**Response (201):**
```json
{
  "id_inscricao": 80001,
  "message": "Student enrolled successfully"
}
```

### GET /classes/:classId/enrollments
Get all students enrolled in a class

**Response:**
```json
[
  {
    "id_inscricao": 80001,
    "id_aluno": 123456,
    "id_turma": 75001,
    "data_inscricao": "2024-02-01",
    "nome": "João",
    "sobrenome": "Silva",
    "email": "joao@example.com",
    "status": "ATIVA",
    "nota_final": null,
    "data_conclusao": null
  }
]
```

### PUT /classes/:id
Update class

---

## Financial API

### GET /financial/revenues
List all revenues

**Response:**
```json
[
  {
    "id_receita": 90001,
    "data_receita": "2024-01-15",
    "categoria": "MENSALIDADE",
    "subcategoria": "January Payment",
    "quantidade": 1,
    "valor": 500.00,
    "descricao": "Monthly tuition",
    "id_aluno": 123456,
    "nome_aluno": "João",
    "id_turma": 75001,
    "nome_turma": "Python - Turma A",
    "metodo_pagamento": "TRANSFERENCIA",
    "status": "RECEBIDO",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
]
```

### POST /financial/revenues
Create revenue record

**Request:**
```json
{
  "data_receita": "2024-02-15",
  "categoria": "MENSALIDADE",
  "subcategoria": "February Payment",
  "quantidade": 1,
  "valor": 500.00,
  "descricao": "Monthly tuition payment",
  "id_aluno": 123456,
  "id_turma": 75001,
  "metodo_pagamento": "PIX"
}
```

**Response (201):**
```json
{
  "id_receita": 90002,
  "message": "Revenue recorded successfully"
}
```

### GET /financial/expenses
List all expenses

**Response:**
```json
[
  {
    "id_despesa": 95001,
    "data_despesa": "2024-01-10",
    "categoria": "ALUGUEL",
    "subcategoria": "Office Rent",
    "quantidade": 1,
    "valor": 2000.00,
    "descricao": "Monthly rent for academy space",
    "id_funcionario": 100001,
    "nome_funcionario": "Carlos",
    "metodo_pagamento": "TRANSFERENCIA",
    "status": "PAGO",
    "created_at": "2024-01-10T10:00:00Z",
    "updated_at": "2024-01-10T10:00:00Z"
  }
]
```

### POST /financial/expenses
Create expense record

**Request:**
```json
{
  "data_despesa": "2024-02-10",
  "categoria": "UTILIDADES",
  "subcategoria": "Internet and Power",
  "quantidade": 1,
  "valor": 300.00,
  "descricao": "Internet and electricity",
  "id_funcionario": 100001,
  "metodo_pagamento": "CARTAO"
}
```

**Response (201):**
```json
{
  "id_despesa": 95002,
  "message": "Expense recorded successfully"
}
```

### GET /financial/summary
Get financial summary

**Response:**
```json
{
  "total_receitas": 10000.00,
  "total_despesas": 5000.00,
  "lucro_liquido": 5000.00,
  "total_alunos_ativos": 25,
  "turmas_ativas": 3
}
```

---

## Salary API

### GET /salary
List all salary payments

**Response:**
```json
[
  {
    "id_pagamento": 110001,
    "id_funcionario": 100001,
    "nome": "Carlos",
    "sobrenome": "Oliveira",
    "mes_referencia": "2024-01-01",
    "valor_salario": 3500.00,
    "desconto_inss": 280.00,
    "desconto_ir": 262.50,
    "outras_deducoes": 0.00,
    "valor_liquido": 2957.50,
    "data_pagamento": "2024-01-31",
    "status": "PAGO",
    "observacoes": null,
    "created_at": "2024-01-31T10:00:00Z",
    "updated_at": "2024-01-31T10:00:00Z"
  }
]
```

### POST /salary
Create single salary payment

**Request:**
```json
{
  "id_funcionario": 100001,
  "mes_referencia": "2024-02-01",
  "valor_salario": 3500.00,
  "desconto_inss": 280.00,
  "desconto_ir": 262.50,
  "outras_deducoes": 0.00,
  "observacoes": "Regular salary payment"
}
```

**Response (201):**
```json
{
  "id_pagamento": 110002,
  "valor_liquido": 2957.50,
  "message": "Salary payment created successfully"
}
```

### POST /salary/batch
Process salary payments for all employees

**Request:**
```json
{
  "mes_referencia": "2024-02-01",
  "desconto_inss_percentual": 8.0,
  "desconto_ir_percentual": 7.5
}
```

**Response (201):**
```json
{
  "message": "5 salary payments created successfully",
  "payments": [
    {
      "id_pagamento": 110002,
      "funcionario": "Carlos",
      "valor_liquido": 2957.50
    },
    {
      "id_pagamento": 110003,
      "funcionario": "Ana",
      "valor_liquido": 2760.00
    }
  ]
}
```

### PUT /salary/:id
Update salary payment

**Request:**
```json
{
  "status": "PAGO",
  "data_pagamento": "2024-02-01"
}
```

**Response:**
```json
{
  "message": "Salary payment updated successfully"
}
```

### GET /salary/report
Get salary report

**Query Parameters:**
- `mes_referencia` (optional) - Filter by reference month

**Response:**
```json
{
  "total_pagamentos": 5,
  "total_salarios": 17500.00,
  "total_inss": 1400.00,
  "total_ir": 1312.50,
  "total_liquido": 14787.50
}
```

---

## Error Handling

### Common Error Responses

**400 Bad Request**
```json
{
  "error": "Invalid input data. Please check all required fields."
}
```

**404 Not Found**
```json
{
  "error": "Student not found"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

---

## Data Validation Rules

### Student
- `nome`: String, required, max 255 characters
- `sobrenome`: String, required, max 255 characters
- `data_nascimento`: Date format YYYY-MM-DD
- `genero`: Single character: 'M' or 'F'
- `email`: Valid email format
- `telefone`: String, phone format

### Employee
- All student fields apply
- `salario`: Decimal number, positive value

### Course
- `nome_curso`: String, required, max 255 characters
- `duracao_horas`: Integer, positive value
- `valor_curso`: Decimal, positive value

### Class
- `id_curso`: Integer, must exist in Cursos table
- `id_instrutor`: Integer, must exist in Funcionários table
- `capacidade_maxima`: Integer, positive value
- `data_inicio`: Date before `data_fim`

### Financial
- `valor`: Decimal, positive value
- `categoria`: Predefined options only
- `metodo_pagamento`: Predefined options only

### Salary
- `valor_salario`: Decimal, positive value
- `desconto_*`: Decimal, non-negative
- `valor_liquido`: Auto-calculated, non-negative

---

## Rate Limiting

No rate limiting currently implemented. For production:
- Implement rate limiting (e.g., 100 requests/minute)
- Add API key authentication
- Add request throttling

---

## Authentication (Future Enhancement)

Recommended implementation:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Webhook Support (Future)

Planned features:
- Student enrollment notifications
- Salary payment confirmations
- Financial alerts
- Class scheduling updates

---

## Changelog

### Version 1.0.0 (Current)
- Initial API release
- Full CRUD operations for all modules
- Financial tracking
- Salary management
- Batch operations

---

**API Version:** 1.0.0  
**Last Updated:** December 2024  
**Maintainer:** Academia Babel Development Team
