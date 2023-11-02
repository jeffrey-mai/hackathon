const tmdbKey = "ea879776dab9fcdab9759cfcea9e3ac0"
let pageNumber = Math.floor(Math.random() * 200)
while (pageNumber === 41) pageNumber = Math.floor(Math.random() * 200)

let darkMode = true
console.log(darkMode)
document.body.style.backgroundColor = "#1e1e1e"
document.body.style.color = "white"
const toggleBtn = document.getElementById("toggle-btn")
toggleBtn.addEventListener("click", () => {
  darkMode = !darkMode
  console.log(darkMode)
  if (!darkMode) {
    toggleBtn.innerText = "Light Mode"
    document.body.style.backgroundColor = "white"
    document.body.style.color = "black"
  } else {
    toggleBtn.innerText = "Dark Mode"
    document.body.style.backgroundColor = "#1e1e1e"
    document.body.style.color = "white"
  }
})

const refetchBtn = document.getElementById("refetch-btn")
refetchBtn.addEventListener("click", () => {
  pageNumber = Math.floor(Math.random() * 200)
  while (pageNumber === 41) pageNumber = Math.floor(Math.random() * 200)
  const movieContainer = document.getElementById("movie-container")
  movieContainer.remove()
  const newContainer = document.createElement("div")
  newContainer.id = "movie-container"
  document.body.appendChild(newContainer)
  fetchMovies()
})

const fetchMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbKey}&include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`
  )
  const data = await response.json()

  console.log(data)

  data.results.slice(0, 10).forEach((movie, i) => {
    const div = document.createElement("div")
    div.className = "movie-box"
    const movieTitle = document.createElement("p")
    movieTitle.innerHTML = movie.title
    movieTitle.className = "movie-title"
    const imgContainer = document.createElement("div")
    imgContainer.className = "img-container"
    const img = document.createElement("img")
    img.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    )
    img.setAttribute("class", "images")
    img.addEventListener("click", () => {
      window.open(`http://www.google.com/search?q=${movie.title}+movie`)
    })
    img.title = movie.title
    img.style.width = "150px"
    imgContainer.appendChild(img)
    div.appendChild(imgContainer)
    div.appendChild(movieTitle)
    const movieContainer = document.getElementById("movie-container")
    movieContainer.appendChild(div)
  })
}

fetchMovies()

const form = document.createAttribute("form")
form.id = "form"

form.action = fetchMovies
