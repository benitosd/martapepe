import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "namePText",
    "descriptionText",
    "namePInput",
    "descriptionInput",
    "editButton",
    "deleteButton",
    "saveButton",
    "cancelButton",
  ];

  edit() {
    this.element.classList.add("d-none"); // Oculta todo el tr
    setTimeout(() => {
      this.namePInputTarget.classList.remove("d-none");
      this.descriptionInputTarget.classList.remove("d-none");
      this.namePTextTarget.classList.add("d-none");
      this.descriptionTextTarget.classList.add("d-none");
      this.saveButtonTarget.classList.remove("d-none");
      this.cancelButtonTarget.classList.remove("d-none");
      this.editButtonTarget.classList.add("d-none");
      this.element.classList.remove("d-none"); // Vuelve a mostrar el tr
    }, 200); // Pequeña pausa para el efecto
  }

  cancel() {
    this.resetView();
  }

  save() {
    // Lógica para guardar
    this.resetView();
  }

  delete() {
    if (confirm("¿Seguro que deseas eliminar este elemento?")) {
      fetch(`/families/${this.element.dataset.editableId}`, {
        method: "DELETE",
        headers: { "X-CSRF-Token": document.querySelector("[name='csrf-token']").content },
      })
        .then((response) => {
          if (response.ok) {
            this.element.classList.add("d-none"); // Oculta todo el tr inmediatamente
          } else {
            alert("No se pudo eliminar el elemento.");
          }
        })
        .catch((error) => console.error("Error eliminando:", error));
    }
  }

  resetView() {
    this.namePInputTarget.classList.add("d-none");
    this.descriptionInputTarget.classList.add("d-none");
    this.namePTextTarget.classList.remove("d-none");
    this.descriptionTextTarget.classList.remove("d-none");
    this.saveButtonTarget.classList.add("d-none");
    this.cancelButtonTarget.classList.add("d-none");
    this.editButtonTarget.classList.remove("d-none");
  }
};
