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

  async updateField(event, endpoint, additionalParams = {}) {
    const fieldId = event.target.value;
    const fieldName = event.target.dataset.fieldName; // Nombre del campo actualizado
    const lastFieldId = this.data.get(fieldName) || "";
    const codeFirst = this.data.get("codeFirst") || "";

    // Actualiza el dataset con los valores actuales
    this.data.set(fieldName, fieldId);
    this.data.set(`last${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Id`, lastFieldId);
    this.data.set("codeFirst", codeFirst);

    try {
      const params = {
        [fieldName]: fieldId,
        [`last_${fieldName}`]: lastFieldId,
        codeFirst: codeFirst,
        ...additionalParams,
      };

      const data = await this.sendRequest(endpoint, params);

      // Actualiza los selects relacionados con el cambio
      this.updateDynamicFields(data);

      // Actualiza los campos de código y descripción real
      this.updateRealFields(data.realCode, data.realDescription);
    } catch (error) {
      console.error(`Error al actualizar el campo ${fieldName}:`, error);
    }
  }

  async updateItemType(event) {
    await this.updateField(event, "/items_material_by_item_type");
  }

  async updateItemTypeType(event) {
    await this.updateField(event, "/items_colour_by_item_type", {
      item_type_id: this.data.get("itemTypeId"),
    });
  }

  updateDynamicFields(data) {
    const fieldMapping = {
      materialSelectHtml: this.materialTarget,
      itemTypeTypeSelectHtml: this.itemTypeTypeTarget,
      thicknessSelectHtml: this.thicknessTarget,
      colourSelectHtml: this.colourTarget,
      providerSelectHtml: this.providerTarget,
      sizeSelectHtml: this.sizeTarget,
    };

    Object.keys(fieldMapping).forEach((key) => {
      if (data[key] && fieldMapping[key]) {
        this.updateSelect(fieldMapping[key], data[key]);
      }
    });
  }

  updateSelect(target, html) {
    if (target) {
      target.innerHTML = html;
    } else {
      console.error("Target no encontrado para actualización dinámica.");
    }
  }

  updateRealFields(code, description) {
    if (this.realCodeTarget) {
      this.realCodeTarget.value = code || "";
    }
    if (this.realDescriptionTarget) {
      this.realDescriptionTarget.value = description || "";
    }
  }
};
