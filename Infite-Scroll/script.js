const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKEY = "cxTwpGnnBqXXNwqOistwB2A89HKZolvcfH1JDrc510M";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;
// Get photo from API

function imageLoaded() {
  console.log("img loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
  }
}

function displayPhotos() {
    imagesLoaded =0
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    //console.log(photo)
    const images = document.createElement("img");
    images.setAttribute("src", photo.urls.regular);
    images.setAttribute("alt", photo.alt_description);
    images.setAttribute("title", photo.alt_description);
    // get <a> tank
    const ankerTank = document.createElement("a");
    ankerTank.setAttribute("href", photo.links.html);
    ankerTank.setAttribute("target", "_blank");
    // put img inside <a>
    ankerTank.appendChild(images);
    imageContainer.appendChild(ankerTank);
    images.addEventListener("load", imageLoaded);
  });
  
}

async function getPhoto() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    //console.log(photosArray)
  } catch (error) {
    alert(error);
  }
}
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhoto();
  }
});
// On Load
getPhoto();
