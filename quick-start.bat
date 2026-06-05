@echo off
REM GreenOps AI Quick Start Script for Windows

echo.
echo 🌱 GreenOps AI - Quick Start
echo ==============================
echo.

REM Check Node.js
echo ✓ Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Node.js not found. Please install Node.js 18+
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo   Node.js version: %NODE_VERSION%

REM Check Python (optional)
echo ✓ Checking Python...
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
    echo   Python version: %PYTHON_VERSION%
) else (
    echo   ⚠ Python not found (optional for ML service^)
)

echo.
echo ==============================
echo Installation Steps:
echo ==============================
echo.

echo 1. Install Frontend Dependencies
echo    Run: npm install
echo.

echo 2. Start Development Server
echo    Run: npm run dev
echo    Visit: http://localhost:3000
echo.

echo 3. (Optional) Setup Python ML Service
echo    Run:
echo    cd python-service
echo    pip install -r requirements.txt
echo    python train_model.py
echo    python main.py
echo    Visit: http://localhost:8000/docs
echo.

echo ==============================
echo Documentation:
echo ==============================
echo • README.md - Complete guide
echo • GETTING_STARTED.md - 5-minute quick start
echo • SETUP.md - Detailed development setup
echo • BUILD_COMPLETE.md - Build status ^& features
echo • docs/architecture.md - System architecture
echo • docs/workflow.md - Data flow
echo.

echo 🚀 Ready to build?
echo Start with: npm install
echo.
pause
