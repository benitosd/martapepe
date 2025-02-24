import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["field"];
  static values = { url: String };

  edit(event) {
    event.preventDefault();
  
    // Convierte cada campo en un input editable
    this.fieldTargets.forEach((field) => {
      const name = field.dataset.editableField;
      const input = document.createElement("input");
      input.type = "text";
      input.name = `family[${name}]`;
      input.value = field.textContent.trim();
      input.dataset.editableTarget = "field";
      field.replaceWith(input);
    });
  
    // Cambia el botón "Edit" a "Save"
    const editButton = event.target; // Botón "Edit"
    editButton.textContent = "Save";
    editButton.setAttribute("data-action", "click->editable#save");
  }
  
  if (response.ok) {
    Turbo.renderStreamMessage(await response.text());
  } else {
    console.error("Save failed");
  }
}

};
