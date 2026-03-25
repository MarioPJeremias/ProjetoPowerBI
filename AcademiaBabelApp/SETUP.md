# Academia Babel - Installation & Setup Guide

## Quick Start

### Prerequisites
- Node.js v16+ installed
- Databricks account with SQL warehouse
- Terminal/Command prompt

### Step 1: Databricks Setup (5 minutes)

1. Log in to Databricks workspace
2. Create SQL warehouse or note existing warehouse ID
3. Generate Personal Access Token:
   - Settings → User Settings → Access Tokens
   - Generate New Token → Copy it
4. Note your workspace URL and HTTP path

### Step 2: Backend Installation (3 minutes)

```bash
cd AcademiaBabelApp/backend

# Install dependencies
npm install

# Create and configure .env file
copy .env.example .env

# Edit .env with your Databricks credentials
```

Edit `.env`:
```
DATABRICKS_HOST="dbc-5022eb65-3d15.cloud.databricks.com"
DATABRICKS_TOKEN="dapiffbb05a4a57970c11a3c7980fcde7e88"
DATABRICKS_HTTP_PATH="/sql/1.0/warehouses/4f9847b47033b0db"
DATABRICKS_CATALOG="academia_babel"
DATABRICKS_SCHEMA="academia_babel"
PORT=5000
CORS_ORIGIN=http://localhost:3000

### Step 3: Frontend Installation (3 minutes)

```bash
cd ../frontend

# Install dependencies
npm install
```

### Step 4: Run Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App running on http://localhost:3000
```

### Step 5: Access Application

Open browser → `http://localhost:3000`

## Troubleshooting

### Backend won't start
- Check .env variables are correct
- Verify Databricks credentials
- Check port 5000 is available

### Frontend errors
- Clear node_modules: `rm -r node_modules && npm install`
- Clear browser cache
- Check backend is running

### Database connection issues
- Verify DATABRICKS_HOST format (remove https://)
- Ensure personal access token is valid
- Check HTTP Path is correct
- Verify schema exists or create it

## File Structure

```
AcademiaBabelApp/
├── backend/
│   ├── src/
│   │   ├── server.ts          # Main server entry
│   │   ├── db/
│   │   │   ├── databricks.ts  # DB connection
│   │   │   └── schema.ts      # Database initialization
│   │   ├── controllers/       # Business logic
│   │   ├── routes/           # API routes
│   │   └── types/            # TypeScript types
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── pages/            # React pages
    │   ├── components/       # Reusable components
    │   ├── services/         # API calls
    │   ├── App.tsx          # Main app
    │   └── main.tsx         # Entry point
    ├── package.json
    ├── vite.config.ts
    └── index.html
```

## Next Steps After Installation

1. **Add Sample Data:**
   - Go to Cursos → Add courses
   - Go to Funcionários → Add employees
   - Go to Alunos → Add students

2. **Create Classes:**
   - Go to Turmas
   - Create classes linking courses to instructors

3. **Manage Financials:**
   - Record revenues from student payments
   - Track expenses
   - Monitor profit/loss

4. **Process Salaries:**
   - Individual payments or batch processing
   - Track deductions

## Customization

### Adding New Features
- Backend: Add controllers in `src/controllers/`
- Frontend: Add pages in `src/pages/`
- Routes: Update in respective routes files

### Styling
- Colors: Edit `frontend/tailwind.config.js`
- Styles: Update `frontend/src/index.css`
- Components: Modify component files

## Production Deployment

1. Build backend: `npm run build`
2. Build frontend: `npm run build`
3. Deploy to cloud platform (AWS, Azure, etc.)
4. Set environment variables on hosting platform
5. Configure CORS for production domain

## Support Resources

- Backend API documentation in README.md
- TypeScript for type safety
- Tailwind CSS documentation for styling
- React Router for page navigation
- Axios for HTTP requests

---

**Ready to manage Academia Babel!** 🎓
