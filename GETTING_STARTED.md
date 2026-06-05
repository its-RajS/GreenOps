# Getting Started with GreenOps AI

## Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Frontend
```bash
npm run dev
```

Visit http://localhost:3000

### 3. Start Python Service (Optional)
```bash
cd python-service
pip install -r requirements.txt
python train_model.py
python main.py
```

The Python service will run on http://localhost:8000

## Project Structure

- `src/` - Next.js frontend code
- `python-service/` - FastAPI ML service
- `docs/` - Documentation
- `public/` - Static assets

## Key Features

1. **Dashboard** - Real-time carbon metrics and KPIs
2. **Forecast** - 6-month AI predictions
3. **Recommendations** - Smart optimization suggestions
4. **Green Score** - Sustainability rating

## Commands

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Lint
npm run lint
```

## Environment Variables

Currently using mock data. No env variables needed for MVP.

## Troubleshooting

**Port already in use?**
```bash
# Change port
npm run dev -- -p 3001
```

**Python service errors?**
The frontend works without the Python service (fallback data is used).

## Next Steps

1. Explore the dashboard
2. Check out each page (Forecast, Recommendations, Green Score)
3. Review the code in `src/` folder
4. Read architecture docs in `docs/` folder

## Support

For issues or questions, check the README.md file.

---

Happy coding! 🌱
