@echo off
echo ========================================
echo   ABBA WHISPERS DJANGO ADMIN PANEL
echo ========================================
echo.
echo Starting Django server...
echo.
echo ADMIN PANEL ACCESS:
echo URL: http://localhost:5003/admin
echo.
echo SUPERUSER CREDENTIALS:
echo Username: admin
echo Password: admin123
echo.
echo OR
echo Username: abbaswhispers  
echo Password: [your password]
echo.
echo ========================================
echo.
cd django_backend
python manage.py runserver 0.0.0.0:5003