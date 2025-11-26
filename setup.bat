@echo off
REM Notes Keeper - Complete Setup Script for Windows
REM This script sets up both backend and frontend

echo.
echo =======================================
echo 🚀 Notes Keeper - Full Stack Setup
echo =======================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install it first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js is installed
echo.

REM Check if npm is available
npm -v >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not available
    pause
    exit /b 1
)

echo ✓ npm is available
echo.

REM Backend Setup
echo Setting up Backend...
cd backend

REM Copy .env file if it doesn't exist
if not exist .env (
    copy .env.example .env
    echo ✓ Created .env file
    echo   Please edit backend\.env with your PostgreSQL credentials
) else (
    echo ⚠ .env file already exists
)

REM Install dependencies
echo Installing backend dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed

cd ..

REM Frontend Setup
echo.
echo Setting up Frontend...
cd frontend

REM Install dependencies
echo Installing frontend dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed

cd ..

REM Summary
echo.
echo =======================================
echo ✅ Setup Complete!
echo =======================================
echo.
echo 📝 Next Steps:
echo.
echo 1. Configure Database:
echo    - Start PostgreSQL
echo    - Run commands in DATABASE_SETUP.sql
echo.
echo 2. Edit Backend Configuration:
echo    - Edit backend\.env with your database credentials
echo.
echo 3. Start Backend Server (Command Prompt):
echo    - cd backend
echo    - npm run dev
echo.
echo 4. Start Frontend Server (New Command Prompt):
echo    - cd frontend
echo    - npm start
echo.
echo 5. Open in Browser:
echo    - http://localhost:4200
echo.
echo 📚 See README.md for full documentation
echo.
pause
