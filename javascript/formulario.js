// Formulario de compra
document.getElementById("form-compra").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();

  const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const soloNumeros = /^\d+$/;

  if (nombre.length < 3 || !soloLetras.test(nombre)) {
    Swal.fire({
      icon: "error",
      title: "Nombre inválido",
      text: "Debe tener al menos 3 letras y solo contener letras.",
    });
    return;
  }

  if (telefono.length < 8 || telefono.length > 11 || !soloNumeros.test(telefono)) {
    Swal.fire({
      icon: "error",
      title: "Teléfono inválido",
      text: "Debe tener entre 8 y 11 números y contener solo dígitos.",
    });
    return;
  }

  // Si pasa validaciones
  Swal.fire({
    icon: "success",
    title: "¡Compra realizada!",
    text: "Gracias por tu compra.",
    confirmButtonText: "Aceptar",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  }).then(() => {
    localStorage.removeItem("carrito");
    window.location.href = "../index.html";
  });
});


// Total a pagar en el formulario
function mostrarTotalCompra() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const totalPagoSpan = document.getElementById("total-pago");
  if (totalPagoSpan) {
    totalPagoSpan.textContent = `$${total}`;
  }
}

document.addEventListener("DOMContentLoaded", mostrarTotalCompra);

