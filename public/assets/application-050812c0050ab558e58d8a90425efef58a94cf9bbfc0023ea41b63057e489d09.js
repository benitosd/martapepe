// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "jquery";
import "jquery_ujs";
import "@popperjs/core";
import "bootstrap";
import "@fortawesome/fontawesome-free";
import "my_script";
import "flatpickr"
import "corejs-typeahead"


document.addEventListener("DOMContentLoaded", () => {
    const clearButton = document.getElementById("clear-button");
    const form = document.getElementById("search-form");
  
    if (clearButton && form) {
      clearButton.addEventListener("click", () => {
        // Resetea los valores de todos los campos del formulario
        form.reset();
  
        // Opcional: Limpiar los parámetros en la URL sin recargar
        const url = new URL(window.location.href);
        url.searchParams.delete("width_min");
        url.searchParams.delete("width_max");
        url.searchParams.delete("height_min");
        url.searchParams.delete("height_max");
        history.replaceState(null, null, url.toString());
      });
    }
  });
