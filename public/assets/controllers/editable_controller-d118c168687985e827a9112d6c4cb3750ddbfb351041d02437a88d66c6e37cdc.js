import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["field"];
  static values = { url: String };

  edit(event) {
    event.preventDefault();

    // Convierte los campos en inputs editables
    this.fieldTargets.forEach((field) => {
      const name = field.dataset.editableField; // Obtiene el nombre del campo
      const input = document.createElement("input");
      input.type = "text";
      input.name = `family[${name}]`;
      input.value = field.textContent.trim(); // Asigna el valor actual al input
      input.dataset.editableTarget = "field"; // Mantiene el target
      field.replaceWith(input); // Reemplaza el span con el input
    });

    // Cambia el botón "Edit" a "Save"
    const editButton = event.target;
    editButton.classList.add("d-none");

    const saveButton = this.element.querySelector('button[type="submit"]');
    saveButton.classList.remove("d-none");
  }

  async save(event) {
    event.preventDefault();

    const form = this.element.closest("form");
    const response = await fetch(this.urlValue, {
      method: "PATCH",
      body: new FormData(form),
      headers: { Accept: "text/vnd.turbo-stream.html" },
    });

    if (response.ok) {
      Turbo.renderStreamMessage(await response.text());
    } else {
      console.error("Save failed");
    }
  }
};
