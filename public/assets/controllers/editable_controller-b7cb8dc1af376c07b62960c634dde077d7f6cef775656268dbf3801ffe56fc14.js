import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["nameText", "descriptionText", "nameInput", "descriptionInput", "editButton", "saveButton", "cancelButton"];

  edit() {
    // Mostrar campos de entrada
    this.nameInputTarget.classList.remove("d-none");
    this.descriptionInputTarget.classList.remove("d-none");

    // Ocultar texto
    this.nameTextTarget.classList.add("d-none");
    this.descriptionTextTarget.classList.add("d-none");

    // Mostrar botones Save y Cancel
    this.saveButtonTarget.classList.remove("d-none");
    this.cancelButtonTarget.classList.remove("d-none");

    // Ocultar botón Edit
    this.editButtonTarget.classList.add("d-none");
  }

  save() {
    // Obtener los valores del formulario
    const name = this.nameInputTarget.value;
    const description = this.descriptionInputTarget.value;

    // Aquí puedes enviar los datos al servidor mediante Fetch o AJAX.
    // Actualiza el texto con los nuevos valores:
    this.nameTextTarget.textContent = name;
    this.descriptionTextTarget.textContent = description;

    // Cambiar al estado de solo lectura
    this.resetView();
  }

  cancel() {
    // Restaurar el estado inicial
    this.resetView();
  }

  resetView() {
    // Ocultar campos de entrada
    this.nameInputTarget.classList.add("d-none");
    this.descriptionInputTarget.classList.add("d-none");

    // Mostrar texto
    this.nameTextTarget.classList.remove("d-none");
    this.descriptionTextTarget.classList.remove("d-none");

    // Ocultar botones Save y Cancel
    this.saveButtonTarget.classList.add("d-none");
    this.cancelButtonTarget.classList.add("d-none");

    // Mostrar botón Edit
    this.editButtonTarget.classList.remove("d-none");
  }
};
