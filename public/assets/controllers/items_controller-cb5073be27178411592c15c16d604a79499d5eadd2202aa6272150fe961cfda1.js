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

  async updateItemType(event) {
    const itemTypeId = event.target.value;
    const lastItemTypeId = this.data.get("itemTypeId") || "";
    const codeFirst = this.data.get("codeFirst") || "";

    // Actualiza el dataset con los valores actuales
    this.data.set("itemTypeId", itemTypeId);
    this.data.set("lastItemId", lastItemTypeId);
    this.data.set("codeFirst", codeFirst);

    try {
      const data = await this.sendRequest("/items_material_by_item_type", {
        item_type_id: itemTypeId,
        last_item_id: lastItemTypeId,
        codeFirst: codeFirst,
      });

      this.updateSelect(this.materialTarget, data.materialSelectHtml);
      this.updateSelect(this.itemTypeTypeTarget, data.itemTypeTypeSelectHtml);
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
  async updateItemTypeType(event) {
    const itemTypeTypeId = event.target.value;
    const lastMaterialId = this.data.get("materialId") || "";
    const lastItemTypeTypeId = this.data.get("itemTypeTypeId") || "";
    const lastItemTypeId = this.data.get("itemTypeId") || "";
    const lastProviderId = this.data.get("providerId") || "";
    const lastThicknessId = this.data.get("thicknessId") || "";
    const lastSizeId = this.data.get("sizeId") || "";
    const lastColourId = this.data.get("colourId") || "";
    const codeFirst = this.data.get("codeFirst") || "";
    // Actualiza el dataset con los valores actuales
    this.data.set("itemTypeTypeId", itemTypeTypeId);
    this.data.set("lastMaterialId", lastMaterialId);
    this.data.set("lastItemTypeId", lastItemTypeTypeId);
    this.data.set("lastItemId", lastItemTypeId);
    this.data.set("lastProviderId", lastProviderId);
    this.data.set("lastThicknessId", lastThicknessId);
    this.data.set("lastSizeId", lastSizeId);
    this.data.set("lastColourId", lastColourId);
    this.data.set("codeFirst", codeFirst);
 
    try {
      const data = await this.sendRequest("/items_colour_by_item_type", {
        last_material_id: lastMaterialId,
        item_type_type_id: itemTypeTypeId,
        last_item_type_id: lastItemTypeTypeId,
        item_type_id: lastItemTypeId,
        last_colour_id: lastColourId,
        last_thickness_id: lastThicknessId,
        last_size_id: lastSizeId,
        last_provider_id: lastProviderId,
        codeFirst: codeFirst,
      });

      
      this.updateRealFields(data.realCode, data.realDescription);
    } catch (error) {
      console.error("Error al actualizar el Item Type Type:", error);
    }
  }
  async updateMaterial(event) {
    const materialId = event.target.value;
    const lastMaterialId = this.data.get("materialId") || "";
    const lastItemTypeTypeId = this.data.get("itemTypeTypeId") || "";
    const lastItemTypeId = this.data.get("itemTypeId") || "";
    const lastProviderId = this.data.get("providerId") || "";
    const lastThicknessId = this.data.get("thicknessId") || "";
    const lastSizeId = this.data.get("sizeId") || "";
    const lastColourId = this.data.get("colourId") || "";
    
    const codeFirst = this.data.get("codeFirst") || "";
    // Actualiza el dataset con los valores actuales
    this.data.set("materialId", materialId);
    this.data.set("lastMaterialId", lastMaterialId);
    this.data.set("lastItemTypeTypeId", lastItemTypeTypeId);
    this.data.set("lastItemTypeId", lastItemTypeTypeId);
    this.data.set("lastItemId", lastItemTypeId);
    this.data.set("lastProviderId", lastProviderId);
    this.data.set("lastThicknessId", lastThicknessId);
    this.data.set("lastSizeId", lastSizeId);
    this.data.set("lastColourId", lastColourId);
    this.data.set("codeFirst", codeFirst);
 
    try {
      const data = await this.sendRequest("/items_colour_by_item_type", {
        material_id: materialId,
        last_material_id: lastMaterialId,
        last_item_type_id: lastItemTypeTypeId,
        item_type_id: lastItemTypeId,
        last_colour_id: lastColourId,
        last_thickness_id: lastThicknessId,
        last_size_id: lastSizeId,
        last_provider_id: lastProviderId,
        codeFirst: codeFirst,
      });

      
      this.updateRealFields(data.realCode, data.realDescription);
    } catch (error) {
      console.error("Error al actualizar el Item Type Type:", error);
    }
  }
  async updateProvider(event) {
    const providerId = event.target.value;
    const lastMaterialId = this.data.get("materialId") || "";
    const lastItemTypeTypeId = this.data.get("itemTypeTypeId") || "";
    const lastItemTypeId = this.data.get("itemTypeId") || "";
    const lastProviderId = this.data.get("providerId") || "";
    const lastThicknessId = this.data.get("thicknessId") || "";
    const lastSizeId = this.data.get("sizeId") || "";
    const lastColourId = this.data.get("colourId") || "";
    
    const codeFirst = this.data.get("codeFirst") || "";
    // Actualiza el dataset con los valores actuales
    this.data.set("providerId", providerId);
    this.data.set("lastMaterialId", lastMaterialId);
    this.data.set("lastItemTypeTypeId", lastItemTypeTypeId);
    this.data.set("lastItemTypeId", lastItemTypeTypeId);
    this.data.set("lastItemId", lastItemTypeId);
    this.data.set("lastProviderId", lastProviderId);
    this.data.set("lastThicknessId", lastThicknessId);
    this.data.set("lastSizeId", lastSizeId);
    this.data.set("lastColourId", lastColourId);
    this.data.set("codeFirst", codeFirst);
 
    try {
      const data = await this.sendRequest("/items_colour_by_item_type", {
        provider_id: providerId,
        last_material_id: lastMaterialId,
        last_item_type_id: lastItemTypeTypeId,
        item_type_id: lastItemTypeId,
        last_colour_id: lastColourId,
        last_thickness_id: lastThicknessId,
        last_size_id: lastSizeId,
        last_provider_id: lastProviderId,
        codeFirst: codeFirst,
      });

      
      this.updateRealFields(data.realCode, data.realDescription);
    } catch (error) {
      console.error("Error al actualizar el Item Type Type:", error);
    }
  }
  async updateThickness(event) {
    const thicknessId = event.target.value;
    const lastMaterialId = this.data.get("materialId") || "";
    const lastItemTypeTypeId = this.data.get("itemTypeTypeId") || "";
    const lastItemTypeId = this.data.get("itemTypeId") || "";
    const lastProviderId = this.data.get("providerId") || "";
    const lastThicknessId = this.data.get("thicknessId") || "";
    const lastSizeId = this.data.get("sizeId") || "";
    const lastColourId = this.data.get("colourId") || "";
    
    const codeFirst = this.data.get("codeFirst") || "";
    // Actualiza el dataset con los valores actuales
    this.data.set("thicknessId", thicknessId);
    this.data.set("lastMaterialId", lastMaterialId);
    this.data.set("lastItemTypeTypeId", lastItemTypeTypeId);
    this.data.set("lastItemTypeId", lastItemTypeTypeId);
    this.data.set("lastItemId", lastItemTypeId);
    this.data.set("lastProviderId", lastProviderId);
    this.data.set("lastThicknessId", lastThicknessId);
    this.data.set("lastSizeId", lastSizeId);
    this.data.set("lastColourId", lastColourId);
    this.data.set("codeFirst", codeFirst);
 
    try {
      const data = await this.sendRequest("/items_colour_by_item_type", {
        thickness_id: thicknessId,
        last_material_id: lastMaterialId,
        last_item_type_id: lastItemTypeTypeId,
        item_type_id: lastItemTypeId,
        last_colour_id: lastColourId,
        last_thickness_id: lastThicknessId,
        last_size_id: lastSizeId,
        last_provider_id: lastProviderId,
        codeFirst: codeFirst,
      });

      
      this.updateRealFields(data.realCode, data.realDescription);
    } catch (error) {
      console.error("Error al actualizar el Item Type Type:", error);
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
