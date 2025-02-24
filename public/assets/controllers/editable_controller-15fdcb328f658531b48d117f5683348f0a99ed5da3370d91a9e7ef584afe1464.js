import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["field"];
  static values = { url: String };

  edit(event) {
    event.preventDefault();

    // Convierte cada campo editable en un input
    this.fieldTargets.forEach((field) => {
      const attributeName = field.dataset.editableField;
      if (!attributeName) {
        console.error("Missing data-editable-field on", field);
        return;
      }

      const input = document.createElement("input");
      input.type = "text";
      input.name = `family[${attributeName}]`;
      input.value = field.textContent.trim();
      input.dataset.editableTarget = "field";
      field.replaceWith(input); // Reemplaza el campo con el input
    });

    // Oculta el botón "Edit" y muestra "Save"
    const editButton = event.target;
    editButton.classList.add("d-none");

    const saveButton = this.element.querySelector('button[type="submit"]');
    saveButton.classList.remove("d-none");
  }

  async save(event) {
    event.preventDefault();

    const form = this.element.querySelector("form");
    if (!form) {
      console.error("No form found");
      return;
    }

    // Debug: Muestra los valores del formulario
    console.log(
      "Form inputs:",
      Array.from(form.elements).map((input) => ({
        name: input.name,
        value: input.value,
      }))
    );

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
