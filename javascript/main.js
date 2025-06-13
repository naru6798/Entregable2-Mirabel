// Lista de productos
const listaProductos = [
  {
    nombre: "Alimento Premium para Perros",
    precio: 40000,
    imagen: "Entregable2-Mirabel/imgs/alimento-perro.webp",
    texto: "15 kg con ingredientes naturales y balanceados.",
    id: "perros-1"
  },
  {
    nombre: "Juguete mordedor para cachorros",
    precio: 3500,
    imagen: "Entregable2-Mirabel/imgs/mordedor-perro.webp",
    texto: "Hecho de caucho natural, perfecto para cachorros en etapa de dentición.",
    id: "perros-2"
  },
  {
    nombre: "Correa Retráctil para Perros",
    precio: 5000,
    imagen: "Entregable2-Mirabel/imgs/correa.png",
    texto: "Correa de 5 metros, ideal para paseos cómodos.",
    id: "perros-3"
  },
  {
    nombre: "Rascador para Gatos",
    precio: 7300,
    imagen: "Entregable2-Mirabel/imgs/rascador-gato.webp",
    texto: "Ideal para mantener las uñas de tu gato saludables y entretenido.",
    id: "gatos-1"
  },
  {
    nombre: "Alimento Balanceado para Gatos",
    precio: 40000,
    imagen: "Entregable2-Mirabel/imgs/alimento-gato.jpg",
    texto: "Alimento completo para gatos de todas las edades.",
    id: "gatos-2"
  },
  {
    nombre: "Juguete de Plumas para Gatos",
    precio: 3500,
    imagen: "Entregable2-Mirabel/imgs/pluma-gato.jpg",
    texto: "Juguete interactivo para estimular el juego de tu gato.",
    id: "gatos-3"
  },
  {
    nombre: "Rueda para Hámster",
    precio: 4200,
    imagen: "Entregable2-Mirabel/imgs/rueda.webp",
    texto: "Rueda silenciosa para el ejercicio diario de tu roedor.",
    id: "roedores-1"
  },
  {
    nombre: "Jaula Espaciosa para Hámster",
    precio: 17000,
    imagen: "Entregable2-Mirabel/imgs/jaula.jpg",
    texto: "Jaula con múltiples niveles para la diversión de tu hámster.",
    id: "roedores-2"
  },
  {
    nombre: "Alimento Enriquecido para Roedores",
    precio: 4300,
    imagen: "Entregable2-Mirabel/imgs/alimento-roedor.webp",
    texto: "Mezcla de semillas y granos para una dieta equilibrada.",
    id: "roedores-3"
  },
  {
    nombre: "Comida para Peces Tropicales",
    precio: 4500,
    imagen: "Entregable2-Mirabel/imgs/alimento-peces.png",
    texto: "Mezcla nutritiva para peces de agua dulce.",
    id: "peces-1"
  },
  {
    nombre: "Acondicionador de Agua para Acuario",
    precio: 3700,
    imagen: "Entregable2-Mirabel/imgs/acond-agua.jpg",
    texto: "Elimina el cloro y crea un ambiente seguro para tus peces.",
    id: "peces-2"
  },
  {
    nombre: "Adorno de Castillo para Acuario",
    precio: 10500,
    imagen: "Entregable2-Mirabel/imgs/castillo.webp",
    texto: "Añade un toque de fantasía a tu acuario.",
    id: "peces-3"
  }
];

// Elemento del DOM donde se mostrarán los productos
const seccionProductos = document.getElementById("seccion-productos");

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
    carrito.push(producto);
    guardarCarrito();
    alert(`${producto.nombre} agregado al carrito!`);
  }
}

// Función para renderizar productos de una categoría
function renderizarProductos(categoria) {
  return;
}

// Función para renderizar todos los productos
function renderizarTodosLosProductos() {
  seccionProductos.innerHTML = "";
  listaProductos.forEach(producto => {
    seccionProductos.innerHTML += `
      <div class="producto">
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p>${producto.texto}</p>
        <p>Precio: $${producto.precio}</p>
        <button class="btn-comprar" data-id="${producto.id}">Comprar</button>
      </div>
    `;
  });

  // Agregar evento a los botones de comprar
  document.querySelectorAll(".btn-comprar").forEach(boton => {
    boton.addEventListener("click", () => {
      const idProducto = boton.getAttribute("data-id");
      agregarAlCarrito(idProducto);
    });
  });
}

// Función para renderizar los items del carrito en carrito.html
function removerDelCarrito(idProducto) {
  carrito = carrito.filter(producto => {
    console.log("idProducto:", idProducto, "producto.id:", producto.id);
    return String(producto.id) !== String(idProducto);
  });
  guardarCarrito();
  renderizarCarrito();
}

function renderizarCarrito() {
  const carritoItemsContainer = document.getElementById("carrito-items");
  carritoItemsContainer.innerHTML = "";

  carrito.forEach(producto => {
    carritoItemsContainer.innerHTML += `
      <div class="carrito-item">
        <div class="carrito-item-details">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <div><p>${producto.nombre}</p></div>
          <p>Precio: $${producto.precio}</p>
        </div>
        <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
      </div>
    `;
  });

  let total = 0;
  carrito.forEach(producto => {
    total += producto.precio;
  });

  document.querySelector(".carrito-total p").textContent = `Total: $${total}`;

  document.querySelectorAll(".btn-eliminar").forEach(boton => {
    boton.addEventListener("click", () => {
      const idProducto = boton.getAttribute("data-id");
      removerDelCarrito(idProducto);
    });
  });
}

// Cargar carrito al cargar la página
cargarCarrito();


// Detectar si estamos en carrito.html
if (window.location.pathname.includes("carrito.html")) {
  renderizarCarrito();
} else {
  // Renderizar todos los productos al cargar la página
  renderizarTodosLosProductos();
}

// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = "☀️ Modo Claro";
  } else {
    darkModeToggle.textContent = "🌙 Modo Oscuro";
  }
});
