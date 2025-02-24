import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    itemTypeId: String,
    lastItemTypeId: String,
    materialId: String,
    thicknessId: String,
    colourId: String,
    providerId: String,
    sizeId: String,
    codeFirst: String,
  };

  connect() {
    console.log("Controlador Stimulus conectado.");
  }

  async sendRequest(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${endpoint}?${queryString}`);
    if (!response.ok) throw new Error("Error en la solicitud.");
    return await response.json();
  }

  async updateItemType(event) {
    const itemTypeId = event.target.value;
    const lastItemTypeId = this.itemTypeIdValue;

    this.itemTypeIdValue = itemTypeId;
    this.lastItemTypeIdValue = lastItemTypeId;

    try {
      const data = await this.sendRequest("/items/material_by_item_type", {
        item_type_id: itemTypeId,
        last_item_id: lastItemTypeId,
      });

      this.updateSelect("#material_select", data.materialSelectHtml);
      this.updateSelect("#thickness_select", data.thicknessSelectHtml);
      this.updateSelect("#colour_select", data.colourSelectHtml);
      this.updateSelect("#provider_select", data.providerSelectHtml);
      this.updateSelect("#size_select", data.sizeSelectHtml);

      this.updateRealFields(data.realCode, data.realDescription);
    } catch (error) {
      console.error("Error al actualizar el Item Type:", error);
    }
  }

  updateSelect(selector, html) {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = html;
  }

  updateRealFields(realCode, realDescription) {
    if (realCode) this.realCodeTarget.value = realCode;
    if (realDescription) this.realDescriptionTarget.value = realDescription;
  }
};
