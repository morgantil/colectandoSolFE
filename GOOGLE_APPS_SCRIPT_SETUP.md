# Configuración de Google Apps Script para Formulario

## Pasos para configurar Google Apps Script

### 1. Crear un nuevo proyecto de Google Apps Script

1. Ve a [Google Apps Script](https://script.google.com/)
2. Haz clic en "Nuevo proyecto"
3. Reemplaza el código por defecto con el siguiente código:

```javascript
function doPost(e) {
  try {
    // Obtener los datos del formulario
    let data;
    
    // Manejar tanto JSON como datos de formulario
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      data = JSON.parse(e.parameter.data);
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, message: 'No se recibieron datos'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.action === 'addFormData') {
      // ID de la hoja de cálculo (extraído de la URL)
      const SPREADSHEET_ID = '1nyiGHmpKBcCrpiRvfYg2rpK8cHB9OqWNL90S4rxNaBY';
      
      // Abrir la hoja de cálculo
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      
      // Seleccionar la primera hoja (o crear una nueva si no existe)
      let sheet = spreadsheet.getSheets()[0];
      if (!sheet) {
        sheet = spreadsheet.insertSheet('Formularios');
      }
      
      // Si la hoja está vacía, agregar encabezados
      if (sheet.getLastRow() === 0) {
        const headers = [
          'Timestamp',
          'ID Cuenta',
          'Número Medidor',
          'Nombre Titular',
          'DNI',
          'Dirección',
          'Fecha Nacimiento',
          'Entre Calles',
          'Departamento',
          'Referencia',
          'Zona',
          'Partido',
          'Localidad',
          'Teléfono',
          'Mail',
          'Medidor',
          'Fecha',
          'Artefactos',
          'Observaciones',
          'Nombre Cliente',
          'Nombre Promotor',
          'Resultado',
          'Firma Cliente',
          'Firma Promotor'
        ];
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      }
      
      // Agregar los datos del formulario
      const rowData = data.data;
      sheet.appendRow(rowData);
      
      return ContentService
        .createTextOutput(JSON.stringify({success: true, message: 'Datos agregados exitosamente'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: 'Acción no reconocida'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({message: 'Servicio funcionando correctamente'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 2. Configurar permisos

1. Guarda el proyecto con un nombre descriptivo (ej: "Formulario Capacitación Energética")
2. Haz clic en "Ejecutar" para autorizar los permisos
3. Acepta los permisos solicitados:
   - Acceso a Google Sheets
   - Acceso a Google Drive (si es necesario)

### 3. Desplegar como aplicación web

1. Haz clic en "Implementar" > "Nueva implementación"
2. Selecciona "Tipo: Aplicación web"
3. Configura:
   - Descripción: "API para formulario de capacitación energética"
   - Ejecutar como: "Yo"
   - Quién tiene acceso: "Cualquiera"
4. Haz clic en "Implementar"
5. Copia la URL de la aplicación web (será algo como: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

### 4. Solucionar problemas de CORS

Si encuentras errores de CORS, sigue estos pasos adicionales:

1. **Actualiza el código del Google Apps Script** con la versión corregida que incluye manejo de CORS
2. **Vuelve a desplegar** la aplicación web después de actualizar el código
3. **Verifica que la URL** sea la correcta en tu servicio Angular

**Nota importante**: Después de actualizar el código del Google Apps Script, DEBES volver a desplegar la aplicación web para que los cambios surtan efecto.

### 5. Actualizar el servicio en Angular

Una vez que tengas la URL del script, actualiza el archivo `google-sheets.service.ts`:

```typescript
// Reemplaza esta línea en el método enviarFormularioViaAppsScript:
const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

Con la URL real de tu script desplegado.

### 6. Configurar la hoja de Google Sheets

1. Ve a tu hoja de Google Sheets: https://docs.google.com/spreadsheets/d/1nyiGHmpKBcCrpiRvfYg2rpK8cHB9OqWNL90S4rxNaBY/edit
2. Asegúrate de que tienes permisos de edición
3. La primera hoja se usará automáticamente para almacenar los datos
4. Los encabezados se crearán automáticamente la primera vez que se envíe un formulario

### 7. Probar la configuración

1. Ejecuta tu aplicación Angular
2. Completa el formulario
3. Haz clic en "Enviar"
4. Verifica que los datos aparezcan en la hoja de Google Sheets

## Notas importantes

- El script de Google Apps Script maneja automáticamente la creación de encabezados
- Los datos se agregan como nuevas filas al final de la hoja
- Las firmas se almacenan como texto indicando si están presentes o no
- El timestamp se agrega automáticamente cuando se envía el formulario
- Si necesitas almacenar las firmas como imágenes, se puede modificar el script para usar Google Drive
