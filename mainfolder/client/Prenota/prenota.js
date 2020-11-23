import Data from "./data.js";

const orariDisponibiliContainerElement = document.getElementById(
  "orariDisponibiliContainer"
);

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  //richiamo gli oggetti da document
  const prenotaDateElement = document.getElementById("prenotaDate");
  const formElement = document.querySelector("form");

  //imposto la data di oggi
  const today = new Data();
  prenotaDateElement.setAttribute("min", today.getFullDataHTML());
  prenotaDateElement.value = today.getFullDataHTML();

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

  prenotaDateElement.value = today.getFullDataHTML();
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
  const orarioDisponibileElement = document.createElement("div");
  orari.forEach((element) => {
    orarioDisponibileElement.innerHTML = element;
    orariDisponibiliContainerElement.appendChild(orarioDisponibileElement);
  });
};

const acquisisciOrariDisponibili = (data) => {
  //get request
  const orari = [];
  orari[0] = data.getFullData();
  return orari;
};
