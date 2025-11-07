@echo off
echo Compressing images in frontend/public/images...

REM Create backup directory
if not exist "frontend\public\images\backup" mkdir "frontend\public\images\backup"

REM Copy originals to backup
xcopy "frontend\public\images\*.jpg" "frontend\public\images\backup\" /Y
xcopy "frontend\public\images\*.jpeg" "frontend\public\images\backup\" /Y
xcopy "frontend\public\images\*.png" "frontend\public\images\backup\" /Y

REM Compress JPG files to 85% quality
for %%f in (frontend\public\images\*.jpg) do (
    echo Compressing %%f...
    magick "%%f" -quality 85 -strip "%%f"
)

REM Compress JPEG files to 85% quality
for %%f in (frontend\public\images\*.jpeg) do (
    echo Compressing %%f...
    magick "%%f" -quality 85 -strip "%%f"
)

REM Compress PNG files
for %%f in (frontend\public\images\*.png) do (
    echo Compressing %%f...
    magick "%%f" -strip "%%f"
)

echo Image compression complete!
echo Originals backed up to frontend\public\images\backup\
pause