import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["fieldText", "fieldInput", "editButton", "saveButton", "cancelButton"];

  edit() {
    // Mostrar campos de entrada
    this.fieldInputTargets.forEach((input) => input.classList.remove("d-none"));
    this.fieldTextTargets.forEach((text) => text.classList.add("d-none"));

    // Mostrar botones Save y Cancel
    this.saveButtonTarget.classList.remove("d-none");
    this.cancelButtonTarget.classList.remove("d-none");

    // Ocultar botón Edit
    this.editButtonTarget.classList.add("d-none");
  }

  save() {
    // Construir los datos a enviar
    const updatedData = {};
    this.fieldInputTargets.forEach((input) => {
      const field = input.dataset.editableField;
      updatedData[field] = input.value;
    });

    // Obtener el recurso y el ID del elemento
    const resource = this.element.dataset.editableResource;
    const id = this.element.dataset.editableId;

    // Enviar los datos al servidor
    fetch(`/${resource}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        // Actualizar los campos de texto con los nuevos valores
        this.fieldTextTargets.forEach((text) => {
          const field = text.dataset.editableField;
          text.textContent = data[field];
        });

        // Restaurar vista inicial
        this.resetView();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  cancel() {
    // Restaurar el estado inicial
    this.resetView();
  }

  resetView() {
    // Ocultar campos de entrada
    this.fieldInputTargets.forEach((input) => input.classList.add("d-none"));
    this.fieldTextTargets.forEach((text) => text.classList.remove("d-none"));

    // Ocultar botones Save y Cancel
    this.saveButtonTarget.classList.add("d-none");
    this.cancelButtonTarget.classList.add("d-none");

    // Mostrar botón Edit
    this.editButtonTarget.classList.remove("d-none");
  }
};
