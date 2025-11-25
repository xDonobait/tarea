/* =====================================================
   FORMULARIO UNIVERSIDAD - JavaScript
   Cumplimiento de las 10 directrices de usabilidad
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initForm();
});

function initForm() {
    setupDateLimits();
    setupAutoFormat();
    setupAutoCapitalize();
    setupAgeCalculation();
    setupValidation();
    setupFormSubmit();
}

/* =====================================================
   DIRECTRIZ 1: Valores predeterminados y límites
   ===================================================== */
function setupDateLimits() {
    const fechaNac = document.getElementById('fechaNacimiento');
    if (!fechaNac) return;

    // Fecha máxima: hoy
    const today = new Date();
    fechaNac.max = today.toISOString().split('T')[0];

    // Fecha mínima: hace 100 años
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    fechaNac.min = minDate.toISOString().split('T')[0];
}

/* =====================================================
   DIRECTRIZ 2: Auto-formateo de datos
   ===================================================== */
function setupAutoFormat() {
    // Formateo número de documento (separadores de miles)
    const numDoc = document.getElementById('numeroDocumento');
    if (numDoc) {
        numDoc.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value) {
                value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            }
            e.target.value = value;
        });
    }

    // Formateo celular (espacios: 300 123 4567)
    const celular = document.getElementById('celular');
    if (celular) {
        celular.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 3) {
                e.target.value = value;
            } else if (value.length <= 6) {
                e.target.value = value.slice(0, 3) + ' ' + value.slice(3);
            } else {
                e.target.value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
            }
        });
    }

    // Formateo teléfono fijo ((5) 123 4567)
    const telefono = document.getElementById('telefono');
    if (telefono) {
        telefono.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length === 0) {
                e.target.value = '';
            } else if (value.length === 1) {
                e.target.value = '(' + value + ')';
            } else if (value.length <= 4) {
                e.target.value = '(' + value.slice(0, 1) + ') ' + value.slice(1);
            } else {
                e.target.value = '(' + value.slice(0, 1) + ') ' + value.slice(1, 4) + ' ' + value.slice(4, 8);
            }
        });
    }
}

/* =====================================================
   DIRECTRIZ 2: Capitalización automática de nombres
   ===================================================== */
function setupAutoCapitalize() {
    const nameFields = ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido'];
    
    nameFields.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.addEventListener('blur', function(e) {
                if (e.target.value) {
                    e.target.value = e.target.value
                        .toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')
                        .trim();
                }
            });
        }
    });
}

/* =====================================================
   DIRECTRIZ 2: Cálculo automático de edad
   ===================================================== */
function setupAgeCalculation() {
    const fechaNac = document.getElementById('fechaNacimiento');
    const edadField = document.getElementById('edad');
    
    if (!fechaNac || !edadField) return;

    fechaNac.addEventListener('change', function(e) {
        const birthDate = new Date(e.target.value);
        const today = new Date();
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        if (age >= 0 && age < 150) {
            edadField.value = age + ' años';
            
            // Validar edad mínima
            if (age < 14) {
                showError('fechaNacimiento', 'Debe tener al menos 14 años');
            } else {
                clearError('fechaNacimiento');
            }
        } else {
            edadField.value = '';
        }
    });
}

/* =====================================================
   DIRECTRIZ 9 & 10: Validación de campos
   ===================================================== */
function setupValidation() {
    // Limpiar errores al interactuar con campos
    const allInputs = document.querySelectorAll('input, select');
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
            clearError(this.id || this.name);
        });
        input.addEventListener('change', function() {
            clearError(this.id || this.name);
        });
    });
}

function showError(fieldId, message) {
    const fieldGroup = document.getElementById(fieldId)?.closest('.field-group');
    if (!fieldGroup) return;

    fieldGroup.classList.add('has-error');
    
    const errorEl = fieldGroup.querySelector('.error-message');
    if (errorEl && message) {
        errorEl.textContent = message;
    }
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
    const fieldGroup = field?.closest('.field-group');
    
    if (fieldGroup) {
        fieldGroup.classList.remove('has-error');
    }
}

function validateForm() {
    let isValid = true;
    let firstError = null;

    // Limpiar todos los errores previos
    document.querySelectorAll('.field-group.has-error').forEach(el => {
        el.classList.remove('has-error');
    });

    // Campos requeridos
    const requiredFields = [
        { id: 'carrera', message: 'Seleccione una carrera' },
        { id: 'primerNombre', message: 'Ingrese su primer nombre' },
        { id: 'primerApellido', message: 'Ingrese su primer apellido' },
        { id: 'tipoDocumento', message: 'Seleccione un tipo de documento' },
        { id: 'numeroDocumento', message: 'Ingrese su número de documento' },
        { id: 'paisNacimiento', message: 'Seleccione su país de nacimiento' },
        { id: 'fechaNacimiento', message: 'Ingrese su fecha de nacimiento' },
        { id: 'estadoCivil', message: 'Seleccione su estado civil' },
        { id: 'correoElectronico', message: 'Ingrese su correo electrónico' },
        { id: 'celular', message: 'Ingrese su número de celular' },
        { id: 'personasACargo', message: 'Seleccione una opción' }
    ];

    requiredFields.forEach(field => {
        const el = document.getElementById(field.id);
        if (el && !el.value.trim()) {
            showError(field.id, field.message);
            isValid = false;
            if (!firstError) firstError = el;
        }
    });

    // Radio buttons requeridos
    const requiredRadios = [
        { name: 'sexoBiologico', message: 'Seleccione una opción' },
        { name: 'laborando', message: 'Seleccione una opción' },
        { name: 'recursosAdicionales', message: 'Seleccione una opción' },
        { name: 'infoFinanciacion', message: 'Seleccione una opción' }
    ];

    requiredRadios.forEach(radio => {
        const checked = document.querySelector(`input[name="${radio.name}"]:checked`);
        if (!checked) {
            const firstRadio = document.querySelector(`input[name="${radio.name}"]`);
            const fieldGroup = firstRadio?.closest('.field-group');
            if (fieldGroup) {
                fieldGroup.classList.add('has-error');
                const errorEl = fieldGroup.querySelector('.error-message');
                if (errorEl) errorEl.textContent = radio.message;
            }
            isValid = false;
            if (!firstError) firstError = firstRadio;
        }
    });

    // Validar formato email
    const email = document.getElementById('correoElectronico');
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError('correoElectronico', 'Ingrese un correo válido');
        isValid = false;
        if (!firstError) firstError = email;
    }

    // Validar celular (10 dígitos)
    const celular = document.getElementById('celular');
    if (celular && celular.value) {
        const digits = celular.value.replace(/\D/g, '');
        if (digits.length !== 10) {
            showError('celular', 'El celular debe tener 10 dígitos');
            isValid = false;
            if (!firstError) firstError = celular;
        }
    }

    // Validar edad mínima
    const edad = document.getElementById('edad');
    if (edad && edad.value) {
        const ageNum = parseInt(edad.value);
        if (ageNum < 14) {
            showError('fechaNacimiento', 'Debe tener al menos 14 años');
            isValid = false;
            if (!firstError) firstError = document.getElementById('fechaNacimiento');
        }
    }

    // DIRECTRIZ 9: Focus en primer error
    if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return isValid;
}

/* =====================================================
   DIRECTRIZ 10: Validación al enviar (submit)
   ===================================================== */
function setupFormSubmit() {
    const form = document.getElementById('universityForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            showNotification('¡Formulario enviado correctamente!', 'success');
            
            // Log datos
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => data[key] = value);
            console.log('Datos del formulario:', data);
        } else {
            showNotification('Por favor corrija los errores', 'error');
        }
    });
}

/* =====================================================
   Notificaciones
   ===================================================== */
function showNotification(message, type) {
    // Remover notificación anterior si existe
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Mostrar
    setTimeout(() => notification.classList.add('visible'), 10);

    // Ocultar después de 4 segundos
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/* =====================================================
   Limpiar formulario
   ===================================================== */
function clearForm() {
    if (confirm('¿Está seguro de borrar todas las respuestas?')) {
        const form = document.getElementById('universityForm');
        form.reset();
        document.getElementById('edad').value = '';
        
        // Limpiar estados de error
        document.querySelectorAll('.field-group.has-error').forEach(el => {
            el.classList.remove('has-error');
        });
    }
}
