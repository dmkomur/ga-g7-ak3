//Easteregg 1 "Friendsquotes" - Aktiveres ved å klikke på logo 1 gang. Hva skjer: Ulike Sitater kommer opp i egen boks nedre del av skjermen. klikk flere ganger = ulike sitater.
//Easteregg 2 "Gunther mode" - Aktiveres ved å klikke 5 ganger på logo. Hva skjer:  Nytt bakgrunnsbilde, ny farge på tekst og bakgrunn..
//Easteregg 3 "Gunther counter" -Aktiveres i Gunther mode. klikk på counter til du kommer til 7, = alert. klikk til 10--> da aktiveres PHEOBE-mode.
//Easteregg 4 Pheobe mode - Her er det discount kode, smelly cat lyd som spilles av automatisk, samt at den kan aktiveres ved å klikke på den nye logoen som dukker opp eller egen knapp.
const logoImages = document.querySelectorAll(".logo-easter");
console.log(logoImages);
const quoteBox = document.getElementById("quote-box"); //QUOTE-BOKS CLASSEN = QUOTEBOX CONSTEN
const quoteTextElement = document.getElementById("quote-text"); //QUOTE-TEkST ID-EN = QUOTEXT CONSTEN
const quoteImageElement = document.getElementById("quote-img");

const guntherCounterBtn = document.getElementById("gunther-counter-btn");
let guntherCounterValue = document.getElementById("gunther-counter-value");

const buttonOpen = document.getElementById("menu-open-button");
const buttonClose = document.getElementById("menu-close-button");
const mobileMenu = document.querySelector(".mobile-menu");

const smellyCatAudio = new Audio("./assets/sounds/smelly-cat.mp3");
const smellyCatBtn = document.getElementById("smelly-cat-btn");

const ORIGINAL_LOGO_SRC = "./assets/logo.png";
const SMELLY_CAT_LOGO_SRC = "./assets/smelly-cat-logo.jpg";
let Counter = 0;
let klikkTimer = null;
let guntherCounter = 0;

const quotes = [
    {
        text: "ROSS: We were on a break!",
        img: "./assets/quotes/break.jpg",
    },
    {
        text: "JOEY: How you doin'?",
        img: "./assets/quotes/how-you.jpeg",
    },
    {
        text: "JANICE: Oh. My. God.",
        img: "./assets/quotes/oh-my-god.jpg",
    },
    {
        text: "GUNTHER: I was wondering if you...",
        img: "./assets/quotes/gunther.jpg",
    },
    {
        text: "CHANDLER: I say more dumb things before.",
        img: "./assets/quotes/chandler.jpg",
    },
    {
        text: "PHEOBE: I have to go before i put your head trough the wall.",
        img: "./assets/quotes/pheobe.jpg",
    },
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteTextElement.textContent = randomQuote.text;
    quoteImageElement.src = randomQuote.img;
    quoteImageElement.alt = randomQuote.text;

    quoteBox.classList.add("quote-box--visible");

    setTimeout(function () {
        quoteBox.classList.remove("quote-box--visible");
    }, 7000);
}

function enterPhoebeMode() {
    document.body.classList.remove("gunther-mode");
    document.body.classList.add("phoebe-mode");
    logoImages.forEach(function (img) {
        img.src = SMELLY_CAT_LOGO_SRC;
    });
    if (guntherCounterBtn) {
        guntherCounterBtn.disabled = true;
        guntherCounterBtn.textContent = "Phoebe-mode aktivert 🐱";
    }
    smellyCatAudio.currentTime = 0;
    smellyCatAudio.play();

    setTimeout(() => {
        alert(
            "🎉 Fordi du er en ekte FRIENDS-fan, får du en rabattkode på ditt neste kjøp på 50%. Bruk koden: SMELLYCAT50"
        );
    }, 1500);
}

function exitPhoebeMode() {
    document.body.classList.remove("phoebe-mode");

    logoImages.forEach(function (img) {
        img.src = ORIGINAL_LOGO_SRC;
    });

    if (guntherCounterBtn) {
        guntherCounter = 0;

        guntherCounterBtn.innerHTML =
            'Gunther counter: <span id="gunther-counter-value">0</span>';

        guntherCounterBtn.disabled = false;

        guntherCounterValue = document.getElementById("gunther-counter-value");
    }
}

if (buttonOpen) {
    buttonOpen.addEventListener("click", () => {
        if (mobileMenu) {
            mobileMenu.classList.add("active");
        }
        exitPhoebeMode();
    });
}

if (buttonClose) {
    buttonClose.addEventListener("click", () => {
        if (mobileMenu) {
            mobileMenu.classList.remove("active");
        }
    });
}

if (smellyCatBtn) {
    smellyCatBtn.addEventListener("click", function () {
        smellyCatAudio.currentTime = 0;
        smellyCatAudio.play();
    });
}
logoImages.forEach(function (img) {
    img.addEventListener("click", function () {
        console.log("object");
        showRandomQuote();

        Counter++;

        if (klikkTimer) {
            clearTimeout(klikkTimer);
        }

        klikkTimer = setTimeout(function () {
            Counter = 0;
        }, 500);

        if (Counter >= 5) {
            document.body.classList.toggle("gunther-mode");
            Counter = 0;
        }

        if (document.body.classList.contains("phoebe-mode")) {
            smellyCatAudio.currentTime = 0;
            smellyCatAudio.play();
        }
    });
});
if (guntherCounterBtn) {
    guntherCounterBtn.addEventListener("click", function () {
        guntherCounter++;
        if (guntherCounterValue) {
            guntherCounterValue.textContent = guntherCounter;
        }
        if (guntherCounter === 7) {
            alert("OH. MY. GOD.");
        }
        if (guntherCounter === 10) {
            enterPhoebeMode();
        }
    });
}
