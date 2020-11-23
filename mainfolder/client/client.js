console.log("Leggi le news !");

const newsContainerElement = document.querySelector(".newsContainer");
const form = document.querySelector("form"); // grabbing an element on the page
const errorElement = document.querySelector(".error-message");

const loadMoreElement = document.querySelector("#loadMore");
const getNewsAPI_URL = "http://localhost:5000/news";

let skip = 0;
let limit = 5;
let loading = false;
let finished = false;

document.addEventListener("scroll", () => {
  const rect = loadMoreElement.getBoundingClientRect();
  if (rect.top < window.innerHeight && !loading && !finished) {
    loadMore();
  }
});

listAllNews();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Notizia aggiunta !");
  const formData = new FormData(form);
  const titolo = formData.get("titolo");
  const testo = formData.get("testo");
  console.log(titolo + " " + testo);
  const comunicazione = {
    titolo,
    testo,
  };

  fetch(getNewsAPI_URL, {
    method: "POST",
    body: JSON.stringify(comunicazione),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType.includes("json")) {
          return response.json().then((error) => Promise.reject(error.message));
        } else {
          return response.text().then((message) => Promise.reject(message));
        }
      }
    })
    .then(() => {
      form.reset();
      setTimeout(() => {
        form.style.display = "";
      }, 2000);
    });
  /*.catch((errorMessage) => {
      form.style.display = "";
      errorElement.textContent = errorMessage;
      errorElement.style.display = "";
      loadingElement.style.display = "none";
    });*/
});

function loadMore() {
  skip += limit;
  listAllNews(false);
}

function listAllNews(reset = true) {
  loading = true;
  if (reset) {
    skip = 0;
    finished = false;
  }
  fetch(getNewsAPI_URL) //`${}?skip=${skip}&limit=${limit}`
    .then((response) => response.json())
    .then((listaComunicazioni) => {
      console.log(listaComunicazioni);
      listaComunicazioni.forEach((comunicazione) => {
        const div = document.createElement("div");

        const header = document.createElement("h3");
        header.textContent = comunicazione.titolo;

        const contents = document.createElement("p");
        contents.textContent = comunicazione.testo;

        const date = document.createElement("small");
        date.textContent = new Date(comunicazione.data);

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        newsContainerElement.appendChild(div);
      });
      /*loadingElement.style.display = "none";
      if (!result.meta.has_more) {
        loadMoreElement.style.visibility = "hidden";
        finished = true;
      } else {
        loadMoreElement.style.visibility = "visible";
      }*/
      loading = false;
    });
}
