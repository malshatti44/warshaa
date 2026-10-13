# Copy the Warsha sources into the GitHub working copy (E:\craft-ar\warshaa): every app under apps\,
# the patched libraries, the translation tools and memory, the icons and the packaging scripts.
# Build output, git metadata and logs stay out.
$ErrorActionPreference = 'Stop'
$Root = 'E:\craft-ar'
$Repo = Join-Path $Root 'warshaa'
$Apps = 'photocraft','vectorcraft','filmcraft','lightcraft','pdfcraft','effectcraft','designcraft','wordcraft','deckcraft','gridcraft','cadcraft','soundcraft','craft-launcher'
function Mirror($from, $to, [string[]] $xd = @(), [string[]] $xf = @()) {
  $args = @($from, $to, '/MIR', '/NFL', '/NDL', '/NJH', '/NJS', '/NP', '/R:1', '/W:1')
  if ($xd.Count) { $args += '/XD'; $args += $xd }
  if ($xf.Count) { $args += '/XF'; $args += $xf }
  & robocopy @args | Out-Null
  if ($LASTEXITCODE -ge 8) { throw "robocopy $from failed ($LASTEXITCODE)" }
}
foreach ($a in $Apps) {
  Mirror (Join-Path $Root "upstream\$a") (Join-Path $Repo "apps\$a") @('.git', 'target', 'dist', 'node_modules', '.venv') @('*.log')
  Write-Output "apps\$a"
}
Mirror (Join-Path $Root 'shared') (Join-Path $Repo 'shared') @('.git', 'target', 'bidi-demo') @('*.log', 'out*.png')
Mirror (Join-Path $Root 'i18n') (Join-Path $Repo 'i18n') @('__pycache__', 'batches') @('*.log', 'pdfcraft-upstream-ar.tsv')
Mirror (Join-Path $Root 'icons') (Join-Path $Repo 'icons') @('__pycache__') @('preview.png')
Mirror (Join-Path $Root 'packaging') (Join-Path $Repo 'packaging') @('__pycache__') @()
Write-Output 'shared, i18n, icons, packaging'
