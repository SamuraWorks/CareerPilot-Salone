$url = "https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyCrmtcYwBbBw1KAYwQ75X0xWHz6dLPZya0"

try {
    $response = Invoke-WebRequest -Uri $url -Method Get -UseBasicParsing
    Write-Host "SUCCESS: $($response.Content)"
}
catch {
    Write-Host "FAILURE: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader $_.Exception.Response.GetResponseStream()
        Write-Host "API RESPONSE: $($reader.ReadToEnd())"
    }
}
