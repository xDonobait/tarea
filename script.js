// Calcular edad automáticamente
document.getElementById('fechaNacimiento').addEventListener('change', function() {
    const fecha = new Date(this.value);
    const hoy = new Date();
    
    // Solo validar si la fecha está completa
    if (this.value && this.value.length === 10) {
        if (fecha > hoy) {
            this.setCustomValidity('La fecha de nacimiento no puede ser futura');
            alert('La fecha de nacimiento no puede ser futura');
            this.value = '';
            document.getElementById('edad').value = '';
            return;
        } else if (fecha.getFullYear() < 1900) {
            this.setCustomValidity('Por favor ingrese una fecha válida');
            alert('Por favor ingrese una fecha válida');
            this.value = '';
            document.getElementById('edad').value = '';
            return;
        } else {
            this.setCustomValidity('');
        }
        
        // Calcular edad
        let edad = hoy.getFullYear() - fecha.getFullYear();
        const mes = hoy.getMonth() - fecha.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
            edad--;
        }
        document.getElementById('edad').value = edad;
    }
});

// Validar solo letras (nombres y apellidos)
function soloLetras(e) {
    const key = e.key;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
    if (!regex.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'Tab' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
        e.preventDefault();
    }
}

// Validar solo números
function soloNumeros(e) {
    const key = e.key;
    const regex = /^[0-9]$/;
    if (!regex.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'Tab' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
        e.preventDefault();
    }
}

// Aplicar validación a nombres y apellidos
const camposLetras = ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido'];
camposLetras.forEach(id => {
    document.getElementById(id).addEventListener('keydown', soloLetras);
});

// Aplicar validación a campos numéricos
const camposNumeros = ['numeroDocumento', 'telefono', 'celular', 'personasCargo'];
camposNumeros.forEach(id => {
    const campo = document.getElementById(id);
    if (campo) {
        campo.addEventListener('keydown', soloNumeros);
    }
});

// Validar formato de correo electrónico en tiempo real
document.getElementById('correo').addEventListener('input', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
        this.setCustomValidity('Por favor ingrese un correo válido');
    } else {
        this.setCustomValidity('');
    }
});

// Validar teléfono y celular (mínimo 7 dígitos)
function validarTelefono(input) {
    input.addEventListener('input', function() {
        if (this.value && this.value.length < 7) {
            this.setCustomValidity('Debe tener al menos 7 dígitos');
        } else {
            this.setCustomValidity('');
        }
    });
}

validarTelefono(document.getElementById('telefono'));
validarTelefono(document.getElementById('celular'));

// Validar número de documento (mínimo 6 dígitos)
document.getElementById('numeroDocumento').addEventListener('input', function() {
    if (this.value && this.value.length < 6) {
        this.setCustomValidity('El documento debe tener al menos 6 dígitos');
    } else {
        this.setCustomValidity('');
    }
});

// Validar personas a cargo (no puede ser negativo)
document.getElementById('personasCargo').addEventListener('input', function() {
    if (this.value < 0) {
        this.value = 0;
    }
});

// Mostrar mensajes de error personalizados
document.getElementById('mainForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validar campos requeridos
    const camposRequeridos = this.querySelectorAll('[required]');
    let todosValidos = true;
    
    camposRequeridos.forEach(campo => {
        if (!campo.value || !campo.checkValidity()) {
            todosValidos = false;
            campo.style.borderColor = '#ff4444';
            
            // Agregar clase de error temporalmente
            setTimeout(() => {
                campo.style.borderColor = '#fff';
            }, 3000);
        }
    });
    
    if (todosValidos && this.checkValidity()) {
        // Recopilar datos del formulario
        const formData = new FormData(this);
        const datos = {};
        formData.forEach((value, key) => {
            datos[key] = value;
        });
        
        console.log('Datos del formulario:', datos);
        alert('¡Formulario enviado correctamente!\n\nLos datos han sido validados.');
        this.reset();
    } else {
        alert('Por favor complete correctamente todos los campos requeridos');
    }
});

// Feedback visual al escribir correctamente
document.querySelectorAll('input[required], select[required]').forEach(campo => {
    campo.addEventListener('input', function() {
        if (this.checkValidity() && this.value) {
            this.style.borderColor = '#4CAF50';
        } else if (this.value) {
            this.style.borderColor = '#ff4444';
        } else {
            this.style.borderColor = '#fff';
        }
    });
    
    campo.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = '#fff';
        }
    });
});