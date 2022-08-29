const resultsNav = document.querySelector("#resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

///NASA API
const count = 10;
const apiKey = "D3krSyMnzxgImIplpYM5EJCYwpI4ZJBUDtu4JqR7";
const urlApi = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;
const card = document.querySelector(".end");
///////////////
let resultsArray = [];
let favorites = {};
function showContent(page){
  window.scroll({top: 0, behavior: "instant"})
  if (page === 'results') {
    resultsNav.classList.remove("hidden")
    favoritesNav.classList.add("hidden")
  } else {
    resultsNav.classList.add("hidden")
    favoritesNav.classList.remove("hidden")
  }
  loader.classList.add("hidden")
}
//////////////
async function getImg() {
  //show loader
  loader.classList.remove("hidden")
  try {
    const response = await fetch(urlApi);
    resultsArray = await response.json();
    updateDOM("results");
  } catch (error) {
    console.log(error);
  }
}

function createDOMNodes(page) {
  const currentArray =
    page === "results" ? resultsArray : Object.values(favorites);
  currentArray.forEach((img) => {
    const copyRightResult = img.copyright === undefined ? "" : img.copyright;
    //Card Container
    const card = document.createElement("div");
    card.classList.add("card");
    //Link
    const link = document.createElement("a");
    link.href = img.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";
    //img
    const image = document.createElement("img");
    image.src = img.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");
    ///card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    //card title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-body");
    cardTitle.textContent = img.title;
    ///Save text
    const saveText = document.createElement("p");
    saveText.classList.add("clicable");
    if (page === "results") {
      saveText.textContent = "Add to Favorite";
      saveText.setAttribute("onclick", `getInfo("${img.url}")`);
    } else {
      saveText.textContent = "Remove Favorite";
      saveText.setAttribute("onclick", `removeInfo("${img.url}")`);
    }
    //Card title
    const cardText = document.createElement("p");
    cardText.textContent = img.explanation;
    //Footer Container
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    //Date
    const date = document.createElement("strong");
    date.textContent = img.date;
    //copy Right
    const copyRight = document.createElement("span");
    copyRight.textContent = ` ${copyRightResult}`;
    //Append
    footer.append(date, copyRight);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

function updateDOM(page) {
  imagesContainer.textContent = "";
  //get Favorites from local storage
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
    ;
  }
  createDOMNodes(page);
  showContent(page)
}
// add results to Favorite
function getInfo(itemUrl) {
  // Loop
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      ;

      //show save Confirmation for 2 sec
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 1800);
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
}
// Remove item from Favorites
function removeInfo(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    updateDOM("favorites");
  }
}
getImg();
