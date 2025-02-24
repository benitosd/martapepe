import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  load(event) {
    event.preventDefault();

    const url = event.currentTarget.dataset.url; // Obtén la URL del atributo data-url
    const modalId = event.currentTarget.dataset.bsTarget; // Obtén el ID del modal
    const modalContent = document.querySelector(`${modalId} .modal-content`); // Selecciona el contenido del modal

    // Limpia el contenido del modal mientras carga
    modalContent.innerHTML = `
      <div class="modal-header">
        <h5 class="modal-title">Cargando...</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    `;

    // Realiza la solicitud Fetch
    fetch(url, { headers: { "Turbo-Frame": "modalContent" } })
      .then((response) => {
        if (response.ok) {
          return response.text(); // Devuelve el contenido HTML del servidor
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      })
      .then((html) => {
        modalContent.innerHTML = html; // Inserta el contenido en el modal
      })
      .catch((error) => {
        console.error("Error cargando el formulario:", error);
        modalContent.innerHTML = `
          <div class="modal-body">
            <p class="text-danger">No se pudo cargar el formulario. Intenta nuevamente.</p>
          </div>
        `;
      });
  }
};
