$(document).ready(function () {
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
    peliculas.forEach(function(peli){
      const imgSrc = `img/${peli.imagen}`;
      const generosTxt = Array.isArray(peli.generos) ? peli.generos.join(", ") : (peli.generos || "");
      const {precioMostrar, badge} = calcularPrecioYBadge(peli);

      html += `
        <div class="col-12 col-sm-6 col-lg-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="position-relative">
              <img src="${imgSrc}" class="card-img-top" alt="${peli.titulo}">
              <span class="badge ${badge.clase} position-absolute top-0 start-0 m-2 px-2 py-1">${badge.texto}</span>
              <span class="badge bg-secondary position-absolute top-0 end-0 m-2 px-2 py-1">${new Date(peli.estreno).toLocaleDateString("es-EC")}</span>
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title mb-1">${peli.titulo}</h5>
              <p class="text-muted mb-2">${generosTxt}</p>
              <p class="card-text small flex-grow-1">${peli.sinopsis}</p>
              <div class="d-flex align-items-center justify-content-between mt-2">
                <span class="fw-bold">Precio: ${precioMostrar}</span>
                <a href="pages/detalle.html?id=${encodeURIComponent(peli.id)}" class="btn btn-primary btn-sm">Ver más</a>
              </div>
            </div>
          </div>
        </div>`;
    });

    $("#lista-peliculas").html(html);    
  }

  // Estado cargando
  $("#lista-peliculas").html(`
    <div class="col-12 text-center my-4">
      <div class="spinner-border" role="status" aria-hidden="true"></div>
      <p class="mt-2 mb-0">Cargando películas…</p>
    </div>
  `);

  // Carga AJAX del nuevo JSON
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
});
