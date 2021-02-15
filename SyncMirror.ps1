$ProjectPath = "~\root\retromada"
$MirroredPath = "~\root\retromada.git"

If (!(Test-Path $MirroredPath)) {
  Write-Host "The mirror is non-existent, reflecting..." -Foreground Yellow
  Set-Location "~\root"
  Invoke-Command -ScriptBlock {
    & {
      git clone --mirror "https://github.com/tenasatupitsyn/retromada.git"
      Set-Location $MirroredPath
      git remote set-url --push origin "https://github.com/retromada/retromada"
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
