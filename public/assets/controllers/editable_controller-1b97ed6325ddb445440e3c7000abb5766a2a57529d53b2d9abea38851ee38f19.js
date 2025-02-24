import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["view", "form"];

  edit() {
    this.viewTarget.classList.add("d-none"); // Oculta la vista de solo lectura
    this.formTarget.classList.remove("d-none"); // Muestra el formulario de edición
  }

  save(event) {
    event.preventDefault();
  
    const form = event.target;
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        "X-Requested-With": "Turbo-Stream"
      }
    })
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
    })
    .catch((error) => console.error("Error:", error));
  }

  cancel() {
    this.toggleEditing(false); // Cambia de vuelta al modo de solo lectura
  }

  toggleEditing(editing) {
    if (editing) {
      this.viewTarget.classList.add("d-none");
      this.formTarget.classList.remove("d-none");
    } else {
      this.viewTarget.classList.remove("d-none");
      this.formTarget.classList.add("d-none");
    }
  }
};
