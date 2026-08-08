/* =========================================================
   Carta online
   Lee carta.json y construye la carta. El JSON solo guarda
   NOMBRES de alérgenos; aquí se traducen a icono y etiqueta.
   ========================================================= */

const RUTA_JSON = 'carta.json';

/* ---------------------------------------------------------
   Catálogo de alérgenos (los 14 de declaración obligatoria).
   La clave es lo que se escribe en el JSON.
   --------------------------------------------------------- */
const ALERGENOS = {
  'gluten': {
    etiqueta: 'Cereales con gluten',
    icono: '<path d="M12 21V6"/><path d="M12 12c-2.4 0-4-1.6-4-4 2.4 0 4 1.6 4 4Z"/><path d="M12 12c2.4 0 4-1.6 4-4-2.4 0-4 1.6-4 4Z"/><path d="M12 17c-2.4 0-4-1.6-4-4 2.4 0 4 1.6 4 4Z"/><path d="M12 17c2.4 0 4-1.6 4-4-2.4 0-4 1.6-4 4Z"/><path d="M12 7c-1.6-1.2-1.6-3 0-4 1.6 1 1.6 2.8 0 4Z"/>'
  },
  'crustaceos': {
    etiqueta: 'Crustáceos',
    icono: '<path d="M17 6c-5 0-9 3.4-9 7.5 0 2.6 1.8 4.5 4.2 4.5 2 0 3.3-1.3 3.3-2.9 0-1.4-1-2.4-2.3-2.4"/><path d="M17 6c1.7 0 2.9.9 3.5 2.2"/><path d="M8 13.6 4.2 16M8.7 16.2 5.2 18.8"/><circle cx="16.4" cy="8.7" r=".9" fill="currentColor" stroke="none"/>'
  },
  'huevos': {
    etiqueta: 'Huevos',
    icono: '<path d="M12 3.5c3.3 0 6 4.2 6 8.2 0 4-2.7 7.3-6 7.3s-6-3.3-6-7.3c0-4 2.7-8.2 6-8.2Z"/><circle cx="12" cy="12.4" r="2.6"/>'
  },
  'pescado': {
    etiqueta: 'Pescado',
    icono: '<path d="M4.5 12c2.8-3.8 6-5.6 9.3-5.6 2.6 0 4.6 1 6.2 2.6-1 1.2-1 4.8 0 6-1.6 1.6-3.6 2.6-6.2 2.6-3.3 0-6.5-1.8-9.3-5.6Z"/><path d="M4.5 12 8 9.4M4.5 12 8 14.6"/><circle cx="16.8" cy="10.6" r=".9" fill="currentColor" stroke="none"/>'
  },
  'cacahuetes': {
    etiqueta: 'Cacahuetes',
    icono: '<path d="M12 4.4c2.3 0 4 1.7 4 3.8 0 1.5-.9 2.3-.9 3.8s.9 2.3.9 3.8c0 2.1-1.7 3.8-4 3.8s-4-1.7-4-3.8c0-1.5.9-2.3.9-3.8S8 9.7 8 8.2c0-2.1 1.7-3.8 4-3.8Z"/><circle cx="12" cy="8.3" r=".8" fill="currentColor" stroke="none"/><circle cx="12" cy="15.7" r=".8" fill="currentColor" stroke="none"/>'
  },
  'soja': {
    etiqueta: 'Soja',
    icono: '<path d="M6 17.5c-1.6-1.6-1.6-4.2 0-5.8l6-6c1.6-1.6 4.2-1.6 5.8 0 1.6 1.6 1.6 4.2 0 5.8l-6 6c-1.6 1.6-4.2 1.6-5.8 0Z"/><circle cx="9.4" cy="14.6" r="1.5"/><circle cx="14.6" cy="9.4" r="1.5"/>'
  },
  'lacteos': {
    etiqueta: 'Lácteos',
    icono: '<path d="M8 9.5h8V20H8z"/><path d="M8 9.5 9.9 4h4.2L16 9.5"/><path d="M9.9 4h4.2"/><path d="M8 13.4h8"/>'
  },
  'frutos-secos': {
    etiqueta: 'Frutos de cáscara',
    icono: '<path d="M12 3.8c3.5 0 6.5 3.6 6.5 8 0 4.6-3 8.4-6.5 8.4S5.5 16.4 5.5 11.8c0-4.4 3-8 6.5-8Z"/><path d="M12 20.2V6.6"/><path d="M12 12.6c1.5-1.6 3.1-2.5 4.7-2.7M12 12.6c-1.5-1.6-3.1-2.5-4.7-2.7"/>'
  },
  'apio': {
    etiqueta: 'Apio',
    icono: '<path d="M8.3 21c-.7-4.5-.6-9 .5-13.4M12 21c0-5 .1-10 .6-13.9M15.7 21c.7-4.5.6-9-.5-13.4"/><path d="M8.8 7.6c-1.7-1.2-1.5-3.3.3-4.1.9 1 1.1 2.5.5 3.7M12.6 7.1c-1-1.9.1-3.7 2.1-3.9-.2 1.6-.9 2.9-1.9 3.7M15.2 7.6c1.7-1.2 1.5-3.3-.3-4.1-.9 1-1.1 2.5-.5 3.7"/>'
  },
  'mostaza': {
    etiqueta: 'Mostaza',
    icono: '<path d="M9 21h6a1.5 1.5 0 0 0 1.5-1.5V11a4.5 4.5 0 0 0-3-4.2V4.5h-3v2.3A4.5 4.5 0 0 0 7.5 11v8.5A1.5 1.5 0 0 0 9 21Z"/><path d="M7.5 13.4h9"/>'
  },
  'sesamo': {
    etiqueta: 'Sésamo',
    icono: '<ellipse cx="8.5" cy="9" rx="2" ry="3.1" transform="rotate(-25 8.5 9)"/><ellipse cx="15.6" cy="10.6" rx="2" ry="3.1" transform="rotate(22 15.6 10.6)"/><ellipse cx="11.6" cy="16.4" rx="2" ry="3.1" transform="rotate(-8 11.6 16.4)"/>'
  },
  'sulfitos': {
    etiqueta: 'Sulfitos',
    icono: '<path d="M7.5 3.5h9l-.8 6a3.7 3.7 0 0 1-7.4 0Z"/><path d="M12 15.3V20"/><path d="M8.6 20h6.8"/>'
  },
  'altramuces': {
    etiqueta: 'Altramuces',
    icono: '<circle cx="9" cy="8.8" r="3.2"/><circle cx="15.4" cy="11.6" r="3.2"/><circle cx="10.4" cy="16.2" r="3.2"/>'
  },
  'moluscos': {
    etiqueta: 'Moluscos',
    icono: '<path d="M12 20c-4.4 0-8-3.4-8-7.6C4 8 7.6 4 12 4s8 4 8 8.4c0 4.2-3.6 7.6-8 7.6Z"/><path d="M12 20V4M12 20 7.1 6.7M12 20l4.9-13.3"/>'
  }
};

/* Icono de reserva para un nombre que no esté en el catálogo */
const ICONO_DESCONOCIDO = '<circle cx="12" cy="12" r="8.5"/><path d="M9.8 9.4a2.3 2.3 0 1 1 2.9 2.2c-.5.2-.7.6-.7 1.1v.6"/><circle cx="12" cy="16.4" r=".9" fill="currentColor" stroke="none"/>';

/* Estado en memoria */
const estadoApp = {
  datos: null,
  evitar: new Set()
};

/* ---------- Utilidades ---------- */

const $ = (sel) => document.querySelector(sel);

const euros = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR'
});

function escapar(texto) {
  return String(texto ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function normalizar(nombre) {
  return String(nombre ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // quita tildes
    .replace(/[\s_]+/g, '-');
}

function datosAlergeno(nombre) {
  const clave = normalizar(nombre);
  const ficha = ALERGENOS[clave];
  return {
    clave,
    etiqueta: ficha ? ficha.etiqueta : nombre,
    icono: ficha ? ficha.icono : ICONO_DESCONOCIDO
  };
}

function svg(contenido) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true">${contenido}</svg>`;
}

/* ---------- Carga ---------- */

async function cargarCarta() {
  const estado = $('#estado');
  try {
    // no-store durante la prueba, para ver los cambios al instante.
    // En producción conviene una caché corta en Cloudflare.
    const respuesta = await fetch(RUTA_JSON, { cache: 'no-store' });
    if (!respuesta.ok) throw new Error(`El servidor respondió ${respuesta.status}`);

    estadoApp.datos = await respuesta.json();
    pintarNegocio();
    pintarIndice();
    pintarGrupos();
    pintarLeyenda();
    activarSeguimiento();
  } catch (error) {
    estado.className = 'estado estado--error';
    estado.textContent = `No se ha podido cargar la carta: ${error.message}. Vuelve a intentarlo en unos segundos.`;
  }
}

/* ---------- Pintado ---------- */

function pintarNegocio() {
  const n = estadoApp.datos.negocio ?? {};

  $('[data-campo="nombre"]').textContent = n.nombre ?? 'Nuestra carta';
  $('[data-campo="tipo"]').textContent = n.tipo ?? '';
  $('[data-campo="lema"]').textContent = n.lema ?? '';
  document.title = n.nombre ? `Carta · ${n.nombre}` : 'Carta';

  if (n.actualizado) {
    const fecha = new Date(n.actualizado);
    $('[data-campo="actualizado"]').textContent =
      new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
        .format(fecha);
  }
}

function pintarIndice() {
  $('#indiceLista').innerHTML = estadoApp.datos.grupos
    .map((g) => `
      <li>
        <a class="indice__enlace" href="#${escapar(g.id)}">${escapar(g.nombre)}</a>
      </li>`)
    .join('');
}

function pintarGrupos() {
  const html = estadoApp.datos.grupos.map((grupo) => `
    <section class="grupo" id="${escapar(grupo.id)}">
      <div class="grupo__cabecera">
        <h2 class="grupo__nombre">${escapar(grupo.nombre)}</h2>
        <span class="grupo__regla"></span>
      </div>
      ${grupo.descripcion
        ? `<p class="grupo__descripcion">${escapar(grupo.descripcion)}</p>`
        : ''}
      ${grupo.items.map(pintarItem).join('')}
    </section>
  `).join('');

  $('#carta').innerHTML = html;
}

function pintarItem(item) {
  const alergenos = Array.isArray(item.alergenos) ? item.alergenos : [];
  const fichas = alergenos.map(datosAlergeno);
  const conflicto = fichas.some((f) => estadoApp.evitar.has(f.clave));

  const listaFichas = fichas.length
    ? `<ul class="item__alergenos">
        ${fichas.map((f) => `
          <li class="ficha ${estadoApp.evitar.has(f.clave) ? 'ficha--evitar' : ''}"
              title="${escapar(f.etiqueta)}"
              role="img" aria-label="Contiene ${escapar(f.etiqueta.toLowerCase())}">
            ${svg(f.icono)}
          </li>`).join('')}
      </ul>`
    : `<p class="item__sin-alergenos">Sin alérgenos declarados</p>`;

  const aviso = conflicto
    ? `<p class="item__aviso">Contiene ${
        fichas.filter((f) => estadoApp.evitar.has(f.clave))
              .map((f) => escapar(f.etiqueta.toLowerCase()))
              .join(', ')
      }</p>`
    : '';

  return `
    <article class="item ${conflicto ? 'item--evitar' : ''}">
      <div class="item__linea">
        <h3 class="item__nombre">${escapar(item.nombre)}</h3>
        <span class="item__guia"></span>
        <span class="item__precio">${euros.format(Number(item.precio) || 0)}</span>
      </div>
      ${item.descripcion
        ? `<p class="item__descripcion">${escapar(item.descripcion)}</p>`
        : ''}
      ${listaFichas}
      ${aviso}
    </article>`;
}

function pintarLeyenda() {
  // Solo mostramos los alérgenos que aparecen realmente en la carta
  const presentes = new Set();
  estadoApp.datos.grupos.forEach((g) =>
    g.items.forEach((i) =>
      (i.alergenos ?? []).forEach((a) => presentes.add(normalizar(a)))
    )
  );

  const orden = Object.keys(ALERGENOS).filter((c) => presentes.has(c));
  [...presentes].forEach((c) => { if (!orden.includes(c)) orden.push(c); });

  $('#leyenda').innerHTML = orden.map((clave) => {
    const f = datosAlergeno(clave);
    const activo = estadoApp.evitar.has(clave);
    return `
      <li>
        <button class="alergenos__boton" type="button"
                data-alergeno="${escapar(clave)}"
                aria-pressed="${activo}">
          ${svg(f.icono)}
          <span>${escapar(f.etiqueta)}</span>
        </button>
      </li>`;
  }).join('');
}

/* ---------- Interacción ---------- */

document.addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-alergeno]');
  if (boton) {
    const clave = boton.dataset.alergeno;
    estadoApp.evitar.has(clave)
      ? estadoApp.evitar.delete(clave)
      : estadoApp.evitar.add(clave);

    pintarGrupos();
    pintarLeyenda();
    activarSeguimiento();
    $('#limpiarFiltros').hidden = estadoApp.evitar.size === 0;
  }

  if (evento.target.id === 'limpiarFiltros') {
    estadoApp.evitar.clear();
    pintarGrupos();
    pintarLeyenda();
    activarSeguimiento();
    $('#limpiarFiltros').hidden = true;
  }
});

/* Marca en el índice el grupo que se está viendo */
let observador = null;

function activarSeguimiento() {
  if (observador) observador.disconnect();

  observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      document.querySelectorAll('.indice__enlace').forEach((a) => {
        a.setAttribute('aria-current', a.getAttribute('href') === `#${entrada.target.id}`);
      });
    });
  }, { rootMargin: '-72px 0px -70% 0px' });

  document.querySelectorAll('.grupo').forEach((g) => observador.observe(g));
}

cargarCarta();
