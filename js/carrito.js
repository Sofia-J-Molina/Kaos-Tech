const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <p class= "modal-header-title">Tú Carrito</p>
    `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("div");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
    modalHeader.append(modalButton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.foto}">
            <p>${product.nombre}</p>
            <p>$${product.precio}</p>
            <span class ="restar">-</span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class ="sumar">+</span>
            <p>Total: $ ${product.cantidad * product.precio}</p>
            <span class ="delete-product"> ❌ </span> 
            
        `;

        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });
        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        });
    });
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: $ ${total} 
    <button type="button" id="finalizarCompra" class="btn btn-outline-info">Finalizar Compra</button>`;
    modalContainer.append(totalBuying);
    let botonFinalizarCompra = document.getElementById("finalizarCompra");
    botonFinalizarCompra.onclick = () => {
        carrito = [];
        document.querySelector(".modal-content").innerHTML = ' ';
        document.querySelector(".total-content").innerText = "Total a pagar $:";
        pintarCarrito();
        saveLocal();
        carritoCounter();

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Su compra ha sido realizada con exito! 🥳'
        })
    };

};

verCarrito.addEventListener("click", pintarCarrito);
const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    pintarCarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();




