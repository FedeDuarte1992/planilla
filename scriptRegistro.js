var resultados = [];
// Función para obtener la fecha actual en el formato YYYY-MM-DD
function obtenerFechaActual() {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Función para establecer la hora de inicio según el turno seleccionado
function establecerHoraInicio() {
    const turno = document.querySelector('select[name="turno"]').value;
    const horaInicioInput = document.querySelector('input[name="horaInicio"]');
    switch (turno) {
        case 'mañana':
            horaInicioInput.value = '06:00';
            break;
        case 'tarde':
            horaInicioInput.value = '14:00';
            break;
        case 'noche':
            horaInicioInput.value = '22:00';
            break;
        default:
            horaInicioInput.value = ''; // Limpiar el campo si no se selecciona ningún turno
            break;
    }
}

// Establecer la fecha actual y la hora de inicio al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fecha').value = obtenerFechaActual();
    establecerHoraInicio();

    // Agregar un event listener al campo de turno para actualizar la hora de inicio cuando cambie
    document.querySelector('select[name="turno"]').addEventListener('change', establecerHoraInicio);
});

// Función para establecer la hora de finalización según el turno seleccionado
function establecerHoraFinalizacion() {
    const turno = document.querySelector('select[name="turno"]').value;
    const horaFinalizacionInput = document.querySelector('input[name="horaFinalizacion"]');
    
    switch (turno) {
        case 'mañana':
            horaFinalizacionInput.value = '14:00';
            break;
        case 'tarde':
            horaFinalizacionInput.value = '22:00';
            break;
        case 'noche':
            horaFinalizacionInput.value = '06:00';
            break;
        default:
            horaFinalizacionInput.value = ''; // Limpiar el campo de finalización si no se selecciona ningún turno
            break;
    }
}

// Establecer la fecha actual y la hora de inicio al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fecha').value = obtenerFechaActual();

    // Establecer la hora de finalización por defecto según el turno seleccionado al cargar la página
    establecerHoraFinalizacion();

    // Agregar un event listener al campo de turno para actualizar la hora de finalización cuando cambie
    document.querySelector('select[name="turno"]').addEventListener('change', establecerHoraFinalizacion);
});

document.addEventListener('DOMContentLoaded', function() {
    // Recuperar los datos almacenados en localStorage
    const productoDataJSON = localStorage.getItem('productoData');
    if (productoDataJSON) {
        const productoData = JSON.parse(productoDataJSON);

        // Rellenar automáticamente el formulario con los datos recuperados
        document.getElementById('ot').value = productoData.ot;
        document.getElementById('lote').value = productoData.lote;
        document.getElementById('codProduccion').value = productoData.codProduccion;
        document.getElementById('producto').value = productoData.producto;
        document.getElementById('fechaVencimiento').value = productoData.fechaVencimiento;
    }
});
