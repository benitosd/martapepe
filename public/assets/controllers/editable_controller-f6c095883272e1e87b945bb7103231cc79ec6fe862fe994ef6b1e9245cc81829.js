import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["field"]; // Define los elementos "field" como targets
  static values = { url: String };

  edit(event) {
    event.preventDefault();
  
    // Reemplaza cada campo con un input editable
    this.fieldTargets.forEach((field) => {
      const name = field.dataset.editableField; // Nombre del atributo (name, description, etc.)
      const attributeName = field.dataset.editableField;
  console.log(`Replacing field: ${attributeName}`, field);

  if (!attributeName) {
    console.error("Missing data-editable-field on", field);
    return;
  }
      const input = document.createElement("input");
      input.type = "text";
      input.name = `family[${name}]`; // Define el nombre para los parámetros del formulario
      input.description = `family[${description}]`;
      input.value = field.textContent.trim(); // Asigna el valor actual del texto
      input.dataset.editableTarget = "field"; // Mantiene el atributo target para Stimulus
      field.replaceWith(input); // Reemplaza el <span> con el <input>
    });
  
    // Oculta el botón "Edit" y muestra "Save"
    const editButton = event.target;
    editButton.classList.add("d-none");
  
    const saveButton = this.element.querySelector('button[type="submit"]');
    saveButton.classList.remove("d-none");
  }
  async save(event) {
    event.preventDefault();

    const form = this.element.querySelector("form"); // Encuentra el formulario más cercano
    console.log("Form inputs:", [...form.elements].map(input => ({ name: input.name, value: input.value })));


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
