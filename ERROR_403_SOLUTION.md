# 🚨 SOLUCIÓN - Error 403 Forbidden

## Problema
```
GET https://script.googleusercontent.com/macros/echo?user_content_key=... 403 (Forbidden)
```

Este error indica que el Google Apps Script no tiene los permisos correctos o no está configurado adecuadamente.

## Solución Paso a Paso

### Paso 1: Verificar Permisos del Script

1. **Ve a tu proyecto de Google Apps Script**
2. **Haz clic en "Ejecutar"** (botón ▶️) para autorizar permisos
3. **Acepta TODOS los permisos** que solicite:
   - Acceso a Google Sheets
   - Acceso a Google Drive (si es necesario)
   - Permisos de ejecución

### Paso 2: Verificar la Configuración de Despliegue

1. **Ve a "Implementar"** > "Administrar implementaciones"
2. **Verifica que la configuración sea exactamente así**:
   - **Tipo**: Aplicación web
   - **Ejecutar como**: "Yo" (tu cuenta)
   - **Quién tiene acceso**: "Cualquiera" (muy importante)
3. **Si no está así, edita la implementación** y cambia los permisos

### Paso 3: Redesplegar Completamente

1. **Elimina la implementación actual**:
   - Ve a "Implementar" > "Administrar implementaciones"
   - Haz clic en el ícono de eliminar (🗑️) de la implementación actual
2. **Crea una nueva implementación**:
   - Haz clic en "Implementar" > "Nueva implementación"
   - Selecciona "Tipo: Aplicación web"
   - Configura:
     - Descripción: "API para formulario de capacitación energética"
     - Ejecutar como: "Yo"
     - Quién tiene acceso: "Cualquiera" ⚠️ **MUY IMPORTANTE**
   - Haz clic en "Implementar"
3. **Copia la nueva URL** del script

### Paso 4: Actualizar la URL en Angular

Si obtuviste una nueva URL, actualiza el archivo `src/app/services/google-sheets.service.ts`:

```typescript
const scriptUrl = 'TU_NUEVA_URL_AQUI';
```

### Paso 5: Probar el Script Directamente

1. **Abre la URL del script en tu navegador**
2. **Deberías ver**: `{"message":"Servicio funcionando correctamente"}`
3. **Si ves error 403**: El problema persiste, continúa con el Paso 6

### Paso 6: Solución Alternativa - Crear Script Nuevo

Si el problema persiste, crea un script completamente nuevo:

1. **Ve a [Google Apps Script](https://script.google.com/)**
2. **Haz clic en "Nuevo proyecto"**
3. **Copia este código**:

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
      // ID de la hoja de cálculo
      const SPREADSHEET_ID = '1nyiGHmpKBcCrpiRvfYg2rpK8cHB9OqWNL90S4rxNaBY';
      
      // Abrir la hoja de cálculo
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      
      // Seleccionar la primera hoja
      let sheet = spreadsheet.getSheets()[0];
      if (!sheet) {
        sheet = spreadsheet.insertSheet('Formularios');
      }
      
      // Si la hoja está vacía, agregar encabezados
      if (sheet.getLastRow() === 0) {
        const headers = [
          'Timestamp', 'ID Cuenta', 'Número Medidor', 'Nombre Titular', 'DNI',
          'Dirección', 'Fecha Nacimiento', 'Entre Calles', 'Departamento', 'Referencia',
          'Zona', 'Partido', 'Localidad', 'Teléfono', 'Mail', 'Medidor', 'Fecha',
          'Artefactos', 'Observaciones', 'Nombre Cliente', 'Nombre Promotor', 'Resultado',
          'Firma Cliente', 'Firma Promotor'
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

4. **Guarda el proyecto** con un nombre descriptivo
5. **Ejecuta el script** para autorizar permisos
6. **Despliega como aplicación web** con permisos "Cualquiera"
7. **Copia la nueva URL** y actualiza tu servicio Angular

## Verificación Final

1. **Prueba la URL del script** en el navegador
2. **Deberías ver**: `{"message":"Servicio funcionando correctamente"}`
3. **Ejecuta tu aplicación Angular**
4. **Completa el formulario y envía**
5. **Verifica que los datos aparezcan en Google Sheets**

## Causas Comunes del Error 403

- ❌ Permisos de acceso configurados como "Solo yo"
- ❌ Script no autorizado correctamente
- ❌ Implementación con configuración incorrecta
- ❌ Cuenta sin permisos en la hoja de Google Sheets

## Solución Más Común

En el 90% de los casos, el problema se soluciona cambiando **"Quién tiene acceso"** a **"Cualquiera"** en la configuración de despliegue.
