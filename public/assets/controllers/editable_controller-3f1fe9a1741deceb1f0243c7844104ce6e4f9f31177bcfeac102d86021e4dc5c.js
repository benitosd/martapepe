import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["view", "form"];

  edit() {
    this.viewTarget.classList.add("d-none"); // Oculta la vista de solo lectura
    this.formTarget.classList.remove("d-none"); // Muestra el formulario de edición
  }

  save(event) {
    event.preventDefault();

    // Enviar el formulario con Turbo
    this.formTarget.requestSubmit(); // Turbo gestiona automáticamente la respuesta y renderiza el Turbo Stream

    // Opcional: Puedes manejar el feedback visual si necesitas hacerlo manualmente.
  }

  cancel() {
    this.viewTarget.classList.remove("d-none"); // Muestra la vista de solo lectura
    this.formTarget.classList.add("d-none"); // Oculta el formulario de edición
  }
};
