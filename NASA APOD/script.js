///NASA API
const count = 10;
const apiKey = "DEMO_KEY";
const urlApi = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;
const card = document.querySelector(".end");

let resultsArray = [];

async function getImg() {
  try {
    const response = await fetch(urlApi);
    resultsArray = await response.json();
    imgs();
  } catch (error) {
    alert(error);
  }
}

function imgs() {
  resultsArray.forEach((img) => {
    const copyRightResult = img.copyright === undefined ? '':img.copyright 
    const html = `<div class="card">
    <a href="${img.url}" title="View full Image" target="_blank">
    <img src="${img.hdurl}" alt="NASA Picture of the day" class="card-img-top">
</a>
<div class="card-body">
    <h5 class="card-title">${img.title}</h5>
    <p class="clicable" onclick="saveFavorite(${img.url})">Add to favorites</p>
    <p class="text">${img.explanation}</p>
        <small class="muted">
            <strong>${img.date}</strong>
            <span>${copyRightResult}</span>
        </small>
</div>
</div>`;
    card.insertAdjacentHTML("afterend", html);
  });
}

function saveFavorite(itemUrl){
console.log(itemUrl)
}
getImg();
