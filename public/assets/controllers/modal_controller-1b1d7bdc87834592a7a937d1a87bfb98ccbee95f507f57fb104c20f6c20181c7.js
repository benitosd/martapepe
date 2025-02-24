import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["modalContent"];

  load(event) {
    const url = event.currentTarget.dataset.url;
    const modalId = event.currentTarget.dataset.bsTarget;
    const modalContent = document.querySelector(`${modalId} .modal-content`);

    // Hacer una solicitud para cargar el formulario
    fetch(url, { headers: { "Turbo-Frame": modalId } })
      .then((response) => response.text())
      .then((html) => {
        modalContent.innerHTML = html;
      })
      .catch((error) => {
        modalContent.innerHTML = `<p class="text-danger">Error cargando el formulario.</p>`;
        console.error("Error:", error);
      });
  }
};
