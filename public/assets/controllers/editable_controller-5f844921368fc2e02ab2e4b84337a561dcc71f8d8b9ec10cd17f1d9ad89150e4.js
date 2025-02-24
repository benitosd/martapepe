import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["text", "input", "actions"];
  static values = { resourceName: String, resourceId: Number, endpoint: String };
  connect() {
    console.log(`Connecting controller for ID: ${this.element.dataset.editableId}`);
    this.resetInputs(); // Asegura que los inputs coincidan con los datos iniciales
  }

  resetInputs() {
    // Sincronizar valores de los inputs con los textos originales
    this.inputTargets.forEach((input) => {
      const fieldName = input.dataset.field;
      const textTarget = this.textTargets.find(
        (text) => text.dataset.field === fieldName
      );

      if (textTarget) {
        input.value = textTarget.textContent.trim();
      }
    });
  }

  edit() {
    // Verificar si ya existen inputs antes de crearlos
    this.textTargets.forEach((textTarget) => {
      const fieldName = textTarget.dataset.field;

      // Si el input ya existe, no lo volvemos a crear
      if (!textTarget.nextElementSibling || !textTarget.nextElementSibling.classList.contains("editable-input")) {
        const value = textTarget.textContent.trim();
        textTarget.insertAdjacentHTML(
          "afterend",
          `<input type="text" name="${fieldName}" value="${value}" class="form-control editable-input d-inline-block" data-editable-target="input" data-field="${fieldName}">`
        );
      } else {
        const inputTarget = textTarget.nextElementSibling;

      if (inputTarget && inputTarget.matches("input")) {
        // Mostrar input y ocultar texto
        inputTarget.classList.remove("d-none");
        textTarget.classList.add("d-none");
      }
    
      }

      // Ocultar el texto original
      textTarget.classList.add("d-none");
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
            input.previousElementSibling.textContent = input.value;
            input.previousElementSibling.classList.remove("d-none");
            input.remove(); // Eliminar input después de guardar
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
      input.previousElementSibling.classList.remove("d-none");
      input.remove(); // Eliminar el input al cancelar
    });

    this.resetActions();
  }
  delete() {
    if (confirm("¿Seguro que deseas eliminar este elemento?")) {
      fetch(`/resources/${this.element.dataset.editableId}`, {
        method: "DELETE",
        headers: { "X-CSRF-Token": document.querySelector("[name='csrf-token']").content },
      })
        .then((response) => {
          if (response.ok) {
            this.element.remove(); // Eliminar la fila
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
