console.log("Leggi le news !");

const newsElement = document.querySelector(".news");

listAllNews();

function listAllNews() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((news) => {
      console.log(news);
      news.forEach((news) => {
        const div = document.createElement("div");
        const header = document.createElement("h3");
        header.textContent = news.name;

        const contents = document.createElement("p");
        contents.textContent = news.content;

        div.appendChild(header);
        div.appendChild(contents);

        newsElement.appendChild(div);
      });
    });
}
