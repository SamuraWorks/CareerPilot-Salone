$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCrmtcYwBbBw1KAYwQ75X0xWHz6dLPZya0"
$body = @{
    contents = @(
        @{ parts = @( @{ text = "Ping" } ) }
    )
} | ConvertTo-Json -Depth 5

Write-Host "Testing Key: AIzaSyCrmtcYwBbBw1KAYwQ75X0xWHz6dLPZya0"
Write-Host "URL: $url"

try {
    $response = Invoke-WebRequest -Uri $url -Method Post -Body $body -ContentType "application/json" -UseBasicParsing
    Write-Host "SUCCESS: $($response.Content)"
}
catch {
    Write-Host "FAILURE: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader $_.Exception.Response.GetResponseStream()
        Write-Host "API RESPONSE: $($reader.ReadToEnd())"
    }
}
