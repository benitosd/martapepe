import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  // Define todos los targets que interactuarán con Stimulus
  static targets = [
    "itemType",
    "itemTypeType",
    "material",
    "thickness",
    "colour",
    "provider",
    "size",
    "realCode",
    "realDescription"
  ];

  connect() {
    console.log("Controlador Stimulus conectado para Items.");
  }

  // Método general para enviar solicitudes AJAX
  sendRequest(endpoint, extraParams = {}) {
    const params = {
      item_type_id: this.element.dataset.itemsItemTypeId,
      material_id: this.element.dataset.itemsMaterialId,
      thickness_id: this.element.dataset.itemsThicknessId,
      colour_id: this.element.dataset.itemsColourId,
      item_type_type_id: this.element.dataset.itemsItemTypeTypeId,
      provider_id: this.element.dataset.itemsProviderId,
      size_id: this.element.dataset.itemsSizeId,
      code_first: this.element.dataset.itemsCodeFirst,
      ...extraParams // Combina con cualquier parámetro adicional
    };

    $.get(endpoint, params)
      .done((response) => {
        console.log("Respuesta del servidor:", response);

        // Actualiza los selectores dinámicos si la respuesta los incluye
        if (response.materialSelectHtml) {
          this.materialTarget.innerHTML = response.materialSelectHtml;
        }
        if (response.colourSelectHtml) {
          this.colourTarget.innerHTML = response.colourSelectHtml;
        }
        if (response.thicknessSelectHtml) {
          this.thicknessTarget.innerHTML = response.thicknessSelectHtml;
        }
        if (response.itemTypeSelectHtml) {
          this.itemTypeTarget.innerHTML = response.itemTypeSelectHtml;
        }
        if (response.itemTypeTypeSelectHtml) {
          this.itemTypeTypeTarget.innerHTML = response.itemTypeTypeSelectHtml;
        }
        if (response.providerSelectHtml) {
          this.providerTarget.innerHTML = response.providerSelectHtml;
        }
        if (response.sizeSelectHtml) {
          this.sizeTarget.innerHTML = response.sizeSelectHtml;
        }

        // Actualiza los campos real_code y real_description
        if (response.realCode) {
          this.realCodeTarget.value = response.realCode;
        }
        if (response.realDescription) {
          this.realDescriptionTarget.value = response.realDescription;
        }
      })
      .fail(() => {
        alert("Error al cargar los datos.");
      });
  }

  // Métodos específicos para manejar los eventos onchange de cada campo
  updateItemType(event) {
    const itemTypeId = event.target.value;
    this.sendRequest("/items_material_by_item_type", { item_type_id: itemTypeId });
  }

  updateItemTypeType(event) {
    const itemTypeTypeId = event.target.value;
    this.sendRequest("/items_colour_by_item_type", { item_type_type_id: itemTypeTypeId });
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
