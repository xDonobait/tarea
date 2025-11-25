# 📋 Formulario de Información de Estudio

![Status](https://img.shields.io/badge/status-active-success.svg)
![Tests](https://img.shields.io/badge/tests-10%2F10%20passed-success.svg)
![Usability](https://img.shields.io/badge/usability-100%25-success.svg)
![Score](https://img.shields.io/badge/score-5.0%2F5.0-success.svg)

Formulario web moderno y accesible para recolectar información de estudiantes interesados en programas universitarios. Implementa las **10 directrices de usabilidad** para formularios con sistema de testing automatizado.

## ✨ Características

- ✅ **Validación en tiempo real** con mensajes de error claros
- ✅ **Formateo automático** de datos (teléfonos, documentos, edad)
- ✅ **Diseño responsive** adaptado a dispositivos móviles
- ✅ **Accesibilidad** con labels semánticos y estados de error visibles
- ✅ **Testing automatizado** con 10 tests de usabilidad
- ✅ **Estética profesional** inspirada en Google Material Design
- ✅ **Sin dependencias** - Vanilla HTML, CSS y JavaScript

## 📁 Estructura del Proyecto

```
Formulario/
├── index.html          # Formulario principal
├── tests.html          # Suite de testing automatizado
├── README.md           # Este archivo
├── css/
│   ├── styles.css      # Estilos del formulario (estilo Google)
│   └── tests.css       # Estilos de la página de tests
└── js/
    ├── form.js         # Lógica del formulario (validación, formateo)
    └── tests.js        # Suite de 10 tests automatizados
```

## 🚀 Inicio

### VSCode Live Server
1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index.html` → "Open with Live Server"

> ⚠️ **Importante:** Los archivos deben servirse a través de un servidor HTTP. Abrir directamente con `file:///` impedirá que los tests funcionen debido a restricciones de Same-Origin Policy.

## 📝 Uso del Formulario

El formulario solicita tres tipos de información:

### 1️⃣ Información de Estudio
- Selección de carrera universitaria (14 programas disponibles)

### 2️⃣ Información de Contacto
- Nombres y apellidos
- Tipo y número de documento
- Sexo biológico
- País de nacimiento
- Fecha de nacimiento (calcula edad automáticamente)
- Estado civil
- Correo electrónico
- Celular y teléfono fijo

### 3️⃣ Encuesta Adicional
- Situación laboral actual
- Recursos financieros disponibles
- Personas a cargo
- Interés en información sobre financiación

### Características de UX
- **Campos requeridos:** Marcados con asterisco rojo `*`
- **Campos opcionales:** Marcados con `(opcional)`
- **Formateo automático:** Números de documentos, teléfonos
- **Validación en vivo:** Los errores se limpian al corregir
- **Focus automático:** Al enviar con errores, hace focus en el primer campo problemático

## 🧪 Sistema de Testing

El proyecto incluye un **sistema completo de testing automatizado** que verifica el cumplimiento de las 10 directrices de usabilidad para formularios.

### Ejecutar los Tests

1. **Inicia un servidor local** (ver sección "Inicio Rápido")
2. **Abre la página de tests:**
   ```
   http://localhost:8000/tests.html
   ```
3. Los tests se ejecutan **automáticamente** al cargar la página
4. También puedes hacer click en **"▶ Ejecutar Tests"** para volver a ejecutarlos

### Interfaz de Testing

La página de tests muestra:

#### 📊 Resumen
- **Total Directrices:** 10
- **Cumple:** X directrices
- **No Cumple:** Y directrices
- **Porcentaje:** (Cumple / Total) × 100%

#### 🎓 Calificación Final
- **Fórmula:** `(Porcentaje% × 5.0)`
- **Interpretación:**
  - 4.5 - 5.0: Excelente ⭐⭐⭐⭐⭐
  - 4.0 - 4.4: Bueno ⭐⭐⭐⭐
  - 3.0 - 3.9: Aceptable ⭐⭐⭐
  - < 3.0: Necesita mejoras ⚠️

#### 📋 Lista Detallada
Cada test muestra:
- **Número** de la directriz
- **Título** y descripción
- **Estado:** ✅ Cumple / ❌ No cumple / ⏳ Ejecutando
- **Detalles** técnicos de verificación (expandible)

### ¿Cómo Funcionan los Tests?

Los tests se ejecutan automáticamente al cargar `tests.html`:

1. Se carga `index.html` en un **iframe oculto**
2. JavaScript accede al DOM del formulario dentro del iframe
3. Se ejecutan **10 tests** que verifican diferentes aspectos:
   - Presencia de elementos HTML
   - Atributos y propiedades
   - Clases CSS aplicadas
   - Scripts cargados
   - Estructura semántica
4. Cada test retorna `{ passed: boolean, details: string }`
5. Los resultados se muestran en tiempo real

## 📐 Las 10 Directrices de Usabilidad

| # | Directriz | Estado |
|---|-----------|--------|
| 1 | Valores predeterminados y estructura de datos | ✅ |
| 2 | Auto-formateo de datos | ✅ |
| 3 | Tamaño adecuado de campos | ✅ |
| 4 | Distinción campos requeridos y opcionales | ✅ |
| 5 | Agrupación lógica con títulos descriptivos | ✅ |
| 6 | Ayudas, ejemplos y modelos de respuesta | ✅ |
| 7 | Preguntas claras en lenguaje simple | ✅ |
| 8 | Preferencia por listas, radios y selects | ✅ |
| 9 | Facilidad para corregir errores | ✅ |
| 10 | Validación al enviar (submit) | ✅ |

**Resultado:** 10/10 = **100%** = **5.0/5.0** ⭐⭐⭐⭐⭐

### Detalle de Cada Directriz

#### 1️⃣ Valores Predeterminados y Estructura
- Placeholders con ejemplos: `"Ej: María"`, `"300 123 4567"`
- `maxlength` en todos los campos de texto
- Límites `min`/`max` en fechas (establecidos por JS)

#### 2️⃣ Auto-Formateo de Datos
- **Documento:** `1234567890` → `1.234.567.890`
- **Celular:** `3001234567` → `300 123 4567`
- **Teléfono:** `51234567` → `(5) 123 4567`
- **Edad:** Calculada automáticamente desde fecha de nacimiento
- **Nombres:** Capitalizados automáticamente

#### 3️⃣ Tamaño Adecuado de Campos
- Clases CSS: `.input-sm` (120px), `.input-md` (200px), `.input-lg` (320px)
- Layout de 2 columnas para campos relacionados
- Responsive: 1 columna en móviles

#### 4️⃣ Distinción Requeridos/Opcionales
- Asterisco rojo `*` en campos requeridos
- Etiqueta `(opcional)` en campos no requeridos
- Leyenda explicativa: "* Campo requerido"

#### 5️⃣ Agrupación Lógica
- **3 secciones:** Información de Estudio, Contacto, Encuesta
- Títulos con clase `.section-title`
- Separación visual con línea azul

#### 6️⃣ Ayudas y Ejemplos
- **12+ hints:** "Máximo 50 caracteres", "Se formatea automáticamente"
- Placeholders con ejemplos realistas
- Opciones de select descriptivas: "Ninguna (0)", "1 persona"

#### 7️⃣ Preguntas Claras
- **5 preguntas** en formato interrogativo
- Lenguaje simple, sin jerga técnica
- Uso de "usted" (formal pero accesible)

#### 8️⃣ Preferencia Select/Radio
- **5 selects:** carrera, tipo doc, país, estado civil, personas a cargo
- **8 radio buttons:** sexo, laborando, recursos, financiación
- Ratio selección/texto: ~56%

#### 9️⃣ Facilidad para Corregir Errores
- **Focus automático** en primer campo con error
- **Scroll suave** al error (`scrollIntoView`)
- Limpieza automática de errores al corregir
- Estados visuales claros (borde rojo, fondo rosado)

#### 🔟 Validación al Enviar
- Atributo `novalidate` (validación personalizada)
- Función `validateForm()` completa
- Feedback visual: notificaciones verde/roja
- Console.log de datos para debugging

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Semántico y accesible
- **CSS3:** Variables CSS, Grid, Flexbox
- **JavaScript:** Vanilla ES6+ (sin frameworks)
- **Fuentes:** Google Sans, Roboto Mono
- **Diseño:** Inspirado en Google Material Design

## 🎨 Paleta de Colores

```css
--primary: #1a73e8;      /* Azul Google */
--error: #d93025;        /* Rojo para errores */
--success: #1e8e3e;      /* Verde para éxito */
--text-dark: #202124;    /* Texto principal */
--text-medium: #5f6368;  /* Texto secundario */
--text-light: #80868b;   /* Texto hints */
--border: #dadce0;       /* Bordes */
```

## 📱 Responsive Design

El formulario se adapta automáticamente a diferentes tamaños de pantalla:

- **Desktop (> 600px):** Layout de 2 columnas para campos relacionados
- **Mobile (≤ 600px):** Layout de 1 columna, botones apilados

## 🔒 Validaciones Implementadas

### Del lado del cliente:
- ✅ Campos requeridos no vacíos
- ✅ Email con formato válido (regex)
- ✅ Celular: exactamente 10 dígitos
- ✅ Edad mínima: 14 años
- ✅ Fecha de nacimiento: no futura, no mayor a 100 años
- ✅ Radio buttons: al menos una opción seleccionada

### Feedback de errores:
- Mensaje específico para cada tipo de error
- Focus automático en primer error
- Scroll suave al campo problemático
- Limpieza automática al corregir

## 🚧 Limitaciones Conocidas

- **No hay backend:** El formulario solo valida del lado del cliente
- **No hay persistencia:** Los datos se pierden al cerrar el navegador
- **Solo español:** No hay soporte multi-idioma
- **Requiere servidor HTTP:** No funciona con `file:///` (los tests)

## 📈 Posibles Mejoras Futuras

- [ ] Integración con backend/API
- [ ] Guardado local con `localStorage`
- [ ] Internacionalización (i18n)
- [ ] Tests unitarios con Jest
- [ ] Barra de progreso del formulario
- [ ] Contador de caracteres en tiempo real
- [ ] CAPTCHA para prevenir spam
- [ ] Modo oscuro (dark mode)

## 📄 Licencia

Este proyecto fue creado con fines educativos. Nunca envíe contraseñas a través de este formulario.

## 👥 Autor

Proyecto desarrollado como demostración de mejores prácticas en diseño de formularios web.

---

**Calificación de Usabilidad:** ⭐⭐⭐⭐⭐ (5.0/5.0)  
**Tests Pasados:** 10/10 (100%)  
**Estado:** En Producción ✅
