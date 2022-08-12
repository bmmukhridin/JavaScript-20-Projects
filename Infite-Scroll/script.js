// Unsplash API
const count = 10;
const apiKEY = 'cxTwpGnnBqXXNwqOistwB2A89HKZolvcfH1JDrc510M';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`
// Get photo from API

async function getPhoto() {
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(response)
        }catch(error){
            alert(error)
        }
}

// On Load 
getPhoto()
