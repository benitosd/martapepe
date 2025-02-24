import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["text", "input", "actions"];
  static values = { resourceName: String, resourceId: Number, endpoint: String };

  edit() {
    // Reemplazar textos por inputs
    this.textTargets.forEach((textTarget) => {
      const fieldName = textTarget.dataset.field; // Obtener el nombre del campo
      const value = textTarget.textContent.trim();
      textTarget.outerHTML = `
        <input type="text" name="${fieldName}" value="${value}" class="form-control editable-input" data-editable-target="input" data-field="${fieldName}">
      `;
    });

    // Reemplazar botones de acciones
    this.actionsTarget.innerHTML = `
      <button class="btn btn-success btn-sm" data-action="click->editable#save">Guardar</button>
      <button class="btn btn-danger btn-sm" data-action="click->editable#cancel">Cancelar</button>
    `;
  }

  save() {
    // Obtener los nuevos valores de los inputs
    const inputs = this.element.querySelectorAll('input[data-editable-target="input"]');
    const updatedData = {};

    inputs.forEach((input) => {
      const fieldName = input.getAttribute("name");
      updatedData[fieldName] = input.value.trim();
    });

    // Enviar datos al servidor
    fetch(`${this.endpointValue}/${this.resourceIdValue}`, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [this.resourceNameValue]: updatedData }),
    })
      .then((response) => {
        if (response.ok) {
          // Reemplazar los inputs con los nuevos textos
          inputs.forEach((input) => {
            const fieldName = input.getAttribute("name");
            input.outerHTML = `
              <span class="editable-text" data-editable-target="text" data-field="${fieldName}">${input.value}</span>
            `;
          });
          this.resetActions();
        } else {
          alert("No se pudo guardar.");
        }
      })
      .catch((error) => console.error("Error guardando:", error));
  }

  cancel() {
    // Restaurar los textos originales
    const inputs = this.element.querySelectorAll('input[data-editable-target="input"]');
    inputs.forEach((input) => {
      const fieldName = input.getAttribute("name");
      const originalValue = input.defaultValue;
      input.outerHTML = `
        <span class="editable-text" data-editable-target="text" data-field="${fieldName}">${originalValue}</span>
      `;
    });

    this.resetActions();
  }

  delete() {
    if (confirm("¿Seguro que deseas eliminar este elemento?")) {
      fetch(`${this.endpointValue}/${this.resourceIdValue}`, {
        method: "DELETE",
        headers: { "X-CSRF-Token": document.querySelector("[name='csrf-token']").content },
      })
        .then((response) => {
          if (response.ok) {
            this.element.remove(); // Elimina la fila
          } else {
            alert("No se pudo eliminar el elemento.");
          }
        })
        .catch((error) => console.error("Error eliminando:", error));
    }
  }

  resetActions() {
    // Reemplazar botones por "Editar" y "Eliminar"
    this.actionsTarget.innerHTML = `
      <button class="btn btn-warning btn-sm" data-action="click->editable#edit">Editar</button>
      <button class="btn btn-danger btn-sm" data-action="click->editable#delete">Eliminar</button>
    `;
  }
};
