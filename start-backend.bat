@echo off
echo ========================================
echo   Starting Bakery Backend Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [1/3] Installing dependencies...
    call npm install
    echo.
) else (
    echo [1/3] Dependencies already installed ✓
)

REM Check if .env exists
if not exist ".env" (
    echo [2/3] Creating .env file...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Please edit .env file with your MongoDB URI
    echo.
    pause
) else (
    echo [2/3] .env file exists ✓
)

echo [3/3] Starting server...
echo.
echo Backend will run on http://localhost:5000
echo Press Ctrl+C to stop
echo.
call npm run dev

