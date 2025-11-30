const data = [
    {
        id: 1,
        name: "Caramel Comeback Latte",
        description:
            "A smooth latte with caramel and a splash of oat milk. Sweet beginner vibes that grow more refined over time—just like Rachel.",
        ordered: 2,
        price: 39,
        img: "./assets/caramel.jpg",
    },
    {
        id: 2,
        name: "Paleontology Americano",
        description:
            "Americano with an extra espresso shot. Straightforward, a bit serious, all about bean quality and brew clarity.",
        ordered: 3,
        price: 39,
        img: "./assets/americano.jpg",
    },
    {
        id: 3,
        name: "Perfect Cappuccino 65°",
        description:
            "Classic cappuccino with precise microfoam (around 65°C) and a light cinnamon dusting—balanced, exact, and perfectionist.",
        ordered: 1,
        price: 39,
        img: "./assets/capuccino.jpg",
    },
    {
        id: 4,
        name: "Could I BE Any Hazelnut?",
        description:
            "Iced cold brew with a hint of hazelnut and vanilla. Dry humor, smooth finish—sarcastic but very drinkable.",
        ordered: 1,
        price: 39,
        img: "./assets/ice.jpg",
    },
    {
        id: 5,
        name: "How You Doin’ Mocha",
        description:
            "A big mocha: double espresso, rich chocolate, whipped cream. Generous, indulgent, zero holding back.",
        ordered: 2,
        price: 39,
        img: "./assets/cream.jpg",
    },
    {
        id: 6,
        name: "Smelly (Cat) Garden Latte",
        description:
            "Vegan latte with oat milk, a touch of honey or syrup, and a whisper of lavender—eco, quirky, and floral.",
        ordered: 2,
        price: 39,
        img: "./assets/late.jpg",
    },
];

const order = {
    name: "",
    email: "",
    bord: "i kassen",
};

const orderList = document.getElementById("order-list");

function renderOrder() {
    const filteredData = data.filter((item) => item.ordered > 0);

    const markup = filteredData
        .map(
            (item) => `
        <li class="order-item">
            <img
                src="${item.img}"
                alt="${item.name}"
                width="240"
                height="262"
                class="order-item-img"
            />
            <p class="order-item-title">${item.name}</p>
            <div class="order-item-control">
                <button class="order-control-btn" data-id="${item.id}" data-action="decrement">−</button>
                <div class="order-control-amount">${item.ordered}</div>
                <button class="order-control-btn"
                data-id="${item.id}" data-action="increment">+</button>
            </div>
        </li>
    `
        )
        .join("");

    orderList.innerHTML = markup;

    updateTotal();
}
orderList.addEventListener("click", (event) => {
    const btn = event.target.closest(".order-control-btn");
    if (!btn) return;
    console.log(btn);
    const id = +btn.dataset.id;
    const action = btn.dataset.action;
    if (action === "increment") increment(id);
    if (action === "decrement") decrement(id);
});

function increment(id) {
    const product = data.find((item) => item.id === id);
    if (product) {
        product.ordered++;
        renderOrder();
    }
}

function decrement(id) {
    const product = data.find((item) => item.id === id);
    if (product && product.ordered > 0) {
        product.ordered--;
        renderOrder();
    }
}

function updateTotal() {
    const total = data
        .filter((item) => item.ordered > 0)
        .reduce((sum, item) => sum + item.ordered * item.price, 0);

    const totalEl = document.querySelector(".order-total");
    if (totalEl) {
        totalEl.textContent = `Total: ${total},- kr`;
    }
}
const nameInputEl = document.getElementById("name");
const emailInputEl = document.getElementById("email");
const bordInputEl = document.getElementById("bord");

function handleChange(event) {
    order[event.target.id] = event.target.value;
}

[nameInputEl, emailInputEl, bordInputEl].forEach((el) => {
    el.addEventListener("change", handleChange);
});

const modalEl = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const orderNameEL = document.getElementById("order-name");
const orderEmailEl = document.getElementById("order-email");
const orderBordEl = document.getElementById("order-bord");
const orderCompleteBtn = document.getElementById("order-button-submit");
const modalCloseBtn = document.getElementById("modal-close-button");
orderCompleteBtn.addEventListener("click", openModal);

function modalClose(event) {
    const isBackdropClick = event.target === event.currentTarget;
    const isCloseBtnClick = event.target.closest("#modal-close-button");
    if (isBackdropClick || isCloseBtnClick) {
        console.log(event.target);
        console.log(event.currentTarget);
        modalEl.classList.add("hidden");
        document.body.style.overflow = "";
    }
}

function openModal() {
    document.body.style.overflow = "hidden";
    orderNameEL.textContent = order.name || "Anonym";
    orderEmailEl.textContent = order.email || "Anonym";
    orderBordEl.textContent = order.bord;
    modalEl.classList.remove("hidden");
    modalEl.addEventListener("click", modalClose);
    modalCloseBtn.addEventListener("click", modalClose);
}

renderOrder();
