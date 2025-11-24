@echo off
REM Eye Oracle Daily Blog Generator
REM Run this script daily (manually or via Task Scheduler)

echo.
echo ===================================================================
echo    THE EYE ORACLE - Daily Investigative Report Generator
echo ===================================================================
echo.

REM Change to project directory
cd /d "%~dp0.."

echo [1/3] Checking for existing post today...
node scripts/generate-eye-oracle-daily.js

echo.
echo [2/3] Verifying post was created...
if exist "public\data\eye-oracle-posts.json" (
    echo SUCCESS: Eye Oracle posts file exists
) else (
    echo WARNING: No posts file found
)

echo.
echo [3/3] Counting total Oracle posts...
powershell -Command "(Get-Content 'public\data\eye-oracle-posts.json' | ConvertFrom-Json).Count"

echo.
echo ===================================================================
echo    Process Complete! Visit http://localhost:3000/eye-oracle
echo ===================================================================
echo.

pause
