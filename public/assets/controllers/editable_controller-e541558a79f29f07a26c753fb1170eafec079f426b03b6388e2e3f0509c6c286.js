import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["field"];
  static values = { url: String };

  edit(event) {
    event.preventDefault();

    // Encuentra el formulario asociado
    const form = event.target.closest("form");
    if (!form) {
      console.error("No form found for edit action");
      return;
    }

    // Reemplaza los spans por inputs dentro del formulario
    this.fieldTargets.forEach((field) => {
      const attributeName = field.dataset.editableField;
      const input = document.createElement("input");
      input.type = "text";
      input.name = `family[${attributeName}]`;
      input.value = field.textContent.trim();
      input.dataset.editableTarget = "field";
      field.replaceWith(input);
    });

    // Oculta el botón "Edit" y muestra "Save"
    const editButton = form.querySelector('button[data-action="click->editable#edit"]');
    const saveButton = form.querySelector('button[type="submit"]');

    if (editButton) editButton.classList.add("d-none");
    if (saveButton) saveButton.classList.remove("d-none");
  }

  async save(event) {
    event.preventDefault();

    const form = event.target.closest("form");
    if (!form) {
      console.error("No form found for save action");
      return;
    }

    const response = await fetch(form.action, {
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
