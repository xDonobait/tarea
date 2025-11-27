# Formulario de Información de Estudio

## Descripción General
Formulario web para que estudiantes completen información detallada sobre la carrera de su interés. El sistema valida automáticamente los datos ingresados y proporciona retroalimentación visual en tiempo real.

---

## Validación de Directrices

### ✅ Estructura y Valores Predeterminados
- Los campos de entrada contienen valores predeterminados cuando se requiera mostrar la estructura de los datos
- Los campos demuestran claramente qué datos se deben ingresar (ej: "Ej: Juan", "Ej: 1101814604")

### ✅ Formateo Automático de Datos
- **Nombres**: Se capitalizan automáticamente (ej: "juan perez" → "Juan Perez")
- **Teléfono**: Formato automático XXX-XXX-XXXX (ej: "3001234567" → "300-123-4567")
- **Documento**: Formato colombiano XXX.XXX.XXX.XXX (ej: "1101814604" → "110.181.460.4")
- **Símbolos de moneda y comas**: No aplica en este formulario
- **Espacios**: Se manejan automáticamente al principio o final
- Los usuarios NO necesitan introducir caracteres especiales; el sistema los agrega automáticamente

### ✅ Longitud Adecuada de Campos
- Cada campo tiene el tamaño apropiado para el tipo de dato:
  - Nombres: máximo 50 caracteres
  - Documento: máximo 12 dígitos + puntos
  - Teléfono: 7-15 dígitos
  - Email: validación de patrón
  - Número de personas: 0-20

### ✅ Distinción entre Campos "Requeridos" y "Opcionales"
- Campos requeridos: marcados con asterisco rojo (*) y atributo `required`
- Campos opcionales: marcados como "(Opcional)" en gris
- Clara diferenciación visual en el formulario

### ✅ Funcionalidad de Conexión y Registro
- El formulario es utilizado para conectarse o registrarse (similar a Amazon)
- Permite recopilar información del estudiante para el sistema de admisiones

### ✅ Advertencia sobre Información Externa
- **El formulario advierte al usuario si información externa es necesaria** para su completación
- Incluye información sobre documentos requeridos en las descripciones de secciones
- Los campos de entrada contienen ayudas que especifican qué información es necesaria (ej: "Según su documento de identidad")

### ✅ Preguntas Agrupadas Lógicamente
- Sección 1: Información de Estudio (carrera de interés)
- Sección 2: Información Personal (nombres y apellidos)
- Sección 3: Documento de Identidad (tipo y número)
- Sección 4: Información Demográfica (sexo, país, fecha nacimiento, edad, estado civil, correo)
- Sección 5: Información de Contacto (teléfono fijo y celular)
- Sección 6: Información Adicional (empleo, recursos, personas a cargo, financiación)
- Cada grupo tiene un título descriptivo claro

### ✅ Campos con Ayudas y Ejemplos
- Cada campo incluye un `<small class="ayuda">` con instrucciones claras
- Se proporcionan ejemplos de formato esperado
- Las instrucciones usan lenguaje simple y claro

### ✅ Distinción Visual de Campos de Texto
- Las cajas de texto son claramente diferenciables de las cajas de entrada en formularios
- Usa bordes, colores y espaciado consistente

### ✅ Información en Ventanas Emergentes (Modal)
- Al hacer clic en "REVISAR INFORMACIÓN" se abre un modal
- El modal muestra los datos ingresados antes de enviar
- Permite hacer correcciones o confirmar y enviar

### ✅ Formatos de Datos Claros
- **Fechas**: Se muestran en formato legible (ej: "27 de noviembre de 2025")
- **Unidades de medida**: Especificadas en las etiquetas (ej: "edad" se muestra como "años")

### ✅ Tareas Simples Sin Información No Esencial
- El formulario recopila solo información esencial necesaria
- El sistema suministra información no esencial de manera predeterminada
- No se solicita información innecesaria

### ✅ Métodos de Interacción Simple
- Los usuarios pueden interactuar de forma simple sin necesidad de múltiples cambios de teclado o ratón
- Flujo intuitivo de un campo a otro

### ✅ Cálculo Automático de Edad
- La edad se calcula automáticamente al ingresar la fecha de nacimiento
- El usuario no necesita calcularla manualmente

### ✅ Validación al Enviar
- El formulario es validado cuando el usuario hace clic en "ENVIAR FORMULARIO"
- Se verifica que toda la información sea correcta antes de procesar

### ✅ Revisión de Campos en Ventanas Emergentes
- Cuando hay errores, el sitio lleva a cabo la revisión de campos en el momento apropiado
- El modal muestra claramente dónde está ubicado el cursor para correcciones

### ✅ Información Incompleta
- Si el formulario está incompleto, se posiciona el cursor en el campo que necesita corrección
- Mensaje de error claro: "Por favor complete correctamente todos los campos requeridos"

### ✅ Consistencia de Datos
- Hay consistencia entre los datos que deben introducirse y los que se muestran en la pantalla
- El resumen final muestra exactamente lo que fue ingresado

### ✅ Etiquetas Cercanas a los Campos
- Las etiquetas están justificadas a la izquierda, cerca de los campos del formulario
- Cada campo tiene su etiqueta claramente asociada

---

## Características Principales

### Validación en Tiempo Real
- Feedback visual de campos válidos (verde) e inválidos (rojo)
- Validación de patrones (email, números, letras)
- Mensajes de error específicos

### Accesibilidad
- Atributos `aria-required` en campos obligatorios
- Etiquetas asociadas correctamente a inputs
- Navegación lógica por tabulador

### Diseño Responsivo
- Diseño adaptable a dispositivos móviles
- Grid layout en 2 columnas en desktop, 1 en móvil

### Interfaz Visual
- Tema oscuro (negro con bordes blancos)
- Contraste alto para legibilidad
- Animaciones suaves en interacciones

---

## Secciones del Formulario

### 1. Información de Estudio
Permite seleccionar la carrera de interés de una lista de 14 programas académicos:
- Administración de Empresas
- Bacteriología
- Contaduría Pública
- Derecho
- Enfermería
- Ingeniería de Sistemas
- Instrumentación Quirúrgica
- Licenciatura en Educación Infantil
- Medicina
- Odontología
- Tecnología en Atención Prehospitalaria
- Tecnología en Estética y Cosmetología
- Tecnología en Mecánica Dental
- Trabajo Social

### 2. Información Personal
Recopila datos del estudiante:
- Primer y segundo nombre (máximo 50 caracteres cada uno)
- Primer y segundo apellido (máximo 50 caracteres cada uno)
- Solo acepta letras y caracteres acentuados

### 3. Documento de Identidad
- Tipo de documento: CC, TI, CE, Pasaporte
- Número de documento: 6-12 dígitos con formateo automático

### 4. Información Demográfica
- Sexo biológico: Masculino/Femenino
- País de nacimiento: Colombia, Venezuela, Ecuador, Perú, Panamá, Otro
- Fecha de nacimiento: selector de fecha
- Edad: se calcula automáticamente
- Estado civil: Soltero(a), Casado(a), Unión Libre, Divorciado(a), Viudo(a)
- Correo electrónico: validación de formato

### 5. Información de Contacto
- Teléfono fijo (opcional)
- Teléfono celular (requerido)
- Ambos con formateo automático XXX-XXX-XXXX

### 6. Información Adicional
- ¿Se encuentra laborando actualmente? Sí/No
- ¿Cuenta con recursos para financiar? Sí/No
- Número de personas a su cargo: 0-20
- ¿Desea recibir información de financiación? Checkbox opcional

---

## Funcionalidades

### Botones de Acción
- **REVISAR INFORMACIÓN**: Abre modal con resumen de datos antes de enviar
- **ENVIAR FORMULARIO**: Envía los datos (actualmente muestra confirmación)

### Modal de Revisión
- Muestra todos los datos ingresados organizados por secciones
- Permite hacer correcciones (botón "HACER CORRECCIONES")
- Permite confirmar y enviar (botón "CONFIRMAR Y ENVIAR")
- Se puede cerrar haciendo clic fuera del modal

---

## Validaciones Implementadas

✅ Campos requeridos no pueden estar vacíos
✅ Nombres aceptan solo letras y acentos
✅ Documentos aceptan solo números
✅ Teléfonos aceptan solo números
✅ Email valida formato correcto
✅ Documento mínimo 6 dígitos
✅ Teléfono mínimo 7 dígitos
✅ Edad se calcula automáticamente
✅ Número de personas no puede ser negativo

---

## Formateo Automático

| Campo | Formato | Ejemplo |
|-------|---------|---------|
| Nombres | Capitalizado | Juan Carlos |
| Documento | XXX.XXX.XXX.XXX | 110.181.460.4 |
| Teléfono | XXX-XXX-XXXX | 300-123-4567 |
| Fecha (resumen) | DD de mes de YYYY | 27 de noviembre de 2025 |

---

## Archivos del Proyecto

- `Index.html` - Estructura del formulario
- `script.js` - Lógica de validación y formateo
- `styles.css` - Estilos y diseño responsivo
- `README.md` - Esta documentación

---

## Notas de Desarrollo

- El formulario actualmente muestra un mensaje de confirmación al enviar
- Para producción, integrar con backend para procesar datos
- Todos los datos se registran en la consola del navegador
- El modal previene interacción con el formulario hasta cerrarlo

---

**Versión**: 1.0  
**Última actualización**: Noviembre 27, 2025
