$(document).ready(function () {
  // --- Alerta de bienvenida persistente
  const alertaKey = "bienvenidaMostrada";
  if (!localStorage.getItem(alertaKey)) {
    const mensaje = `
    <h5 class="mb-1">🎬 ¡Bienvenido a CinePlus!</h5>
    <p class="mb-0">Explora los estrenos más recientes y disfruta tu experiencia de cine.</p>
  `;
    $("#alerta-bienvenida").html(mensaje).removeClass("d-none");

    // Ocultar automáticamente después de unos segundos
    setTimeout(() => {
      $("#alerta-bienvenida").fadeOut("slow");
    }, 5000);

    // Guardar marca para no volver a mostrar
    localStorage.setItem(alertaKey, "true");
  }

  const JSON_URL = "data/peliculas.json";
  const ESTRENO_DIAS_VIGENCIA = 7;
  const currency = new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  function parseLocalDate(iso) {
    return new Date(iso + "T00:00:00");
  }

  function diffDays(from, to) {
    const MS = 24 * 60 * 60 * 1000;
    const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
    return Math.round((end - start) / MS);
  }

  function calcularPrecioYBadge(peli) {
    const hoy = new Date();
    const estreno = parseLocalDate(peli.estreno);
    const diasDesdeEstreno = diffDays(estreno, hoy);

    let precioMostrar;
    let badge; //(texto, clase)

    if (diasDesdeEstreno < 0) {
      //Aun no se estrena
      precioMostrar = `${currency.format(peli.precios.estreno)} (estreno)`;
      badge = { texto: "Proximamente", clase: "bg-warning text-dark" };
    } else if (diasDesdeEstreno < ESTRENO_DIAS_VIGENCIA) {
      //En venta de estreno
      precioMostrar = currency.format(peli.precios.estreno);
      badge = { texto: "Estreno", clase: "bg-danger" };
    } else {
      //Pasado de estreno
      precioMostrar = `${currency.format(peli.precios.normal)}`;
      badge = { texto: "En cartelera", clase: "bg-success" };
    }

    return { precioMostrar, badge };
  }

  function renderPeliculas(peliculas) {
    if (!Array.isArray(peliculas || peliculas.length === 0)) {
      $("#lista-peliculas").html(`
        <div class="col-12">
          <div class="alert alert-info text-center">No hay peliculas que mostrar.</div>
        </div>
        `);
      return;
    }

    let html = "";
    peliculas.forEach(function (peli) {
      const imgSrc = `img/${peli.imagen}`;
      const generosTxt = Array.isArray(peli.generos)
        ? peli.generos.join(", ")
        : peli.generos || "";
      const { precioMostrar, badge } = calcularPrecioYBadge(peli);

      html += `
  <div class="col-12 col-sm-6 col-lg-4 mb-4 pelicula-item" style="display:none;">
    <div class="card h-100 shadow-sm">
      <div class="position-relative">
        <img loading="lazy" src="${imgSrc}" class="card-img-top" alt="${
        peli.titulo
      }"
             onerror="this.onerror=null;this.src='img/placeholder.jpg';">
        <span class="badge ${
          badge.clase
        } position-absolute top-0 start-0 m-2 px-2 py-1">${badge.texto}</span>
        <span class="badge bg-secondary position-absolute top-0 end-0 m-2 px-2 py-1">
          ${new Date(peli.estreno).toLocaleDateString("es-EC")}
        </span>
      </div>

      <div class="card-body d-flex flex-column">
        <h5 class="card-title mb-1">${peli.titulo}</h5>
        <p class="text-muted mb-2">${generosTxt}</p>
        <p class="card-text small flex-grow-1">${peli.sinopsis}</p>

        <div class="d-flex align-items-center justify-content-between mt-2">
          <span class="fw-bold">Precio: ${precioMostrar}</span>
          <div class="d-flex gap-2">
            <button type="button"
                    class="btn btn-outline-secondary btn-sm btn-trailer"
                    data-trailer="${peli.trailer}"
                    data-title="${peli.titulo}">
              Ver tráiler
            </button>
            <a href="pages/detalle.html?id=${encodeURIComponent(peli.id)}"
               class="btn btn-primary btn-sm">
              Ver más
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    });

    // Inyecta las peliculas (ocultas)
    $("#lista-peliculas").html(html);

    // Aplica animacion secuencial
    $(".pelicula-item").each(function (index) {
      $(this)
        .delay(150 * index)
        .fadeIn(400);
    });
  }

  // Estado cargando
  $("#lista-peliculas").html(`
    <div class="col-12 text-center my-5">
      <div class="spinner-border text-primary" role="status" style="width: 4rem ; height: 4rem";>
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3 mb-0 fw-semibold text-secondary">Cargando películas…, por favor espere</p>
    </div>
  `);

  // Carga AJAX del nuevo JSON
  setTimeout(function () {
    $.getJSON(JSON_URL)
      .done(function (peliculas) {
        renderPeliculas(peliculas);
      })
      .fail(function (xhr, status, error) {
        console.error("Error al cargar las películas:", error);
        $("#lista-peliculas").html(`
        <div class="col-12">
          <div class="alert alert-danger text-center" role="alert">
            No se pudo cargar la lista de películas. Intenta nuevamente más tarde.
          </div>
        </div>
      `);
      });
  }, 5000); //5 segundos de retraso artificial

  // Abrir modal del trailer desde la card
  $("#lista-peliculas").on("click", ".btn-trailer", function () {
    const url = $(this).data("trailer");
    const title = $(this).data("title");

    if (!url) {
      alert("No hay tráiler disponible para esta película.");
      return;
    }

    // Forzar autoplay
    const autoplayUrl = url + (url.includes("?") ? "&" : "?") + "autoplay=1";

    $("#trailerTitle").text(title);
    $("#trailerFrame").attr("src", autoplayUrl);

    const modal = new bootstrap.Modal(document.getElementById("trailerModal"));
    modal.show();
  });

  // Limpiar el iframe al cerrar para detener el video
  $("#trailerModal").on("hidden.bs.modal", function () {
    $("#trailerFrame").attr("src", "");
  });
});
