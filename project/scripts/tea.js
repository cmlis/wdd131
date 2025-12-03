/* ------------------------------
   GLOBAL VARIABLES
------------------------------ */
const teas = [
  { 
    name: "Chamomile", 
    origin: "Ancient Egypt & Europe", 
    benefit: "Calming, sleep aid, digestive", 
    property: "calming", 
    img: "https://cdn.shopify.com/s/files/1/1980/1825/files/uptown-tea-shop-chamomile-tea-cup-93193226-2500.jpg?v=1627569674",
    history: "Chamomile has been used for thousands of years in ancient Egypt and Europe as a calming herb and digestive aid.",
    uses: "Steep 1-2 teaspoons of dried chamomile flowers in hot water for 5-10 minutes. Often enjoyed before bedtime or after meals.",
    wellness: "Calms the nervous system, promotes sleep, and aids digestion. Generally safe, but avoid if allergic to ragweed."
  },
  { 
    name: "Hibiscus", 
    origin: "Africa", 
    benefit: "Supports circulation, antioxidant", 
    property: "circulation", 
    img: "https://cdn-allef.nitrocdn.com/srVCBWNuegbwocAiOJUUWBFJUXMzFNKm/assets/images/optimized/rev-0bbec08/www.tea-and-coffee.com/wp-content/uploads/2022/03/Hibiscus-Tea-Benefits.jpg",
    history: "Hibiscus tea originates from Africa and has been traditionally used for its vibrant color and tart flavor.",
    uses: "Steep dried hibiscus petals in hot water for 5-7 minutes. Can be enjoyed hot or cold, often sweetened.",
    wellness: "Rich in antioxidants, may help lower blood pressure. Avoid excessive consumption if you have low blood pressure."
  },
  { 
    name: "Senna", 
    origin: "Africa", 
    benefit: "Digestive, mild laxative", 
    property: "digestive", 
    img: "https://image.tuasaude.com/media/article/hz/wb/sene_129.jpg?width=686&height=487",
    history: "Senna has been used in traditional African and Middle Eastern medicine as a natural laxative.",
    uses: "Steep 1 teaspoon of senna leaves in hot water for 10 minutes. Drink in the evening to aid bowel movements.",
    wellness: "Helps relieve constipation. Use sparingly, as overuse may cause dependency or digestive discomfort."
  },
  { 
    name: "Peppermint", 
    origin: "Europe", 
    benefit: "Digestive aid, relieves nausea", 
    property: "digestive", 
    img: "https://cdn.jwplayer.com/v2/media/6VgN95uD/poster.jpg?width=720",
    history: "Peppermint has been cultivated in Europe for centuries for its soothing flavor and medicinal uses.",
    uses: "Steep fresh or dried peppermint leaves in hot water for 5-10 minutes. Can be enjoyed as a tea or infusion.",
    wellness: "Relieves digestive discomfort, nausea, and mild headaches. Safe for most people."
  },
  { 
    name: "Green Tea", 
    origin: "China", 
    benefit: "Antioxidant, metabolism booster", 
    property: "circulation", 
    img: "https://www.news-medical.net/images/news/ImageForNews_772521_17086033604327825.jpg",
    history: "Green tea has been consumed in China for thousands of years and valued for its health-promoting properties.",
    uses: "Steep 1 teaspoon of green tea leaves in 80°C water for 2-3 minutes. Avoid boiling water to prevent bitterness.",
    wellness: "Contains antioxidants and may boost metabolism. Avoid excessive consumption due to caffeine content."
  },
  { 
    name: "Lemon Balm", 
    origin: "Mediterranean", 
    benefit: "Reduces stress, promotes relaxation", 
    property: "calming", 
    img: "https://theviewfromgreatisland.com/wp-content/uploads/2022/09/how-to-make-lemon-balm-tea-10.jpg",
    history: "Lemon balm has been used since ancient times in the Mediterranean to calm the mind and aid digestion.",
    uses: "Steep fresh or dried leaves in hot water for 5-10 minutes. Often combined with other calming herbs.",
    wellness: "Reduces stress and anxiety, promotes sleep. Safe for most adults."
  }
];

/* ------------------------------
   FAVORITES MANAGEMENT
------------------------------ */
function getFavorites() {
  const favs = localStorage.getItem("teaFavorites");
  return favs ? JSON.parse(favs) : [];
}

function saveFavorites(favs) {
  localStorage.setItem("teaFavorites", JSON.stringify(favs));
}

function renderFavorites() {
  const favListContainer = document.getElementById("fav-list");
  if (!favListContainer) return; // não faz nada se não existir

  const favs = getFavorites();
  favListContainer.innerHTML = "";
  if (favs.length) {
    favs.forEach(tea => {
      const span = document.createElement("span");
      span.textContent = tea;
      favListContainer.appendChild(span);
    });
  } else {
    favListContainer.textContent = "(No favorites yet.)";
  }
}

function toggleFavorite(teaName, button) {
  let favs = getFavorites();
  if (favs.includes(teaName)) {
    favs = favs.filter(t => t !== teaName);
    button.textContent = "☆";
    button.setAttribute("aria-pressed", "false");
  } else {
    favs.push(teaName);
    button.textContent = "★";
    button.setAttribute("aria-pressed", "true");
  }
  saveFavorites(favs);
  renderFavorites();
}

/* ------------------------------
   RENDER TEA CARDS
------------------------------ */
function renderTeas(filter = "all", search = "") {
  const teasListContainer = document.getElementById("teas-list");
  const teaTemplate = document.getElementById("tea-card-template");
  if (!teasListContainer || !teaTemplate) return;

  teasListContainer.innerHTML = "";

  const filteredTeas = teas.filter(t => {
    const matchesFilter = filter === "all" || t.property === filter;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                          t.benefit.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  filteredTeas.forEach(tea => {
    const clone = teaTemplate.content.cloneNode(true);

    clone.querySelector(".tea-img").src = tea.img;
    clone.querySelector(".tea-img").alt = tea.name;
    clone.querySelector(".tea-name").textContent = tea.name;
    clone.querySelector(".tea-origin").textContent = `Origin: ${tea.origin}`;
    clone.querySelector(".tea-benefit").textContent = `Benefits: ${tea.benefit}`;

    // Favoritos
    const favBtn = clone.querySelector(".fav-btn");
    const favs = getFavorites();
    if (favs.includes(tea.name)) {
      favBtn.textContent = "★";
      favBtn.setAttribute("aria-pressed", "true");
    }
    favBtn.addEventListener("click", () => toggleFavorite(tea.name, favBtn));

    // Modal detalhes
    const detailsBtn = clone.querySelector(".details-btn");
    if (detailsBtn) {
      detailsBtn.addEventListener("click", () => showModal(tea));
    }

    teasListContainer.appendChild(clone);
  });
}

/* ------------------------------
   MODAL
------------------------------ */
const modal = document.getElementById("modal");
if (modal) {
  const modalTitle = document.getElementById("modal-title");
  const modalImg = document.getElementById("modal-img");
  const modalOrigin = document.getElementById("modal-origin");
  const modalBenefit = document.getElementById("modal-benefit");
  const modalClose = document.getElementById("modal-close");

  function showModal(tea) {
    modalTitle.textContent = tea.name;
    modalImg.src = tea.img;
    modalImg.alt = tea.name;
    modalOrigin.textContent = `Origin: ${tea.origin}`;
    modalBenefit.innerHTML = `
      <strong>Benefits:</strong> ${tea.benefit}<br>
      <strong>Historical background:</strong> ${tea.history}<br>
      <strong>Practical uses:</strong> ${tea.uses}<br>
      <strong>Health benefits:</strong> ${tea.wellness}
    `;
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
  }

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  });

  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

/* ------------------------------
   SEARCH & FILTER
------------------------------ */
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
if (searchInput) {
  searchInput.addEventListener("input", e => renderTeas(filterSelect.value, e.target.value));
}
if (filterSelect) {
  filterSelect.addEventListener("change", e => renderTeas(e.target.value, searchInput.value));
}


/* ------------------------------
   CONTACT FORM WITH FADE EFFECT
------------------------------ */
const contactForm = document.getElementById("contact-form");
const contactMsg = document.getElementById("contact-msg");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault(); 

    const name = contactForm.cname.value;
    const email = contactForm.cemail.value;
    const message = contactForm.message.value;

    contactMsg.textContent = `Thank you, ${name}! Your message has been sent.`;

    // add class fade-in
    contactMsg.classList.add("fade-in");

    contactForm.reset();

    setTimeout(() => {
      contactMsg.classList.remove("fade-in");
      contactMsg.textContent = "";
    }, 4000);
  });
}



/* ------------------------------
   INITIALIZE
------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  renderFavorites();
  renderTeas();
});
