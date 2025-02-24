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
  updatedData[input.dataset.editableField] = input.value;
});

// Obtiene la URL base y el recurso del atributo data-editable-resource
const resource = this.element.dataset.editableResource;
const resourceId = this.element.dataset.editableId;

// Construye la URL dinámicamente
const url = `/${resource}/${resourceId}`;

fetch(url, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
  },
  body: JSON.stringify({ [resource.singularize]: updatedData }), // Singulariza el recurso para el payload
})
  .then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then((data) => {
    this.fieldTextTargets.forEach((text) => {
      const field = text.dataset.editableField;
      text.textContent = data[field];
    });

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
