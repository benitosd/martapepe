import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["field"];
  static values = { url: String };

  edit(event) {
    event.preventDefault();

    this.fieldTargets.forEach((field) => {
      const name = field.dataset.editableField;
      const input = document.createElement("input");
      input.type = "text";
      input.name = `family[${name}]`;
      input.value = field.textContent.trim();
      input.dataset.editableTarget = "field";
      field.replaceWith(input);
    });

    const editButton = event.target;
    editButton.classList.add("d-none");

    const saveButton = this.element.querySelector('button[type="submit"]');
    saveButton.classList.remove("d-none");
  }


  async save(event) {
  event.preventDefault();

  // Obtén el token CSRF del meta tag
  const token = document.querySelector('meta[name="csrf-token"]').content;

  const formData = new FormData(this.element);
  const response = await fetch(this.urlValue, {
    method: "PATCH",
    body: formData,
    headers: {
      "Accept": "text/vnd.turbo-stream.html",
      "X-CSRF-Token": token, // Agrega el token CSRF
    },
  });

  if (response.ok) {
    Turbo.renderStreamMessage(await response.text());
  } else {
    console.error("Save failed");
  }
}

};
