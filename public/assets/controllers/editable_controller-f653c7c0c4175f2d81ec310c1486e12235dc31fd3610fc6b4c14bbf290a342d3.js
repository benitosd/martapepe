import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["field"];
  static values = { url: String };

  edit(event) {
    event.preventDefault();

    // Reemplaza cada campo con un input para edición
    this.fieldTargets.forEach((field) => {
      const name = field.dataset.editableField;
      const input = document.createElement("input");
      input.type = "text";
      input.name = `family[${name}]`;
      input.value = field.textContent.trim();
      input.dataset.editableTarget = "field";
      field.replaceWith(input);
    });

    // Agrega un botón de guardar
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.setAttribute("type", "submit");
    saveButton.setAttribute("data-action", "click->editable#save");
    this.element.appendChild(saveButton);
  }

  async save(event) {
    event.preventDefault();

    const token = document.querySelector('meta[name="csrf-token"]').content;
    const formData = new FormData(this.element);

    const response = await fetch(this.urlValue, {
      method: "PATCH",
      body: formData,
      headers: {
        "Accept": "text/vnd.turbo-stream.html",
        "X-CSRF-Token": token,
      },
    });

    if (response.ok) {
      Turbo.renderStreamMessage(await response.text());
    } else {
      console.error("Save failed");
    }
  }
};
