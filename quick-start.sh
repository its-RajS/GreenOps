#!/bin/bash
# GreenOps AI Quick Start Script

echo "🌱 GreenOps AI - Quick Start"
echo "=============================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "✗ Node.js not found. Please install Node.js 18+"
    exit 1
fi
NODE_VERSION=$(node -v)
echo "  Node.js version: $NODE_VERSION"

# Check Python
echo "✓ Checking Python..."
if ! command -v python3 &> /dev/null; then
    echo "⚠ Python 3 not found (optional for ML service)"
else
    PYTHON_VERSION=$(python3 --version)
    echo "  Python version: $PYTHON_VERSION"
fi

echo ""
echo "=============================="
echo "Installation Steps:"
echo "=============================="
echo ""

echo "1. Install Frontend Dependencies"
echo "   Run: npm install"
echo ""

echo "2. Start Development Server"
echo "   Run: npm run dev"
echo "   Visit: http://localhost:3000"
echo ""

echo "3. (Optional) Setup Python ML Service"
echo "   Run:"
echo "   cd python-service"
echo "   pip install -r requirements.txt"
echo "   python train_model.py"
echo "   python main.py"
echo "   Visit: http://localhost:8000/docs"
echo ""

echo "=============================="
echo "Documentation:"
echo "=============================="
echo "• README.md - Complete guide"
echo "• GETTING_STARTED.md - 5-minute quick start"
echo "• SETUP.md - Detailed development setup"
echo "• BUILD_COMPLETE.md - Build status & features"
echo "• docs/architecture.md - System architecture"
echo "• docs/workflow.md - Data flow"
echo ""

echo "🚀 Ready to build?"
echo "Start with: npm install"
echo ""
