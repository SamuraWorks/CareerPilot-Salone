
@echo off
cd /d "C:\Users\conte\Downloads\CareerPilot-Salone-main\CareerPilot-Salone-main"

echo --- Checking for Git ---
set "GIT_CMD=git"

:: Try system PATH first
where git >nul 2>nul
if %errorlevel% equ 0 goto :Found

:: Try the confirmed location I found on your system
if exist "C:\Program Files\Git\cmd\git.exe" set "GIT_CMD=C:\Program Files\Git\cmd\git.exe" & goto :Found
if exist "C:\Program Files\Git\bin\git.exe" set "GIT_CMD=C:\Program Files\Git\bin\git.exe" & goto :Found

:: Common local paths
if exist "C:\Program Files (x86)\Git\cmd\git.exe" set "GIT_CMD=C:\Program Files (x86)\Git\cmd\git.exe" & goto :Found
if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" set "GIT_CMD=%LOCALAPPDATA%\Programs\Git\cmd\git.exe" & goto :Found

:NotFound
echo [ERROR] Git is not found in standard paths.
echo.
echo Please run this specific command in your command prompt to fix this manually:
echo setx PATH "%%PATH%%;C:\Program Files\Git\cmd"
echo.
echo Then restart your computer and try again.
pause
exit /b

:Found
echo Using Git at: "%GIT_CMD%"

:: Initialize repo if it doesn't exist (since ZIP downloads don't have .git)
if not exist .git (
    echo --- Initializing New Repository ---
    "%GIT_CMD%" init
    "%GIT_CMD%" config user.email "mentor@careerpilot.sl"
    "%GIT_CMD%" config user.name "CareerPilot Salone User"
)

echo --- Configuring Remote ---
"%GIT_CMD%" remote remove origin >nul 2>nul
"%GIT_CMD%" remote add origin https://github.com/SamuraWorks/CareerPilot-Salone.git

echo --- Squashing All History into ONE Commit ---
:: Create a temporary orphan branch which has no history
"%GIT_CMD%" checkout --orphan temp_squash_branch
"%GIT_CMD%" add .
"%GIT_CMD%" commit -m "CareerPilot Salone: Full System Implementation (Squashed)"

:: Delete the old main branch and rename the temporary one
"%GIT_CMD%" branch -D main >nul 2>nul
"%GIT_CMD%" branch -m main

echo --- Pushing to GitHub (Force) ---
"%GIT_CMD%" push -u origin main -f

echo.
echo SUCCESS: All changes have been squashed into a single commit and pushed.

echo.
echo Process Complete. Use your GitHub credentials if prompted.
pause
