import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "nameText",
    "descriptionText",
    "nameInput",
    "descriptionInput",
    "editButton",
    "saveButton",
    "cancelButton",
  ];
  static values = { id: Number };

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

  async save() {
    // Obtener los valores del formulario
    const name = this.nameInputTarget.value;
    const description = this.descriptionInputTarget.value;

    // Realizar la solicitud para guardar los datos
    try {
      const response = await fetch(`/families/${this.idValue}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/vnd.turbo-stream.html",
        },
        body: JSON.stringify({
          family: {
            name: name,
            description: description,
          },
        }),
      });

      if (response.ok) {
        // Turbo reemplaza automáticamente el contenido si la respuesta incluye un Turbo Stream
        const turboStream = await response.text();
        Turbo.renderStreamMessage(turboStream);
      } else {
        console.error("Save failed:", response.statusText);
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
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
