@echo off
title NARC-OSINT Intelligence Platform Launcher
echo ========================================================
echo    NARC-OSINT | Dark Web & Encrypted Drug Intelligence Platform
echo    Chandigarh Police Hackathon - Track 3 (Grapnel-Inspired Fusion)
echo ========================================================

echo Starting FastAPI Backend (Port 8000)...
start "NARC-OSINT Backend (FastAPI)" cmd /k "cd backend && py seed_data.py && py -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 3 /nobreak >nul

echo Starting Vite Frontend (Port 5173)...
start "NARC-OSINT Frontend (Vite)" cmd /k "cd frontend && npm run dev"

echo.
echo =======================================================================
echo [SUCCESS] Backend and Frontend servers launched!
echo Access the Operations Center at: http://localhost:5173
echo =======================================================================
pause
