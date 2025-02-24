import { Controller } from "@hotwired/stimulus"
import $ from "jquery"

export default class extends Controller {
  static targets = ["itemType", "material", "thickness", "colour", "provider", "size"]

  connect() {
    console.log("Stimulus conectado");
  }

  sendRequest(endpoint, extraParams = {}) {
    // Captura todos los datos necesarios del dataset y combina con los parámetros extra
    const params = {
      item_type_id: this.element.dataset.itemsItemTypeId,
      material_id: this.element.dataset.itemsMaterialId,
      thickness_id: this.element.dataset.itemsThicknessId,
      colour_id: this.element.dataset.itemsColourId,
      item_type_type_id: this.element.dataset.itemsItemTypeTypeId,
      provider_id: this.element.dataset.itemsProviderId,
      size_id: this.element.dataset.itemsSizeId,
      code_first: this.element.dataset.codeFirst
      
    };

    // Realiza la solicitud AJAX usando jQuery
    $.get(endpoint, params)
      .done((response) => {
        console.log("Respuesta del servidor:", response);

        // Ejemplo: Actualizar dinámicamente el contenido de un selector
        if (response.material_types) {
          const materialSelect = this.element.querySelector("#material_type_id");
          materialSelect.innerHTML = ""; // Limpia el contenido anterior
          response.material_types.forEach((material) => {
            materialSelect.innerHTML += `<option value="${material.id}">${material.description}</option>`;
          });
        }
      })
      .fail(() => {
        alert("Error al cargar los datos.");
      });
  }

  updateItemType(event) {
    const itemTypeId = event.target.value;
    this.sendRequest("/items_material_by_item_type", { item_type_id: itemTypeId });
  }

  updateMaterial(event) {
    const materialId = event.target.value;
    this.sendRequest("/items_colour_by_item_type", { material_id: materialId });
  }

  updateThickness(event) {
    const thicknessId = event.target.value;
    this.sendRequest("/items_colour_by_item_type", { thickness_id: thicknessId });
  }

  updateColour(event) {
    const colourId = event.target.value;
    this.sendRequest("/items_colour_by_item_type", { colour_id: colourId });
  }

  updateProvider(event) {
    const providerId = event.target.value;
    this.sendRequest("/items_colour_by_item_type", { provider_id: providerId });
  }

  updateSize(event) {
    const sizeId = event.target.value;
    this.sendRequest("/items_colour_by_item_type", { size_id: sizeId });
  }
};
