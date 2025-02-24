import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["field"];
  static values = { url: String };

  edit(event) {
    event.preventDefault();

    this.fieldTargets.forEach((field) => {
      const attributeName = field.dataset.editableField;

      if (!attributeName) {
        console.error("Missing data-editable-field on", field);
        return;
      }

      // Obtén el texto del <span>
      const fieldValue = field.textContent.trim();

      console.log(`Replacing field: ${attributeName} with value: "${fieldValue}"`, field);

      // Crea el input
      const input = document.createElement("input");
      input.type = "text";
      input.name = `family[${attributeName}]`;
      input.value = fieldValue; // Asigna el valor del <span> al input
      input.dataset.editableTarget = "field"; // Mantén el atributo target
      field.replaceWith(input); // Reemplaza el <span> con el <input>
    });

    // Cambia los botones
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

    // Debug: Verifica qué datos se están enviando
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
