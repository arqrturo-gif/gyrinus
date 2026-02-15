let puntaje = 0;
let tiempoRestante = 180;
let objetoActual = null;
let intervalo = null;
let juegoIniciado = false;

const objetosData = [
  { src: "img/7up.jpg", categoria: "reciclable" },
  { src: "img/btl.png", categoria: "reciclable" },
  { src: "img/cp.png", categoria: "organico" },
  { src: "img/jeringa.png", categoria: "no-aprovechable" }
];

const contenedor = document.getElementById("objetos");
const canecas = document.querySelectorAll(".caneca");
const puntajeEl = document.getElementById("puntaje");
const tiempoEl = document.getElementById("tiempo");
const modal = document.getElementById("modalFinal");
const resultadoFinal = document.getElementById("resultadoFinal");

function crearObjeto(data) {
  const img = document.createElement("img");
  img.src = data.src;
  img.className = "objeto";
  img.draggable = true;
  img.dataset.categoria = data.categoria;

  img.addEventListener("dragstart", e => {
    e.dataTransfer.setData("categoria", img.dataset.categoria);

    if (!juegoIniciado) {
      iniciarTiempo();
      juegoIniciado = true;
    }
  });

  return img;
}

function cargarObjeto() {
  contenedor.innerHTML = "";
  const random = Math.floor(Math.random() * objetosData.length);
  objetoActual = crearObjeto(objetosData[random]);
  contenedor.appendChild(objetoActual);
}

canecas.forEach(caneca => {

  caneca.addEventListener("dragover", e => e.preventDefault());

  caneca.addEventListener("drop", e => {
    e.preventDefault();
    if (!objetoActual || tiempoRestante <= 0) return;

    const categoriaObjeto = e.dataTransfer.getData("categoria");
    const categoriaCaneca = caneca.dataset.categoria;

    if (categoriaObjeto === categoriaCaneca) {
      puntaje += 8;
      cargarObjeto();
    } else {
      puntaje -= 8;
    }

    puntajeEl.textContent = puntaje;
  });

});

function iniciarTiempo() {
  intervalo = setInterval(() => {

    tiempoRestante--;

    const min = String(Math.floor(tiempoRestante / 60)).padStart(2, "0");
    const seg = String(tiempoRestante % 60).padStart(2, "0");
    tiempoEl.textContent = `⏱ ${min}:${seg}`;

    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      finalizarJuego();
    }

  }, 1000);
}

function finalizarJuego() {
  contenedor.innerHTML = "";
  resultadoFinal.textContent = `Puntaje final: ${puntaje}`;
  modal.classList.remove("oculto");
}

function reiniciarJuego() {
  puntaje = 0;
  tiempoRestante = 180;
  juegoIniciado = false;
  puntajeEl.textContent = puntaje;
  tiempoEl.textContent = "⏱ 03:00";
  modal.classList.add("oculto");
  cargarObjeto();
}

puntajeEl.textContent = 0;
tiempoEl.textContent = "⏱ 03:00";
cargarObjeto();
