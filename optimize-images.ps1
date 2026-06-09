# Image optimizer: resizes + recompresses project media into media/<slug>/
# Generates: <slug>/<n>.jpg (full, max 1600px) and <slug>/<n>-t.jpg (thumb, max 500px)
Add-Type -AssemblyName System.Drawing

$root = $PSScriptRoot
$outRoot = Join-Path $root 'media'
if (-not (Test-Path $outRoot)) { New-Item -ItemType Directory -Path $outRoot | Out-Null }

# JPEG encoder + quality helper
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
function Save-Jpg($bitmap, $path, $quality) {
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
  $bitmap.Save($path, $jpegCodec, $ep)
  $ep.Dispose()
}

function Resize-And-Save($srcPath, $destPath, $maxDim, $quality) {
  $img = [System.Drawing.Image]::FromFile($srcPath)
  try {
    $w = $img.Width; $h = $img.Height
    $scale = [Math]::Min(1.0, $maxDim / [Math]::Max($w, $h))
    $nw = [int]([Math]::Round($w * $scale)); $nh = [int]([Math]::Round($h * $scale))
    if ($nw -lt 1) { $nw = 1 }; if ($nh -lt 1) { $nh = 1 }
    $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    # white background (flatten transparency for JPEG)
    $g.Clear([System.Drawing.Color]::White)
    $g.DrawImage($img, 0, 0, $nw, $nh)
    Save-Jpg $bmp $destPath $quality
    $g.Dispose(); $bmp.Dispose()
  } finally { $img.Dispose() }
}

# Build source lists explicitly (preserving gallery order)
$map = [ordered]@{}
$map['pigmentia'] = Get-ChildItem (Join-Path $root 'PROJELER/pigmentia') -Filter *.png | Sort-Object Name | ForEach-Object { $_.FullName }
$map['nox']        = 1..11 | ForEach-Object { Join-Path $root "PROJELER/nox/$_.png" }
$map['catch']      = @('menu','1','2','3','4','5') | ForEach-Object { Join-Path $root "PROJELER/catch oyun/$_.png" }
$map['igu-obis']   = @('Ekran görüntüsü 2026-06-08 153721.png','png.png') | ForEach-Object { Join-Path $root "PROJELER/igü obis/$_" }
$map['petgrooming']= @('pet-grooming-logo.jpg','pet-grooming-post.jpg','pet-grooming-canta.jpg','pet-grooming-canta2.jpg','pet-grooming-cepli-dosya.jpg') | ForEach-Object { Join-Path $root "PROJELER/Petgrooming/$_" }
$map['olebaby']    = @('ole_kartvizit.png','antetli_kagit.png') | ForEach-Object { Join-Path $root "PROJELER/Olebaby/$_" }
$map['poster']     = @('Betul_Alkan_Afis.jpg','mikroplastiklerafisi_eng.jpg','sosyal-sorumluluk-afisi.jpg','whatunitesusposter.jpg') | ForEach-Object { Join-Path $root "PROJELER/poster/$_" }

foreach ($slug in $map.Keys) {
  $destDir = Join-Path $outRoot $slug
  if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }
  $i = 1
  foreach ($src in $map[$slug]) {
    if (-not (Test-Path $src)) { Write-Host "MISSING: $src" -ForegroundColor Red; continue }
    Resize-And-Save $src (Join-Path $destDir "$i.jpg")   1600 82
    Resize-And-Save $src (Join-Path $destDir "$i-t.jpg") 500  70
    Write-Host "$slug/$i.jpg"
    $i++
  }
}

# Profile photo
Resize-And-Save (Join-Path $root 'images/profile-photo.jpeg') (Join-Path $root 'images/profile-photo.jpg') 720 82
Write-Host "profile done"
Write-Host "ALL DONE"
