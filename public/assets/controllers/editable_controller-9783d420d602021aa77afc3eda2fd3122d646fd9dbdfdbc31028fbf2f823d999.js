import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "namePText",
    "descriptionText",
    "namePInput",
    "descriptionInput",
    "actions",
  ];

  edit() {
    // Reemplazar botones por "Guardar" y "Cancelar"
    this.actionsTarget.innerHTML = `
      <button class="btn btn-success btn-sm" data-action="click->editable#save">Guardar</button>
      <button class="btn btn-danger btn-sm" data-action="click->editable#cancel">Cancelar</button>
    `;

    // Mostrar los inputs
    this.namePInputTarget.classList.remove("d-none");
    this.descriptionInputTarget.classList.remove("d-none");

    // Ocultar los textos
    this.namePTextTarget.classList.add("d-none");
    this.descriptionTextTarget.classList.add("d-none");
  }

  save() {
    // Lógica para guardar los cambios
    const name = this.namePInputTarget.value;
    const description = this.descriptionInputTarget.value;

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
          this.namePTextTarget.textContent = name;
          this.descriptionTextTarget.textContent = description;
          this.resetActions();
        } else {
          alert("No se pudo guardar.");
        }
      })
      .catch((error) => console.error("Error guardando:", error));
  }

  cancel() {
    // Restaurar la vista inicial
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

    // Restaurar los textos
    this.namePTextTarget.classList.remove("d-none");
    this.descriptionTextTarget.classList.remove("d-none");

    // Ocultar los inputs
    this.namePInputTarget.classList.add("d-none");
    this.descriptionInputTarget.classList.add("d-none");
  }
};
