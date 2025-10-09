# Formulario de Capacitación Energética - Integración con Google Sheets

## Resumen de Cambios

Se ha modificado el formulario para enviar automáticamente los datos a Google Sheets cuando el usuario hace clic en "Enviar".

## Archivos Modificados

1. **`src/app/services/google-sheets.service.ts`** - Nuevo servicio para manejar la integración con Google Sheets
2. **`src/app/features/formulario/pages/formulario-respaldo/formulario-respaldo.ts`** - Modificado para usar el servicio de Google Sheets
3. **`package.json`** - Agregada dependencia `@types/google-apps-script` (para tipos de TypeScript)

## Configuración Requerida

### Paso 1: Configurar Google Apps Script

1. Ve a [Google Apps Script](https://script.google.com/)
2. Crea un nuevo proyecto
3. Copia el código del archivo `GOOGLE_APPS_SCRIPT_SETUP.md`
4. Despliega como aplicación web
5. Copia la URL del script desplegado

### Paso 2: Actualizar la URL en el Servicio

En el archivo `src/app/services/google-sheets.service.ts`, línea 74, reemplaza:

```typescript
const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

Con la URL real de tu Google Apps Script.

✅ **Ya configurado**: La URL ya está actualizada con tu Google Apps Script

### Paso 3: Verificar Permisos

Asegúrate de que tienes permisos de edición en la hoja de Google Sheets:
https://docs.google.com/spreadsheets/d/1nyiGHmpKBcCrpiRvfYg2rpK8cHB9OqWNL90S4rxNaBY/edit

## Funcionalidad

- **Envío Automático**: Al hacer clic en "Enviar", los datos se envían automáticamente a Google Sheets
- **Validación**: El formulario valida que todos los campos requeridos estén completos y que ambas firmas estén presentes
- **Feedback Visual**: Muestra mensajes de éxito o error al usuario
- **Limpieza Automática**: Después del envío exitoso, el formulario se limpia automáticamente
- **Timestamp**: Se agrega automáticamente la fecha y hora de envío

## Estructura de Datos en Google Sheets

Los datos se almacenan con las siguientes columnas:

1. Timestamp (fecha/hora de envío)
2. ID Cuenta
3. Número Medidor
4. Nombre Titular
5. DNI
6. Dirección
7. Fecha Nacimiento
8. Entre Calles
9. Departamento
10. Referencia
11. Zona
12. Partido
13. Localidad
14. Teléfono
15. Mail
16. Medidor
17. Fecha
18. Artefactos
19. Observaciones
20. Nombre Cliente
21. Nombre Promotor
22. Resultado
23. Firma Cliente (texto indicando si está presente)
24. Firma Promotor (texto indicando si está presente)

## Pruebas

Para probar la funcionalidad:

1. Completa el formulario con datos de prueba
2. Agrega las firmas en los canvas
3. Haz clic en "Enviar"
4. Verifica que aparezca el mensaje de éxito
5. Revisa la hoja de Google Sheets para confirmar que los datos se agregaron

## Solución de Problemas

- **Error "Google Apps Script URL no configurada"**: Verifica que hayas actualizado la URL en el servicio
- **Error de permisos**: Asegúrate de que el Google Apps Script tenga permisos para editar la hoja
- **Error de CORS**: El Google Apps Script debe estar desplegado como aplicación web con acceso público
- **Datos no aparecen**: Verifica que el ID de la hoja de cálculo sea correcto en el script

## Notas Técnicas

- Se usa Google Apps Script en lugar de la API completa para simplificar la implementación
- Las firmas se almacenan como texto indicando su presencia (no como imágenes)
- El servicio maneja errores y proporciona feedback al usuario
- La aplicación es completamente funcional sin necesidad de servidor backend
