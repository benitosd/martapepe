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
    "realDescription"
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

  async updateField(event, endpoint, datasetKeys, updateTargets) {
    const currentFieldId = event.target.value;

    // Actualizar valores en el dataset
    datasetKeys.forEach((key) => {
      this.data.set(key, this.data.get(key) || "");
    });
    this.data.set(datasetKeys[0], currentFieldId); // Actualiza el campo actual

    // Construir parámetros
    const params = Object.fromEntries(
      datasetKeys.map((key) => [key, this.data.get(key)])
    );

    try {
      const data = await this.sendRequest(endpoint, params);

      // Actualizar selects dinámicamente
      updateTargets.forEach((target, index) => {
        if (data[target]) {
          this[`${datasetKeys[index]}Target`].innerHTML = data[target];
        }
      });

      // Actualizar campos reales
      this.updateRealFields(data.realCode, data.realDescription);
    } catch (error) {
      console.error("Error al actualizar los campos:", error);
    }
  }

  updateItemType(event) {
    this.updateField(
      event,
      "/items_material_by_item_type",
      ["itemTypeId", "lastItemId"],
      [
        "materialSelectHtml",
        "itemTypeTypeSelectHtml",
        "thicknessSelectHtml",
        "colourSelectHtml",
        "providerSelectHtml",
        "sizeSelectHtml"
      ]
    );
  }

  updateItemTypeType(event) {
    this.updateField(
      event,
      "/items_colour_by_item_type",
      ["itemTypeTypeId", "lastMaterialId", "lastItemTypeId"],
      []
    );
  }

  updateMaterial(event) {
    this.updateField(
      event,
      "/items_colour_by_item_type",
      ["materialId", "lastMaterialId", "lastItemTypeId"],
      []
    );
  }

  updateSelect(target, html) {
    target.innerHTML = html;
  }

  updateRealFields(code, description) {
    this.realCodeTarget.value = code || "";
    this.realDescriptionTarget.value = description || "";
  }
};
