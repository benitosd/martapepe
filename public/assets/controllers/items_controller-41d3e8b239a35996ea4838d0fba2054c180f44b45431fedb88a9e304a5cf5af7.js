import { Controller } from "@hotwired/stimulus"
import $ from "jquery" // Asegúrate de que jQuery está instalado

export default class extends Controller {
  static targets = ["providerSelect"] // Declaramos el objetivo del controlador

  connect() {
    console.log("Stimulus conectado");
  }

  updateProvider(event) {
    const providerId = event.target.value;

    if (!providerId) {
      console.log("Sin selección válida.");
      return;
    }

    const url = `/items_colour_by_item_type?last_provider_id=${providerId}&last_material_id=${this.element.dataset.materialId}&last_colour_id=${this.element.dataset.colourId}&last_thickness_id=${this.element.dataset.thicknessId}&last_item_type_id=${this.element.dataset.itemTypeTypeId}&last_size_id=${this.element.dataset.sizeId}&item_type_id=${this.element.dataset.itemTypeId}`;

    $.get(url)
      .done((response) => {
        console.log("Respuesta del servidor:", response);
        // Aquí puedes actualizar elementos del DOM con la respuesta
      })
      .fail(() => {
        alert("Error al cargar los datos.");
      });
  }
};
