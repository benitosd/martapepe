import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["field"];
  static values = { url: String };

  edit(event) {
    event.preventDefault();

    const field = event.target.closest("form").querySelector("[data-editable-target='field']");
    const attributeName = field.dataset.editableField;

    if (!attributeName) {
      console.error("Missing data-editable-field on", field);
      return;
    }

    const fieldValue = field.textContent.trim();

    const input = document.createElement("input");
    input.type = "text";
    input.name = `family[${attributeName}]`;
    input.value = fieldValue;
    input.dataset.editableTarget = "field";

    field.replaceWith(input);

    const editButton = event.target;
    editButton.classList.add("d-none");

    const saveButton = event.target.closest("form").querySelector('button[type="submit"]');
    saveButton.classList.remove("d-none");
  }

  async save(event) {
    event.preventDefault();

    const form = event.target.closest("form");

    if (!form) {
      console.error("No form found");
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
