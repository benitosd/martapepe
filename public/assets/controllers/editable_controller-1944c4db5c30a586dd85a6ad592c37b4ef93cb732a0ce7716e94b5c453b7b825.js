import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["view", "form"];

  edit() {
    this.viewTarget.classList.add("d-none"); // Oculta la vista de solo lectura
    this.formTarget.classList.remove("d-none"); // Muestra el formulario de edición
  }

  save(event) {
    event.preventDefault();

    // Turbo manejará el envío del formulario y la actualización del DOM.
    this.formTarget.requestSubmit();

    // El resto de la lógica se gestionará en la respuesta de Turbo Streams.
  }

  cancel() {
    this.toggleEditing(false); // Cambia de vuelta al modo de solo lectura
  }

  toggleEditing(editing) {
    if (editing) {
      this.viewTarget.classList.add("d-none");
      this.formTarget.classList.remove("d-none");
    } else {
      this.viewTarget.classList.remove("d-none");
      this.formTarget.classList.add("d-none");
    }
  }
};
