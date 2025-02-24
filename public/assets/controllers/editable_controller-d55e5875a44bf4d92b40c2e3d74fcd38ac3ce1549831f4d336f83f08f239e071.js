import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["field"];
  static values = { url: String };

  edit(event) {
    event.preventDefault();

    // Reemplaza los campos con inputs
    this.fieldTargets.forEach((field) => {
      const name = field.dataset.editableField;
      const input = document.createElement("input");
      input.type = "text";
      input.name = `family[${name}]`;
      input.value = field.textContent.trim();
      input.dataset.editableTarget = "field"; // Marca como nuevo target
      field.replaceWith(input);
    });

    // Mostrar botón "Save"
    this.element.querySelector('button[type="submit"]').hidden = false;
    event.target.hidden = true; // Oculta botón "Edit"
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
