let puntaje = 0;
let indiceActual = 0;
let objetoActual = null;
let tiempoRestante = 180; // 3 minutos

const objetosData = [
  { src: "img/serv.png", categoria: "no-aprovechable", alt: "servilleta" },
  { src: "img/cp.png", categoria: "organico", alt: "cáscara" },
  { src: "img/btlv.png", categoria: "reciclable", alt: "botella" },
  { src: "img/jeringa.png", categoria: "no-aprovechable", alt: "jeringa" },
  { src: "img/vaso.png", categoria: "reciclable", alt: "vaso" }
];

const contenedorObjetos = document.getElementById("objetos");
const canecas = document.querySelectorAll(".caneca");
const puntajeEl = document.getElementById("puntaje");
const tiempoEl = document.getElementById("tiempo");

/* ---- SONIDOS (opcionales) ---- */
const sonidoOk = new Audio("audio/ok.mp3");
const sonidoError = new Audio("audio/error.mp3");

/* ---- OBJETOS ---- */
function crearObjeto(data) {
  const img = document.createElement("img");
  img.src = data.src;
  img.className = "objeto";
  img.draggable = true;
  img.dataset.categoria = data.categoria;
  img.alt = data.alt;

  img.addEventListener("dragstart", e => {
    e.dataTransfer.setData("categoria", img.dataset.categoria);
  });

  return img;
}

function cargarObjetoAleatorio() {
  contenedorObjetos.innerHTML = "";
  const random = Math.floor(Math.random() * objetosData.length);
  objetoActual = crearObjeto(objetosData[random]);
  contenedorObjetos.appendChild(objetoActual);
}

/* ---- CANECAS ---- */
canecas.forEach(caneca => {
  caneca.addEventListener("dragover", e => e.preventDefault());

  caneca.addEventListener("drop", e => {
    e.preventDefault();
    if (!objetoActual) return;

    const categoriaObjeto = e.dataTransfer.getData("categoria");
    const categoriaCaneca = caneca.dataset.categoria;

    if (categoriaObjeto === categoriaCaneca) {
      puntaje += 8;
      sonidoOk.play();
      cargarObjetoAleatorio();
    } else {
      puntaje -= 8;
      sonidoError.play();
    }

    puntajeEl.textContent = `Puntaje: ${puntaje}`;
  });
});

/* ---- TEMPORIZADOR ---- */
function iniciarTiempo() {
  const intervalo = setInterval(() => {
    tiempoRestante--;

    const min = String(Math.floor(tiempoRestante / 60)).padStart(2, "0");
    const seg = String(tiempoRestante % 60).padStart(2, "0");
    tiempoEl.textContent = `⏱ ${min}:${seg}`;

    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      contenedorObjetos.innerHTML = "";
      alert(`Tiempo terminado\nPuntaje final: ${puntaje}`);
    }
  }, 1000);
}

/* ---- INICIO ---- */
puntajeEl.textContent = "Puntaje: 0";
tiempoEl.textContent = "⏱ 03:00";
cargarObjetoAleatorio();
iniciarTiempo();
