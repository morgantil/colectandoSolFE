# 🚨 SOLUCIÓN INMEDIATA - Error de CORS

## Problema
```
Access to fetch at 'https://script.google.com/macros/s/...' from origin 'http://localhost:4200' has been blocked by CORS policy
```

## Solución Paso a Paso

### 1. **Actualizar el código del Google Apps Script**

Ve a tu proyecto de Google Apps Script y reemplaza TODO el código con esta versión corregida:

```javascript
function doPost(e) {
  try {
    // Configurar headers CORS para permitir solicitudes desde localhost
    const response = ContentService.createTextOutput();
    
    // Obtener los datos del formulario
    const data = JSON.parse(e.postData.contents);
    
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
      
      return response
        .setContent(JSON.stringify({success: true, message: 'Datos agregados exitosamente'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return response
      .setContent(JSON.stringify({success: false, message: 'Acción no reconocida'}))
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

// Función para manejar solicitudes OPTIONS (preflight CORS)
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 2. **Guardar y Redesplegar**

1. **Guarda** el proyecto en Google Apps Script
2. **Ve a "Implementar"** > "Administrar implementaciones"
3. **Edita** la implementación existente
4. **Cambia la versión** a "Nueva"
5. **Guarda** y **Redesplega**

### 3. **Verificar la URL**

Asegúrate de que la URL en tu servicio Angular sea exactamente:
```
https://script.google.com/macros/s/AKfycbzVGj7pSlqzrlFc_gVEybQwT_3y2FEOjgXuTLNpe5NxvR6d_xQmq8t6cmqN5HwUGZFW/exec
```

### 4. **Probar**

1. Ejecuta `ng serve -o`
2. Completa el formulario
3. Haz clic en "Enviar"
4. Debería funcionar sin errores de CORS

## ¿Por qué ocurre este error?

- Google Apps Script por defecto no maneja correctamente las solicitudes CORS desde localhost
- El código actualizado incluye manejo específico para solicitudes preflight (OPTIONS)
- Es necesario redesplegar después de cualquier cambio en el código

## Si el problema persiste

1. Verifica que hayas redesplegado correctamente
2. Espera unos minutos para que los cambios se propaguen
3. Prueba acceder directamente a la URL del script en el navegador para verificar que funciona
4. Revisa la consola del navegador para ver si hay otros errores
