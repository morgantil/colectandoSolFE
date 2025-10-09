# 🚨 SOLUCIÓN DEFINITIVA - Error 403 Persistente

## Problema
```
Failed to load resource: the server responded with a status of 403 ()
```

Este error indica que el Google Apps Script no está configurado correctamente para acceso público.

## Solución Paso a Paso

### Paso 1: Verificar la Configuración Actual

1. **Ve a tu proyecto de Google Apps Script**
2. **Haz clic en "Implementar"** > "Administrar implementaciones"
3. **Verifica la configuración**:
   - **Tipo**: Aplicación web
   - **Ejecutar como**: "Yo"
   - **Quién tiene acceso**: **DEBE SER "Cualquiera"** ⚠️

### Paso 2: Si NO está como "Cualquiera"

1. **Haz clic en el ícono de editar** (lápiz) de la implementación
2. **Cambia "Quién tiene acceso" a "Cualquiera"**
3. **Guarda** los cambios
4. **Espera unos minutos** para que se propaguen los cambios

### Paso 3: Si YA está como "Cualquiera" - Crear Nueva Implementación

1. **Elimina la implementación actual**:
   - Haz clic en el ícono de eliminar (🗑️)
   - Confirma la eliminación

2. **Crea una nueva implementación**:
   - Haz clic en "Implementar" > "Nueva implementación"
   - Selecciona "Tipo: Aplicación web"
   - Configura:
     - **Descripción**: "API para formulario de capacitación energética V2"
     - **Ejecutar como**: "Yo"
     - **Quién tiene acceso**: "Cualquiera" ⚠️ **CRÍTICO**
   - Haz clic en "Implementar"

3. **Copia la nueva URL**

### Paso 4: Probar la Nueva URL

1. **Abre la nueva URL en tu navegador**
2. **Deberías ver**: `{"message":"Servicio funcionando correctamente"}`
3. **Si ves error 403**: Continúa con el Paso 5

### Paso 5: Verificar Permisos de la Hoja de Google Sheets

1. **Ve a tu hoja de Google Sheets**: https://docs.google.com/spreadsheets/d/1nyiGHmpKBcCrpiRvfYg2rpK8cHB9OqWNL90S4rxNaBY/edit
2. **Haz clic en "Compartir"** (botón azul)
3. **Verifica que tengas permisos de "Editor"**
4. **Si no los tienes**: Solicita permisos al propietario

### Paso 6: Solución Alternativa - Crear Script Completamente Nuevo

Si el problema persiste, crea un script completamente nuevo:

1. **Ve a [Google Apps Script](https://script.google.com/)**
2. **Haz clic en "Nuevo proyecto"**
3. **Nombra**: "Formulario Capacitación Energética V3"
4. **Copia este código**:

```javascript
function doPost(e) {
  try {
    let data;
    
    if (!e) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, message: 'No se recibieron parámetros'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
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
      const SPREADSHEET_ID = '1nyiGHmpKBcCrpiRvfYg2rpK8cHB9OqWNL90S4rxNaBY';
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      let sheet = spreadsheet.getSheets()[0];
      
      if (!sheet) {
        sheet = spreadsheet.insertSheet('Formularios');
      }
      
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

function testScript() {
  try {
    const SPREADSHEET_ID = '1nyiGHmpKBcCrpiRvfYg2rpK8cHB9OqWNL90S4rxNaBY';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheets()[0];
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Formularios');
    }
    
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
    
    const testData = [
      new Date().toISOString(),
      'TEST002',
      'MED002',
      'Cliente Prueba V3',
      '87654321',
      'Dirección Prueba V3',
      '1985-05-15',
      'Calle X y Calle Y',
      'Depto 2',
      'Referencia Prueba V3',
      'San Martín',
      '3 de febrero',
      'Caseros',
      '0987654321',
      'testv3@ejemplo.com',
      'MED002',
      new Date().toISOString().split('T')[0],
      'Artefactos Prueba V3',
      'Observaciones Prueba V3',
      'Cliente Prueba V3',
      'Promotor Prueba V3',
      'Cliente Capacitado',
      'Firma Cliente Presente',
      'Firma Promotor Presente'
    ];
    
    sheet.appendRow(testData);
    
    console.log('✅ Script V3 funcionando correctamente. Datos de prueba agregados.');
    return 'Script V3 funcionando correctamente';
    
  } catch (error) {
    console.error('❌ Error en el script V3:', error);
    return 'Error: ' + error.toString();
  }
}
```

5. **Guarda el proyecto**
6. **Ejecuta `testScript`** para autorizar permisos
7. **Despliega como aplicación web** con permisos "Cualquiera"
8. **Copia la nueva URL**

### Paso 7: Actualizar Angular

Una vez que tengas una URL que funcione:

1. **Actualiza la URL** en `src/app/services/google-sheets.service.ts` línea 86
2. **Prueba el formulario** completo

## Verificación Final

1. **URL del script funciona** - Al abrir en el navegador muestra el mensaje correcto
2. **Formulario envía datos** - Sin errores 403
3. **Datos aparecen en Google Sheets** - Nueva fila agregada

## Causas Más Comunes del Error 403

- ❌ **Permisos incorrectos** - "Solo yo" en lugar de "Cualquiera"
- ❌ **Implementación corrupta** - Necesita recrearse
- ❌ **Permisos de hoja** - Sin acceso de editor a Google Sheets
- ❌ **Cuenta restringida** - Algunas cuentas tienen restricciones

## Recomendación

**Crea un script completamente nuevo** (Paso 6) - Es la solución más confiable y rápida.
