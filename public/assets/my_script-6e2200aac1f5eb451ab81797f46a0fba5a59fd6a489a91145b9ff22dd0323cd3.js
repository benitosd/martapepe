// Test if jquery is loaded by typing $.fn.jquery in the console as per
// https://stackoverflow.com/questions/6973941/how-to-check-what-version-of-jquery-is-loaded/26674265#26674265

// This function runs on every page "load"
document.addEventListener("turbo:load", () => {
  // Inicializar popovers
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  [...popoverTriggerList].forEach((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));

  // Asegúrate de que el body no tenga la clase 'sb-sidenav-toggled' al cargar
  document.body.classList.remove("sb-sidenav-toggled");

  // Elementos clave
  const sidebarToggle = document.body.querySelector("#sidebarToggle");

  const adjustLayout = () => {
    const isToggled = document.body.classList.contains("sb-sidenav-toggled");
    document.body.style.setProperty("--sidenav-width", isToggled ? "0px" : "250px");
  };

  if (sidebarToggle) {
    // Manejar el clic del botón de toggle
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      adjustLayout();
    });

    // Ajustar el diseño inicial
    adjustLayout();
  }
});



  
		
