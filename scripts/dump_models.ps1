$response = Invoke-WebRequest -Uri 'https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyCrmtcYwBbBw1KAYwQ75X0xWHz6dLPZya0' -UseBasicParsing
$response.Content | Out-File -Encoding ASCII "models.json"
Write-Host "Dumped models to models.json"
