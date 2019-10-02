const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://rickandmortyapi.com/api/character/";
window.onload = localStorage.clear();

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      const newPage = response.info.next;
      localStorage.setItem("next_fetch", newPage);
      let output = characters
        .map(character => {
          return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `;
        })
        .join("");
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
};

const loadData = async () => {
  const nextUrl = localStorage.getItem("next_fetch");
  if (nextUrl) {
    await getData(nextUrl);
  }
  if (nextUrl === null) {
    await getData(API);
  }
  if (nextUrl === "") {
    creatingEndMessage();
    intersectionObserver.unobserve($observe);
  }
};

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px"
  }
);

intersectionObserver.observe($observe);
