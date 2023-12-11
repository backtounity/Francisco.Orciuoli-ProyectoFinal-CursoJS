class Ladrillo {
    constructor(tipo, cantidadPorM2, precioDeLista, cantidadPorPallet) {
        this.tipo = tipo
        this.cantidadPorM2 = cantidadPorM2
        this.precioDeLista = precioDeLista
        this.cantidadPorPallet = cantidadPorPallet
    }
}

const Ladrillo1 = new Ladrillo("comunes", 60, 65, 1000)
const Ladrillo2 = new Ladrillo("huecos del 8", 15, 275, 198)
const Ladrillo3 = new Ladrillo("huecos del 12", 15, 350, 144)
const Ladrillo4 = new Ladrillo("bloques de 13", 12.5, 400, 162)
const Ladrillo5 = new Ladrillo("bloques de 20", 12.5, 400, 108)

const Ladrillos = [Ladrillo1, Ladrillo2, Ladrillo3, Ladrillo4, Ladrillo5]
let cambioBoton = true;

// Agregar eventos input a los campos
document.getElementById("metrosCuadrados").addEventListener("input", function () {
    vaciarOtrosInputs("metrosCuadrados");
});

document.getElementById("cantidadLadrillos").addEventListener("input", function () {
    vaciarOtrosInputs("cantidadLadrillos");
});

document.getElementById("precio").addEventListener("input", function () {
    vaciarOtrosInputs("precio");
});

document.getElementById("cantidadPalets").addEventListener("input", function () {
    vaciarOtrosInputs("cantidadPalets");
});

// Función para vaciar los otros inputs cuando se escribe en uno
function vaciarOtrosInputs(inputId) {
    const inputsToClear = ["metrosCuadrados", "cantidadLadrillos", "precio", "cantidadPalets"];

    inputsToClear.filter(id => id !== inputId).forEach(id => {
        document.getElementById(id).value = '';
    });
}

let carritoDeLadrillos;

// Verificar si hay datos en localStorage al cargar la página
if (localStorage.getItem("carritoDeLadrillos")) {
    carritoDeLadrillos = JSON.parse(localStorage.getItem("carritoDeLadrillos"));
} else {
    carritoDeLadrillos = [];
}

// Función principal del JS - hace los calculos de los ladrillos
function calcularBloque13() {
    let tipoLadrillo = document.getElementById("tipoLadrillo").value;

    
    if (tipoLadrillo === "null") {
        alert('Por favor, elige un tipo de ladrillo válido.');
        return;
    }

    let metrosCuadrados = parseFloat(document.getElementById("metrosCuadrados").value);
    let cantidadLadrillos = parseFloat(document.getElementById("cantidadLadrillos").value);
    let precio = parseFloat(document.getElementById("precio").value);
    let cantidadPalets = parseFloat(document.getElementById("cantidadPalets").value);

    if (metrosCuadrados < 0 || cantidadLadrillos < 0 || precio < 0 || cantidadPalets < 0) {
        alert('Por favor, ingrese valores no negativos en los campos.');
        return;
    }

    let ladrilloSeleccionado = Ladrillos.find(ladrillo => ladrillo.tipo === tipoLadrillo);

    if (tipoLadrillo === "comunes") {
        document.getElementById("cardImg").src = './Assets/Img/comunes.jpg';
    } else if (tipoLadrillo === "huecos del 8") {
        document.getElementById("cardImg").src = './Assets/Img/huecos8.png';
    } else if (tipoLadrillo === "huecos del 12") {
        document.getElementById("cardImg").src = './Assets/Img/huecos12.jpg';
    } else if (tipoLadrillo === "bloques de 13") {
        document.getElementById("cardImg").src = './Assets/Img/bloque13.png';
    } else if (tipoLadrillo === "bloques de 20") {
        document.getElementById("cardImg").src = './Assets/Img/bloque20.jpg';
    }

    if (!isNaN(metrosCuadrados) && isNaN(cantidadLadrillos) && isNaN(precio) && isNaN(cantidadPalets)) {
        cantidadLadrillos = metrosCuadrados * ladrilloSeleccionado.cantidadPorM2;
        precio = metrosCuadrados * ladrilloSeleccionado.cantidadPorM2 * ladrilloSeleccionado.precioDeLista;
        cantidadPalets = Math.ceil((metrosCuadrados * ladrilloSeleccionado.cantidadPorM2) / ladrilloSeleccionado.cantidadPorPallet);
    } else if (isNaN(metrosCuadrados) && !isNaN(cantidadLadrillos) && isNaN(precio) && isNaN(cantidadPalets)) {
        metrosCuadrados = cantidadLadrillos / ladrilloSeleccionado.cantidadPorM2;
        precio = cantidadLadrillos * ladrilloSeleccionado.precioDeLista;
        cantidadPalets = Math.ceil(cantidadLadrillos / ladrilloSeleccionado.cantidadPorPallet);
    } else if (isNaN(metrosCuadrados) && isNaN(cantidadLadrillos) && !isNaN(precio) && isNaN(cantidadPalets)) {
        metrosCuadrados = (precio / ladrilloSeleccionado.precioDeLista) / ladrilloSeleccionado.cantidadPorM2;
        cantidadLadrillos = precio / ladrilloSeleccionado.precioDeLista;
        cantidadPalets = Math.ceil((precio / ladrilloSeleccionado.precioDeLista) / ladrilloSeleccionado.cantidadPorPallet);
    } else if (isNaN(metrosCuadrados) && isNaN(cantidadLadrillos) && isNaN(precio) && !isNaN(cantidadPalets)) {
        metrosCuadrados = (cantidadPalets * ladrilloSeleccionado.cantidadPorPallet) / ladrilloSeleccionado.cantidadPorM2;
        cantidadLadrillos = cantidadPalets * ladrilloSeleccionado.cantidadPorPallet;
        precio = cantidadPalets * ladrilloSeleccionado.cantidadPorPallet * ladrilloSeleccionado.precioDeLista;
    }

    if (cambioBoton) {
        document.getElementById("calcularBtn").innerText = "Reiniciar";
        document.getElementById("calcularBtn").onclick = reiniciarCampos;
        cambioBoton = false;
    }

    let ladrilloCarrito = {
        tipoLadrillo: tipoLadrillo,
        metrosCuadrados: isNaN(metrosCuadrados) || metrosCuadrados < 0 ? 0 : metrosCuadrados,
        cantidadLadrillos: isNaN(cantidadLadrillos) || cantidadLadrillos < 0 ? metrosCuadrados * ladrilloSeleccionado.cantidadPorM2 : cantidadLadrillos,
        precio: isNaN(precio) || precio < 0 ? metrosCuadrados * ladrilloSeleccionado.cantidadPorM2 * ladrilloSeleccionado.precioDeLista : precio,
        cantidadPalets: isNaN(cantidadPalets) || cantidadPalets < 0 ? Math.ceil((metrosCuadrados * ladrilloSeleccionado.cantidadPorM2) / ladrilloSeleccionado.cantidadPorPallet) : cantidadPalets
    };

    document.getElementById("metrosCuadrados").value = ladrilloCarrito.metrosCuadrados;
    document.getElementById("cantidadLadrillos").value = ladrilloCarrito.cantidadLadrillos;
    document.getElementById("precio").value = ladrilloCarrito.precio;
    document.getElementById("cantidadPalets").value = ladrilloCarrito.cantidadPalets;

    carritoDeLadrillos.push(ladrilloCarrito);
    console.log(ladrilloCarrito);
    

}

// Función para reiniciar los campos
function reiniciarCampos() {
    document.getElementById("tipoLadrillo").value = "comunes";
    document.getElementById("metrosCuadrados").value = "";
    document.getElementById("cantidadLadrillos").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("cantidadPalets").value = "";

    document.getElementById("cardImg").src = './Assets/Img/elijeLadrillo.png';

    document.getElementById("calcularBtn").innerText = "Calcular";
    document.getElementById("calcularBtn").onclick = calcularBloque13;
    cambioBoton = true;
}
document.getElementById("agregarCarrito").addEventListener("click", function () {
    if (carritoDeLadrillos.length > 0) {
        localStorage.setItem("carritoDeLadrillos", JSON.stringify(carritoDeLadrillos));
    }
});

// Contador de carrito en Boton 
document.addEventListener("DOMContentLoaded", function () {
    const carritoBtn = document.getElementById("carritoBtn");
    const carritoCount = document.getElementById("carritoCount");
    const carritoStorage = localStorage.getItem("carritoDeLadrillos");
    const carrito = carritoStorage ? JSON.parse(carritoStorage) : [];
    
    actualizarContadorCarrito();
    
    function actualizarContadorCarrito() {
        carritoCount.innerText = carrito.length;
    }

    
    carritoBtn.addEventListener("click", function () {        
    });
});
