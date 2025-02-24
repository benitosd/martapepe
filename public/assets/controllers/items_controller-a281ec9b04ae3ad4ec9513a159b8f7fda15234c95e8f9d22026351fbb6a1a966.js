import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "itemType", "itemTypeType", "material", "thickness",
    "colour", "provider", "size", "realCode", "realDescription"
  ];

  connect() {
    console.log("Controlador Stimulus conectado.");
    // Inicializa los valores antiguos en el dataset
    this.initDataset();
  }

  initDataset() {
    // Guarda los valores actuales como valores "antiguos" en el dataset
    this.element.dataset.lastItemTypeId = this.itemTypeTarget.value || "";
    this.element.dataset.lastItemTypeTypeId = this.itemTypeTypeTarget.value || "";
    this.element.dataset.lastMaterialId = this.materialTarget.value || "";
    this.element.dataset.lastThicknessId = this.thicknessTarget.value || "";
    this.element.dataset.lastColourId = this.colourTarget.value || "";
    this.element.dataset.lastProviderId = this.providerTarget.value || "";
    this.element.dataset.lastSizeId = this.sizeTarget.value || "";
  }

  async sendRequest(endpoint, extraParams = {}) {
    const params = {
      item_type_id: this.itemTypeTarget.value || "",
      material_id: this.materialTarget.value || "",
      thickness_id: this.thicknessTarget.value || "",
      colour_id: this.colourTarget.value || "",
      item_type_type_id: this.itemTypeTypeTarget.value || "",
      provider_id: this.providerTarget.value || "",
      size_id: this.sizeTarget.value || "",
      last_item_type_id: this.element.dataset.lastItemTypeId || "",
      last_item_type_type_id: this.element.dataset.lastItemTypeTypeId || "",
      last_material_id: this.element.dataset.lastMaterialId || "",
      last_thickness_id: this.element.dataset.lastThicknessId || "",
      last_colour_id: this.element.dataset.lastColourId || "",
      last_provider_id: this.element.dataset.lastProviderId || "",
      last_size_id: this.element.dataset.lastSizeId || "",
      ...extraParams
    };

    try {
      const response = await fetch(`${endpoint}?${new URLSearchParams(params)}`);
      if (!response.ok) throw new Error("Error al cargar datos");
      const data = await response.json();

      // Actualiza selects y campos dinámicos
      if (data.materialSelectHtml) this.materialTarget.innerHTML = data.materialSelectHtml;
      if (data.colourSelectHtml) this.colourTarget.innerHTML = data.colourSelectHtml;
      if (data.thicknessSelectHtml) this.thicknessTarget.innerHTML = data.thicknessSelectHtml;
      if (data.itemTypeTypeSelectHtml) this.itemTypeTypeTarget.innerHTML = data.itemTypeTypeSelectHtml;
      if (data.providerSelectHtml) this.providerTarget.innerHTML = data.providerSelectHtml;
      if (data.sizeSelectHtml) this.sizeTarget.innerHTML = data.sizeSelectHtml;

      // Actualiza campos de texto
      if (data.realCode) this.realCodeTarget.value = data.realCode;
      if (data.realDescription) this.realDescriptionTarget.value = data.realDescription;

      // Actualiza los valores antiguos
      this.updateLastValues();
    } catch (error) {
      console.error(error);
      alert("Error al procesar la solicitud.");
    }
  }

  updateLastValues() {
    // Almacena los valores actuales como los "últimos" valores en el dataset
    this.element.dataset.lastItemTypeId = this.itemTypeTarget.value || "";
    this.element.dataset.lastItemTypeTypeId = this.itemTypeTypeTarget.value || "";
    this.element.dataset.lastMaterialId = this.materialTarget.value || "";
    this.element.dataset.lastThicknessId = this.thicknessTarget.value || "";
    this.element.dataset.lastColourId = this.colourTarget.value || "";
    this.element.dataset.lastProviderId = this.providerTarget.value || "";
    this.element.dataset.lastSizeId = this.sizeTarget.value || "";
  }

  // Métodos onchange
  updateItemType() {
    this.sendRequest("/items_material_by_item_type", { reset_dependents: true });
    this.resetToPrompt(); // Opcional: Resetea otros selects si es necesario
  }

  updateItemTypeType() {
    this.sendRequest("/items_colour_by_item_type");
  }

  updateMaterial() {
    this.sendRequest("/items_colour_by_item_type");
  }

  updateThickness() {
    this.sendRequest("/items_colour_by_item_type");
  }

  updateColour() {
    this.sendRequest("/items_colour_by_item_type");
  }

  updateProvider() {
    this.sendRequest("/items_colour_by_item_type");
  }

  updateSize() {
    this.sendRequest("/items_colour_by_item_type");
  }

  resetToPrompt() {
    // Resetea todos los selects menos itemType
    [this.itemTypeTypeTarget, this.materialTarget, this.thicknessTarget, this.colourTarget, this.providerTarget, this.sizeTarget].forEach((target) => {
      const promptOption = target.querySelector("option[value='']");
      if (promptOption) promptOption.selected = true;
    });
  }
};
