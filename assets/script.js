const btn = document.querySelector("#search_button");
const content = document.querySelector("#content");
const search_input = document.querySelector("#search_input");
const current_date = document.querySelector("#current_date")

const date = new Date()
const d = String(date.getDate()).padStart(2, '0')
const m = String(date.getMonth() + 1).padStart(2, '0');
const y = date.getFullYear();
current_date.innerText = d + "/" + m + "/" + y;


btn.addEventListener("click", (e) => {
  e.preventDefault();
  sendApiRequest();
})

async function sendApiRequest() {
  const API_KEY = 'kqPO2L0QaEBoXZXRHucECuNXKjPkoxnVQnPVVzDn';
  const start_date = search_input.value.split('/').reverse().join('-');

  await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${start_date}&end_date=${start_date}&thumbs=true`).then(r => r.json())
    .then((nasa) => {
      const object_nasa = { ...nasa[0] };
      let { hdurl: IMG_URL, copyright, thumbnail_url } = object_nasa;
      if (copyright === undefined) {
        copyright = "Nasa";
      } else if (IMG_URL === undefined) {
        IMG_URL = thumbnail_url;
      }
      content.innerHTML = `<img src="${IMG_URL}"><br><p>© ${copyright}</p>`
    })
}

