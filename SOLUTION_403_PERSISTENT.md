# 🚨 SOLUCIÓN INMEDIATA - Error 403 Persistente

## Problema
El error 403 persiste incluso después de cambiar los permisos. Esto puede deberse a:
- Restricciones de la cuenta de Google
- Configuración incorrecta del script
- Problemas con la hoja de Google Sheets

## Solución Temporal - Usar Google Forms

Mientras solucionamos el Google Apps Script, vamos a implementar una solución temporal usando Google Forms que funciona inmediatamente.

### Paso 1: Crear Google Form

1. **Ve a [Google Forms](https://forms.google.com/)**
2. **Haz clic en "Crear formulario en blanco"**
3. **Configura el formulario**:
   - Título: "Formulario de Capacitación Energética"
   - Descripción: "Formulario para recopilar datos de capacitación"

### Paso 2: Agregar Campos al Formulario

Agrega estos campos en el orden correcto:

1. **ID Cuenta** (Respuesta corta)
2. **Número Medidor** (Respuesta corta)
3. **Nombre Titular** (Respuesta corta)
4. **DNI** (Respuesta corta)
5. **Dirección** (Respuesta corta)
6. **Fecha Nacimiento** (Fecha)
7. **Entre Calles** (Respuesta corta)
8. **Departamento** (Respuesta corta)
9. **Referencia** (Respuesta corta)
10. **Zona** (Lista desplegable con opciones: Olivos, San Martín, La Matanza, Merlo, Morón, Moreno, Pilar, San Miguel, Tigre)
11. **Partido** (Respuesta corta)
12. **Localidad** (Respuesta corta)
13. **Teléfono** (Respuesta corta)
14. **Mail** (Respuesta corta)
15. **Medidor** (Respuesta corta)
16. **Fecha** (Fecha)
17. **Artefactos** (Párrafo)
18. **Observaciones** (Párrafo)
19. **Nombre Cliente** (Respuesta corta)
20. **Nombre Promotor** (Respuesta corta)
21. **Resultado** (Lista desplegable con opciones: Cliente Capacitado, Cliente Capacitado - Vivienda en Construcción, Cliente no Capacitado - Cliente Ausente, Cliente no Capacitado - No se Ubica, Cliente no Capacitado - Vivienda Deshabitada, Cliente no Capacitado – Vivienda en Construcción, Cliente no Capacitado – No Quiso Firmar)

### Paso 3: Configurar Respuestas

1. **Haz clic en "Respuestas"** (ícono de gráfico)
2. **Haz clic en "Crear hoja de cálculo"**
3. **Selecciona "Crear una hoja de cálculo nueva"**
4. **Nombra la hoja**: "Formularios Capacitación"
5. **Haz clic en "Crear"**

### Paso 4: Obtener URL del Formulario

1. **Haz clic en "Enviar"** (botón morado)
2. **Copia el enlace del formulario**
3. **Guarda esta URL** para usarla en el código

### Paso 5: Modificar el Servicio Angular

Reemplaza el método `enviarFormulario` en `google-sheets.service.ts`:

```typescript
// Método temporal usando Google Forms
async enviarFormulario(data: FormularioData): Promise<boolean> {
  try {
    // URL del Google Form (reemplaza con tu URL real)
    const formUrl = 'TU_URL_DEL_GOOGLE_FORM_AQUI';
    
    // Crear formulario oculto
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = formUrl;
    form.target = '_blank';
    
    // Mapear datos a campos del formulario
    const formData = this.prepararDatosParaFormulario(data);
    
    // Agregar campos ocultos
    Object.keys(formData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = formData[key];
      form.appendChild(input);
    });
    
    // Agregar formulario al DOM y enviarlo
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    
    return true;
    
  } catch (error) {
    console.error('Error al enviar formulario:', error);
    return false;
  }
}

private prepararDatosParaFormulario(data: FormularioData): any {
  return {
    'entry.ID_CUENTA': data.idCuenta,
    'entry.NUMERO_MEDIDOR': data.numeroMedidor,
    'entry.NOMBRE_TITULAR': data.nombreTitular,
    'entry.DNI': data.dni,
    'entry.DIRECCION': data.direccion || '',
    'entry.FECHA_NACIMIENTO': data.fechaNacimiento ? data.fechaNacimiento.toISOString().split('T')[0] : '',
    'entry.ENTRE_CALLES': data.entreCalles || '',
    'entry.DEPARTAMENTO': data.departamento || '',
    'entry.REFERENCIA': data.referencia || '',
    'entry.ZONA': data.zona,
    'entry.PARTIDO': data.partido,
    'entry.LOCALIDAD': data.localidad,
    'entry.TELEFONO': data.telefono || '',
    'entry.MAIL': data.mail || '',
    'entry.MEDIDOR': data.medidor || '',
    'entry.FECHA': data.fecha ? data.fecha.toISOString().split('T')[0] : '',
    'entry.ARTEFACTOS': data.artefactos || '',
    'entry.OBSERVACIONES': data.observaciones || '',
    'entry.NOMBRE_CLIENTE': data.nombreCliente,
    'entry.NOMBRE_PROMOTOR': data.nombrePromotor,
    'entry.RESULTADO': data.resultado,
    'entry.FIRMA_CLIENTE': data.firmaCliente ? 'Presente' : 'Ausente',
    'entry.FIRMA_PROMOTOR': data.firmaPromotor ? 'Presente' : 'Ausente'
  };
}
```

## Solución Definitiva - Google Apps Script

### Verificación Completa del Script

1. **Ve a tu Google Apps Script**
2. **Verifica que el código sea exactamente este**:

```javascript
function doPost(e) {
  try {
    let data;
    
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
```

3. **Guarda el proyecto**
4. **Ejecuta el script** (botón ▶️) para autorizar permisos
5. **Ve a "Implementar"** > "Nueva implementación"
6. **Configura**:
   - Tipo: Aplicación web
   - Ejecutar como: Yo
   - Quién tiene acceso: **Cualquiera** (MUY IMPORTANTE)
7. **Despliega y copia la nueva URL**

## Recomendación

**Usa la solución temporal con Google Forms** mientras solucionamos el Google Apps Script. Es más confiable y funciona inmediatamente.
