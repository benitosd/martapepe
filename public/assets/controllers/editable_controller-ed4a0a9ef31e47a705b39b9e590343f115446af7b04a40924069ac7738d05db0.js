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
      input.dataset.editableTarget = "field"; // Marca como nuevo target
      field.replaceWith(input);
    });
  
    // Verifica si el botón "Save" ya existe (para evitar duplicados)
    if (!this.element.querySelector('button[data-action="click->editable#save"]')) {
      // Agrega botón para guardar
      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.setAttribute("type", "submit");
      saveButton.setAttribute("data-action", "click->editable#save"); // Acción Stimulus
      this.element.appendChild(saveButton);
    }
  }

  async save(event) {
    event.preventDefault();

    const formData = new FormData(this.element);
    const response = await fetch(this.urlValue, {
      method: "PATCH",
      body: formData,
      headers: { Accept: "text/vnd.turbo-stream.html" },
    });

    if (response.ok) {
      // Turbo maneja automáticamente la respuesta Turbo Stream
      Turbo.renderStreamMessage(await response.text());
    } else {
      console.error("Save failed");
    }
  }
};
