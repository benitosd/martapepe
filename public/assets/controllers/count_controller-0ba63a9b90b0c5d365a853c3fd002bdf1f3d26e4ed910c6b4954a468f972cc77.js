import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["count"]; // Selecciona el campo count

  updateCount(delta) {
    if (this.hasCountTarget) {
      const currentValue = parseInt(this.countTarget.textContent.trim(), 10) || 0;
      this.countTarget.textContent = currentValue + delta;
    }
  }

  handleDelete(event) {
    const confirmed = confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (!confirmed) {
      event.preventDefault();
    } else {
      fetch(event.target.href, {
        method: "DELETE",
        headers: { "X-CSRF-Token": document.querySelector("[name='csrf-token']").content },
      })
        .then(response => {
          if (response.ok) {
            this.updateCount(-1);
            event.target.closest("tr").remove(); // Elimina la fila de la tabla
          } else {
            alert("No se pudo eliminar.");
          }
        })
        .catch(error => console.error("Error eliminando:", error));
      event.preventDefault();
    }
  }
};
