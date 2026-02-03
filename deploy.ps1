# CareerPilot Salone - Simple Deployment Script
# Just run: .\deploy.ps1

Write-Host "🚀 CareerPilot Salone Deployment" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Stop any stuck processes
Write-Host "⏹️  Stopping any stuck processes..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Step 2: Try to deploy
Write-Host "📦 Deploying to Vercel..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  A browser window will open for login." -ForegroundColor Magenta
Write-Host "   Please approve the login and return here." -ForegroundColor Magenta
Write-Host ""

# Run Vercel deploy
npx vercel --prod

# Check result
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your app is now live! Check the URL above." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed." -ForegroundColor Red
    Write-Host ""
    Write-Host "Try this manually:" -ForegroundColor Yellow
    Write-Host "1. npx vercel login" -ForegroundColor White
    Write-Host "2. npx vercel --prod" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to close..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
