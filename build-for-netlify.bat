@echo off
echo Starting Netlify build process...

cd frontend

echo Installing dependencies...
call npm ci

echo Setting environment variables...
set REACT_APP_API_URL=https://abbawhispers-backend.herokuapp.com/api
set GENERATE_SOURCEMAP=false
set PUBLIC_URL=.

echo Building React application...
call npm run build

echo Build completed successfully!
echo Files ready for Netlify deployment

pause