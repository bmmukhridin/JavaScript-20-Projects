const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
//show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//hide loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

let apiQuotes = [];
// Get New Quotes

function newQuotes() {
    loading()
  const getNewQuotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //   Check author Name if No name put "Unkown"
  if (getNewQuotes.author == null) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = getNewQuotes.author;
  }
  //   check qutoe length for style
  if (getNewQuotes.text.length) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Hide loader
  quoteText.textContent = getNewQuotes.text;
  complete()
}

// Get Quotes From API
async function getQuotes() {
    loading()
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuotes();
  } catch (error) {
    alert(error);
  }
}
// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuotes);
twitterBtn.addEventListener("click", tweetQuote);
// onLoad
getQuotes();
