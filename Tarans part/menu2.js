const buttonOpen = document.getElementById("menu-open-button");
const buttonClose = document.getElementById("menu-close-button");
const mobileMenu = document.querySelector(".mobile-menu");

buttonOpen.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

buttonClose.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

const coffeeList = document.querySelector(".coffee-menu");
const modal = document.getElementById("allFavorite");
let popup = document.getElementById("popup");

const coffeeArray = [
  {
    name: "Karamell-comeback-latte",
    about:
      "En silkemyk latte med karamell og en skvett havremelk. Søt nybegynnerenergi som blir mer raffinert over tid.",
    img: "./assets/caramel.jpg",
    price: 59,
    isLiked: false,
  },
  {
    name: "Paleontologi-Americano",
    about:
      "Americano med et ekstra espressoshot. Rett fram, litt seriøs, og opptatt av bønnekvalitet og bryggets klarhet.",
    img: "./assets/americano.jpg",
    price: 59,
    isLiked: false,
  },
  {
    name: "Perfekt cappuccino 65°",
    about:
      "Klassisk cappuccino med presis mikrofoam (rundt 65 °C) og et lett dryss kanel – balansert, nøyaktig og perfeksjonistisk.",
    img: "./assets/capuccino.jpg",
    price: 59,
    isLiked: false,
  },
  {
    name: "Kunne jeg VÆRT mer hasselnøtt?",
    about:
      "Iskaffebrygg (cold brew) med et hint av hasselnøtt og vanilje. Tørr humor, myk avslutning – sarkastisk, men svært drikkbar. ",
    img: "./assets/ice.jpg",
    price: 59,
    isLiked: false,
  },
  {
    name: "How you doin’ mocha",
    about:
      "En stor mocha: dobbel espresso, rik sjokolade, krem på toppen. Sjenerøs, nytelsesfull og uten hemninger.",
    img: "./assets/espresso.jpg",
    price: 59,
    isLiked: false,
  },
  {
    name: "Smelly (Cat) hage-latte",
    about:
      "Vegansk latte med havremelk, et hint av honning eller sirup, og et lite pust av lavendel – miljøvennlig, sær og blomstrende. ",
    img: "./assets/late.jpg",
    price: 59,
    isLiked: false,
  },
];

function renderList() {
  let coffeeCardList = "";
  for (let i = 0; i < coffeeArray.length; i++) {
    coffeeCardList += `
    <li class="coffeeCard">
    <img class="coffeeImg" style="width: 300px" src="${coffeeArray[i].img}"/>
    <div class="coffeeTxt"> 
      <h3 class="coffeeType">${coffeeArray[i].name}</h3>
      <p class="coffeeDiscription">${coffeeArray[i].about}</p>
      <p class="coffeePrice">kr ${coffeeArray[i].price},-</p>
     <button class="coffeeFavorite ${
       coffeeArray[i].isLiked ? "liked" : "disliked"
     }" data-index="${i}">
     ${coffeeArray[i].isLiked ? "Min favoritt!" : "Liker"}
    
     </button>
    </div>
  </li>`;
  }
  coffeeList.innerHTML = coffeeCardList;
}

coffeeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("coffeeFavorite")) {
    const index = +e.target.dataset.index;

    coffeeArray[index].isLiked = !coffeeArray[index].isLiked;

    if (coffeeArray[index].isLiked) {
      alert(
        `Du har valgt "${coffeeArray[index].name}" som en av dine favoritter!`
      );
    }

    if (coffeeArray.every((coffee) => coffee.isLiked === true)) {
      popup.classList.add("open-popup");
    }
  }
  renderList();
});

function closePopup() {
  popup.classList.remove("open-popup");
}

renderList();
