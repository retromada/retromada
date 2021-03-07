$ProjectPath = "~\root\retromada"
$MirroredPath = "~\root\retromada.git"

If (!(Test-Path $MirroredPath)) {
  Write-Host "The mirror is non-existent, reflecting..." -Foreground Yellow
  $Package = Get-Content "package.json" | ConvertFrom-Json
  Set-Location "~\root"
  Invoke-Command -ScriptBlock {
    & {
      git clone --mirror $Package.repository.url
      Set-Location $MirroredPath
      git remote set-url --push origin "$($Package.homepage)/retromada"
    }
  }
  Write-Host "Mirroring complete ($($MirroredPath))" -Foreground Green
}

If (!($PWD.Path -eq (Resolve-Path $MirroredPath).Path)) {
  Set-Location $MirroredPath
}

Write-Output "Synchronizing mirror..."
Invoke-Command -ScriptBlock {
  & {
    git fetch --prune
    git push --mirror
  }
}

Set-Location $ProjectPath
