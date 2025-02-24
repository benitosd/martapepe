import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "itemType",
    "material",
    "thickness",
    "colour",
    "provider",
    "size",
    "realCode",
    "realDescription",
  ];

  connect() {
    console.log("Controlador Stimulus conectado para Items.");
  }

  async sendRequest(endpoint, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${endpoint}?${queryString}`);

      if (!response.ok) {
        throw new Error("Error en la solicitud al servidor.");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  }

  async updateItemType(event) {
    const itemTypeId = event.target.value;
    const lastItemTypeId = this.data.get("itemTypeId") || "";

    // Actualiza el dataset con los valores actuales
    this.data.set("itemTypeId", itemTypeId);
    this.data.set("lastItemId", lastItemTypeId);

    try {
      const data = await this.sendRequest("/material_by_item_type", {
        item_type_id: itemTypeId,
        last_item_id: lastItemTypeId,
      });

      this.updateSelect(this.materialTarget, data.materialSelectHtml);
      this.updateSelect(this.thicknessTarget, data.thicknessSelectHtml);
      this.updateSelect(this.colourTarget, data.colourSelectHtml);
      this.updateSelect(this.providerTarget, data.providerSelectHtml);
      this.updateSelect(this.sizeTarget, data.sizeSelectHtml);

      this.updateRealFields(data.realCode, data.realDescription);
    } catch (error) {
      console.error("Error al actualizar el Item Type:", error);
    }
  }

  updateSelect(target, html) {
    target.innerHTML = html;
  }

  updateRealFields(code, description) {
    this.realCodeTarget.value = code || "";
    this.realDescriptionTarget.value = description || "";
  }
};
