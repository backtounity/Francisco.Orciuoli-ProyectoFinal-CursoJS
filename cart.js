let cartStorage = localStorage.getItem("carritoDeLadrillos");

if (cartStorage) {
    cartStorage = JSON.parse(cartStorage);

    let ulContainer = document.getElementById("carritoSection");
    let totalCarritoElement = document.getElementById("totalCarrito");
    let totalLadrillosElement = document.getElementById("totalLadrillos");
    let totalPaletsElement = document.getElementById("totalPalets");
    let costoEnvioElement = document.getElementById("costoEnvio");

    function calcularCostoEnvio(palets) {
        const capacidadCamion = 8;
        const costoPorViaje = 18000;
        const viajes = Math.ceil(palets / capacidadCamion);
        const costoTotalEnvio = viajes * costoPorViaje;
        return costoTotalEnvio;
    }

    function calcularTotalCarrito(totalLadrillos, costoEnvio) {
        return totalLadrillos + costoEnvio;
    }

    function renderCarrito(cartItems) {
        ulContainer.innerHTML = "";
        let totalLadrillos = 0;
        let totalPalets = 0;

        cartItems.forEach((ladrilloCarrito, index) => {
            const cart = document.createElement("div");
            cart.className = "card col-3";

            totalLadrillos += ladrilloCarrito.precio;
            totalPalets += ladrilloCarrito.cantidadPalets;

            cart.innerHTML = `<div class="card-body">
                                <h5>Ladrillos ${ladrilloCarrito.tipoLadrillo}</h5>
                                <p>Cantidad de ladrillos: ${ladrilloCarrito.cantidadLadrillos}</p>
                                <p>Cantidad de palets: ${ladrilloCarrito.cantidadPalets}</p>
                                <p>Precio: $${ladrilloCarrito.precio}</p>
                                <button type="button" class="btn btn-danger eliminarProducto" data-index="${index}">Eliminar Producto</button>
                              </div>`;
            ulContainer.appendChild(cart);
        });

        totalLadrillosElement.innerText = `$ ${totalLadrillos}`;
        totalPaletsElement.innerText = totalPalets;

        const costoEnvio = calcularCostoEnvio(totalPalets);
        costoEnvioElement.innerText = `$ ${costoEnvio}`;

        const totalCarrito = calcularTotalCarrito(totalLadrillos, costoEnvio);
        totalCarritoElement.innerText = `$ ${totalCarrito}`;

        // Manejador de eventos para los botones de eliminar
        const eliminarBotones = document.querySelectorAll(".eliminarProducto");
        eliminarBotones.forEach(btn => {
            btn.addEventListener("click", function () {
                const index = this.dataset.index;
                eliminarProducto(index);
            });
        });
    }

    function eliminarProducto(index) {
        const removedItem = cartStorage.splice(index, 1)[0];
        localStorage.setItem("carritoDeLadrillos", JSON.stringify(cartStorage));
        renderCarrito(cartStorage);
    }

    function vaciarCarrito() {
        cartStorage = [];
        ulContainer.innerHTML = "";
        localStorage.removeItem("carritoDeLadrillos");
        renderCarrito(cartStorage);
    }

    document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);

    renderCarrito(cartStorage);

    // Escucha de eventos para cambios en el LocalStorage
    window.addEventListener("storage", function (e) {
        if (e.key === "carritoDeLadrillos") {
            cartStorage = JSON.parse(e.newValue);
            renderCarrito(cartStorage);
        }
    });
} else {
    totalLadrillosElement.innerText = "$ 0";
    totalPaletsElement.innerText = "0";
    costoEnvioElement.innerText = "$ 0";
    totalCarritoElement.innerText = "$ 0";
}
