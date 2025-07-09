// Elemento del DOM donde se mostrarán los productos
const seccionProductos = document.getElementById("seccion-productos");

const URL = "../db/data.json"; // URL del archivo JSON


function obtenerProductos() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      listaProductos = data; // Guardar los productos en una variable global
      renderizarTodosLosProductos(listaProductos);
    })
}

// Lista de productos
if (document.getElementById("seccion-productos")) {
obtenerProductos();
}

// Carrito de compras
let carrito = [];

// Función para guardar el carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
  }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
  const producto = listaProductos.find(producto => producto.id === idProducto);

  if (producto) {
    const productoEnCarrito = carrito.find(item => item.id === producto.id);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad++; // cambio aquí, más claro y simple
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
    actualizarCantidadCarrito()
    Swal.fire({
    title: "Agregado al carrito con éxito!",
    icon: "success",
    draggable: true,
    showClass: {
      popup: `
        animate__animated
        animate__pulse
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__zoomOut
          `
        },

    });
  }
}

// Función para renderizar todos los productos
function renderizarTodosLosProductos(listaProductos) {
  seccionProductos.innerHTML = ""; // Limpiar la sección antes de renderizar
  listaProductos.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("producto");

    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p>${producto.texto}</p>
      <p>Precio: $${producto.precio}</p>
      <button class="btn-comprar" data-id="${producto.id}">Comprar</button>
      `;
      seccionProductos.appendChild(card);
  });


  document.querySelectorAll(".btn-comprar").forEach(boton => {
    boton.addEventListener("click", () => {
      const idProducto = boton.getAttribute("data-id");
      agregarAlCarrito(idProducto);
    });
  });

}

// Función para remover un producto o unidad del carrito
function removerDelCarrito(idProducto) {
  const producto = carrito.find(producto => producto.id === idProducto);

  if (producto) {
    Swal.fire({
      title: `¿Seguro que quieres eliminar ${producto.cantidad} unidad/es de "${producto.nombre}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6", 
      showClass: {
          popup: `
            animate__animated
            animate__rubberBand
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__zoomOut
          `
        }
    }).then((result) => {
      if (result.isConfirmed) {
        carrito = carrito.filter(item => item.id !== idProducto);
        guardarCarrito();
        actualizarCantidadCarrito();
        renderizarCarrito();

        Swal.fire({
          title: "Eliminado exitosamente!", 
          icon: "success",
          showClass: {
            popup: `
              animate__animated
              animate__zoomIn
            `
          },
            hideClass: {
              popup: `
                animate__animated
                animate__zoomOut
              `
            }
      });
        
      } else if (result.isDenied) {
        Swal.fire({
          title: "Cancelado", 
          icon: "info",
          showClass: {
          popup: `
            animate__animated
            animate__flipInY
          `
        },
          hideClass: {
            popup: `
              animate__animated
              animate__zoomOut
            `
          }
        });
      }
    });

  }
}

// Función para renderizar el carrito en carrito.html
function renderizarCarrito() {
  const carritoItemsContainer = document.getElementById("carrito-items");
  if (!carritoItemsContainer) return; // evitar error si no existe el contenedor

  carritoItemsContainer.innerHTML = "";

  carrito.forEach(producto => {
    carritoItemsContainer.innerHTML += `
      <div class="carrito-item">
        <div class="carrito-item-details">
          <img src="../${producto.imagen}" alt="${producto.nombre}">
          <div>
            <p>${producto.nombre}</p>
            <br>
            <p>Cantidad: ${producto.cantidad}</p>
            <button class="btn-decrementar" data-id="${producto.id}">-</button>
            <button class="btn-incrementar" data-id="${producto.id}">+</button>
            <br>
            <br>
            <p>Subtotal: $${producto.precio * producto.cantidad}</p>
          </div>
          <br>
        </div>
        <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
      </div>
    `;
  });

    // Eventos para incrementar cantidad
  document.querySelectorAll(".btn-incrementar").forEach(boton => {
    boton.addEventListener("click", () => {
      const idProducto = boton.getAttribute("data-id");
      const producto = carrito.find(producto => producto.id === idProducto);
      if (producto) {
        producto.cantidad++;
        guardarCarrito();
        actualizarCantidadCarrito();
        renderizarCarrito();
      }
    });
  });

    // Eventos para decrementar cantidad
  document.querySelectorAll(".btn-decrementar").forEach(boton => {
    boton.addEventListener("click", () => {
      const idProducto = boton.getAttribute("data-id");
      const producto = carrito.find(producto => producto.id === idProducto);
      if (producto) {
        producto.cantidad--;
        if (producto.cantidad === 0) {
          carrito = carrito.filter(producto => producto.id !== idProducto);
        }
        guardarCarrito();
        actualizarCantidadCarrito();
        renderizarCarrito();
      }
    });
  });

    // Calcular total usando reduce
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  // Actualizar el texto del total
  const totalElemento = document.querySelector(".carrito-total");
  if (totalElemento) {
    totalElemento.textContent = `Total: $${total}`;
  }

  // Evento para eliminar producto completo del carrito
  document.querySelectorAll(".btn-eliminar").forEach(boton => {
    boton.addEventListener("click", () => {
      const idProducto = boton.getAttribute("data-id");
      removerDelCarrito(idProducto);
    });
  });
}


// Cargar carrito al cargar la página
cargarCarrito();
actualizarCantidadCarrito();
renderizarCarrito();


console.log("Contenido del carrito:", carrito);

// Actualiza la cantidad total visible en el botón carrito
function actualizarCantidadCarrito() {
  const carritoCantidadSpan = document.getElementById('carrito-cantidad');
  if (!carritoCantidadSpan) return;

  // suma la cantidad de todos los productos
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  carritoCantidadSpan.textContent = `(${totalCantidad})`;
}

