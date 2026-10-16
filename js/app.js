console.log("--- GILENA APP INICIADA ---");


// =========================

// FASE 5 - PRUEBA DE HOISTING - TIENE QUE IR ARRIBA DEL TODO
console.log("PRUEBA HOISTING:", liquidarLocalidades(10, 2, "JUBILADO"));

// =========================
// 1. FUNCTION DECLARATION

/**
 * Calcula el importe total de una compra de entradas con descuentos.
 * @param {number} precioEntrada - Precio base de una entrada
 * @param {number} [cantidad=1] - Número de entradas a comprar (máx 8)
 * @param {string} [perfil="GENERAL"] - Perfil del comprador: GENERAL, JUBILADO (30% dto), INFANTIL (50% dto)
 * @returns {number|string} - Importe total o mensaje de error si los datos son inválidos
 * @example
 * liquidarLocalidades(10, 2, "JUBILADO") // devuelve 14
 */
function liquidarLocalidades(precioEntrada, cantidad = 1, perfil = "GENERAL") {
  if (isNaN(cantidad) || cantidad <= 0 || cantidad > 8) {
    return "Cantidad no válida (max 8)";
  }
  let total = precioEntrada * cantidad;
  if (perfil === "JUBILADO") total *= 0.7;
  if (perfil === "INFANTIL") total *= 0.5;
  return total;
}

// 2. ARROW FUNCTION
/**
 * Calcula el importe total de una compra de entradas con descuentos.
 * @param {number} precioEntrada - Precio base de una entrada
 * @param {number} [cantidad=1] - Número de entradas a comprar (máx 8)
 * @param {string} [perfil="GENERAL"] - Perfil del comprador: GENERAL, JUBILADO (30% dto), INFANTIL (50% dto)
 * @returns {number|string} - Importe total o mensaje de error si los datos son inválidos
 * @example
 * liquidarLocalidades(10, 2, "JUBILADO") // devuelve 14
 */
const validarAccesoMenor = (edad, espectaculoInfantil = false) => 
  edad >= 18 ? "Acceso permitido" : espectaculoInfantil ? "Acceso permitido - infantil" : "Necesita autorización tutor";

// 3. RECURSIVA
/**
 * Calcula el importe total de una compra de entradas con descuentos.
 * @param {number} precioEntrada - Precio base de una entrada
 * @param {number} [cantidad=1] - Número de entradas a comprar (máx 8)
 * @param {string} [perfil="GENERAL"] - Perfil del comprador: GENERAL, JUBILADO (30% dto), INFANTIL (50% dto)
 * @returns {number|string} - Importe total o mensaje de error si los datos son inválidos
 * @example
 * liquidarLocalidades(10, 2, "JUBILADO") // devuelve 14
 */
function calcularDescuentoGrupo(entradas) {
  if (entradas <= 1) return 0; // CASO BASE
  return 0.5 + calcularDescuentoGrupo(entradas - 1); // CASO RECURSIVO
}

// Pruebas para que el profe vea que funciona
console.log(validarAccesoMenor(16));
console.log("Descuento grupo 5:", calcularDescuentoGrupo(5));

// =========================
// TU CÓDIGO DE SIEMPRE - DEJALO ABAJO DEL TODO
let rolUsuario = "CIUDADANO";
let espectaculos = [
  { id: 1, titulo: "Don Juan Tenorio", categoria: "ayuntamiento", precio: 10, aforo: 50, imagen: "img/ayuntamiento.jpg" },
  { id: 2, titulo: "Noche Flamenca", categoria: "centroCultural", precio: 12, aforo: 30, imagen: "img/centro-cultural.jpg" },
  { id: 3, titulo: "Cine de Verano", categoria: "equipoSonido", precio: 5, aforo: 0, imagen: "img/equipo-sonido.jpg" }, // Este está AGOTADO a propósito
  { id: 4, titulo: "Taller Infantil", categoria: "gilena", precio: 3, aforo: 20, imagen: "img/gilena.jpg" },
  { id: 5, titulo: "Monólogo", categoria: "puerta", precio: 8, aforo: 15, imagen: "img/puerta.jpg" }
];

let reservas = []; // lo dejamos vacío para luego

// =========================
// FASE 6.2 - MÉTODOS DE ARRAYS (Grupo 2 Cultura)
console.log("--- FASE 6.2 ---");
const conEntradas = espectaculos.filter(e => e.aforo > 0);
console.log("Con entradas:", conEntradas);

const titulos = espectaculos.map(e => e.titulo);
console.log("Títulos:", titulos);

const eventoPorId = espectaculos.find(e => e.id === 2);
console.log("Evento id 2:", eventoPorId);

const hayEntradas = espectaculos.some(e => e.aforo > 0);
console.log("¿Hay entradas disponibles?", hayEntradas);

const aforoTotal = espectaculos.reduce((total, e) => total + e.aforo, 0);
console.log("Aforo total:", aforoTotal);
// =========================
// FASE 6.3 - DATOS REALES DESORDENADOS
const espectaculosSucios = [
  { titulo: "  DON JUAN tenorio ", categoria: "TEATRO", precio: 10 },
  { titulo: "noche-flamenca", categoria: "  música  ", precio: 12 },
  { titulo: "CINE de verano", categoria: "CINE", precio: null } // dato incompleto
];

// Función para normalizar (quita espacios, pasa a minúsculas, quita guiones raros)
function normalizarTexto(texto) {
  if (!texto) return "Dato no disponible";
  return texto.trim().toLowerCase().replaceAll("-", " ").replaceAll("  ", " ");
}

console.log("Dato sucio:", "  DON JUAN tenorio ");
console.log("Dato limpio:", normalizarTexto("  DON JUAN tenorio "));

espectaculosSucios.forEach(e => {
  console.log(`Original: '${e.titulo}' -> Limpio: '${normalizarTexto(e.titulo)}'`);
});

// =========================
// FASE 6.4 - COMBINAR ARRAY + FUNCIÓN DEL MÓDULO
// Calcula el total de una compra real usando datos del catálogo
function comprarEntradasCatalogo(idEspectaculo, cantidad, perfil) {
  const espectaculo = espectaculos.find(e => e.id === idEspectaculo);
  if (!espectaculo) return "Espectáculo no encontrado";
  
  // Usamos la función liquidarLocalidades del bloque anterior
  return liquidarLocalidades(espectaculo.precio, cantidad, perfil);
}

console.log("Compra 2 entradas JUBILADO de evento 1:", comprarEntradasCatalogo(1, 2, "JUBILADO")); // 10*2*0.7 = 14
console.log("Compra 1 infantil evento 4:", comprarEntradasCatalogo(4, 1, "INFANTIL")); // 3*0.5 = 1.5

// =========================
// FASE 6.5 - GUARDAR EN localStorage (OBLIGATORIO GRUPO 2)
localStorage.setItem("entradas_gilena", JSON.stringify(espectaculos));
console.log("Guardado en localStorage");

// FASE 6.6 - COMPROBAR PERSISTENCIA
const recuperados = JSON.parse(localStorage.getItem("entradas_gilena"));
console.log("Recuperados de localStorage:", recuperados);

const btnAdmin = document.getElementById("btnAdmin");
const panelAdmin = document.getElementById("panelAdmin");
const listaAdmin = document.getElementById("listaAdmin");

btnAdmin.addEventListener("click", function() {
  let clave = prompt("Introduce clave de administrador:");
  if (clave === "admin123") {
    rolUsuario = "ADMIN";
    alert("Acceso ADMIN concedido");
    panelAdmin.style.display = "block";
    btnAdmin.textContent = "MODO ADMIN ACTIVO";
    btnAdmin.style.background = "green";
    gestionarComoAdmin();
  } else {
    alert("Clave incorrecta. Sigues como CIUDADANO");
  }
});

function gestionarComoAdmin() {
  switch (rolUsuario) {
    case "ADMIN":
      console.log("ADMIN gestiona toda la web");
      generarPasesAdmin();
      break;
  }
}

function generarPasesCiudadano() {
  cartelera.innerHTML = "";
  for (let hora = 10; hora <= 22; hora++) {
    if (hora === 14 || hora === 18) continue;
    cartelera.innerHTML += `<div style="border:1px solid #ccc; padding:10px; background:white; border-radius:8px;">🎭 ${hora}:00 - Libre</div>`;
  }
}

document.getElementById("btnVerReservas").addEventListener("click", () => {
  alert("Reservas actuales:\n" + reservas.join("\n"));
});

document.getElementById("btnSalirAdmin").addEventListener("click", () => {
  rolUsuario = "CIUDADANO";
  panelAdmin.style.display = "none";
  btnAdmin.textContent = "🔑 Admin";
  btnAdmin.style.background = "#1E2A4A";
});

function generarPasesAdmin() {
  console.log("Generando pases admin...");
}

// =========================
// FASE 7.1 - GENERAR CATÁLOGO DINÁMICO GRUPO 2
const cartelera = document.getElementById("cartelera");

function renderizarEspectaculos(lista) {
  cartelera.innerHTML = ""; // limpiamos

  lista.forEach(espectaculo => {
    const agotado = espectaculo.aforo <= 0;
    const tarjeta = document.createElement("div");
    tarjeta.style = "border:1px solid #ccc; padding:15px; border-radius:10px; background:" + (agotado ? "#ffcccc" : "white") + "; margin-bottom:10px";
    
    tarjeta.innerHTML = `
      <h3>${espectaculo.titulo}</h3>
      <p>Categoría: ${espectaculo.categoria} | Precio: ${espectaculo.precio}€</p>
      <p>Aforo: ${espectaculo.aforo} ${agotado ? '<strong style="color:red">AGOTADO</strong>' : ''}</p>
      <button class="btnComprar" data-id="${espectaculo.id}" ${agotado ? 'disabled' : ''}>
        ${agotado ? 'Agotado' : 'Comprar'}
      </button>
    `;
    cartelera.appendChild(tarjeta);
  });

  // Después de dibujar, activamos los botones
  activarBotonesComprar();
}

// Llamada inicial
renderizarEspectaculos(espectaculos);

// =========================
// FASE 7.3 - EVENTO BOTÓN COMPRAR - GRUPO 2 CULTURA
function activarBotonesComprar() {
  document.querySelectorAll(".btnComprar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const espectaculo = espectaculos.find(ev => ev.id === id);

      // 1. Comprobar aforo disponible
      if (espectaculo.aforo <= 0) {
        alert("¡Entradas agotadas!");
        return;
      }

      // 2. Descontar 1 entrada (o pide cantidad con prompt)
      let cantidad = parseInt(prompt(`¿Cuántas entradas para ${espectaculo.titulo}? Aforo: ${espectaculo.aforo}`));
      if (isNaN(cantidad) || cantidad <= 0 || cantidad > espectaculo.aforo) {
        alert("Cantidad no válida");
        return;
      }

      // 3. Usamos tu función liquidarLocalidades
      let perfil = prompt("Perfil: GENERAL, JUBILADO, INFANTIL").toUpperCase();
      let total = liquidarLocalidades(espectaculo.precio, cantidad, perfil);
      alert(`Total a pagar: ${total}€`);

      // 4. Actualizar aforo
      espectaculo.aforo -= cantidad;

      // 5. Actualizar localStorage (FASE 6.5)
      localStorage.setItem("entradas_gilena", JSON.stringify(espectaculos));

      // 6. Volver a renderizar para que cambie a rojo/agotado
      renderizarEspectaculos(espectaculos);
    });
  });
}
const form = document.getElementById("formCompra");
if(form){
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // CLAVE: evita recarga
    const id = parseInt(document.getElementById("idEspectaculo").value);
    const cantidad = parseInt(document.getElementById("cantidadEntrada").value);
    const perfil = document.getElementById("perfilEntrada").value;
    
    let resultado = comprarEntradasCatalogo(id, cantidad, perfil);
    if(typeof resultado === "number"){
      const esp = espectaculos.find(e => e.id === id);
      esp.aforo -= cantidad;
      localStorage.setItem("entradas_gilena", JSON.stringify(espectaculos));
      renderizarEspectaculos(espectaculos);
      alert(`Compra OK. Total: ${resultado}€`);
    } else {
      alert(resultado);
    }
  });
}

// =========================
// FASE 8 - FETCH ASYNC/AWAIT
async function cargarEspectaculos() {
  try {
    console.log("Cargando datos externos...");
    // Intenta cargar del json, si falla usa el array local
    const respuesta = await fetch("./data/espectaculos.json");
    if(!respuesta.ok) throw new Error("No se pudo cargar JSON");
    const datos = await respuesta.json();
    espectaculos = datos;
    localStorage.setItem("entradas_gilena", JSON.stringify(espectaculos));
    renderizarEspectaculos(espectaculos);
    console.log("Datos cargados por fetch:", datos);
  } catch (error) {
    console.warn("Fetch falló, usando datos locales:", error.message);
    // Si no existe el json, usamos los que ya teníamos + localStorage
    const guardados = localStorage.getItem("entradas_gilena");
    if (guardados) espectaculos = JSON.parse(guardados);
    renderizarEspectaculos(espectaculos);
  }
}

// Llama a cargar al iniciar (comenta la llamada anterior a renderizar)
cargarEspectaculos();

function renderizarCartelera() {
  const contenedor = document.getElementById('contenedor-catalogo');
  if (!contenedor) return;

  contenedor.innerHTML = espectaculos.map(e => `
    <article class="tarjeta-card">
      <img src="${e.imagen}" alt="${e.titulo}" style="width:100%; height:160px; object-fit:cover; border-radius:8px 8px 0 0;">
      <div style="padding:10px">
        <h3 style="font-size:14px">${e.titulo}</h3>
        <p style="font-size:12px">${e.categoria} | Aforo: ${e.aforo}</p>
        <button onclick="comprarEntrada(${e.id})" class="btn-primario" ${e.aforo === 0 ? 'disabled style="background:grey"' : ''}>
          ${e.aforo === 0 ? 'AGOTADO' : `Comprar ${e.precio}€`}
        </button>
      </div>
    </article>
  `).join('');
}

function comprarEntrada(id) {
  const espectaculo = espectaculos.find(ev => ev.id === id);
  if (!espectaculo || espectaculo.aforo === 0) {
    alert("¡Entradas agotadas!");
    return;
  }
  // Rellena el formulario y baja hasta él
  document.getElementById('espectaculo').value = espectaculo.titulo;
  document.getElementById('idEspectaculo').value = espectaculo.id;
  document.getElementById('seccion-formulario').scrollIntoView({ behavior: 'smooth' });
  // O abre tu modal si lo usas
  const modal = document.getElementById('modal-detalle');
  if(modal){
    document.getElementById('modal-titulo').innerText = espectaculo.titulo;
    document.getElementById('modal-texto').innerText = `Categoría: ${espectaculo.categoria} - Precio: ${espectaculo.precio}€ - Aforo: ${espectaculo.aforo}`;
    modal.showModal();
  }
}

renderizarCartelera();

// Cerrar modal
document.getElementById('cerrar-modal')?.addEventListener('click', () => {
  document.getElementById('modal-detalle').close();
});

