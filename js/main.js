// ===================== Get Elment
let toggle = document.getElementById("toggle");
let pop = document.getElementById("pop");
let goToUp = document.getElementById("goToUp");
let category = document.querySelectorAll("#category");
let navLink = Array.from(
  document.querySelectorAll(".navbar .container .country .nav-link")
);
let newsFinalResult = [];
let countryCode = "eg"
let categorySelect = "sport"
// ===================== Get Api
async function getNews(countryCode, category) {
  let news = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=c36a7b3324c44929a3f571b14fb68562`,
    { method: "GET" }
  );
  let newsResult = await news.json();
  newsFinalResult = newsResult.articles;
  display();
}
getNews(countryCode, categorySelect);
// ===================== Navbar Toggle
toggle.addEventListener("click", function () {
  pop.classList.toggle("active");
});

function getCountry() {
  for (let i = 0; i < navLink.length; i++) {
    navLink[i].addEventListener("click", function () {
      countryCode = this.getAttribute("data-code");
      pop.classList.remove("active");
      getNews(countryCode, categorySelect);
      document.getElementById(
        "title"
      ).innerHTML = `The latest <span>${categorySelect}</span> news in <span>${navLink[i].innerHTML}</span>`;
    });
  }
}
getCountry();

function getcategory() {
  for (let i = 0; i < category.length; i++) {
    category[i].addEventListener("click", function () {
      categorySelect = this.getAttribute("data-category");
      getNews(countryCode , categorySelect);
      document.getElementById(
        "title"
      ).innerHTML = `The latest <span>${categorySelect}</span> news in <span>Egypt</span>`;
    });
  }
}
getcategory();

function display() {
  let temp = "";
  for (let i = 0; i < newsFinalResult.length; i++) {
    if (newsFinalResult[i].urlToImage == null) {
      newsFinalResult[i].urlToImage = "img/blog-1.png";
    }
    if (newsFinalResult[i].description == null) {
      newsFinalResult[i].description = "";
    }
    temp += `
    <div class="ineer-news">
    <div class="img">
      <img src="${newsFinalResult[i].urlToImage}" />
      <div class="info">
        <h5 class="title">${newsFinalResult[i].title}</h5>
        <p class="description">
        ${newsFinalResult[i].description}</p>
        <a href="${newsFinalResult[i].url}" target="_blank">GO</a>
      </div>
    </div>
  </div>
`;
  }
  document.getElementById("new").innerHTML = temp;
}
