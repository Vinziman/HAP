import Data from "../../src/Data.js";
const postPrenotazioneAPI_URL = "http://localhost:5000/prenota";

const orariDisponibiliContainerElement = document.getElementById(
  "orariDisponibiliContainer"
);

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initPage();
  }
});

const initPage = () => {
  //richiamo gli oggetti da document
  const prenotaDateElement = document.getElementById("prenotaDate");
  const formElement = document.querySelector("form");

  //imposto la data di oggi
  const today = new Data();
  prenotaDateElement.setAttribute("min", today.getFullDataHTML());
  prenotaDateElement.value = today.getFullDataHTML();
  caricaOrariDisponibili(today);

  //aggiungo gli event listeners
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    submitProcedure();
  });
  prenotaDateElement.addEventListener("input", () => {
    const data = new Data();
    data.setDataFromString(prenotaDateElement.value);
    caricaOrariDisponibili(data); //decidere in quale formato passare la data
  });
};

const submitProcedure = () => {
  const motivazioni = document.getElementById("motivazioniInput").value.trim();
  const data = new Data();
  data.setDataFromString(prenotaDateElement.value);
  //acquisisci orario
  //prepara file json
  //esegui post
};

const caricaOrariDisponibili = (data) => {
  const orari = acquisisciOrariDisponibili(data);
  console.log(orari);
  const orarioDisponibileElement = document.createElement("div");
  orari.forEach((item) => {
    //element
    orarioDisponibileElement.innerHTML = item;
    orariDisponibiliContainerElement.appendChild(orarioDisponibileElement);
  });
};

const acquisisciOrariDisponibili = (data) => {
  //get request
  const orari = testOrari();
  return orari;
};

const testOrari = () => {
  const orari = [];
  const minuti = 1000 * 60;
  for (var i = 0; i < 18; i++) {
    const ora = new Date(8 * 60 * minuti + i * 20 * minuti);

    orari[i] = `${ora.getHours()}:${ora.getMinutes()}`;
  }

  return orari;
};
