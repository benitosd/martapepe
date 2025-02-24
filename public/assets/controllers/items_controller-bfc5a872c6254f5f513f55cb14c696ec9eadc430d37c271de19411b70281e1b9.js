import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "itemType",
    "itemTypeType",
    "material",
    "thickness",
    "colour",
    "provider",
    "size",
    "realCode",
    "realDescription",
    "codeFirst"
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

  getDatasetValues() {
    return {
      materialId: this.data.get("materialId") || "",
      itemTypeTypeId: this.data.get("itemTypeTypeId") || "",
      itemTypeId: this.data.get("itemTypeId") || "",
      providerId: this.data.get("providerId") || "",
      thicknessId: this.data.get("thicknessId") || "",
      sizeId: this.data.get("sizeId") || "",
      colourId: this.data.get("colourId") || "",
      codeFirst: this.data.get("codeFirst") || "",
    };
  }

  async updateField(event, endpoint, params = {}) {
    const fieldId = event.target.value;
    const datasetValues = this.getDatasetValues();

    // Actualizar valores en el dataset
    this.data.set(event.target.name, fieldId);

    try {
      const data = await this.sendRequest(endpoint, { ...datasetValues, ...params, [event.target.name]: fieldId });

      // Actualizar los selects dinámicamente
      if (data.materialSelectHtml) this.updateSelect(this.materialTarget, data.materialSelectHtml);
      if (data.itemTypeTypeSelectHtml) this.updateSelect(this.itemTypeTypeTarget, data.itemTypeTypeSelectHtml);
      if (data.thicknessSelectHtml) this.updateSelect(this.thicknessTarget, data.thicknessSelectHtml);
      if (data.colourSelectHtml) this.updateSelect(this.colourTarget, data.colourSelectHtml);
      if (data.providerSelectHtml) this.updateSelect(this.providerTarget, data.providerSelectHtml);
      if (data.sizeSelectHtml) this.updateSelect(this.sizeTarget, data.sizeSelectHtml);

      // Actualizar campos reales
      this.updateRealFields(data.realCode, data.realDescription);
    } catch (error) {
      console.error("Error al actualizar los campos:", error);
    }
  }

  updateItemType(event) {
    this.updateField(event, "/items_material_by_item_type", {});
  }

  updateItemTypeType(event) {
    this.updateField(event, "/items_colour_by_item_type", {});
  }

  updateMaterial(event) {
    this.updateField(event, "/items_colour_by_item_type", {});
  }

  updateProvider(event) {
    this.updateField(event, "/items_colour_by_item_type", {});
  }

  updateThickness(event) {
    this.updateField(event, "/items_colour_by_item_type", {});
  }

  updateSize(event) {
    this.updateField(event, "/items_colour_by_item_type", {});
  }

  updateColour(event) {
    this.updateField(event, "/items_colour_by_item_type", {});
  }

  updateSelect(target, html) {
    target.innerHTML = html;
  }

  updateRealFields(code, description) {
    if (this.hasRealCodeTarget) this.realCodeTarget.value = code || "";
    if (this.hasRealDescriptionTarget) this.realDescriptionTarget.value = description || "";
  }
};
