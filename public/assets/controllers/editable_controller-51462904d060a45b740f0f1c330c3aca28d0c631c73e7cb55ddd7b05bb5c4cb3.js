import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["fieldText", "fieldInput", "editButton", "saveButton", "cancelButton"];
  static values = { id: String, resource: String };

  edit() {
    this.toggleEditing(true);
  }

  save() {
    const updatedData = {};

    this.fieldInputTargets.forEach((input) => {
      const field = input.dataset.editableField;
      updatedData[field] = input.value;
    });
    console.log("ID:", this.element.dataset.editableId);
    console.log("Resource:", this.resourceValue);
    
    // Enviar datos al servidor
    fetch(`/${this.element.dataset.editableResource}/${this.element.dataset.editableId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
      },
      body: JSON.stringify({ [this.resourceValue.slice(0, -1)]: updatedData }), // Ajuste singular del recurso
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error en la respuesta de la red.");
        return response.json();
      })
      .then((data) => {
        // Actualizar los campos con los nuevos valores
        this.fieldTextTargets.forEach((text) => {
          const field = text.dataset.editableField;
          text.textContent = data[field];
        });

        // Salir del modo de edición
        this.toggleEditing(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  cancel() {
    // Restaurar valores originales
    this.fieldInputTargets.forEach((input) => {
      const field = input.dataset.editableField;
      input.value = this.element.querySelector(`[data-editable-field="${field}"]`).textContent.trim();
    });

    this.toggleEditing(false);
  }

  toggleEditing(editing) {
    this.fieldInputTargets.forEach((input) => input.classList.toggle("d-none", !editing));
    this.fieldTextTargets.forEach((text) => text.classList.toggle("d-none", editing));
    this.saveButtonTarget.classList.toggle("d-none", !editing);
    this.cancelButtonTarget.classList.toggle("d-none", !editing);
    this.editButtonTarget.classList.toggle("d-none", editing);
  }
};
