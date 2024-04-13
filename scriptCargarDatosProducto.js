document.addEventListener('DOMContentLoaded', function() {
    const productDataForm = document.getElementById('productDataForm');
    productDataForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente
        
        // Capturar los datos del formulario
        const ot = document.getElementById('ot').value;
        const lote = document.getElementById('lote').value;
        const codProduccion = document.getElementById('codProduccion').value;
        const producto = document.getElementById('producto').value;
        const fechaVencimiento = document.getElementById('fechaVencimiento').value;
        
        // Insertar los datos en la planilla de registro
        insertarDatosEnPlanillaDeRegistro(ot, lote, codProduccion, producto, fechaVencimiento);
        
        // Limpiar el formulario después de enviar los datos
        productDataForm.reset();
    });
});
function setProductCode() {
    const producto = document.getElementById("producto").value;
    let codigoProductoInput = document.getElementById("codigoProducto");
    
    switch(producto) {
        case "Anatomico G 10 x 8":
            codigoProductoInput.value = "121131";
            break;
        case "Anatomico G 5 x 16":
            codigoProductoInput.value = "121132";
            break;
        case "Anatomico EG 10 x 8":
            codigoProductoInput.value = "121141";
            break;
        case "Anatomico EG 5 x 16":
            codigoProductoInput.value = "121142";
            break;
        case "Anatomico PAMI G 3 x 30":
            codigoProductoInput.value = "121133";
            break;
        case "Anatomico PAMI EG 3 x 30":
            codigoProductoInput.value = "121149";
            break;
        default:
            codigoProductoInput.value = "";
            break;
    }
}
function insertarDatosEnPlanillaDeRegistro(ot, lote, codProduccion, producto, fechaVencimiento) {
    // Aquí deberías escribir la lógica para insertar los datos en la planilla de registro
    // Puedes utilizar JavaScript para manipular el DOM y agregar una nueva fila con los datos ingresados
    // por ejemplo, puedes buscar la tabla en la planilla de registro y agregar una nueva fila con los datos proporcionados.

    // Guardar los datos en localStorage
    const productoData = {
        ot: ot,
        lote: lote,
        codProduccion: codProduccion,
        producto: producto,
        fechaVencimiento: fechaVencimiento
    };

    // Convertir el objeto a una cadena JSON
    const productoDataJSON = JSON.stringify(productoData);

    // Guardar los datos en localStorage
    localStorage.setItem('productoData', productoDataJSON);
}



document.addEventListener("DOMContentLoaded", function() {
    const productDataForm = document.getElementById("productDataForm");
    const productDataTableBody = document.getElementById("productDataBody");

    productDataForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

        // Recoger los datos del formulario
        const ot = document.getElementById("ot").value;
        const lote = document.getElementById("lote").value;
        const producto = document.getElementById("producto").value;
        const codigoProducto = document.getElementById("codigoProducto").value;
        const fechaVencimiento = document.getElementById("fechaVencimiento").value;

        // Crear una nueva fila en la tabla con los datos recogidos
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${ot}</td>
            <td>${lote}</td>
            <td>${producto}</td>
            <td>${codigoProducto}</td>
            <td>${fechaVencimiento}</td>
        `;

        // Agregar la nueva fila a la tabla
        productDataTableBody.appendChild(newRow);

        // Limpiar los campos del formulario después de agregar los datos
        productDataForm.reset();
    });
});



