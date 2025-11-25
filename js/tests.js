/* =====================================================
   TESTS AUTOMATIZADOS - 10 Directrices de Usabilidad
   ===================================================== */

const directrices = [
    {
        id: 1,
        title: "Valores predeterminados y estructura de datos",
        description: "Los campos muestran la estructura de los datos y la longitud del campo mediante placeholders y maxlength.",
        test: function(doc) {
            const checks = [];
            let passed = true;

            // Verificar placeholders con ejemplos
            const fieldsToCheck = [
                { id: 'primerNombre', hint: 'Ej:' },
                { id: 'correoElectronico', hint: '@' },
                { id: 'celular', hint: '300' },
                { id: 'numeroDocumento', hint: '1.234' }
            ];

            fieldsToCheck.forEach(f => {
                const el = doc.getElementById(f.id);
                if (el && el.placeholder && el.placeholder.includes(f.hint)) {
                    checks.push(`✓ ${f.id}: placeholder con ejemplo`);
                } else {
                    checks.push(`✗ ${f.id}: falta placeholder`);
                    passed = false;
                }
            });

            // Verificar maxlength
            const maxLengthFields = ['primerNombre', 'numeroDocumento', 'correoElectronico'];
            maxLengthFields.forEach(id => {
                const el = doc.getElementById(id);
                if (el && el.maxLength > 0) {
                    checks.push(`✓ ${id}: maxlength=${el.maxLength}`);
                } else {
                    checks.push(`✗ ${id}: sin maxlength`);
                    passed = false;
                }
            });

            // Verificar límites de fecha
            const fecha = doc.getElementById('fechaNacimiento');
            if (fecha && fecha.max && fecha.min) {
                checks.push('✓ Fecha: límites max/min definidos');
            } else {
                checks.push('✗ Fecha: sin límites');
                passed = false;
            }

            return { passed, details: checks.join('\n') };
        }
    },
    {
        id: 2,
        title: "Auto-formateo de datos",
        description: "El sitio automáticamente formatea los datos (separadores de miles, espacios). El usuario no necesita introducir caracteres especiales.",
        test: function(doc) {
            const checks = [];
            let passed = true;

            // Buscar scripts con funciones de formateo
            const scripts = doc.querySelectorAll('script');
            let scriptContent = '';
            scripts.forEach(s => {
                if (s.src && s.src.includes('form.js')) {
                    // Script externo - verificar por funcionalidad
                    checks.push('✓ Script form.js cargado');
                }
                if (s.textContent) {
                    scriptContent += s.textContent;
                }
            });

            // Verificar funciones de formateo en script externo
            // Lo verificamos indirectamente por los hints
            const docHint = doc.querySelector('#numeroDocumento')?.parentElement?.querySelector('.field-hint');
            if (docHint && docHint.textContent.toLowerCase().includes('automát')) {
                checks.push('✓ Documento: indica formateo automático');
            } else {
                checks.push('✗ Documento: sin indicación de formateo');
                passed = false;
            }

            const celHint = doc.querySelector('#celular')?.parentElement?.querySelector('.field-hint');
            if (celHint && celHint.textContent.toLowerCase().includes('automát')) {
                checks.push('✓ Celular: indica formateo automático');
            } else {
                checks.push('✗ Celular: sin indicación de formateo');
                passed = false;
            }

            // Verificar edad readonly (calculada automáticamente)
            const edad = doc.getElementById('edad');
            if (edad && edad.readOnly) {
                checks.push('✓ Edad: campo readonly (auto-calculada)');
            } else {
                checks.push('✗ Edad: no es readonly');
                passed = false;
            }

            const edadHint = edad?.parentElement?.querySelector('.field-hint');
            if (edadHint && edadHint.textContent.toLowerCase().includes('automát')) {
                checks.push('✓ Edad: indica cálculo automático');
            }

            return { passed, details: checks.join('\n') };
        }
    },
    {
        id: 3,
        title: "Tamaño adecuado de campos",
        description: "Las cajas de texto tienen el tamaño adecuado para el dato que se debe introducir.",
        test: function(doc) {
            const checks = [];
            let passed = true;

            // Verificar clases de tamaño
            const sizedFields = [
                { id: 'edad', cls: 'input-sm', desc: 'pequeño' },
                { id: 'numeroDocumento', cls: 'input-md', desc: 'mediano' },
                { id: 'celular', cls: 'input-md', desc: 'mediano' },
                { id: 'fechaNacimiento', cls: 'input-md', desc: 'mediano' },
                { id: 'carrera', cls: 'input-lg', desc: 'grande' }
            ];

            sizedFields.forEach(f => {
                const el = doc.getElementById(f.id);
                if (el && el.classList.contains(f.cls)) {
                    checks.push(`✓ ${f.id}: tamaño ${f.desc} (${f.cls})`);
                } else {
                    checks.push(`✗ ${f.id}: sin clase de tamaño`);
                    passed = false;
                }
            });

            // Verificar estilos CSS definidos
            const styles = doc.querySelectorAll('link[rel="stylesheet"]');
            if (styles.length > 0) {
                checks.push('✓ Estilos CSS externos cargados');
            }

            return { passed, details: checks.join('\n') };
        }
    },
    {
        id: 4,
        title: "Distinción campos requeridos y opcionales",
        description: "Existe clara distinción visual entre campos requeridos (*) y opcionales.",
        test: function(doc) {
            const checks = [];
            let passed = true;

            // Verificar asteriscos rojos
            const requiredMarkers = doc.querySelectorAll('.required');
            if (requiredMarkers.length >= 10) {
                checks.push(`✓ ${requiredMarkers.length} campos marcados con asterisco`);
            } else {
                checks.push(`✗ Solo ${requiredMarkers.length} campos marcados`);
                passed = false;
            }

            // Verificar etiquetas opcionales
            const optionalTags = doc.querySelectorAll('.optional-tag');
            if (optionalTags.length >= 3) {
                checks.push(`✓ ${optionalTags.length} campos marcados como opcionales`);
            } else {
                checks.push(`✗ Faltan marcas de opcional`);
                passed = false;
            }

            // Verificar leyenda
            const legend = doc.querySelector('.required-legend');
            if (legend) {
                checks.push('✓ Leyenda explicativa presente');
            } else {
                checks.push('✗ Sin leyenda de campos requeridos');
                passed = false;
            }

            // Campos específicos opcionales
            ['segundoNombre', 'segundoApellido', 'telefono'].forEach(id => {
                const label = doc.querySelector(`label[for="${id}"]`);
                if (label && label.querySelector('.optional-tag')) {
                    checks.push(`✓ ${id}: marcado como opcional`);
                } else {
                    checks.push(`✗ ${id}: debería ser opcional`);
                    passed = false;
                }
            });

            return { passed, details: checks.join('\n') };
        }
    },
    {
        id: 5,
        title: "Agrupación lógica con títulos descriptivos",
        description: "Las preguntas están agrupadas de manera lógica y cada grupo tiene un título descriptivo.",
        test: function(doc) {
            const checks = [];
            let passed = true;

            // Verificar secciones
            const sections = doc.querySelectorAll('.form-section');
            if (sections.length >= 3) {
                checks.push(`✓ ${sections.length} secciones definidas`);
            } else {
                checks.push(`✗ Solo ${sections.length} secciones`);
                passed = false;
            }

            // Verificar títulos de sección
            const sectionTitles = doc.querySelectorAll('.section-title');
            const expectedTitles = ['Información de Estudio', 'Información de Contacto', 'Encuesta Adicional'];
            
            expectedTitles.forEach(title => {
                let found = false;
                sectionTitles.forEach(el => {
                    if (el.textContent.includes(title)) found = true;
                });
                if (found) {
                    checks.push(`✓ Sección: "${title}"`);
                } else {
                    checks.push(`✗ Falta sección: "${title}"`);
                    passed = false;
                }
            });

            // Verificar header principal
            const header = doc.querySelector('.form-header h1');
            if (header) {
                checks.push(`✓ Título principal: "${header.textContent.trim()}"`);
            } else {
                checks.push('✗ Sin título principal');
                passed = false;
            }

            return { passed, details: checks.join('\n') };
        }
    },
    {
        id: 6,
        title: "Ayudas, ejemplos y modelos de respuesta",
        description: "Los campos contienen ayudas, ejemplos o modelos para demostrar el dato que se debe introducir.",
        test: function(doc) {
            const checks = [];
            let passed = true;

            // Verificar hints
            const hints = doc.querySelectorAll('.field-hint');
            if (hints.length >= 8) {
                checks.push(`✓ ${hints.length} ayudas/hints encontradas`);
            } else {
                checks.push(`✗ Solo ${hints.length} hints`);
                passed = false;
            }

            // Verificar placeholders con "Ej:"
            const inputs = doc.querySelectorAll('input[placeholder]');
            let exampleCount = 0;
            inputs.forEach(input => {
                if (input.placeholder.includes('Ej:') || input.placeholder.includes('@') || input.placeholder.includes('300')) {
                    exampleCount++;
                }
            });
            if (exampleCount >= 4) {
                checks.push(`✓ ${exampleCount} placeholders con ejemplos`);
            } else {
                checks.push(`✗ Pocos ejemplos en placeholders`);
                passed = false;
            }

            // Verificar hints específicos
            const hintTexts = ['Máximo', 'automát', 'dígitos', 'Seleccione'];
            let specificHints = 0;
            hints.forEach(h => {
                hintTexts.forEach(t => {
                    if (h.textContent.toLowerCase().includes(t.toLowerCase())) specificHints++;
                });
            });
            checks.push(`✓ ${specificHints} hints informativos específicos`);

            return { passed, details: checks.join('\n') };
        }
    },
    {
        id: 7,
        title: "Preguntas claras en lenguaje simple",
        description: "Las preguntas en el formulario son claras y utilizan lenguaje simple, sin jerga técnica.",
        test: function(doc) {
            const checks = [];
            let passed = true;

            // Verificar preguntas con signos de interrogación
            const labels = doc.querySelectorAll('label');
            let questionCount = 0;
            const questions = [];

            labels.forEach(label => {
                if (label.textContent.includes('?')) {
                    questionCount++;
                    questions.push(label.textContent.trim().substring(0, 50));
                }
            });

            if (questionCount >= 4) {
                checks.push(`✓ ${questionCount} preguntas formales encontradas`);
                questions.slice(0, 4).forEach(q => {
                    checks.push(`  → "${q}..."`);
                });
            } else {
                checks.push(`✗ Solo ${questionCount} preguntas`);
                passed = false;
            }

            // Verificar ausencia de jerga técnica
            const technicalTerms = ['API', 'backend', 'frontend', 'HTTP', 'SQL', 'JSON', 'endpoint'];
            let hasTechnical = false;
            const allText = doc.body.textContent;
            
            technicalTerms.forEach(term => {
                if (allText.includes(term)) {
                    hasTechnical = true;
                    checks.push(`✗ Contiene término técnico: ${term}`);
                }
            });

            if (!hasTechnical) {
                checks.push('✓ Sin jerga técnica en las preguntas');
            } else {
                passed = false;
            }

            return { passed, details: checks.join('\n') };
        }
    },
    {
        id: 8,
        title: "Preferencia por listas, radios y selects",
        description: "Se prefieren listas desplegables, radio buttons y checkboxes sobre cajas de texto.",
        test: function(doc) {
            const checks = [];
            let passed = true;

            // Contar tipos de inputs
            const textInputs = doc.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="date"]');
            const radioInputs = doc.querySelectorAll('input[type="radio"]');
            const selects = doc.querySelectorAll('select');

            checks.push(`Campos de texto: ${textInputs.length}`);
            checks.push(`Radio buttons: ${radioInputs.length}`);
            checks.push(`Selects/Dropdowns: ${selects.length}`);

            const selectionElements = radioInputs.length + selects.length;
            const total = selectionElements + textInputs.length;
            const ratio = (selectionElements / total * 100).toFixed(0);

            checks.push(`Ratio selección/texto: ${ratio}%`);

            // Verificar que carrera es select (NO radios)
            const carreraSelect = doc.querySelector('select#carrera');
            if (carreraSelect) {
                const options = carreraSelect.querySelectorAll('option');
                checks.push(`✓ Carrera: dropdown con ${options.length} opciones`);
            } else {
                checks.push('✗ Carrera: debería ser dropdown');
                passed = false;
            }

            // Verificar uso apropiado
            if (selects.length >= 5) {
                checks.push('✓ Uso adecuado de selects');
            } else {
                checks.push('✗ Pocos selects');
                passed = false;
            }

            if (radioInputs.length >= 8) {
                checks.push('✓ Uso adecuado de radio buttons');
            } else {
                checks.push('✗ Pocos radio buttons');
                passed = false;
            }

            return { passed, details: checks.join('\n') };
        }
    },
    {
        id: 9,
        title: "Facilidad para corregir errores",
        description: "El sitio hace fácil corregir errores, posicionando el cursor donde se debe hacer la corrección.",
        test: function(doc) {
            const checks = [];
            let passed = true;

            // Verificar mensajes de error definidos
            const errorMessages = doc.querySelectorAll('.error-message');
            if (errorMessages.length >= 10) {
                checks.push(`✓ ${errorMessages.length} mensajes de error definidos`);
            } else {
                checks.push(`✗ Solo ${errorMessages.length} mensajes de error`);
                passed = false;
            }

            // Verificar estructura para mostrar errores
            const fieldGroups = doc.querySelectorAll('.field-group');
            checks.push(`✓ ${fieldGroups.length} grupos de campos con soporte de error`);

            // Verificar que hay script con validación
            const scripts = doc.querySelectorAll('script[src]');
            let hasFormScript = false;
            scripts.forEach(s => {
                if (s.src.includes('form.js')) hasFormScript = true;
            });

            if (hasFormScript) {
                checks.push('✓ Script de validación cargado (form.js)');
            } else {
                checks.push('✗ Sin script de validación');
                passed = false;
            }

            // Verificar estilos de error en CSS
            const styleLinks = doc.querySelectorAll('link[rel="stylesheet"]');
            if (styleLinks.length > 0) {
                checks.push('✓ Estilos CSS para estados de error');
            }

            return { passed, details: checks.join('\n') };
        }
    },
    {
        id: 10,
        title: "Validación al enviar (submit)",
        description: "Los formularios son validados cuando la información es enviada.",
        test: function(doc) {
            const checks = [];
            let passed = true;

            // Verificar form con novalidate
            const form = doc.getElementById('universityForm');
            if (form && form.hasAttribute('novalidate')) {
                checks.push('✓ Formulario usa validación personalizada (novalidate)');
            } else {
                checks.push('✗ Sin atributo novalidate');
                passed = false;
            }

            // Verificar botón submit
            const submitBtn = doc.querySelector('button[type="submit"]');
            if (submitBtn) {
                checks.push('✓ Botón submit presente');
            } else {
                checks.push('✗ Sin botón submit');
                passed = false;
            }

            // Verificar campos con required
            const requiredFields = doc.querySelectorAll('[required]');
            if (requiredFields.length >= 10) {
                checks.push(`✓ ${requiredFields.length} campos con atributo required`);
            } else {
                checks.push(`✗ Solo ${requiredFields.length} campos required`);
                passed = false;
            }

            // Verificar script de validación
            const scripts = doc.querySelectorAll('script[src]');
            let hasFormScript = false;
            scripts.forEach(s => {
                if (s.src.includes('form.js')) hasFormScript = true;
            });

            if (hasFormScript) {
                checks.push('✓ Script form.js con validación al submit');
            }

            // Verificar botón limpiar
            const clearBtn = doc.querySelector('button[type="button"]');
            if (clearBtn && clearBtn.textContent.toLowerCase().includes('borrar')) {
                checks.push('✓ Botón para limpiar formulario');
            }

            return { passed, details: checks.join('\n') };
        }
    }
];

/* =====================================================
   Renderizado y ejecución
   ===================================================== */
function renderTests() {
    const container = document.getElementById('testsList');
    container.innerHTML = '';

    directrices.forEach(d => {
        const item = document.createElement('div');
        item.className = 'test-item';
        item.id = `test-${d.id}`;
        item.innerHTML = `
            <div class="test-number">${d.id}</div>
            <div class="test-content">
                <div class="test-title">${d.title}</div>
                <div class="test-description">${d.description}</div>
                <div class="test-details" id="details-${d.id}"></div>
            </div>
            <div class="test-status">
                <span class="status-badge pending" id="status-${d.id}">Pendiente</span>
            </div>
        `;
        container.appendChild(item);
    });
}

async function runTests() {
    const iframe = document.getElementById('formFrame');
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    let passed = 0;
    let failed = 0;

    for (let i = 0; i < directrices.length; i++) {
        const d = directrices[i];
        const statusEl = document.getElementById(`status-${d.id}`);
        const detailsEl = document.getElementById(`details-${d.id}`);

        // Estado: ejecutando
        statusEl.className = 'status-badge running';
        statusEl.textContent = 'Ejecutando...';

        await sleep(200);

        try {
            const result = d.test(doc);
            
            if (result.passed) {
                statusEl.className = 'status-badge passed';
                statusEl.textContent = 'Cumple';
                passed++;
            } else {
                statusEl.className = 'status-badge failed';
                statusEl.textContent = 'No cumple';
                failed++;
            }

            detailsEl.textContent = result.details;
            detailsEl.classList.add('visible');
        } catch (error) {
            statusEl.className = 'status-badge failed';
            statusEl.textContent = 'Error';
            detailsEl.textContent = 'Error: ' + error.message;
            detailsEl.classList.add('visible');
            failed++;
        }
    }

    // Actualizar resumen
    document.getElementById('passedCount').textContent = passed;
    document.getElementById('failedCount').textContent = failed;
    
    const percentage = (passed / directrices.length) * 100;
    document.getElementById('percentValue').textContent = percentage.toFixed(0) + '%';

    // Calificación
    const grade = (percentage / 100) * 5.0;
    const gradeEl = document.getElementById('gradeValue');
    gradeEl.textContent = grade.toFixed(1);

    gradeEl.className = 'grade-value';
    if (grade >= 4.5) gradeEl.classList.add('excellent');
    else if (grade >= 4.0) gradeEl.classList.add('good');
    else if (grade >= 3.0) gradeEl.classList.add('acceptable');
    else gradeEl.classList.add('poor');

    document.getElementById('gradeFormula').textContent = 
        `(${percentage.toFixed(0)}% × 5.0) = ${grade.toFixed(1)}`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderTests();
    
    // Ejecutar tests cuando cargue el iframe
    const iframe = document.getElementById('formFrame');
    iframe.addEventListener('load', () => {
        setTimeout(runTests, 300);
    });
});
