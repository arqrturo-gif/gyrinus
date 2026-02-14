let puntaje = 0;
let tiempoRestante = 180;
let objetoActual = null;

const objetosData = [
  { src: "img/7up.jpg", categoria: "reciclable" },
  { src: "img/btl.png", categoria: "reciclable" },
  { src: "img/btlp.jpg", categoria: "reciclable" },
  { src: "img/btlpet.jpg", categoria: "reciclable" },
  { src: "img/btlv.jpg", categoria: "reciclable" },
  { src: "img/cp.png", categoria: "organico" },
  { src: "img/envbbm.jpg", categoria: "reciclable" },
  { src: "img/envg.jpg", categoria: "reciclable" },
  { src: "img/envgl.jpg", categoria: "reciclable" },
  { src: "img/jeringa.png", categoria: "no-aprovechable" },
  { src: "img/ph.png", categoria: "no-aprovechable" }
];

const contenedor = document.getElementById("objetos");
const canecas = document.querySelectorAll(".caneca");
const puntajeEl = document.getElementById("puntaje");
const tiempoEl = document.getElementById("tiempo");

const sndAcierto = new Audio("audio/acierto.mp3");
const sndError = new Audio("audio/error.mp3");
const sndFin = new Audio("audio/fin.mp3");

/* CREAR OBJETO */
function crearObjeto(data) {
  const img = document.createElement("img");
  img.src = data.src;
  img.className = "objeto";
  img.draggable = true;
  img.dataset.categoria = data.categoria;

  img.addEventListener("dragstart", e => {
    e.dataTransfer.setData("categoria", img.dataset.categoria);
  });

  return img;
}

/* CARGAR OBJETO ALEATORIO */
function cargarObjeto() {
  contenedor.innerHTML = "";
  const random = Math.floor(Math.random() * objetosData.length);
  objetoActual = crearObjeto(objetosData[random]);
  contenedor.appendChild(objetoActual);
}

/* DROP LOGICO */
canecas.forEach(caneca => {

  caneca.addEventListener("dragover", e => e.preventDefault());

  caneca.addEventListener("drop", e => {
    e.preventDefault();
    if (!objetoActual) return;

    const categoriaObjeto = e.dataTransfer.getData("categoria");
    const categoriaCaneca = caneca.dataset.categoria;

    if (categoriaObjeto === categoriaCaneca) {
      puntaje += 8;
      sndAcierto.play();
      cargarObjeto();     // desaparece solo si acierta
    } else {
      puntaje -= 8;
      sndError.play();
    }

    puntajeEl.textContent = `Puntaje: ${puntaje}`;
  });

});

/* TEMPORIZADOR */
function iniciarTiempo() {
  const intervalo = setInterval(() => {

    tiempoRestante--;

    const min = String(Math.floor(tiempoRestante / 60)).padStart(2, "0");
    const seg = String(tiempoRestante % 60).padStart(2, "0");
    tiempoEl.textContent = `⏱ ${min}:${seg}`;

    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      contenedor.innerHTML = "";
      sndFin.play();
      alert(`Tiempo finalizado\nPuntaje: ${puntaje}`);
    }

  }, 1000);
}

/* INICIO */
puntajeEl.textContent = "Puntaje: 0";
tiempoEl.textContent = "⏱ 03:00";

cargarObjeto();
iniciarTiempo();
