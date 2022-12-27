import { products } from "./data/products.js";

const body = document.querySelector("body");
const mainContainer = document.querySelector(".main-container");
const navProductLink = document.querySelectorAll(".nav-product-link");
const homeLink = document.querySelector(".home-link");
const cartLink = document.querySelectorAll(".cart-item");
const closeCartBtn = document.querySelector(".close-cart-btn");
const validateCartBtn = document.querySelector(".validate-cart-btn");
const viewportWidth = window.innerWidth;

const createProductCard = (product) => {
  let cart = getCart();

  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  const titleProductCard = document.createElement("h2");
  titleProductCard.classList.add("title-product-card");
  titleProductCard.append(product.name);

  const cardCover = document.createElement("img");
  cardCover.classList.add("product-image");
  cardCover.src = product.image;

  const cardBody = document.createElement("div");
  cardBody.classList.add("product-card-body");
  cardBody.append(cardCover);

  const productPrice = document.createElement("h3");
  productPrice.classList.add("product-price");
  productPrice.innerText = `${product.price}€`;

  const deleteProductBtn = document.createElement("button");
  deleteProductBtn.classList.add("delete-product-btn", "btn");
  deleteProductBtn.innerText = "Supprimer";
  deleteProductBtn.addEventListener("click", () => {
    deleteProduct(product);
  });

  const addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("add-to-cart-btn", "btn");
  addToCartBtn.innerText = "Ajouter au panier";
  addToCartBtn.addEventListener("click", () => {
    addProductToCart(product);
  });

  const containerBtns = document.createElement("div");
  containerBtns.classList.add("container-btns-product-card");

  cart.map((prod) => {
    if (prod.id === product.id) {
      containerBtns.append(deleteProductBtn);
    }
  });

  containerBtns.append(addToCartBtn);

  const cardFooter = document.createElement("div");
  cardFooter.classList.add("product-card-footer");
  cardFooter.append(productPrice, containerBtns);

  productCard.append(titleProductCard);
  productCard.append(cardBody);
  productCard.append(cardFooter);

  return productCard;
};

const displayProducts = () => {
  mainContainer.innerHTML = "";

  const mainContentProducts = document.createElement("div");
  mainContentProducts.classList.add("main-content-products");

  products.map((product) => {
    mainContentProducts.append(createProductCard(product));
  });
  mainContainer.append(mainContentProducts);
};

const displayHomeContent = () => {
  mainContainer.innerHTML = "";

  const mainContentHome = document.createElement("div");
  mainContentHome.classList.add("main-content-home");

  const titleHome = document.createElement("h2");
  titleHome.classList.add("title-home");
  titleHome.innerText = "Besoin de fournitures ?";

  const arrowContainer = document.createElement("div");
  arrowContainer.classList.add("arrow-container");

  const arrowImg = document.createElement("img");
  arrowImg.classList.add("arrow");
  arrowImg.src = "./assets/arrow.svg";

  const seeProductsBtn = document.createElement("button");
  seeProductsBtn.classList.add("btn", "see-products-btn");
  seeProductsBtn.innerText = "Voir nos produits";

  arrowContainer.append(arrowImg);
  mainContentHome.append(titleHome, arrowContainer, seeProductsBtn);

  mainContainer.append(mainContentHome);

  seeProductsBtn.addEventListener("click", (e) => {
    displayProducts();
  });
};

const getCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart;
};

const setCart = (arr) => {
  localStorage.setItem("cart", JSON.stringify(arr));

  const updateEvent = new CustomEvent("update", { detail: arr });
  document.dispatchEvent(updateEvent);
};

const addProductToCart = (product) => {
  let cart = getCart();
  cart.push(product);

  setCart(cart);
};

const deleteProduct = (product) => {
  let cart = getCart();

  const toDeleteIndex = cart.indexOf(
    cart.find((prod) => prod.id === product.id)
  );
  cart.splice(toDeleteIndex, 1);

  setCart(cart);
};

const getTotalCart = () => {
  let cart = getCart();
  let total = 0;

  cart.map((product) => {
    total += parseFloat(product.price);
  });

  if (cart.length === 0) total = 0;

  return total.toFixed(2) + "€";
};

const displayTotalCart = () => {
  const totalCart = document.querySelector(".cart-total-price");

  totalCart.innerText = getTotalCart();
};

const toggleCartModal = () => {
  const cartModal = document.querySelector(".modal-cart");

  cartModal.classList.toggle("modal-cart-visible");

  if (cartModal.classList.contains("modal-cart-visible")) {
    fillModalCart();
    displayTotalCart();
  }
};

const fillModalCart = () => {
  let cart = getCart();
  const modalBody = document.querySelector(".cart-body");
  cart.length
    ? (modalBody.innerHTML = "")
    : (modalBody.innerHTML = "Votre panier est vide !");

  cart.map((product) => {
    const parser = new DOMParser();
    const htmlString = `<div class="card-modal-product">
    <div class="img-title-container">
      <div class="img-product-container">
        <img class="product-img" src=${product.image} />
      </div>
      <h4>${product.name}</h4>
    </div>
      <p class="cart-product-price">${product.price}€</p>
      <div class="delete-btn-container">
        <img class="btn-delete" src="./assets/delete.svg" />
      </div>
  </div>`;

    const htmlparse = parser.parseFromString(htmlString, "text/html");
    const deleteProductBtnModal = htmlparse.querySelector(".btn-delete");

    deleteProductBtnModal.addEventListener("click", () => {
      deleteProduct(product);
    });

    const cardElement = htmlparse.querySelector(".card-modal-product");
    modalBody.append(cardElement);
  });
};

const toggleSideMenu = () => {
  const logoBurgerMenu = document.querySelector(".logo-burger");
  const sideMenu = document.querySelector(".side-menu-container");

  logoBurgerMenu.addEventListener("click", () => {
    sideMenu.classList.toggle("side-menu-container-visible");
  });
};

const addBubbleNotif = () => {
  const bubble = document.querySelectorAll(".cart-bubble");
  const cart = getCart();

  bubble.forEach((bub) => {
    if (cart.length) {
      bub.classList.add("cart-bubble-visible");
      bub.innerText = cart.length;
    } else {
      bub.classList.remove("cart-bubble-visible");
    }
  });
};

const createAnimation = () => {
  const animationContainer = document.createElement("div");
  animationContainer.classList.add("animation-container");

  let lineTab = [];
  let delay = 0;

  for (let i = 0; i < 16; i++) {
    const lineAdn = document.createElement("div");
    lineAdn.classList.add("line-adn");
    lineTab.push(lineAdn);
  }

  lineTab.forEach((line) => {
    delay -= 0.15;
    line.style.animationDelay = delay + "s";
    console.log(line.style.animationDelay);
    animationContainer.append(line);
  });

  body.append(animationContainer);
  setTimeout(() => {
    body.removeChild(animationContainer);
  }, 4000);
};

/** EVENTS */
navProductLink.forEach((link) => {
  link.addEventListener("click", () => {
    displayProducts();
  });
});

cartLink.forEach((link) => {
  link.addEventListener("click", () => {
    toggleCartModal();
  });
});

closeCartBtn.addEventListener("click", () => {
  toggleCartModal();
});

homeLink.addEventListener("click", () => {
  displayHomeContent();
});

validateCartBtn.addEventListener("click", () => {
  console.log("validé");
  createAnimation();
});

document.addEventListener("update", (e) => {
  console.log("panier update: ", e.detail);

  if (mainContainer.firstChild.classList.contains("main-content-products")) {
    displayProducts();
  }
  addBubbleNotif();
  fillModalCart();
  displayTotalCart();
});

displayHomeContent();
addBubbleNotif();
toggleSideMenu();
