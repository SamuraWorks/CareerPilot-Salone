$models = @("gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-001", "gemini-flash-latest", "gemini-1.5-pro-latest")
$key = "AIzaSyCrmtcYwBbBw1KAYwQ75X0xWHz6dLPZya0"
$body = @{ contents = @( @{ parts = @( @{ text = "Ping" } ) } ) } | ConvertTo-Json -Depth 5
$outFile = "batch_results.txt"
"Test Started" | Out-File -FilePath $outFile -Encoding ASCII

foreach ($model in $models) {
    $msg = "Testing Model: $model"
    Write-Host $msg
    $msg | Out-File -FilePath $outFile -Append -Encoding ASCII
    
    $url = "https://generativelanguage.googleapis.com/v1beta/models/$($model):generateContent?key=$key"
    try {
        $response = Invoke-WebRequest -Uri $url -Method Post -Body $body -ContentType "application/json" -UseBasicParsing
        $successMsg = "SUCCESS ($model): $($response.StatusCode)"
        Write-Host $successMsg
        $successMsg | Out-File -FilePath $outFile -Append -Encoding ASCII
    }
    catch {
        $failMsg = "FAILURE ($model): $($_.Exception.Message)"
        Write-Host $failMsg
        $failMsg | Out-File -FilePath $outFile -Append -Encoding ASCII
    }
}
