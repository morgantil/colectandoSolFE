# 🔧 ACTIVAR ENVÍO REAL - Google Apps Script Funcionando

## Estado Actual
- ✅ **Google Apps Script funcionando** - `testScript` agregó datos correctamente
- ✅ **Permisos configurados** - Acceso a Google Sheets autorizado
- ✅ **Código Angular actualizado** - Usando envío real en lugar de simulación
- ⏳ **URL del script** - Necesita actualizarse con la nueva URL

## Paso 1: Obtener la URL Correcta del Script

### Si ya desplegaste el script:
1. **Ve a tu proyecto de Google Apps Script**
2. **Haz clic en "Implementar"** > "Administrar implementaciones"
3. **Copia la URL** de la implementación (algo como: `https://script.google.com/macros/s/NUEVA_URL/exec`)

### Si no has desplegado aún:
1. **Haz clic en "Implementar"** > "Nueva implementación"
2. **Selecciona "Tipo: Aplicación web"**
3. **Configura**:
   - Descripción: "API para formulario de capacitación energética"
   - Ejecutar como: "Yo"
   - Quién tiene acceso: "Cualquiera" ⚠️ **CRÍTICO**
4. **Haz clic en "Implementar"**
5. **Copia la nueva URL**

## Paso 2: Actualizar la URL en Angular

En el archivo `src/app/services/google-sheets.service.ts`, línea 86, reemplaza:

```typescript
const scriptUrl = 'https://script.google.com/macros/s/AKfycbxrYbS9EzXMCk2lSGcy4kC4L3kDDVINLlkrkX38cwJolo2V5hX_mMbnam7piN3fNN-Y/exec';
```

Con tu nueva URL:

```typescript
const scriptUrl = 'TU_NUEVA_URL_AQUI';
```

## Paso 3: Probar el Script

1. **Abre la URL del script en tu navegador**
2. **Deberías ver**: `{"message":"Servicio funcionando correctamente"}`
3. **Si ves error 403**: Verifica que los permisos estén como "Cualquiera"

## Paso 4: Probar el Formulario

1. **Ejecuta** `ng serve -o`
2. **Completa el formulario** con datos de prueba
3. **Haz clic en "Enviar"**
4. **Verifica en la consola** que no hay errores
5. **Revisa tu hoja de Google Sheets** - debería aparecer una nueva fila

## Debugging - Si No Funciona

### Verificar en la Consola del Navegador:
1. **Abre las herramientas de desarrollador** (F12)
2. **Ve a la pestaña "Console"**
3. **Completa y envía el formulario**
4. **Busca mensajes como**:
   - "Enviando datos a Google Sheets: ..."
   - "Error al enviar datos via Apps Script: ..."

### Verificar en Google Apps Script:
1. **Ve a tu proyecto de Google Apps Script**
2. **Haz clic en "Ejecutar"** > "Ver logs"
3. **Completa y envía el formulario**
4. **Revisa si aparecen logs** de la función `doPost`

## Estado Esperado Después de la Configuración

✅ **URL del script actualizada** - Con la nueva URL de despliegue
✅ **Script responde correctamente** - Al abrir la URL en el navegador
✅ **Formulario envía datos** - Sin errores en la consola
✅ **Datos aparecen en Google Sheets** - Nueva fila agregada
✅ **Formulario se limpia** - Después del envío exitoso

## Próximos Pasos

Una vez que actualices la URL:

1. **Prueba el script** directamente en el navegador
2. **Prueba el formulario** completo
3. **Verifica que los datos** aparezcan en Google Sheets
4. **Si funciona**: ¡Listo! El formulario está completamente funcional
5. **Si no funciona**: Revisa los logs de la consola para identificar el problema

**El Google Apps Script está funcionando correctamente. Solo necesitas actualizar la URL en el código Angular con la URL real de tu despliegue.**
