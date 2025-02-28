import subprocess
from datetime import datetime

# Generar la fecha y hora actual en formato numérico (YYYYMMDDHHMMSS)
newdir = datetime.now().strftime("%Y%m%d%H%M%S")
print(f"📂 Código generado: {newdir}")

# Ejecutar el script JavaScript con la clave generada
try:
    result = subprocess.run(
        ['node', 'seed.js', newdir],
        capture_output=True,
        text=True,
        check=True
    )

    # Mostrar la salida del script
    print("✅ Salida de seed.js:\n", result.stdout)
    if result.stderr:
        print("⚠️ Errores en seed.js:\n", result.stderr)

except subprocess.CalledProcessError as e:
    print("❌ Error al ejecutar seed.js:", e.stderr)
except Exception as e:
    print("❌ Error general:", str(e))
