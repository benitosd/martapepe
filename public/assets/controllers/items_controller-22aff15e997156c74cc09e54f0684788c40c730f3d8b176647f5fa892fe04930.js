import { Controller } from "@hotwired/stimulus"
import $ from "jquery"

import { Controller } from "@hotwired/stimulus";
import axios from "axios";

export default class extends Controller {
  static targets = [
    "itemType", "material", "thickness", "colour", "provider", "size", "realCode", "realDescription"
  ];

  connect() {
    console.log("Stimulus conectado");
  }

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
      ...extraParams
    };

    axios
      .get(endpoint, { params })
      .then((response) => {
        this.updateFields(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
      });
  }

  updateFields(data) {
    if (data.materialSelectHtml) {
      this.materialTarget.innerHTML = data.materialSelectHtml;
    }
    if (data.colourSelectHtml) {
      this.colourTarget.innerHTML = data.colourSelectHtml;
    }
    if (data.thicknessSelectHtml) {
      this.thicknessTarget.innerHTML = data.thicknessSelectHtml;
    }
    if (data.itemTypeSelectHtml) {
      this.itemTypeTarget.innerHTML = data.itemTypeSelectHtml;
    }
    if (data.providerSelectHtml) {
      this.providerTarget.innerHTML = data.providerSelectHtml;
    }
    if (data.sizeSelectHtml) {
      this.sizeTarget.innerHTML = data.sizeSelectHtml;
    }
    if (data.realCode) {
      this.realCodeTarget.value = data.realCode;
    }
    if (data.realDescription) {
      this.realDescriptionTarget.value = data.realDescription;
    }
  }

  updateItemType(event) {
    const itemTypeId = event.target.value;
    this.sendRequest("/items/material_by_item_type", { item_type_id: itemTypeId });
  }

  updateMaterial(event) {
    const materialId = event.target.value;
    this.sendRequest("/items/colour_by_item_type", { material_id: materialId });
  }

  updateThickness(event) {
    const thicknessId = event.target.value;
    this.sendRequest("/items/colour_by_item_type", { thickness_id: thicknessId });
  }

  updateColour(event) {
    const colourId = event.target.value;
    this.sendRequest("/items/colour_by_item_type", { colour_id: colourId });
  }

  updateProvider(event) {
    const providerId = event.target.value;
    this.sendRequest("/items/colour_by_item_type", { provider_id: providerId });
  }

  updateSize(event) {
    const sizeId = event.target.value;
    this.sendRequest("/items/colour_by_item_type", { size_id: sizeId });
  }
}
;
