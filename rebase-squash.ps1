#!/bin/bash
# Automated rebase script to squash commits
# Keep the first commit as 'pick', change all others to 'squash'

$file = $args[0]
$content = Get-Content $file
$newContent = @()
$firstCommit = $true

foreach ($line in $content) {
    if ($line -match '^pick ') {
        if ($firstCommit) {
            $newContent += $line
            $firstCommit = $false
        } else {
            $newContent += $line -replace '^pick', 'squash'
        }
    } else {
        $newContent += $line
    }
}

$newContent | Set-Content $file -Encoding UTF8
