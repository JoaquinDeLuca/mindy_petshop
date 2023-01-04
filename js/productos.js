
const filtrarProductos = (productos, container, tipoProducto) => {
    let valorSelect = document.getElementById("selectInput");
    valorSelect.addEventListener("change", () => {

        if (valorSelect.value === "0"){
            pintarCartasDeProductos(productos, container, tipoProducto);
        }

        else if (valorSelect.value === "1") {
            productos.sort((a, b) => a.precio - b.precio);
            pintarCartasDeProductos(productos, container, tipoProducto);

        } else if (valorSelect.value === "2") {
            productos.sort((a, b) => b.precio - a.precio);
            pintarCartasDeProductos(productos, container, tipoProducto);

        } else if (valorSelect.value === "3") {
            productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
            pintarCartasDeProductos(productos, container, tipoProducto);

        } else if (valorSelect.value === "4") {
            productos.sort((b, a) => a.nombre.localeCompare(b.nombre));
            pintarCartasDeProductos(productos, container, tipoProducto);

        } else if (valorSelect.value === "5") {
            productos.sort((a, b) => a.stock - b.stock);
            pintarCartasDeProductos(productos, container, tipoProducto);

        } else if (valorSelect.value === "6") {
            productos.sort((a, b) => b.stock - a.stock);
            pintarCartasDeProductos(productos, container, tipoProducto);
        }
    })
}

const mostrarProductoAgregado = (tipoProducto) => {

    let carrito = JSON.parse(localStorage.getItem('productosDeCarrito'));
    let nuevoCarrito = [];

    if(tipoProducto === "Juguete"){
        nuevoCarrito = carrito.filter(producto => producto.tipo === tipoProducto);
        nuevoCarrito.forEach(producto => {
            const contenedor = document.getElementById(producto._id+"i");
            contenedor.style.display = "inline-block";
        })
    }

    else if(tipoProducto === "Medicamento"){
        nuevoCarrito = carrito.filter(producto => producto.tipo === tipoProducto);
        nuevoCarrito.forEach(producto => {
            const contenedor = document.getElementById(producto._id+"i");
            contenedor.style.display = "inline-block";
        })
    }
}

/* RECIBO TODAS LAS PROPIEDADES DE PRODUCTOS PARA GUARDAR MI PRODUCTO EN LOCAL STORAGE */
const agregarAlCarrito = (productoId, productoNombre, productoDescripcion, productoImagen, productoPrecio, productoStock, productoTipo, productoV) => {

    /* ESTO AGREGA EL ICONO DE CARRITO AL PRODUCTO QUE SE ENCUENTRE EN EL CARRITO */
    const contenedor = document.getElementById(productoId+"i");
    contenedor.style.display = "inline-block";

    let carrito = [];
    let producto = {
        _id: productoId,
        nombre: productoNombre,
        descripcion: productoDescripcion,
        imagen: productoImagen,
        precio: productoPrecio,
        stock: productoStock,
        tipo: productoTipo,
        __v: productoV,
        unidades: 1 /* AGREGO ESTA PROPIEDAD PARA FACILITAR LA LOGICA DEL CARRITO */
    };

    /* SI NO HAY NADA EN EL CARRITO DE LOCAL STORAGE ENTONCES LE AGREGAMOS UN PRODUCTO */
    if (!window.localStorage.getItem('productosDeCarrito')) {
        carrito = [producto];

    } else {
        /* Si hay algo en el carrito entonces verificamos que no se repita */

        /* RECUPERA LO QUE TENGAMOS EN EL LOCAL STORAGE */
        carrito = JSON.parse(localStorage.getItem('productosDeCarrito'));

        /* BUSCA SI EL PRODUCTO QUE FUE CLICKEADO SE ENCUENTRA EN EL CARRITO RECUPERADO DE LOCAL STORAGE */
        let indiceProducto = carrito.find((productoCar => productoId === productoCar._id));

        /* SI NO ENCONTRO EL ELEMENTO ENTONCES LO AGREGA AL ARRAY */
        if (!indiceProducto) {
            let nuevoCarrito = JSON.parse(localStorage.getItem('productosDeCarrito'));
            carrito = [...nuevoCarrito, producto];
        }
        /* CASO CONTRARIO NO AGREGO NADA AL CARRITO PORQUE SE REPETIRIA EL PRODUCTO EXISTENTE */
    }

    /* GUARDAMOS EL CARRITO EN EL LOCAL STORAGE */
    window.localStorage.setItem('productosDeCarrito', JSON.stringify(carrito));
}

const pintarCartasDeProductos = (productos, container, tipoProducto) => {
    
    const ultimasUnidades = "<span class='text-dark fw-bold' style='color: rgb(255, 107, 62) !important' >Ultimas Unidades!</span>";
    container.innerHTML = "";

    productos.forEach(producto => {
        let card = document.createElement('div');
        card.className = 'card shadow';
        card.style.width = '18rem';
        card.style.minWidth = '300px';
        card.innerHTML = `
        <img src="${producto.imagen}" style="height: 30vh; border-bottom: 1px solid rgba(0,0,0,0.08);" class="card-img-top" alt="producto">
        <div class="card-body" style="height: 10vh;">
            <h5 class="card-title">${producto.nombre}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between">Precio: $${producto.precio} <span id="${producto._id}i" style="display: none;"><img style="height: 20px;" src="./assets/img/carrito.png"></span></li>
            <li class="list-group-item d-flex justify-content-between">Stock: ${producto.stock} ${producto.stock < 3 ? ultimasUnidades : ""}</li>
        </ul>
        <div class="card-body d-flex justify-content-around">
            <button onclick="agregarAlCarrito('${producto._id}','${producto.nombre}','${producto.descripcion}','${producto.imagen}','${producto.precio}','${producto.stock}','${producto.tipo}','${producto.__v}')" class="btn btn-outline-dark card-link"> Agregar al Carrito </button>
            <a href="./carrito.html" class="btn btn-outline-dark card-link"> Comprar </a>
        </div>
        `;
        container.appendChild(card);
    })
    
    mostrarProductoAgregado(tipoProducto);
}

const obtenerProductosCorrespondientes = (datosProductos, tipoProducto) => {
    return datosProductos.filter(producto => producto.tipo == tipoProducto);
}

const generadorFiltroSelect = () => {
    let contenedorFiltros = document.getElementById("contenedorFiltros");
    contenedorFiltros.innerHTML = `
    <div class="d-flex justify-content-end container formSelect">
        <label for="lang " class="form-text col-md-1 col-12">Ordenar de: </label>
        <form action="#" class=" col-md-4 col-12 ">
        <select name="Precios" class="form-control form-control-sm "  id="selectInput" >
            <option value="0"> - </option>
            <option value="1">Precio: Menor a Mayor</option>
            <option value="2">Precio Mayor a Menor</option>
            <option value="3">Nombre: A - Z</option>
            <option value="4">Nombre: Z - A</option>
            <option value="5">Stock: Menor a Mayor</option>
            <option value="6">Stock: Mayor a Menor</option>
        </select>
        </form>
    </div>
    `;
}

const mostrarProductosCorrespondientes = (dataApi) => {

    let tituloPagina = document.querySelector('h1');
    const container = document.getElementById('productsContainer');

    if (tituloPagina.textContent == 'JUGUETES') {

        generadorFiltroSelect();
        let productos = obtenerProductosCorrespondientes(dataApi, "Juguete");
        pintarCartasDeProductos(productos, container, "Juguete");
        filtrarProductos(productos, container, "Juguete");

    } else if (tituloPagina.textContent == 'REMEDIOS') {

        generadorFiltroSelect();
        let productos = obtenerProductosCorrespondientes(dataApi, "Medicamento");
        pintarCartasDeProductos(productos, container, "Medicamento");
        filtrarProductos(productos, container, "Medicamento");
    }
}


let productos = [
    {
        descripcion: "Juguete Dental Mordillo Con Soga Perros Cachorros Trixie",
        imagen:"https://i.postimg.cc/g0KdsKPN/Juguete-Dentale.jpg",
        nombre: "Juguete Dental Mordillo Con Soga",
        precio:"250",
        stock: "5",
        tipo: "Juguete",
        unidades: 2,
        _v:"0",
        _id: "1"
    },
    {
        descripcion: "Antiparasitario interno en suspensión oral.",
        imagen: "https://i.postimg.cc/mgXW1nLN/Antipulgas-Simparica-de-2-5-a-5-Kg-Para-Perro.png",
        nombre: "Antipulgas Simparica de 2.5 a 5gr Para Perro",
        precio: "800",
        stock: "2",
        tipo: "Medicamento",
        unidades: 1,
        __v: "0",
        _id: "2"
    },
    {
        descripcion: "Enjuague Bucal",
        imagen: "https://i.postimg.cc/3NJZGtJm/Enjuague-Bucal-Kanu-En-Espuma-Menta-Para-Perro.webp",
        nombre: "Enjuague Bucal Kanu, menta Para Perro",
        precio: "500",
        stock: "20",
        tipo: "Medicamento",
        unidades: 1,
        __v: "0",
        _id: "3"
    },
    {
        descripcion: "gato",
        imagen: "https://i.postimg.cc/XqpC3mYH/gato.webp",
        nombre: "Antipulgas Advantage 4 a 8 gr para Gato",
        precio: "990",
        stock: "10",
        tipo: "Medicamento",
        unidades: 1,
        __v: "0",
        _id: "4"
    },
    {
        descripcion: "perro",
        imagen: "https://i.postimg.cc/cLMcLKSV/perro.png",
        nombre: "Bionupet Articulaciones 30 Tab Para Perro",
        precio: "850",
        stock: "12",
        tipo: "Medicamento",
        unidades: 1,
        __v: "0",
        _id: "5"
    },
    {
        descripcion: "Solo para gato",
        imagen: "https://i.postimg.cc/VNh0f1dx/gato2.webp",
        nombre: "Broadline 25 a 75 gr Para Gato",
        precio: "400",
        stock: "2",
        tipo: "Medicamento",
        unidades: 1,
        __v: "0",
        _id: "6"
    },
    {
        descripcion: "perrooo",
        imagen: "https://i.postimg.cc/hvsSGb2X/perro2.png",
        nombre: "Endog 1000 MG Para Perro",
        precio: "1000",
        stock: "8",
        tipo: "Medicamento",
        unidades: 1,
        __v: "0",
        _id: "7"
    },
    {
        descripcion: "Pelota",
        imagen: "https://i.postimg.cc/T1Yzt8cP/pelota.webp",
        nombre: "Juguete Pelota Basket Perros,Cachorros",
        precio: "1000",
        stock: "16",
        tipo: "Juguete",
        unidades: 1,
        __v: "0",
        _id: "8"
    },
    {
        descripcion: "Juguete Mordillo manija perro Trixie",
        imagen: "https://i.postimg.cc/VNmDqqgf/Juguete-Perro-Trixie.webp",
        nombre: "Juguete Mordillo manija perro Trixie",
        precio: "800",
        stock: "2",
        tipo: "Juguete",
        unidades: 1,
        __v: "0",
        _id: "9"
    },
    {
        descripcion: "Juguete Cuerda De Juego 31 Perros Cachorros Mascotas Trixie",
        imagen: "https://i.postimg.cc/mkCm38vr/Juguete-Cuerda.jpg",
        nombre: "Juguete Cuerda",
        precio: "300",
        stock: "8",
        tipo: "Juguete",
        unidades: 1,
        __v: "0",
        _id: "10"
    },
    {
        descripcion: "Hueso para perro",
        imagen: "https://i.postimg.cc/7YNVxGDj/hueso.jpg",
        nombre: "Hueso 25cm",
        precio: "500",
        stock: "2",
        tipo: "Juguete",
        unidades: 1,
        __v: "0",
        _id: "11"
    },
    {
        descripcion: "Juguete Frisbee 15cm Flexible Disco Perros Cachorros Trixie",
        imagen: "https://i.postimg.cc/wjy7wZWF/Juguete-Frisbee.jpg",
        nombre: "Juguete Frisbee 15cm",
        precio: "1000",
        stock: "26",
        tipo: "Juguete",
        unidades: 1,
        __v: "0",
        _id: "12"
    },
]


const mostrarProductos = () => {
    let dataApi = productos;
    mostrarProductosCorrespondientes(dataApi);
}

mostrarProductos();