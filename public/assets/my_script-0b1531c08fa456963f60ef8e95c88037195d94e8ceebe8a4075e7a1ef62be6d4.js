// Test if jquery is loaded by typing $.fn.jquery in the console as per
// https://stackoverflow.com/questions/6973941/how-to-check-what-version-of-jquery-is-loaded/26674265#26674265

// This function runs on every page "load"
document.addEventListener("turbo:load", () => {
  // Inicializar popovers
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));

  // Elementos clave
  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  const body = document.body;

  const adjustLayout = () => {
    if (body.classList.contains("sb-sidenav-toggled")) {
      body.style.setProperty("--sidenav-width", "0px");
    } else {
      body.style.setProperty("--sidenav-width", "250px"); // Ajusta al ancho de tu barra lateral
    }
  };

  if (sidebarToggle) {
    // Restaurar el estado desde localStorage
    if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
      body.classList.add('sb-sidenav-toggled');
    }
    adjustLayout();

    sidebarToggle.addEventListener('click', (event) => {
      event.preventDefault();
      body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', body.classList.contains('sb-sidenav-toggled'));
      adjustLayout();
    });
  }
});


  
		
