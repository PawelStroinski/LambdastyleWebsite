function ZipFiles( $zipfilename, $sourcedir ) # http://stackoverflow.com/a/13302548
{
    Add-Type -Assembly System.IO.Compression.FileSystem
    $compressionLevel = [System.IO.Compression.CompressionLevel]::Optimal
    [System.IO.Compression.ZipFile]::CreateFromDirectory($sourcedir,
        $zipfilename, $compressionLevel, $false)
}

$version = [System.Reflection.Assembly]::LoadFrom("tmp\lambdastyle.exe").GetName().Version
$shortVersion = "$version".Substring(0, 5)
$zipfilename = "Lambdastyle-$shortVersion.zip"
$sourcedir = "tmp";
If (Test-Path $zipfilename) {
    Remove-Item $zipfilename
}
ZipFiles $zipfilename $sourcedir