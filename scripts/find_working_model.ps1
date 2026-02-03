$key = "AIzaSyCrmtcYwBbBw1KAYwQ75X0xWHz6dLPZya0"
$json = Get-Content "models.json" | ConvertFrom-Json
$models = $json.models.name

$body = @{ contents = @( @{ parts = @( @{ text = "Ping" } ) } ) } | ConvertTo-Json -Depth 5
$outFile = "working_model.txt"
"Searching for working model..." | Out-File -FilePath $outFile -Encoding ASCII

foreach ($modelName in $models) {
    # modelName is like "models/gemini-1.5-flash", we need to strip "models/" sometimes or keep it.
    # The API usually accepts just the name or with models/ prefix. Let's try as is.
    $cleanName = $modelName -replace "models/", ""
    
    Write-Host "Testing $cleanName..."
    $url = "https://generativelanguage.googleapis.com/v1beta/models/$($cleanName):generateContent?key=$key"
    
    try {
        $response = Invoke-WebRequest -Uri $url -Method Post -Body $body -ContentType "application/json" -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Host "FOUND WORKING MODEL: $cleanName"
            "FOUND: $cleanName" | Out-File -FilePath $outFile -Append -Encoding ASCII
            # Continue searching for more models
        }
    }
    catch {
        Write-Host "Failed: $($_.Exception.Message)"
    }
}
Write-Host "Search complete."
