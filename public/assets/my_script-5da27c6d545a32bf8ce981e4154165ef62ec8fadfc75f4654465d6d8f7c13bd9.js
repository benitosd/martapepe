// Test if jquery is loaded by typing $.fn.jquery in the console as per
// https://stackoverflow.com/questions/6973941/how-to-check-what-version-of-jquery-is-loaded/26674265#26674265

// This function runs on every page "load"
document.addEventListener("turbo:load", () => {
  const fixedCards = document.querySelector(".fixed-cards");
  
  const updateCardsPosition = () => {
    const sidebarToggled = document.body.classList.contains("sb-sidenav-toggled");
    if (sidebarToggled) {
      fixedCards.style.paddingRight = "15.5rem !important;"; // Ajusta al ancho de tu barra lateral
    } else {
      fixedCards.style.paddingRight = "1.5rem !important;";
    }
  };

  // Inicializa al cargar la página
  updateCardsPosition();
  const sidebarToggle = document.body.querySelector("#sidebarToggle");

  // Mantener el estado del sidebar entre sesiones
  if (localStorage.getItem("sb|sidebar-toggle") === "true") {
    document.body.classList.add("sb-sidenav-toggled");
  }

  // Configurar evento para alternar la barra lateral
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem("sb|sidebar-toggle", document.body.classList.contains("sb-sidenav-toggled"));
    });
  }
});

		
