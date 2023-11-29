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

const form = document.getElementById("formsubmit")
const tomarM2 = document.getElementById("m2Value")
const tomarTipoLadrillo = document.getElementById("tipoLadrilloValue")
const agregar = document.getElementById("lista")

let carritoDeLadrillos = [];

form.addEventListener("submit", agregarItem)

function agregarItem(event) {
    event.preventDefault();

    const tipoLadrillo = tomarTipoLadrillo.value;
    const m2 = parseFloat(tomarM2.value);
    const ladrilloSeleccionado = Ladrillos.find(ladrillo => ladrillo.tipo === tipoLadrillo);
    const precioLadrilloSeleccionado = ladrilloSeleccionado.precioDeLista;

    if (m2 >= 1) {
        const cantidad = Math.ceil(m2 * ladrilloSeleccionado.cantidadPorM2);
        const precio = cantidad * precioLadrilloSeleccionado;

        let item = document.createElement("li");
        let agregarAlCarritoButton = document.createElement("button");
        agregarAlCarritoButton.innerText = "Agregar al Carrito";
        item.innerText = `Necesitas ${cantidad} ${ladrilloSeleccionado.tipo} y tiene un costo de $ ${precio}.`;
        item.appendChild(agregarAlCarritoButton);
        agregar.appendChild(item);

        let ladrilloCarrito = {
            tipo: ladrilloSeleccionado.tipo,
            cantidad: cantidad,
            precio: precio
        };

        agregarAlCarritoButton.addEventListener("click", function () {
            carritoDeLadrillos.push({ ...ladrilloCarrito });
            console.log(carritoDeLadrillos);
            const ladrilloCarritoJSON = JSON.stringify(carritoDeLadrillos);
            localStorage.setItem("carrito",ladrilloCarritoJSON);
        });
        
    }
}

