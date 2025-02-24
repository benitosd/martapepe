// Test if jquery is loaded by typing $.fn.jquery in the console as per
// https://stackoverflow.com/questions/6973941/how-to-check-what-version-of-jquery-is-loaded/26674265#26674265

// This function runs on every page "load"
document.addEventListener("turbo:load", () => {
  // Inicializar popovers
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  [...popoverTriggerList].forEach((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));

  // Elementos clave
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  const body = document.body;

  const adjustLayout = () => {
    if (body.classList.contains("sb-sidenav-toggled")) {
      body.style.setProperty("--sidenav-width", "0px");
    } else {
      body.style.setProperty("--sidenav-width", "250px"); // Ajusta el ancho de tu barra lateral
    }
  };

  if (sidebarToggle) {
    // Inicializar el layout sin `sb-sidenav-toggled`
    adjustLayout();

    // Manejar el clic del botón de toggle
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      body.classList.toggle("sb-sidenav-toggled");
      adjustLayout();
    });
  }
});


  
		
