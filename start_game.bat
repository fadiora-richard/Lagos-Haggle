@echo off
echo ========================================================
echo   LAST PRICE: THE ART OF THE HAGGLE
echo   Starting local game server...
echo ========================================================
start "" http://localhost:3000
python -m http.server 3000
pause
