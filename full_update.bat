
@echo off
cd /d "C:\Users\conte\Downloads\CareerPilot-Salone-main\CareerPilot-Salone-main"

echo --- Installing Dependencies ---
call npm install

echo --- Building Project ---
call npm run build

echo --- Pushing to GitHub ---
git add .
git commit -m "Update Project: Dependencies, Build, and Features"
git push

echo Done.
pause
