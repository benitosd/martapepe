import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["text", "input", "editButton", "saveButton", "cancelButton"];

  edit() {
    // Mostrar todos los campos de entrada
    this.inputTargets.forEach((input) => input.classList.remove("d-none"));
    // Ocultar todos los textos
    this.textTargets.forEach((text) => text.classList.add("d-none"));

    // Mostrar botones Save y Cancel
    this.saveButtonTarget.classList.remove("d-none");
    this.cancelButtonTarget.classList.remove("d-none");

    // Ocultar botón Edit
    this.editButtonTarget.classList.add("d-none");
  }

  async save() {
    // Recoger los valores de entrada
    const data = {};
    this.inputTargets.forEach((input) => {
      data[input.name] = input.value;
    });

    // Obtener el ID del recurso
    const id = this.element.dataset.editableId;

    // Enviar los datos al servidor
    try {
      const response = await fetch(`/destination_t_ty_types/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        },
        body: JSON.stringify({ destination_t_ty_type: data }),
      });

      if (response.ok) {
        // Actualizar el texto con los nuevos valores
        this.textTargets.forEach((text) => {
          const name = text.dataset.editableTarget;
          if (data[name]) {
            text.textContent = data[name];
          }
        });
        this.resetView();
      } else {
        console.error("Error al guardar los cambios.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  }

  cancel() {
    // Restaurar la vista inicial
    this.resetView();
  }

  resetView() {
    // Ocultar campos de entrada
    this.inputTargets.forEach((input) => input.classList.add("d-none"));
    // Mostrar texto
    this.textTargets.forEach((text) => text.classList.remove("d-none"));

    // Ocultar botones Save y Cancel
    this.saveButtonTarget.classList.add("d-none");
    this.cancelButtonTarget.classList.add("d-none");

    // Mostrar botón Edit
    this.editButtonTarget.classList.remove("d-none");
  }
};
