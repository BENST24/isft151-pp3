@echo off
setlocal
set "DB_SETUP_FLAG=%~dp0.db_setup_complete"

echo ======================================================
echo  SCRIPT DE INICIO DEL PROYECTO - ISFT151-PP3
echo ======================================================
echo.

:: Cambia al directorio donde se encuentra el archivo .bat
cd /d "%~dp0"

:: Cargar variables desde .env (de forma simplificada para el .bat)
if exist .env (
    for /f "tokens=1,* delims==" %%a in ('type .env ^| findstr /R /C:"^DB_"') do (
        set "%%a=%%b"
    )
) else (
    echo.
    echo ADVERTENCIA: No se encontro el archivo .env. Usando valores por defecto.
    echo Por favor, copie .env.example a .env y configure sus credenciales.
    echo.
    set "DB_USER=root"
    set "DB_PASSWORD="
    set "DB_DATABASE=isft151-pp3-proyecto"
)

echo Verificando si las dependencias estan instaladas (node_modules)...
if not exist "node_modules" (
    echo Directorio node_modules no encontrado.
    echo ======================================================
    echo  INSTALANDO DEPENDENCIAS DEL PROYECTO (npm install)
    echo  Esto puede tardar unos momentos...
    echo ======================================================
    call npm install
) else (
    echo Las dependencias ya estan instaladas.
)

:: Ejecutar script SQL si no se ha hecho antes
if not exist "%DB_SETUP_FLAG%" (
    echo.
    echo ======================================================
    echo  PRIMERA EJECUCION: INTENTANDO CONFIGURAR LA BASE DE DATOS
    echo  Asegurese de que el servidor MySQL este corriendo.
    echo ======================================================
    echo.
    
    mysql -u %DB_USER% -p%DB_PASSWORD% < "fp\backend\DB\Data_Base.sql"
    
    echo. > "%DB_SETUP_FLAG%"
    echo Base de datos configurada. No se volvera a ejecutar este paso.
)

echo.
echo ======================================================
echo  INICIANDO EL ENTORNO DE DESARROLLO (npm run dev)
echo  El servidor se iniciara en http://localhost:3000
echo ======================================================

:: Ejecuta el script "dev" que configura la BD y levanta los servidores
:: Usamos 'start' para que se ejecute en una nueva ventana y no bloquee este script.
start "Node.js Server" call npm run dev

echo.
echo El servidor se esta iniciando en una nueva ventana...
echo Esperando 3 segundos para que el servidor este listo...

:: Pausa de 3 segundos para dar tiempo al servidor a arrancar.
timeout /t 3 /nobreak >nul

echo Abriendo el frontend en tu navegador...
start http://localhost:3000

endlocal