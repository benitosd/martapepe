import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["modalContent"];

  connect() {
    console.log("Modal controller connected");
  }

  load(event) {
    const button = event.relatedTarget; // Botón que activó el modal
    const url = button.dataset.url; // Obtén la URL del atributo data-url
    const modalContent = this.modalContentTarget;

    // Limpia el contenido previo y muestra un spinner
    modalContent.innerHTML = `
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
    `;

    // Realiza la solicitud Fetch para cargar el formulario
    fetch(url, { headers: { "Turbo-Frame": "modalContent" } })
      .then((response) => {
        if (response.ok) return response.text();
        throw new Error(`Error: ${response.status}`);
      })
      .then((html) => {
        modalContent.innerHTML = html; // Inserta el formulario en el modal
      })
      .catch((error) => {
        console.error("Error cargando el formulario:", error);
        modalContent.innerHTML = `<p class="text-danger">No se pudo cargar el formulario.</p>`;
      });
  }
}
