import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["field"]; // Define los elementos "field" como targets
  static values = { url: String };

  edit(event) {
    event.preventDefault();

    // Reemplaza cada campo con un input
    this.fieldTargets.forEach((field) => {
      const name = field.dataset.editableField; // Obtiene el nombre del campo
      const input = document.createElement("input");
      input.type = "text";
      input.name = `family[${name}]`; // Define el nombre del input
      input.value = field.textContent.trim(); // Asigna el valor actual al input
      input.dataset.editableTarget = "field"; // Mantiene el target para Stimulus
      field.replaceWith(input); // Reemplaza el span por el input
    });

    // Oculta el botón "Edit" y muestra el botón "Save"
    const editButton = event.target;
    editButton.classList.add("d-none");

    const saveButton = this.element.querySelector('button[type="submit"]');
    saveButton.classList.remove("d-none");
  }

  async save(event) {
    event.preventDefault();

    const form = this.element.closest("form"); // Encuentra el formulario más cercano
    console.log("Form found:", form);

    if (!form) {
      console.error("No form found in the current context");
      return;
    }
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
