import Anuncio_Auto from "../Anuncio_Auto.js";

//Si existe una lista en el local storage, la cargo, de lo contrario asigno un array vacio
const items = JSON.parse(localStorage.getItem("lista")) || [];
const frmPrincipal = document.getElementById("frmPrincipal");

simularTiempoCarga();

window.addEventListener("DOMContentLoaded", () => {
  botoneraInicial();

  document.addEventListener("click", handlerClick);

  if (items.length > 0) {
    handlerLoadList(items);
  }
});

//Funcion que se ejecuta al hacer click
function handlerClick(e) {
  if (e.target.matches("td")) {
    cargarItemFormulario(e.target.parentNode.dataset.id);
  }

  if (e.target.matches("#btnAgregar")) {
    altaItem();
  }

  if (e.target.matches("#btnModificar")) {
    modificarItem();
  }

  if (e.target.matches("#btnEliminar")) {
    eliminarItem();
  }

  if (e.target.matches("#btnCancelar")) {
    limpiarFormulario(frmPrincipal);
  }
}

function cargarItemFormulario(id) {
  const {
    titulo,
    transaccion,
    descripcion,
    precio,
    puertas,
    kilometros,
    potencia,
  } = items.filter((element) => element.id === parseInt(id))[0];

  frmPrincipal.id.value = id;
  frmPrincipal.txtTitulo.value = titulo;
  frmPrincipal.transaccion.value = transaccion;
  frmPrincipal.txtDescripcion.value = descripcion;
  frmPrincipal.txtPrecio.value = precio;
  frmPrincipal.txtPuertas.value = puertas;
  frmPrincipal.txtKilometros.value = kilometros;
  frmPrincipal.txtPotencia.value = potencia;

  botoneraABM();
}

function altaItem() {
  let error = 0;

  let _titulo = frmPrincipal.txtTitulo.value;
  let _transaccion = frmPrincipal.transaccion.value;
  let _descripcion = frmPrincipal.txtDescripcion.value;
  let _precio = frmPrincipal.txtPrecio.value;
  let _cantPuertas = frmPrincipal.txtPuertas.value;
  let _cantKilometros = frmPrincipal.txtKilometros.value;
  let _cantPotencia = frmPrincipal.txtPotencia.value;

  _precio = parseFloat(_precio) || null;
  _cantPuertas = parseInt(_cantPuertas) || null;
  _cantKilometros = parseInt(_cantKilometros) || null;
  _cantPotencia = parseInt(_cantPotencia) || null;

  if (_titulo == null || _titulo == "") {
    error = 1;
  }
  if (_transaccion == null || _transaccion == "") {
    error = 1;
  }
  if (_descripcion == null || _descripcion == "") {
    error = 1;
  }
  if (_precio == null || _precio == "") {
    error = 1;
  }
  if (_cantPuertas == null || _cantPuertas == "") {
    error = 1;
  }
  if (_cantKilometros == null || _cantKilometros == "") {
    error = 1;
  }
  if (_cantPotencia == null || _cantPotencia == "") {
    error = 1;
  }

  if (error === 1) {
    alert("Uno o más datos están incompletos o son inválidos");
    return false;
  }

  simularTiempoCarga();

  const nuevoItem = new Anuncio_Auto(
    obtenerNuevoId(),
    _titulo,
    _transaccion,
    _descripcion,
    _precio,
    _cantPuertas,
    _cantKilometros,
    _cantPotencia
  );

  items.push(nuevoItem);
  almacenarDatos(items);
  limpiarFormulario(frmPrincipal);
}

function modificarItem() {
  let error = 0;

  let _titulo = frmPrincipal.txtTitulo.value;
  let _transaccion = frmPrincipal.transaccion.value;
  let _descripcion = frmPrincipal.txtDescripcion.value;
  let _precio = frmPrincipal.txtPrecio.value;
  let _cantPuertas = frmPrincipal.txtPuertas.value;
  let _cantKilometros = frmPrincipal.txtKilometros.value;
  let _cantPotencia = frmPrincipal.txtPotencia.value;

  _precio = parseFloat(_precio) || null;
  _cantPuertas = parseInt(_cantPuertas) || null;
  _cantKilometros = parseInt(_cantKilometros) || null;
  _cantPotencia = parseInt(_cantPotencia) || null;

  if (_titulo == null || _titulo == "") {
    error = 1;
  }
  if (_transaccion == null || _transaccion == "") {
    error = 1;
  }
  if (_descripcion == null || _descripcion == "") {
    error = 1;
  }
  if (_precio == null || _precio == "") {
    error = 1;
  }
  if (_cantPuertas == null || _cantPuertas == "") {
    error = 1;
  }
  if (_cantKilometros == null || _cantKilometros == "") {
    error = 1;
  }
  if (_cantPotencia == null || _cantPotencia == "") {
    error = 1;
  }

  if (error === 1) {
    alert("Uno o más datos están incompletos o son inválidos");
    return false;
  }

  simularTiempoCarga();

  const itemModificado = new Anuncio_Auto(
    parseInt(frmPrincipal.id.value),
    _titulo,
    _transaccion,
    _descripcion,
    _precio,
    _cantPuertas,
    _cantKilometros,
    _cantPotencia
  );

  if (confirm("¿Seguro que desea realizar la modificación?")) {
    let index = items.findIndex((i) => {
      return i.id === parseInt(frmPrincipal.id.value);
    });

    items.splice(index, 1, itemModificado);
    almacenarDatos(items);
    limpiarFormulario(frmPrincipal);
  }
}

function eliminarItem() {
  if (confirm("¿Seguro que desea eliminar? Esta acción no se puede deshacer")) {
    simularTiempoCarga();

    let index = items.findIndex((i) => {
      return i.id === parseInt(frmPrincipal.id.value);
    });
    items.splice(index, 1);
    almacenarDatos(items);
    limpiarFormulario(frmPrincipal);
  }
}

function obtenerNuevoId() {
  let id = 1;

  if (items.length != 0) {
    const lastItem = items[items.length - 1];
    id = parseInt(lastItem.id + 1);
  }

  return id;
}

//Cargo datos en localStorage
function almacenarDatos(data) {
  localStorage.setItem("lista", JSON.stringify(data));
  handlerLoadList(items);
}

//Cargo una lista donde haga falta
function handlerLoadList(e) {
  renderizarTabla(crearTabla(e), document.getElementById("dynamicTable"));
  renderizarMain(crearMain(e), document.getElementById("dynamicArticles"));
}

//Cargar un articulo en un contenedor
function renderizarMain(main, contenedor) {
  vaciarContenedor(contenedor);

  if (main) {
    contenedor.appendChild(main);
  }
}

//Crear main articulos dinamicamente
function crearMain(items) {
  const main = document.createElement("main");

  items.forEach((vehicle) => {
    main.appendChild(crearArticulo(vehicle));
  });

  return main;
}

//Creo un artículo dinamicamente
function crearArticulo(vehicle) {
  const article = document.createElement("article");
  const aHeader = document.createElement("h3");
  const pDesc = document.createElement("p");
  const pPrecio = document.createElement("p");
  const divCaracteristicas = document.createElement("div");

  aHeader.textContent = vehicle._titulo;  
  pDesc.textContent = vehicle._descripcion;  
  pPrecio.textContent = vehicle._precio;
  
  article.classList("elementArticle");
  divCaracteristicas.classList("caracteristicas-auto");  

  article.appendChild(aHeader);
  article.appendChild(pDesc);
  article.appendChild(pPrecio);
  article.appendChild(divCaracteristicas);

  return article;
}

//Cargar una tabla en un contenedor
function renderizarTabla(table, contenedor) {
  vaciarContenedor(contenedor);

  if (table) {
    contenedor.appendChild(table);
  }
}

//Creo una tabla dinamicamente
function crearTabla(items) {
  const table = document.createElement("table");

  table.appendChild(crearThead(items[0]));
  table.appendChild(crearTbody(items));

  return table;
}

//Creo el encabezado de la tabla dinamicamente
function crearThead(item) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  for (const key in item) {
    if (key !== "id") {
      const th = document.createElement("th");
      th.textContent = key;
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);
  return thead;
}

//Creo el cuerpo de la tabla dinamicamente
function crearTbody(items) {
  const tbody = document.createElement("tbody");

  items.forEach((element) => {
    const tr = document.createElement("tr");

    for (const key in element) {
      if (key === "id") {
        tr.setAttribute("data-id", element[key]); //standard a partir de ecmascript 6
      } else {
        const td = document.createElement("td");
        //td.addEventListener("click", handlerClickTD);
        td.textContent = element[key];
        tr.appendChild(td);
      }
    }

    tbody.appendChild(tr);
  });

  return tbody;
}

//Vaciar un contenedor
function vaciarContenedor(contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

function botoneraInicial() {
  document.getElementById("btnModificar").classList.add("hidden");
  document.getElementById("btnEliminar").classList.add("hidden");
  document.getElementById("btnAgregar").classList.remove("hidden");

  document.getElementById("btnCancelar").textContent = "Limpiar Formulario";
}

function botoneraABM() {
  document.getElementById("btnModificar").classList.remove("hidden");
  document.getElementById("btnEliminar").classList.remove("hidden");
  document.getElementById("btnAgregar").classList.add("hidden");

  document.getElementById("btnCancelar").textContent = "Cancelar";
}

function limpiarFormulario(frm) {
  frm.reset();
  botoneraInicial();
}

//Simula la carga de información durante 3seg
function simularTiempoCarga() {
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./assets/spinner.gif");
  spinner.setAttribute("alt", "spinnerImage");

  document.getElementById("spinner-container").appendChild(spinner);
  document.getElementById("form-container").classList.add("hidden");

  setTimeout(() => {
    document.getElementById("spinner-container").removeChild(spinner);
    document.getElementById("form-container").classList.remove("hidden");
  }, 3000);
}
