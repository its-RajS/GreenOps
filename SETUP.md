# Development Setup

This document provides detailed setup instructions for developers.

## System Requirements

- Node.js 18 or higher
- npm 9 or higher (or yarn/pnpm)
- Python 3.10 or higher
- Git

## Frontend Setup

### 1. Install Node Dependencies
```bash
npm install
```

### 2. Verify Installation
```bash
npm list
```

### 3. Development Server
```bash
npm run dev
```

Server runs on `http://localhost:3000`

### 4. Production Build
```bash
npm run build
npm start
```

## Python Service Setup

### 1. Navigate to Python Service
```bash
cd python-service
```

### 2. Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 4. Train ML Model
```bash
python train_model.py
```

You should see:
```
Model trained and saved to carbon_forecast_model.pkl
Model coefficients: [5.5]
Model intercept: 65.0
Forecast for next 6 months: [130, 135, 140, 145, 150, 155]
```

### 5. Start FastAPI Server
```bash
python main.py
```

Server runs on `http://localhost:8000`

### 6. Test the Service
```bash
# In browser
http://localhost:8000/docs

# Or curl
curl http://localhost:8000/forecast
```

## Project Structure

```
src/
├── app/                    # Next.js pages & API routes
│   ├── page.tsx           # Dashboard
│   ├── layout.tsx         # Root layout
│   ├── api/               # API endpoints
│   ├── forecast/          # Forecast page
│   ├── recommendations/   # Recommendations page
│   └── green-score/       # Green score page
├── components/            # React components
├── data/                  # Mock data
├── services/              # Business logic
├── types/                 # TypeScript types
├── utils/                 # Utilities
├── lib/                   # Libraries
└── styles/                # CSS

python-service/
├── main.py               # FastAPI app
├── train_model.py        # ML training
├── forecast.py           # Forecast logic
└── requirements.txt      # Dependencies
```

## Code Style

### TypeScript
- Use `const` for variables
- Use explicit types
- Use `interface` over `type` for objects
- Follow naming conventions

### React
- Use functional components
- Use hooks for state
- Props should be typed
- Component names: PascalCase
- File names: PascalCase for components

### CSS
- Use Tailwind CSS classes
- Avoid custom CSS when possible
- Use semantic HTML

## Testing

Currently no automated tests (MVP phase).

For production:
- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright

## Debugging

### Frontend
```bash
# Dev tools in browser (F12)
# React DevTools extension
# Next.js debug output in terminal
```

### Python Service
```bash
# FastAPI automatic docs
http://localhost:8000/docs

# Test endpoint
http://localhost:8000/forecast
```

## Deployment

### Frontend (Vercel)
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
# No additional steps needed
```

### Python Service
```bash
# Docker deployment
docker build -t greenops-ai .
docker run -p 8000:8000 greenops-ai

# Or platform-specific:
# Railway, Render, Heroku
```

## Performance Tips

1. **Frontend**
   - Keep components small
   - Use React.memo for expensive components
   - Use Next.js Image optimization
   - Lazy load charts

2. **Python Service**
   - Cache model in memory
   - Use asyncio for I/O
   - Implement request logging

## Common Issues

### Issue: Port already in use
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Issue: Python module not found
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate     # Windows
```

### Issue: npm install fails
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "Add feature description"

# Push to remote
git push origin feature/your-feature

# Create Pull Request on GitHub
```

## Environment Variables

Create `.env.local` for frontend if needed (currently not required).

## IDE Setup

### VS Code Recommended Extensions
- ESLint
- Prettier
- TypeScript Vue Plugin
- Tailwind CSS IntelliSense
- Thunder Client (for API testing)

### Settings (.vscode/settings.json)
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Recharts Documentation](https://recharts.org/)

## Getting Help

1. Check README.md for overview
2. Review docs/architecture.md for system design
3. Check docs/workflow.md for data flow
4. Review inline code comments
5. Check GitHub issues (if applicable)

---

Happy developing! 🚀
