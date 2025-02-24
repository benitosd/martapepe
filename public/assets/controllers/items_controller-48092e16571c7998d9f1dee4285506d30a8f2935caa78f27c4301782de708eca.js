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

  getDatasetValues(keys) {
    const values = {};
    keys.forEach((key) => {
      values[key] = this.data.get(key) || "";
    });
    return values;
  }

  async updateItemType(event) {
    const itemTypeId = event.target.value;
    const { itemTypeId: lastItemTypeId, codeFirst } = this.getDatasetValues([
      "itemTypeId",
      "codeFirst"
    ]);

    // Actualiza el dataset con los valores actuales
    this.data.set("itemTypeId", itemTypeId);
    this.data.set("lastItemId", lastItemTypeId);

    try {
      const data = await this.sendRequest("/items_material_by_item_type", {
        item_type_id: itemTypeId,
        last_item_id: lastItemTypeId,
        codeFirst
      });

      this.updateSelect(this.materialTarget, data.materialSelectHtml);
      this.updateSelect(this.itemTypeTypeTarget, data.itemTypeTypeSelectHtml);
      this.updateSelect(this.thicknessTarget, data.thicknessSelectHtml);
      this.updateSelect(this.colourTarget, data.colourSelectHtml);
      this.updateSelect(this.providerTarget, data.providerSelectHtml);
      this.updateSelect(this.sizeTarget, data.sizeSelectHtml);

      this.updateRealFields(data.realCode, data.realDescription);
    } catch (error) {
      console.error("Error al actualizar el Item Type:", error);
    }
  }

  async updateItemTypeType(event) {
    const itemTypeTypeId = event.target.value;
    const { lastMaterialId, itemTypeTypeId: lastItemTypeTypeId, itemTypeId: lastItemTypeId, codeFirst } = this.getDatasetValues([
      "lastMaterialId",
      "itemTypeTypeId",
      "itemTypeId",
      "codeFirst"
    ]);

    // Actualiza el dataset con los valores actuales
    this.data.set("itemTypeTypeId", itemTypeTypeId);

    try {
      const data = await this.sendRequest("/items_colour_by_item_type", {
        item_type_type_id: itemTypeTypeId,
        last_material_id: lastMaterialId,
        last_item_type_id: lastItemTypeTypeId,
        item_type_id: lastItemTypeId,
        codeFirst
      });

      this.updateRealFields(data.realCode, data.realDescription);
    } catch (error) {
      console.error("Error al actualizar el Item Type Type:", error);
    }
  }

  async updateMaterial(event) {
    const materialId = event.target.value;
    const { lastMaterialId, itemTypeTypeId: lastItemTypeTypeId, itemTypeId: lastItemTypeId, codeFirst } = this.getDatasetValues([
      "lastMaterialId",
      "itemTypeTypeId",
      "itemTypeId",
      "codeFirst"
    ]);

    // Actualiza el dataset con los valores actuales
    this.data.set("materialId", materialId);

    try {
      const data = await this.sendRequest("/items_colour_by_item_type", {
        material_id: materialId,
        last_material_id: lastMaterialId,
        last_item_type_id: lastItemTypeTypeId,
        item_type_id: lastItemTypeId,
        codeFirst
      });

      this.updateRealFields(data.realCode, data.realDescription);
    } catch (error) {
      console.error("Error al actualizar el Material:", error);
    }
  }

  updateSelect(target, html) {
    target.innerHTML = html;
  }

  updateRealFields(code, description) {
    if (this.hasRealCodeTarget) {
      this.realCodeTarget.value = code || "";
    }
    if (this.hasRealDescriptionTarget) {
      this.realDescriptionTarget.value = description || "";
    }
  }
};
