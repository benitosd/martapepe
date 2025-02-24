// Test if jquery is loaded by typing $.fn.jquery in the console as per
// https://stackoverflow.com/questions/6973941/how-to-check-what-version-of-jquery-is-loaded/26674265#26674265

// This function runs on every page "load"
document.addEventListener("turbo:load", () => {
  // Inicializar popovers
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));

  // Inicializar el toggle de la barra lateral
  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  const layoutSidenavContent = document.querySelector("#layoutSidenav_content");
  const layoutSidenav = document.querySelector(".sb-sidenav");

  const updateLayout = () => {
    const isToggled = document.body.classList.contains("sb-sidenav-toggled");

    if (isToggled) {
      layoutSidenav.style.width = "0px";
      layoutSidenavContent.style.marginLeft = "0px";
    } else {
      layoutSidenav.style.width = "250px"; // Ajusta según el ancho de tu sidebar
      layoutSidenavContent.style.marginLeft = "250px";
    }
  };

  if (sidebarToggle) {
    // Mantener el estado entre sesiones si está habilitado
    if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
      document.body.classList.add('sb-sidenav-toggled');
    }

    updateLayout(); // Aplicar estado inicial

    sidebarToggle.addEventListener('click', (event) => {
      event.preventDefault();
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      updateLayout(); // Ajustar el diseño dinámicamente
    });
  }
});

  
		
