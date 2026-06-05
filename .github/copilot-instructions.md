<!-- copilot-instructions.md -->
# GreenOps AI Copilot Instructions

This file provides AI assistant guidelines for this project.

## Project Overview

**GreenOps AI** is a hackathon-ready MVP - a unified carbon reduction dashboard for tracking cloud emissions with AI forecasting.

- **Status**: Complete MVP (no TODOs, no placeholders)
- **Timeline**: Built in 3-4 hours
- **Demo-Ready**: Yes, fully functional
- **Production-Ready**: Architecture follows best practices

## Technology Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS, Recharts
- **Backend**: Next.js Route Handlers
- **AI/ML**: Python FastAPI, Scikit-Learn
- **UI**: Shadcn UI, Lucide React
- **Data**: Mock data only (no database)

## Key Features

1. Dashboard with KPI cards and charts
2. AI carbon forecasting (6-month prediction)
3. Smart recommendations engine
4. Green score calculation
5. Enterprise-grade UI with dark mode

## File Organization

```
src/
├── app/              # Pages and API routes
├── components/       # React components
├── services/         # Business logic
├── data/             # Mock data
├── types/            # TypeScript types
├── utils/            # Utilities
└── styles/           # CSS

python-service/      # ML service
docs/                # Documentation
```

## Common Tasks

### Adding a New Feature
1. Create component in `src/components/`
2. Create API endpoint in `src/app/api/`
3. Add TypeScript interfaces in `src/types/`
4. Add mock data in `src/data/mockData.ts`
5. Create page in `src/app/`

### Modifying Components
- Keep components small and focused
- Use TypeScript for type safety
- Import from `@/components` for barrel exports
- Use Tailwind for styling

### Adding Business Logic
- Create service in `src/services/`
- Export functions, not classes
- Use pure functions where possible
- Add TypeScript types

### Styling
- Use Tailwind CSS classes
- Reference dark mode design
- Use color utilities from `src/utils/colors.ts`
- Check existing components for patterns

## Code Standards

### Do's
- ✅ Use `const` for all declarations
- ✅ Add TypeScript types to everything
- ✅ Use `interface` for component props
- ✅ Keep components < 300 lines
- ✅ Use meaningful variable names
- ✅ Add JSDoc comments for complex functions
- ✅ Handle loading and error states
- ✅ Use semantic HTML

### Don'ts
- ❌ No `any` types
- ❌ No commented code
- ❌ No TODO comments
- ❌ No console.log in production code
- ❌ No inline styles (use Tailwind)
- ❌ No component prop drilling (use context for complex state)
- ❌ No magic numbers (use constants)

## Testing Approach

- No automated tests in MVP (add in Phase 2)
- Manual testing of all features
- Browser dev tools for debugging
- FastAPI docs at http://localhost:8000/docs

## Performance Guidelines

- Keep API responses < 100ms
- Parallel load multiple endpoints
- Use Recharts virtualization for large datasets
- Cache chart components with React.memo
- Lazy load Python service (fallback data available)

## Deployment

- **Frontend**: Vercel (automatic on git push)
- **Python**: Docker or Platform.sh
- **Database**: None (MVP uses mock data)

## Important Constraints

1. **MVP Phase**: Focus on demo, not production features
2. **No Database**: All data is mocked
3. **Single Python Model**: Linear regression for forecasting
4. **Mock Data Only**: No real cloud APIs connected
5. **Time-Boxed**: Built in 3-4 hours

## Upgrade Paths

To move to Phase 2/Production:
1. Add real database (PostgreSQL/MongoDB)
2. Connect cloud provider APIs (AWS/GCP/Azure)
3. Add authentication (NextAuth.js)
4. Add comprehensive tests
5. Implement real ML models
6. Add monitoring and logging
7. Set up CI/CD pipeline

## Documentation Files

- **README.md** - Project overview and quick start
- **GETTING_STARTED.md** - 5-minute setup guide
- **SETUP.md** - Detailed development setup
- **docs/architecture.md** - System design
- **docs/workflow.md** - Data flow and processes

## Resources

- Check comments in source files
- Review types in `src/types/index.ts`
- Check mock data in `src/data/mockData.ts`
- Review API routes in `src/app/api/`
- Check component exports in `src/components/index.ts`

## Helping with Issues

When assisting with issues:
1. Check existing code patterns
2. Maintain consistency with codebase
3. Follow TypeScript best practices
4. Keep dark mode design in mind
5. Ensure responsive layout
6. Add loading states
7. Handle errors gracefully
8. Update types if needed

## Questions to Ask

Before making changes:
- Does this fit the MVP scope?
- Is it already implemented elsewhere?
- Does it maintain the design system?
- Is it TypeScript-safe?
- Does it need documentation?
- Will it impact performance?

## Building Locally

```bash
# Frontend
npm install
npm run dev

# Python Service
cd python-service
pip install -r requirements.txt
python train_model.py
python main.py
```

## Success Criteria

✅ All pages load and display data
✅ API endpoints return correct data
✅ Charts render correctly
✅ Dark mode is default
✅ Responsive on mobile/tablet/desktop
✅ No console errors
✅ No placeholder text
✅ Professional looking UI
✅ AI insights are meaningful
✅ Recommendations are relevant

## Notes for AI Assistant

- This is a complete, working MVP
- No "TODO" comments anywhere
- All files are production-ready
- Focus on explaining, not refactoring
- Maintain existing patterns
- Keep the scope tight
- The demo should impress

---

**Last Updated**: 2024
**Project Status**: ✅ Complete MVP
**Demo Ready**: Yes
