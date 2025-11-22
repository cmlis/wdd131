document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-links");
  const title = document.querySelector(".header-inner h1");




  // HAMBURGER MENU
  if (hamburger && navMenu && title) {
    const toggleMenu = () => {
      navMenu.classList.toggle("open");
      hamburger.textContent = navMenu.classList.contains("open") ? "✖" : "☰";

      if (window.innerWidth < 700) {
        title.style.display = navMenu.classList.contains("open") ? "none" : "block";
      } else {
    
        title.style.display = "block";
      }
    };

    hamburger.addEventListener("click", toggleMenu);

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 700) {
        title.style.display = "block";
        navMenu.classList.remove("open");
        //reset
        hamburger.textContent = "☰"; 
      }
    });
  }
});


const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Add more temple objects here...
  {
    templeName: "Campinas Brazil",
    location: "Campinas, Brazil",
    dedicated: "2002, May, 17",
    area: 48600,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/campinas-brazil-temple/campinas-brazil-temple-6012-main.jpg"
  },

 {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/_temp/017-S%C3%A3o-Paulo-Brazil-Temple.jpg"
  },

  {
    templeName: "Santiago Chile",
    location: "Santiago, Chile",
    dedicated: "1983, September, 15",
    area: 20831,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/_temp/024-Santiago-Chile-Temple.jpg"
  },
  
  {
    templeName: "Orem Utah Temple",
    location: "Orem, Utah",
    dedicated: "2024, January, 2024",
    area: 20831,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/orem-utah-temple/orem-utah-temple-39549-main.jpg"
  }
];



// Select the gallery container
const gallery = document.querySelector(".gallery");

// Function to create and display temple cards
function displayTemples(filteredList) {
  gallery.innerHTML = ""; // Clear previous items

  filteredList.forEach((temple) => {
    const card = document.createElement("figure");

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";

    const caption = document.createElement("figcaption");
    caption.innerHTML = `
      <strong>${temple.templeName}</strong><br>
      Location: ${temple.location}<br>
      Dedicated: ${temple.dedicated}<br>
      Area: ${temple.area.toLocaleString()} sq ft
    `;

    card.appendChild(img);
    card.appendChild(caption);
    gallery.appendChild(card);
  });
}

// Initial load: show all
displayTemples(temples);



// OLD — temples built before 1900
function filterOld() {
  const oldTemples = temples.filter(t => {
    const year = parseInt(t.dedicated.split(",")[0]);
    return year < 1900;
  });
  displayTemples(oldTemples);
}

// NEW — temples built after 2000
function filterNew() {
  const newTemples = temples.filter(t => {
    const year = parseInt(t.dedicated.split(",")[0]);
    return year > 2000;
  });
  displayTemples(newTemples);
}

// LARGE — more than 90,000 sq ft
function filterLarge() {
  const largeTemples = temples.filter(t => t.area > 90000);
  displayTemples(largeTemples);
}

// SMALL — smaller than 10,000 sq ft
function filterSmall() {
  const smallTemples = temples.filter(t => t.area < 10000);
  displayTemples(smallTemples);
}


const navLinks = document.querySelectorAll("#nav-links a");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const selection = link.textContent.trim();

    if (selection === "Home") displayTemples(temples);
    if (selection === "Old") filterOld();
    if (selection === "New") filterNew();
    if (selection === "Large") filterLarge();
    if (selection === "Small") filterSmall();
  });
});
