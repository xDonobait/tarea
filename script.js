// CÁLCULO DE EDAD
const inputFecha = document.getElementById('fechaNacimiento');
const inputEdad = document.getElementById('edad');

function calcularEdad() {
    const valorFecha = inputFecha.value;
    
    // Si no hay fecha completa, limpiar edad
    if (!valorFecha) {
        inputEdad.value = '';
        inputFecha.setCustomValidity('');
        return;
    }
    
    // Calcular edad
    const fechaNac = new Date(valorFecha);
    const hoy = new Date();
    
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    
    // Mostrar edad
    inputEdad.value = edad + ' años';
}

function validarEdad() {
    const valorFecha = inputFecha.value;
    
    // Si no hay fecha, no validar aún
    if (!valorFecha) {
        inputFecha.setCustomValidity('');
        return;
    }
    
    // Calcular edad
    const fechaNac = new Date(valorFecha);
    const hoy = new Date();
    
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    
    // Validar que la edad sea realista (entre 15 y 100 años)
    if (edad < 15) {
        inputFecha.setCustomValidity('Debe ser mayor de 15 años para aplicar');
        alert('Debes ser mayor de 15 años para completar este formulario');
        return;
    }
    
    if (edad > 100) {
        inputFecha.setCustomValidity('Por favor ingresa una fecha de nacimiento válida');
        alert('Por favor ingresa una fecha de nacimiento realista');
        return;
    }
    
    inputFecha.setCustomValidity('');
}

// Calcular edad al seleccionar o cambiar la fecha
inputFecha.addEventListener('change', calcularEdad);
inputFecha.addEventListener('input', calcularEdad);
// Validar edad solo cuando pierda el foco (después de terminar de escribir)
inputFecha.addEventListener('blur', validarEdad);

// VALIDACIONES DE ENTRADA
function soloLetras(e) {
    const key = e.key;
    const input = e.target;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
    
    // Prevenir caracteres no válidos
    if (!regex.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'Tab' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
        e.preventDefault();
        return;
    }
    
    // Prevenir múltiples espacios consecutivos
    if (key === ' ') {
        const cursorPos = input.selectionStart;
        const valorActual = input.value;
        
        // Si el carácter anterior es un espacio, prevenir otro espacio
        if (cursorPos > 0 && valorActual[cursorPos - 1] === ' ') {
            e.preventDefault();
            return;
        }
        
        // Si es el primer carácter, prevenir espacio al inicio
        if (cursorPos === 0) {
            e.preventDefault();
            return;
        }
    }
}

function soloNumeros(e) {
    const key = e.key;
    const regex = /^[0-9]$/;
    if (!regex.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'Tab' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
        e.preventDefault();
    }
}

// FORMATEO AUTOMÁTICO DE DATOS
function formatearNombre(input) {
    let valor = input.value;
    
    // Eliminar caracteres inválidos (mantener solo letras y espacios)
    valor = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    
    // Eliminar espacios múltiples (más de uno consecutivo)
    valor = valor.replace(/\s{2,}/g, ' ');
    
    // Eliminar espacios al inicio
    valor = valor.replace(/^\s+/, '');
    
    // Capitalizar cada palabra
    valor = valor.replace(/\b\w/g, letra => letra.toUpperCase());
    
    input.value = valor;
}

function finalizarFormateoNombre(input) {
    // Al finalizar la edición, eliminar espacios al final
    let valor = input.value.trim();
    // Asegurar que no haya espacios múltiples
    valor = valor.replace(/\s{2,}/g, ' ');
    // Capitalizar cada palabra
    valor = valor.replace(/\b\w/g, letra => letra.toUpperCase());
    input.value = valor;
}

function formatearTelefono(input) {
    // Formato: XXX-XXX-XXXX
    let valor = input.value.replace(/\D/g, ''); // Solo números
    if (valor.length > 0) {
        if (valor.length <= 3) {
            valor = valor;
        } else if (valor.length <= 6) {
            valor = valor.slice(0, 3) + '-' + valor.slice(3);
        } else {
            valor = valor.slice(0, 3) + '-' + valor.slice(3, 6) + '-' + valor.slice(6, 10);
        }
    }
    input.value = valor;
}

function formatearDocumento(input) {
    // Formato colombiano: XXX.XXX.XXX.XXX (hasta 12 dígitos)
    let valor = input.value.replace(/\D/g, ''); // Solo números
    if (valor.length > 0) {
        if (valor.length <= 3) {
            valor = valor;
        } else if (valor.length <= 6) {
            valor = valor.slice(0, 3) + '.' + valor.slice(3);
        } else if (valor.length <= 9) {
            valor = valor.slice(0, 3) + '.' + valor.slice(3, 6) + '.' + valor.slice(6);
        } else {
            valor = valor.slice(0, 3) + '.' + valor.slice(3, 6) + '.' + valor.slice(6, 9) + '.' + valor.slice(9, 12);
        }
    }
    input.value = valor;
}

function formatearFecha(dateString) {
    // Convertir fecha YYYY-MM-DD a formato legible: DD de mes de YYYY
    if (!dateString) return '-';
    
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                   'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    const fecha = new Date(dateString + 'T00:00:00');
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    
    return `${dia} de ${mes} de ${año}`;
}

const camposLetras = ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido'];
camposLetras.forEach(id => {
    const campo = document.getElementById(id);
    campo.addEventListener('keydown', soloLetras);
    // Limpiar y formatear al escribir
    campo.addEventListener('input', function() {
        formatearNombre(this);
    });
    // Formatear y limpiar espacios finales al perder el foco
    campo.addEventListener('blur', function() {
        finalizarFormateoNombre(this);
    });
});

const camposNumeros = ['numeroDocumento', 'telefono', 'celular', 'personasCargo'];
camposNumeros.forEach(id => {
    const campo = document.getElementById(id);
    if (campo) {
        campo.addEventListener('keydown', soloNumeros);
    }
});

// Formateo automático de teléfono
const inputTelefono = document.getElementById('telefono');
const inputCelular = document.getElementById('celular');

inputTelefono.addEventListener('input', function() {
    formatearTelefono(this);
});

inputCelular.addEventListener('input', function() {
    formatearTelefono(this);
});

// Formateo automático de documento
const inputDocumento = document.getElementById('numeroDocumento');
inputDocumento.addEventListener('input', function() {
    formatearDocumento(this);
});

// VALIDACIONES ESPECÍFICAS
document.getElementById('correo').addEventListener('input', function() {
    // Regex más estricto para validar email
    const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (this.value && !emailRegex.test(this.value)) {
        this.setCustomValidity('Por favor ingrese un correo válido (ej: usuario@dominio.com)');
    } else {
        this.setCustomValidity('');
    }
});

function validarTelefono(input) {
    input.addEventListener('blur', function() {
        if (this.value && this.value.length < 7) {
            this.setCustomValidity('Debe tener al menos 7 dígitos');
            alert('El teléfono debe tener al menos 7 dígitos');
        } else {
            this.setCustomValidity('');
        }
    });
}

validarTelefono(document.getElementById('telefono'));
validarTelefono(document.getElementById('celular'));

document.getElementById('numeroDocumento').addEventListener('blur', function() {
    if (this.value && this.value.length < 6) {
        this.setCustomValidity('El documento debe tener al menos 6 dígitos');
        alert('El número de documento debe tener al menos 6 dígitos');
    } else {
        this.setCustomValidity('');
    }
});

document.getElementById('personasCargo').addEventListener('input', function() {
    if (this.value < 0) {
        this.value = 0;
    }
});

// FEEDBACK VISUAL
document.querySelectorAll('input[required], select[required]').forEach(campo => {
    campo.addEventListener('blur', function() {
        if (this.checkValidity() && this.value) {
            this.classList.add('campo-valido');
            this.classList.remove('campo-invalido');
        } else if (this.value) {
            this.classList.add('campo-invalido');
            this.classList.remove('campo-valido');
        } else {
            this.classList.remove('campo-valido', 'campo-invalido');
        }
    });
    
    campo.addEventListener('focus', function() {
        this.classList.remove('campo-invalido');
    });
});

// MODAL DE REVISIÓN
const modal = document.getElementById('modalRevision');
const btnRevisar = document.getElementById('btnRevisar');
const btnCerrarModal = document.getElementById('btnCerrarModal');
const btnConfirmarEnvio = document.getElementById('btnConfirmarEnvio');

btnRevisar.addEventListener('click', function() {
    const form = document.getElementById('mainForm');
    
    // Validar que todos los campos requeridos estén llenos
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    mostrarResumen();
    modal.classList.add('activo');
});

btnCerrarModal.addEventListener('click', function() {
    modal.classList.remove('activo');
});

btnConfirmarEnvio.addEventListener('click', function() {
    enviarFormulario();
});

// Cerrar modal al hacer clic fuera
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('activo');
    }
});

function mostrarResumen() {
    const form = document.getElementById('mainForm');
    const formData = new FormData(form);
    
    const resumen = {
        'Información de Estudio': {
            'Carrera de interés': document.getElementById('carrera').options[document.getElementById('carrera').selectedIndex].text
        },
        'Información Personal': {
            'Primer Nombre': formData.get('primerNombre') || '-',
            'Segundo Nombre': formData.get('segundoNombre') || 'No especificado',
            'Primer Apellido': formData.get('primerApellido') || '-',
            'Segundo Apellido': formData.get('segundoApellido') || 'No especificado'
        },
        'Documento de Identidad': {
            'Tipo de Documento': document.getElementById('tipoDocumento').options[document.getElementById('tipoDocumento').selectedIndex].text,
            'Número de Documento': formData.get('numeroDocumento') || '-'
        },
        'Información Demográfica': {
            'Sexo Biológico': document.getElementById('sexoBiologico').options[document.getElementById('sexoBiologico').selectedIndex].text,
            'País de Nacimiento': document.getElementById('paisNacimiento').options[document.getElementById('paisNacimiento').selectedIndex].text,
            'Fecha de Nacimiento': formatearFecha(formData.get('fechaNacimiento')),
            'Edad': formData.get('edad') || '-',
            'Estado Civil': document.getElementById('estadoCivil').options[document.getElementById('estadoCivil').selectedIndex].text,
            'Correo Electrónico': formData.get('correo') || '-'
        },
        'Información de Contacto': {
            'Teléfono Fijo': formData.get('telefono') || 'No especificado',
            'Teléfono Celular': formData.get('celular') || '-'
        },
        'Información Adicional': {
            '¿Trabaja actualmente?': formData.get('laborando') === 'si' ? 'Sí' : 'No',
            '¿Cuenta con recursos para financiar?': formData.get('recursos') === 'si' ? 'Sí' : 'No',
            'Personas a cargo': formData.get('personasCargo') || '0',
            '¿Desea info de financiación?': formData.get('financiacion') === 'si' ? 'Sí' : 'No'
        }
    };
    
    let html = '';
    for (const [seccion, datos] of Object.entries(resumen)) {
        html += `<div class="resumen-seccion">`;
        html += `<h3>${seccion}</h3>`;
        for (const [label, valor] of Object.entries(datos)) {
            html += `<div class="resumen-item">`;
            html += `<span class="resumen-label">${label}:</span>`;
            html += `<span class="resumen-valor">${valor}</span>`;
            html += `</div>`;
        }
        html += `</div>`;
    }
    
    document.getElementById('resumenDatos').innerHTML = html;
}

function enviarFormulario() {
    const form = document.getElementById('mainForm');
    const formData = new FormData(form);
    const datos = {};
    formData.forEach((value, key) => {
        datos[key] = value;
    });
    
    console.log('Datos del formulario:', datos);
    
    modal.classList.remove('activo');
    alert('¡Formulario enviado correctamente!\n\nGracias por su información. Nos pondremos en contacto con usted pronto.');
    form.reset();
    
    // Limpiar clases de validación
    document.querySelectorAll('.campo-valido, .campo-invalido').forEach(campo => {
        campo.classList.remove('campo-valido', 'campo-invalido');
    });
}

// ENVÍO DEL FORMULARIO
document.getElementById('mainForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const camposRequeridos = this.querySelectorAll('[required]');
    let todosValidos = true;
    
    camposRequeridos.forEach(campo => {
        // Limpiar espacios al inicio y final
        const valorLimpio = campo.value.trim();
        
        // Validar que no esté vacío y que no sea solo espacios
        if (!valorLimpio || !campo.checkValidity()) {
            todosValidos = false;
            campo.classList.add('campo-invalido');
            // Limpiar el campo si solo tiene espacios
            if (!valorLimpio) {
                campo.value = '';
            }
            
            setTimeout(() => {
                campo.classList.remove('campo-invalido');
            }, 3000);
        }
    });
    
    if (todosValidos && this.checkValidity()) {
        mostrarResumen();
        modal.classList.add('activo');
    } else {
        alert('Por favor complete correctamente todos los campos requeridos antes de continuar.');
    }
});