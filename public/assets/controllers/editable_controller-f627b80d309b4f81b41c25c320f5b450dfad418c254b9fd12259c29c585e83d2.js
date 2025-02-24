import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "namePText",
    "descriptionText",
    "actions",
  ];

  edit() {
    // Reemplazar los textos por inputs
    this.namePTextTarget.outerHTML = `
      <input type="text" name="name" value="${this.namePTextTarget.textContent.trim()}" class="form-control" data-editable-target="namePInput">
    `;
    this.descriptionTextTarget.outerHTML = `
      <input type="text" name="description" value="${this.descriptionTextTarget.textContent.trim()}" class="form-control" data-editable-target="descriptionInput">
    `;

    // Reemplazar los botones de acciones
    this.actionsTarget.innerHTML = `
      <button class="btn btn-success btn-sm" data-action="click->editable#save">Guardar</button>
      <button class="btn btn-danger btn-sm" data-action="click->editable#cancel">Cancelar</button>
    `;
  }

  save() {
    // Obtener los nuevos valores de los inputs
    const nameInput = this.element.querySelector('input[name="name"]');
    const descriptionInput = this.element.querySelector('input[name="description"]');

    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();

    // Enviar datos al servidor
    fetch(`/families/${this.element.dataset.editableId}`, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ family: { name, description } }),
    })
      .then((response) => {
        if (response.ok) {
          // Reemplazar los inputs con los nuevos textos
          nameInput.outerHTML = `<span class="editable-text" data-editable-target="namePText">${name}</span>`;
          descriptionInput.outerHTML = `<span class="editable-text" data-editable-target="descriptionText">${description}</span>`;
          this.resetActions();
        } else {
          alert("No se pudo guardar.");
        }
      })
      .catch((error) => console.error("Error guardando:", error));
  }

  cancel() {
    // Restaurar los textos originales
    const nameInput = this.element.querySelector('input[name="name"]');
    const descriptionInput = this.element.querySelector('input[name="description"]');

    nameInput.outerHTML = `
      <span class="editable-text" data-editable-target="namePText">${nameInput.defaultValue}</span>
    `;
    descriptionInput.outerHTML = `
      <span class="editable-text" data-editable-target="descriptionText">${descriptionInput.defaultValue}</span>
    `;

    this.resetActions();
  }

  delete() {
    if (confirm("¿Seguro que deseas eliminar este elemento?")) {
      fetch(`/families/${this.element.dataset.editableId}`, {
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
