
/* 1. Bienvenida al terminar de cargar la página */
window.addEventListener("load", function () {
    mostrarModal(
        "¡Bienvenido!",
        "Bienvenido a PIXELFORGE Interactive Technologies.",
        "✓"
    );

    actualizarReloj();
    setInterval(actualizarReloj, 1000);
});

/* 2. Reloj en formato de 12 horas */
function actualizarReloj() {
    const ahora = new Date();

    const hora = ahora.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    document.getElementById("reloj").textContent = hora;
}

/* Control de la ventana emergente */
const modal = document.getElementById("ventanaEmergente");
const modalTitulo = document.getElementById("modalTitulo");
const modalTexto = document.getElementById("modalTexto");
const modalIcono = document.getElementById("modalIcono");

function mostrarModal(titulo, texto, icono = "✓") {
    modalTitulo.textContent = titulo;
    modalTexto.textContent = texto;
    modalIcono.textContent = icono;

    modal.classList.add("activo");
}

function cerrarModal() {
    modal.classList.remove("activo");
}

/* Cerrar con el botón Aceptar */
document.getElementById("cerrarModal").addEventListener(
    "click",
    cerrarModal
);

/* Cerrar al hacer clic fuera de la ventana */
modal.addEventListener("click", function (evento) {
    if (evento.target === modal) {
        cerrarModal();
    }
});

/* Cerrar con la tecla Escape */
document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        cerrarModal();
    }
});

/* 3. Detectar selección de un servicio */
const selectorServicio = document.getElementById("servicio");

selectorServicio.addEventListener("change", function () {
    if (this.value !== "") {
        const servicioElegido =
            this.options[this.selectedIndex].text;

        mostrarModal(
            "Servicio seleccionado",
            "Has elegido: " + servicioElegido,
            "i"
        );
    }
});

/* 4. Eventos del mouse para los botones */
const botones = document.querySelectorAll(".btn");

botones.forEach(function (boton) {
    boton.addEventListener("mouseover", function () {
        this.style.backgroundColor = "#007bff";
        this.style.color = "#ffffff";
        this.style.cursor = "pointer";
    });

    boton.addEventListener("mouseleave", function () {
        this.style.backgroundColor = "";
        this.style.color = "";
    });
});

/* 5, 6 y 7. Validar, confirmar y guardar el formulario */
const formulario = document.getElementById("formContacto");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servicio = selectorServicio.value;

    /* Validar que ningún campo esté vacío */
    if (
        nombre === "" ||
        correo === "" ||
        telefono === "" ||
        servicio === ""
    ) {
        mensaje.textContent = "Por favor, completa todos los campos.";
        mensaje.style.color = "#ff6b6b";
        return;
    }

    /* Crear el registro */
    const solicitud = {
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        servicio: servicio,
        fecha: new Date().toLocaleString("es-MX")
    };

    /* Recuperar y guardar las solicitudes */
    let solicitudes = [];

    try {
        const datosGuardados = localStorage.getItem(
            "solicitudesPixelForge"
        );

        solicitudes = datosGuardados
            ? JSON.parse(datosGuardados)
            : [];

        if (!Array.isArray(solicitudes)) {
            throw new Error("Los datos guardados no son una lista.");
        }

        /* Agregar la nueva solicitud */
        solicitudes.push(solicitud);

        /* Guardar en localStorage */
        localStorage.setItem(
            "solicitudesPixelForge",
            JSON.stringify(solicitudes)
        );

        /* 6. Mostrar confirmación personalizada */
        const servicioElegido =
            selectorServicio.options[
                selectorServicio.selectedIndex
            ].text;

        mensaje.textContent = "";

        mostrarModal(
            "¡Solicitud registrada!",
            "Gracias, " + nombre +
            ". Tu solicitud de " + servicioElegido +
            " se guardó correctamente.",
            "✓"
        );

        /* Limpiar el formulario */
        formulario.reset();

    } catch (error) {
        mensaje.textContent =
            "No fue posible guardar la solicitud. Intenta nuevamente.";

        mensaje.style.color = "#ff6b6b";

        console.error("Error al guardar:", error);
    }
});
