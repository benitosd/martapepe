import { Controller } from "@hotwired/stimulus"
import $ from "jquery" // Asegúrate de tener jQuery disponible

export default class extends Controller {
  static targets = ["itemType", "itemTypeType", "material", "thickness", "colour", "provider", "size"]

  connect() {
    console.log("Stimulus conectado");
  }

  updateItemType(event) {
    const itemTypeId = event.target.value;
    if (!itemTypeId) return;

    const url = `/items_material_by_item_type?item_type_id=${itemTypeId}`;
    this.sendRequest(url);
  }

  updateItemTypeType(event) {
    const itemTypeTypeId = event.target.value;
    if (!itemTypeTypeId) return;

    const url = `/items_colour_by_item_type?item_type_type_id=${itemTypeTypeId}`;
    this.sendRequest(url);
  }

  updateMaterial(event) {
    const materialId = event.target.value;
    if (!materialId) return;

    const url = `/items_material_by_item_type?material_id=${materialId}`;
    this.sendRequest(url);
  }

  updateThickness(event) {
    const thicknessId = event.target.value;
    if (!thicknessId) return;

    const url = `/items_colour_by_item_type?thickness_id=${thicknessId}`;
    this.sendRequest(url);
  }

  updateColour(event) {
    const colourId = event.target.value;
    if (!colourId) return;

    const url = `/items_colour_by_item_type?colour_id=${colourId}`;
    this.sendRequest(url);
  }

  updateProvider(event) {
    const providerId = event.target.value;
    if (!providerId) return;

    const url = `/items_colour_by_item_type?provider_id=${providerId}`;
    this.sendRequest(url);
  }

  updateSize(event) {
    const sizeId = event.target.value;
    if (!sizeId) return;

    const url = `/items_colour_by_item_type?size_id=${sizeId}`;
    this.sendRequest(url);
  }

  sendRequest(url) {
    $.get(url)
      .done((response) => {
        console.log("Respuesta del servidor:", response);
        // Aquí puedes actualizar elementos del DOM si es necesario
      })
      .fail(() => {
        alert("Error al cargar los datos.");
      });
  }
};
