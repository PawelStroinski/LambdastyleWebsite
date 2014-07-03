md tmp
copy ..\..\LambdastylePrototype\CLI\bin\Release\*.dll tmp
copy ..\..\LambdastylePrototype\CLI\bin\Release\*.exe tmp
copy ..\..\LambdastylePrototype\COPYING.md tmp
del tmp\*vshost.exe
powershell -file ZipHelper.ps1
del tmp\*.dll
del tmp\*.exe
del tmp\COPYING.md
rd tmp
pause