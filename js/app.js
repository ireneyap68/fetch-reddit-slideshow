let carouselSlide
let seaerchForm
let input
let baseEndPoint = 'https://www.reddit.com/search.json?q='
let resultsArray = []
let currIndex = 0
let interval
let resetButton

const changePhoto = () => {
    if (resultsArray[currIndex].data.thumbnail) {
        currIndex++
    } else {
        currIndex = 0
    }
    carouselSlide.setAttributes('src', resultsArray[currIndex].data.thumbnail)
}

const startSlideshow = () => {
    console.log("starting slideshow")
}
    

const getSearchResults = () => {
    fetch(`${baseEndPoint}${input.value}`)
    .then(response => {
        return response.json()
    })
    .then(jsonData => {
        resultsArray = jsonData.data.children.map((result) => {
            return result.data.thumbnail
        })
        // carouselSlide.setAttributes('src', resultsArray[currIndex].data.thumbnail)
        startSlideshow()
    })
}
//.catch(err => {
  //  console.log("there's an error fetching the result")
//})

document.addEventListener('DOMContentLoaded', ()=> {
    carouselSlide = document.getElementById("carouselSlide")
    seaerchForm = document.querySelector("form")
    input = document.querySelector("input")

    seaerchForm.addEventListener("submit", (e) =>{
        e.preventDefault()

        carouselSlide.style.display = "block"

        seaerchForm.style.display = "none"

        getSearchResults()
    })

    resetButton.addEventListener("click", ()=> {
        carouselSlide.style.display = "none"

        seaerchForm.style.display = "block"
        resultsArray = []
        clearInterval(interval)
    })

})