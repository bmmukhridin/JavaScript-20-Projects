const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")

let apiQuotes = [];
// Get New Quotes

function newQuotes() {
  const getNewQuotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  authorText.textContent=getNewQuotes.author;
  quoteText.textContent=getNewQuotes.text
//   console.log(getNewQuotes)
}

// Get Quotes From API
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuotes();
  } catch (error) {
    alert(error);
  }
}
// onLoad
getQuotes();
