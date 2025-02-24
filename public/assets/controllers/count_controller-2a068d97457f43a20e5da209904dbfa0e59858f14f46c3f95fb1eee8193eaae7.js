import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["count"];

  handleDelete(event) {
    const confirmed = confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (!confirmed) {
      event.preventDefault(); // Evita la eliminación si el usuario cancela
    } else {
      fetch(event.target.href, {
        method: "DELETE",
        headers: { "X-CSRF-Token": document.querySelector("[name='csrf-token']").content },
      })
        .then((response) => {
          if (response.ok) {
            this.updateCount(-1); // Llama a la función para restar 1
            event.target.closest("tr").remove(); // Elimina la fila de la tabla
          } else {
            alert("No se pudo eliminar.");
          }
        })
        .catch((error) => console.error("Error eliminando:", error));
      event.preventDefault(); // Evita la recarga de página
    }
  }

  updateCount(delta) {
    if (this.hasCountTarget) {
      const currentValue = parseInt(this.countTarget.textContent.trim(), 10) || 0;
      this.countTarget.textContent = currentValue + delta;
    }
  }
};
