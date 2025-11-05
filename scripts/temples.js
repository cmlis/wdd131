document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-links");
  const title = document.querySelector(".header-inner h1");
  const yearSpan = document.getElementById("year");
  const lastModifiedSpan = document.getElementById("lastModified");


  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
  }

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
