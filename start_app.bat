@echo off
echo Starting David Wade Marine Application...

:: Start the backend API server
start "DavidWadeMarine Backend API" /d "C:\dev\github\business\DavidWadeMarine\api" cmd /k "npx tsx watch src/server.ts"

:: Start the frontend Vite server
start "DavidWadeMarine Frontend" /d "C:\dev\github\business\DavidWadeMarine" cmd /k "npm run dev"

echo Waiting for services to initialize...
timeout /t 5 /nobreak

echo Opening the application in your default browser...
start http://localhost:5173
