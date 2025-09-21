@echo off
echo Starting Django Backend Server...
echo.
echo Server will be available at: http://localhost:5003
echo Admin panel: http://localhost:5003/admin
echo API endpoints: http://localhost:5003/api
echo.
echo Press Ctrl+C to stop the server
echo.
python manage.py runserver 0.0.0.0:5003