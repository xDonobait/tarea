// CÁLCULO DE EDAD
const inputFecha = document.getElementById('fechaNacimiento');
const inputEdad = document.getElementById('edad');

function calcularEdad() {
    const valorFecha = inputFecha.value;
    
    // Si no hay fecha, no calcular
    if (!valorFecha) {
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
    
    // Mostrar edad calculada
    inputEdad.value = edad;
}

// Calcular edad al seleccionar o cambiar la fecha
inputFecha.addEventListener('change', calcularEdad);
inputFecha.addEventListener('input', calcularEdad);

// VALIDACIONES DE ENTRADA
function soloLetras(e) {
    const key = e.key;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
    if (!regex.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'Tab' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
        e.preventDefault();
    }
}

function soloNumeros(e) {
    const key = e.key;
    const regex = /^[0-9]$/;
    if (!regex.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'Tab' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
        e.preventDefault();
    }
}

const camposLetras = ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido'];
camposLetras.forEach(id => {
    document.getElementById(id).addEventListener('keydown', soloLetras);
});

const camposNumeros = ['numeroDocumento', 'telefono', 'celular', 'personasCargo', 'edad'];
camposNumeros.forEach(id => {
    const campo = document.getElementById(id);
    if (campo) {
        campo.addEventListener('keydown', soloNumeros);
    }
});

// VALIDACIONES ESPECÍFICAS
document.getElementById('correo').addEventListener('input', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
        this.setCustomValidity('Por favor ingrese un correo válido');
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

// Validar edad
document.getElementById('edad').addEventListener('input', function() {
    if (this.value < 0) {
        this.value = 0;
    }
    if (this.value > 120) {
        this.value = 120;
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
            'Fecha de Nacimiento': formData.get('fechaNacimiento') || '-',
            'Edad': formData.get('edad') + ' años' || '-',
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
        if (!campo.value || !campo.checkValidity()) {
            todosValidos = false;
            campo.classList.add('campo-invalido');
            
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