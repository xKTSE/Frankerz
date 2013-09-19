Set NasPath=%CD%
Set GetFolderTemp=%NasPath%
:GetFolder
FOR /F "tokens=1,* delims=\" %%1 IN ("%GetFolderTemp%") do (
set NasFolder=%%1
set GetFolderTemp=%%2
)
if not "a%GetFolderTemp%"=="a" goto :GetFolder

if NOT [%NasFolder%] == [] (
	MKDIR "C:\wamp\www\%NasFolder%"
	XCOPY /y /s /e "%CD%" "C:\wamp\www\%NasFolder%"
	)

pause

:: http://stackoverflow.com/questions/7250546/batch-getting-the-last-folder-name-from-a-absolute-path

:: C:\Users\kevinpanxc\Documents\Personal^ Projects\HTML\exportToWamp.bat "%CD%" "%NasFolder%"

:: if NOT [%2] == [] (
::	MKDIR "C:\wamp\www\%~2"
::	XCOPY /y /s /e "%~1" "C:\wamp\www\%~2"
::	)