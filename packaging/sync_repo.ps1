# Copy the Warsha sources into the GitHub working copy (E:\warsha-src\warshaa): every app under apps\,
# the patched libraries, the translation tools and memory, the icons and the packaging scripts.
# Build output, git metadata and logs stay out.
$ErrorActionPreference = 'Stop'
$Root = 'E:\warsha-src'
$Repo = Join-Path $Root 'warshaa'
$Apps = 'retoush','reesha','monteer','tayf','watheeq','wamda','nasaq','satr','minbar','kashf','mukhattat','sada','warsha'
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
Mirror (Join-Path $Root 'i18n') (Join-Path $Repo 'i18n') @('__pycache__', 'batches') @('*.log', 'watheeq-upstream-ar.tsv')
Mirror (Join-Path $Root 'icons') (Join-Path $Repo 'icons') @('__pycache__') @('preview.png')
Mirror (Join-Path $Root 'packaging') (Join-Path $Repo 'packaging') @('__pycache__', 'macos-preview') @()
# The macOS, Linux and web builds run on GitHub's runners (packaging\github\*.yml).
New-Item -ItemType Directory -Force (Join-Path $Repo '.github\workflows') | Out-Null
Copy-Item (Join-Path $Root 'packaging\github\*.yml') (Join-Path $Repo '.github\workflows') -Force
# Helper scripts (the dictionary converter, the wiring and rename tools), not the downloaded installers.
Mirror (Join-Path $Root 'tools') (Join-Path $Repo 'tools') @('__pycache__') @('*.exe', '*.log', 'unbrand*.py', 'move_root.py')
# The assistant's Python prototype and its task suites (no model, runtime, logs or scratch work).
Mirror (Join-Path $Root 'assistant\eval') (Join-Path $Repo 'assistant\eval') @('__pycache__', 'logs', 'results', 'work*', '*_logo') @('*.log', '*.xlsx', '*.png', '*.jpg', '*.pdf', '*_logo')
Copy-Item (Join-Path $Root 'packaging\README-repo.md') (Join-Path $Repo 'README.md') -Force
Write-Output 'shared, i18n, icons, packaging, tools, assistant\eval, README.md'
