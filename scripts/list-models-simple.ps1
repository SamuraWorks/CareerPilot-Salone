$response = Invoke-WebRequest -Uri 'https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyCrmtcYwBbBw1KAYwQ75X0xWHz6dLPZya0' -UseBasicParsing
$json = $response.Content | ConvertFrom-Json
$json.models.name
