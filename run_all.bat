@echo off
title NARCO-FUSION Intelligence Platform Launcher
echo =======================================================================
echo    NARCO-FUSION | Dark Web & Encrypted Drug Intelligence Platform
echo    Chandigarh Police Hackathon - Track 3 (Grapnel-Inspired Fusion)
echo =======================================================================
echo.
echo Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "Narco-Fusion Backend (FastAPI)" cmd /k "cd backend && py seed_data.py && py -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 2 >nul

echo Starting React + Vite Operations Center UI on http://localhost:5173 ...
start "Narco-Fusion Frontend (Vite)" cmd /k "cd frontend && npm run dev"

echo.
echo =======================================================================
echo [SUCCESS] Backend and Frontend servers launched!
echo Access the Operations Center at: http://localhost:5173
echo =======================================================================
pause
