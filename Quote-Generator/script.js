let apiQuotes = [];
// Get New Quotes

function newQuotes() {
  const getNewQuotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
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
