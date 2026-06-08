$webRoot = $PSScriptRoot
$port    = 3500
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving http://localhost:$port  (Ctrl+C to stop)"

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $res = $ctx.Response
  try {
    $localPath = $req.Url.LocalPath
    if ($localPath -eq '/' -or $localPath -eq '') { $localPath = '/index.html' }
    $localPath = [Uri]::UnescapeDataString($localPath)
    $filePath  = Join-Path $webRoot ($localPath.TrimStart('/').Replace('/', '\'))

    if (Test-Path $filePath -PathType Leaf) {
      $ext  = [IO.Path]::GetExtension($filePath).ToLower()
      $mime = switch ($ext) {
        '.html' { 'text/html; charset=utf-8' }
        '.css'  { 'text/css' }
        '.js'   { 'application/javascript' }
        '.png'  { 'image/png' }
        '.jpg'  { 'image/jpeg' }
        '.jpeg' { 'image/jpeg' }
        '.mp4'  { 'video/mp4' }
        '.pdf'  { 'application/pdf' }
        '.ico'  { 'image/x-icon' }
        default { 'application/octet-stream' }
      }
      $bytes = [IO.File]::ReadAllBytes($filePath)
      $res.ContentType     = $mime
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $res.StatusCode = 404
      $b = [Text.Encoding]::UTF8.GetBytes("404 Not Found: $localPath")
      $res.ContentType = 'text/plain'
      $res.ContentLength64 = $b.Length
      $res.OutputStream.Write($b, 0, $b.Length)
    }
  } catch {}
  finally { $res.OutputStream.Close() }
}
