// Get Quotes From API

async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
  } catch (error) {
    alert(error);
  }
}
