
const recuperarCarritoLS = (clave) =>{
  return JSON.parse(localStorage.getItem(clave));
}

const actualizarCarritoLS = (clave, datos) => {
 localStorage.setItem(clave, JSON.stringify(datos));
}

const finalizarCompra = () =>{
    mostrarCompraRealizada();
    localStorage.clear("productosDeCarrito");
    let containerCarrito = document.getElementById("misProductos");
    containerCarrito.innerHTML = `
    <div class="alert alert-dark text-center fs-5 m-4 m-sm-0" role="alert">
        No hay ningun producto en el carrito!
    </div>
    `;

    actualizarValorPrecioTotal(0);
}

const mostrarCompraRealizada = () =>{
    const contenedor = document.getElementById("misAlertas");
    contenedor.innerHTML = "";
    let productoDeCarritoLS = localStorage.getItem("productosDeCarrito");
    if(productoDeCarritoLS){
      contenedor.innerHTML = `
            <div class="alert alert-dark text-center fs-5 m-4 m-sm-3" role="alert">
                Tu compra fue realizada con exito!
            </div>
            `;
    }else{
        contenedor.innerHTML = `
            <div class="alert alert-danger text-center fs-5 m-4 m-sm-3" style="display: flex" role="alert">
                Agrega productos para realizar tu compra!
            </div>
        `;

        setTimeout(() => {
          contenedor.innerHTML = `
            <div class="alert alert-danger text-center fs-5 m-4 m-sm-3" style="display:none;" role="alert">
                Agrega productos para realizar tu compra!
            </div>
            `;
        },3000)
    }
    
}

const vaciarCarrito = () =>{
    localStorage.clear("productosDeCarrito");
    let containerCarrito = document.getElementById("misProductos");
    containerCarrito.innerHTML = `
        <div class="alert alert-dark text-center fs-5 m-4 m-sm-0" role="alert">
            No hay ningun producto en el carrito!
        </div>
        `;
    actualizarValorPrecioTotal(0);
}

const quitarDelCarrito = (idProducto) => {
  let container = document.getElementById('misProductos');
  let carrito = recuperarCarritoLS("productosDeCarrito");
  let nuevoCarrito = carrito.filter( productos => productos._id !== idProducto);
  actualizarCarritoLS("productosDeCarrito", nuevoCarrito);
  mostrarProductosEnCarrito();
  pintarCartasDeCarrito(nuevoCarrito, container);
};

const disminuirCantidad = (idProducto) => {
  let carrito = recuperarCarritoLS("productosDeCarrito");
  let nuevoCarrito = carrito.map(producto => producto.unidades > 1 && producto._id === idProducto ? {...producto, unidades: producto.unidades-1} : producto);
  actualizarCarritoLS("productosDeCarrito", nuevoCarrito);
  actualizarUnidadCard(idProducto);
  mostrarProductosEnCarrito();
};

const aumentarCantidad = (idProducto) => {
  let carrito = recuperarCarritoLS("productosDeCarrito");
  let nuevoCarrito = carrito.map(producto => producto.unidades < producto.stock && producto._id === idProducto ? {...producto, unidades: producto.unidades+1} : producto);
  actualizarCarritoLS("productosDeCarrito", nuevoCarrito);
  actualizarUnidadCard(idProducto);
  mostrarProductosEnCarrito();
};

const actualizarUnidadCard = (idProducto) => {
  let carrito = recuperarCarritoLS("productosDeCarrito");
  let produc = carrito.find(producto => producto._id === idProducto);
  let unidadProducto = produc.unidades;
  let valorBoton = document.getElementById(idProducto);
  valorBoton.textContent = unidadProducto;

}

const actualizarValorPrecioTotal = (precioTotalFinal) => {
  let parrafoPrecioTotal = document.getElementById("parrafoPrecioTotal");
  parrafoPrecioTotal.innerHTML = `Total: $ 
        <span id="PrecioTotalEnCarrito">${precioTotalFinal}</span>
  `;
}

const mostrarProductosEnCarrito = () => {
  
  let carrito = recuperarCarritoLS("productosDeCarrito");
  let valorTotal = 0;

  if (carrito){
    carrito.map(producto => {
      valorTotal += parseInt(producto.precio) * parseInt(producto.unidades);
    })
  }

  actualizarValorPrecioTotal(valorTotal);
};

const pintarCartasDeCarrito = (productos, container) => {

  container.innerHTML= "";

  if (!productos){
    let aviso = document.createElement("div");
    aviso.innerHTML = `
        <div class="alert alert-dark text-center fs-5 m-4 m-sm-0" role="alert">
            No hay ningun producto en el carrito!
        </div>
        `;
    container.appendChild(aviso);

  }else if (productos && productos.length === 0) {
    let aviso = document.createElement("div");
    aviso.innerHTML = `
        <div class="alert alert-dark text-center fs-5 m-4 m-sm-0" role="alert">
            No hay ningun producto en el carrito!
        </div>
        `;
    container.appendChild(aviso);

  } else if (productos){
    productos.forEach((producto) => {
      let card = document.createElement("div");
      card.className = "card mt-2 m-auto d-flex justify-content-center border-0 border-bottom rounded-0";
      card.style.maxWidth = "500px";
      card.style.minheight = "15vh";
      card.innerHTML = `
                <div class="row g-0 ">
                    <div class="col-md-4 d-flex">
                    <img src="${producto.imagen}" class="img-fluid rounded-start m-auto" alt="..." style="width: 300px; height: 140px; object-fit: contain">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title text-center">${producto.nombre}</h5>
                        <p class="card-text text-center">Stock: ${producto.stock} - Precio: $${producto.precio}</p>
                        <div class="d-flex justify-content-center">
                            <div role="group" class="btn-group d-flex align-items-center w-50">
                                <button onClick= mostrarProductosEnCarrito();disminuirCantidad("${producto._id}") class="btn btn-outline-dark" > - </button>
                                <button id=${producto._id} class="btn btn-outline-dark text-center disabled" style="width: 30px;"> ${producto.unidades} </button>
                                <button onClick= mostrarProductosEnCarrito();aumentarCantidad("${producto._id}"); class="btn btn-outline-dark"> + </button>
                            </div>
                            <div class=" d-flex mx-4">
                                <button type="button" class="btn btn-outline-dark" onClick= quitarDelCarrito("${producto._id}") > X </button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            `;
      container.appendChild(card);
    });
  }
};

const mostrarDataCarrito = () => {
  let productosDeCarrito = JSON.parse(localStorage.getItem("productosDeCarrito"));
  let containerCarrito = document.getElementById("misProductos");
  pintarCartasDeCarrito(productosDeCarrito, containerCarrito);
};

mostrarDataCarrito();
mostrarProductosEnCarrito();