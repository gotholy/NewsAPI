const apiKey = "1c962ef5b32f444c8be8c5eb0844449c";
const newsResults = document.getElementById("newsResults");
const getNewsButton = document.getElementById("getNewsButton");
const languageSelect = document.getElementById("languageSelect");
const sortBySelect = document.getElementById("sortBySelect");
const topicInput = document.getElementById("topicInput");

getNewsButton.addEventListener("click", () => {
  const selectedLanguage = languageSelect.value;
  const selectedsortBy = sortBySelect.value;
  const selectedTopic = topicInput.value;
  const url = `https://newsapi.org/v2/everything?q=${selectedTopic}&language=${selectedLanguage}&sortBy=${selectedsortBy}&apiKey=${apiKey}`;

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      newsResults.innerHTML = "";
      const articles = data.articles;
      articles.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("article");
        articleElement.innerHTML += `
                            <h2>${article.title}</h2>
                            <img src="${article.urlToImage}" alt="${article.title} Bild">
                            <p>${article.description}</p>
                            <a href="${article.url}" class="toArticle" target="_blank">Zum Artikel</a>
                        `;
        newsResults.appendChild(articleElement);
        console.log(article.description);
      });
    })
    .catch((error) => {
      console.error("Fehler beim Abrufen der Nachrichten:", error);
    });
});
