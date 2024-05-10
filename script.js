var resultados = [];

function calculateProduction() {
    var contadorInicial = parseInt(document.getElementById("initialMachineCounter").value);
    var contadorActual = parseInt(document.getElementById("currentMachineCounter").value);
    var cantidadBultos1 = parseInt(document.getElementById("quantityBags1").value);
    var cantidadBultos2 = parseInt(document.getElementById("quantityBags2").value);
    var cantidadDescarte = parseInt(document.getElementById("quantityBags").value);
    var tamanoPañal = parseInt(document.getElementById("diaperSize").value);
    var tamañoBulto1 = tamanoPañal === 80 ? 80 : 90;

    var golpesMaquina = contadorActual - contadorInicial;
    if (golpesMaquina < 0) {
        alert("El contador actual de la máquina debe ser mayor o igual que el contador inicial.");
        return;
    }

    // Modificar los valores de los campos si son 0
    if (cantidadBultos1 === 0) cantidadBultos1 = NaN;
    if (cantidadBultos2 === 0) cantidadBultos2 = NaN;
    if (cantidadDescarte === 0) cantidadDescarte = NaN;

    var pañales1 = 0, pañales2 = 0, descarte = 0, bultos1 = 0, bultos2 = 0, bultosDescarte = 0;

    // Calcular la cantidad de pañales de primera calidad
    if (!isNaN(cantidadBultos1)) {
        pañales1 = cantidadBultos1 * tamanoPañal;
        bultos1 = Math.ceil(pañales1 / tamañoBulto1);
    }

    // Calcular la cantidad de pañales de segunda calidad
    if (!isNaN(cantidadBultos2)) {
        pañales2 = cantidadBultos2 * 80;
        bultos2 = Math.ceil(pañales2 / 80);
    }

    // Calcular la cantidad de bolsas de descarte
    if (!isNaN(cantidadDescarte)) {
        descarte = cantidadDescarte * tamanoPañal;
        bultosDescarte = Math.ceil(descarte / 80);
    }

    // Si solo se ingresaron bultos de segunda calidad y descarte
    if (isNaN(cantidadBultos1) && !isNaN(cantidadBultos2) && !isNaN(cantidadDescarte)) {
        pañales1 = golpesMaquina - pañales2 - descarte;
        bultos1 = Math.ceil(pañales1 / tamañoBulto1);
    }

    // Si solo se ingresaron bultos de primera calidad y descarte
    if (!isNaN(cantidadBultos1) && isNaN(cantidadBultos2) && !isNaN(cantidadDescarte)) {
        pañales2 = golpesMaquina - pañales1 - descarte;
        bultos2 = Math.ceil(pañales2 / 80);
    }

    // Si solo se ingresaron bultos de primera calidad y segunda calidad
    if (!isNaN(cantidadBultos1) && !isNaN(cantidadBultos2) && isNaN(cantidadDescarte)) {
        descarte = golpesMaquina - pañales1 - pañales2;
        bultosDescarte = Math.ceil(descarte / 80);
    }

    var porcentajeDescarte = (descarte / golpesMaquina) * 100;
    var horaActual = new Date().toLocaleTimeString();

    var resultado = {
        hora: horaActual,
        contadorMaquina: contadorActual,
        bultos1: isNaN(cantidadBultos1) ? bultos1 : cantidadBultos1,
        bultos2: isNaN(cantidadBultos2) ? bultos2 : cantidadBultos2,
        golpesMaquina: golpesMaquina,
        unidades1: pañales1,
        unidades2: pañales2,
        descarte: descarte,
        porcentajeDescarte: porcentajeDescarte
    };

    resultados.push(resultado);
    mostrarResultado(resultado);
}


function mostrarResultado(resultado) {
    var resultTable = document.getElementById("resultTable");

    var newRow = resultTable.insertRow(1);

    var horaCell = newRow.insertCell(0);
    horaCell.textContent = resultado.hora;

    var contadorMaquinaCell = newRow.insertCell(1);
    contadorMaquinaCell.textContent = resultado.contadorMaquina;

    var bultos1Cell = newRow.insertCell(2);
    bultos1Cell.textContent = resultado.bultos1 !== "" ? resultado.bultos1 : '-';

    var bultos2Cell = newRow.insertCell(3);
    bultos2Cell.textContent = resultado.bultos2 !== "" ? resultado.bultos2 : '-';

    var golpesMaquinaCell = newRow.insertCell(4);
    golpesMaquinaCell.textContent = resultado.golpesMaquina;

    var unidades1Cell = newRow.insertCell(5);
    unidades1Cell.textContent = resultado.unidades1;

    var unidades2Cell = newRow.insertCell(6);
    unidades2Cell.textContent = resultado.unidades2;

    var descarteCell = newRow.insertCell(7);
    descarteCell.textContent = resultado.descarte !== "" ? (resultado.descarte / 80).toFixed(2) : '-';

    var porcentajeDescarteCell = newRow.insertCell(8);
    porcentajeDescarteCell.textContent = resultado.porcentajeDescarte.toFixed(2) + '%';

    var deleteButtonCell = newRow.insertCell(9);
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.onclick = function() {
        resultTable.deleteRow(newRow.rowIndex);
        resultados = resultados.filter(function(item) {
            return item !== resultado;
        });
        updateLocalStorage();
    };
    deleteButtonCell.appendChild(deleteButton);
}


function openGoogleSheets() {
    var csvContent = "Hora,Contador de Máquina,Bultos de 1ra Calidad,Bultos de 2da Calidad,Golpes de Máquina,Unidades de 1ra Calidad,Unidades de 2da Calidad,Descarte (Bolsas),Descarte (Porcentaje)\n";
    resultados.forEach(function(resultado) {
        csvContent += resultado.hora + "," + resultado.contadorMaquina + "," + (resultado.bultos1 ? resultado.bultos1 : '') + "," + (resultado.bultos2 ? resultado.bultos2 : '') + "," + resultado.golpesMaquina + "," + resultado.unidades1 + "," + resultado.unidades2 + "," + (resultado.descarte ? (resultado.descarte / 80).toFixed(2) : '') + "," + resultado.porcentajeDescarte.toFixed(2) + "%\n";
    });

    var encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "produccion_panales.csv");
    document.body.appendChild(link);
    link.click();
}

function toggleGelFields() {
    var gelFields = document.getElementById("gelFields");
    if (gelFields.style.display === "none") {
        gelFields.style.display = "block";
    } else {
        gelFields.style.display = "none";
    }
}

function calculateGel() {
    var pesoTotal = parseFloat(document.getElementById("totalWeight").value);
    var multiplicador = parseInt(document.getElementById("multiplier").value);
    var pañalesPorMinuto = parseInt(document.getElementById("diapersPerMinute").value);

    var resultadoGel = ((pesoTotal - 709) * multiplicador) / pañalesPorMinuto;

    var gelResultElement = document.getElementById("gelResult");
    gelResultElement.innerHTML = "<p>Peso de gel por pañal: " + resultadoGel.toFixed(2) + " gramos por pañal</p>";
}



function toggleDiaperCalculator() {
    var diaperCalculator = document.getElementById("diaperCalculator");
    diaperCalculator.style.display = (diaperCalculator.style.display === "none") ? "block" : "none";
}

function calculateGelAndToggleFields() {
    calculateGel();
    toggleGelFields();
}

 function openRegistroPage() {
        window.location.href = "registro.html";
    }
 function openCargarDatosProductoPage() {
        window.location.href = "cargarDatosDeProducto.html";
    }



function calculateWastage() {
    // Obtener los valores ingresados por el usuario
    var idealGolpes = parseInt(document.getElementById('idealGolpes').value);
    var horasMaquina = parseInt(document.getElementById('horasMaquina').value);
    var golpesActuales = parseInt(document.getElementById('golpesActuales').value);

    // Calcular los golpes ideales en función de las horas de máquina
    var golpesIdeales = idealGolpes * horasMaquina;

    // Calcular la merma en la producción
    var merma = ((golpesIdeales - golpesActuales) / golpesIdeales) * 100;

    // Mostrar la merma en la producción
    alert("La merma en la producción es del " + merma.toFixed(2) + "%.");
}
