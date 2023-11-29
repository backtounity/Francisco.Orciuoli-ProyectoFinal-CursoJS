let cartStorage = localStorage.getItem("carrito");
if (cartStorage) {
    cartStorage = JSON.parse(cartStorage);

    let ulContainer = document.getElementById("CarritoLi");
    let totalCarrito = document.getElementById("totalCarrito")
    let total = 0;
    function renderCarrito(cartItems) {
        cartItems.forEach(ladrilloCarrito => {
            const cart = document.createElement("li");
            total += ladrilloCarrito.precio;
            cart.innerHTML = `<h3>${ladrilloCarrito.cantidad} ${ladrilloCarrito.tipo}</h3>
                              <h3>Precio: ${ladrilloCarrito.precio}</h3>`;
            totalCarrito.innerText = `$ ${total}`
            ulContainer.appendChild(cart);
        });
    }

    function vaciarCarrito() {
        carritoDeLadrillos = []; 
        total = 0; 
        totalCarrito.innerText = "$ 0"; 
        ulContainer.innerHTML = ""; 
        localStorage.removeItem("carrito"); 
    }

    
    document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);

    renderCarrito(cartStorage);
} else {
    totalCarrito.innerText = "$ 0";
}