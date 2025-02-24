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

  resetToPrompt(excludeTarget) {
    // Resetea los selects excepto el especificado
    [
      this.hasMaterialTarget && this.materialTarget,
      this.hasThicknessTarget && this.thicknessTarget,
      this.hasColourTarget && this.colourTarget,
      this.hasProviderTarget && this.providerTarget,
      this.hasSizeTarget && this.sizeTarget,
      this.hasItemTypeTypeTarget && this.itemTypeTypeTarget
    ]
      .filter(Boolean)
      .forEach((target) => {
        if (target !== excludeTarget) {
          const prompt = target.querySelector("option[value='']");
          if (prompt) {
            prompt.selected = true;
          }
        }
      });
  }

  updateDataset(field, value) {
    // Actualiza el valor de dataset con el último valor seleccionado
    this.element.dataset[`items${field.charAt(0).toUpperCase() + field.slice(1)}Id`] = value;
  }

  async sendRequest(endpoint, extraParams = {}) {
    const params = {
      item_type_id: this.element.dataset.itemsItemTypeId || null,
      material_id: this.element.dataset.itemsMaterialId || null,
      thickness_id: this.element.dataset.itemsThicknessId || null,
      colour_id: this.element.dataset.itemsColourId || null,
      item_type_type_id: this.element.dataset.itemsItemTypeTypeId || null,
      provider_id: this.element.dataset.itemsProviderId || null,
      size_id: this.element.dataset.itemsSizeId || null,
      code_first: this.element.dataset.itemsCodeFirst || null,
      ...extraParams // Combina con cualquier parámetro adicional
    };

    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${endpoint}?${queryString}`);
      if (!response.ok) {
        throw new Error("Error en la solicitud al servidor.");
      }
      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      // Actualiza los selects dinámicos con los datos de la respuesta
      if (this.hasMaterialTarget && data.materialSelectHtml) {
        this.materialTarget.innerHTML = data.materialSelectHtml;
      }
      if (this.hasColourTarget && data.colourSelectHtml) {
        this.colourTarget.innerHTML = data.colourSelectHtml;
      }
      if (this.hasThicknessTarget && data.thicknessSelectHtml) {
        this.thicknessTarget.innerHTML = data.thicknessSelectHtml;
      }
      if (this.hasItemTypeTarget && data.itemTypeSelectHtml) {
        this.itemTypeTarget.innerHTML = data.itemTypeSelectHtml;
      }
      if (this.hasItemTypeTypeTarget && data.itemTypeTypeSelectHtml) {
        this.itemTypeTypeTarget.innerHTML = data.itemTypeTypeSelectHtml;
      }
      if (this.hasProviderTarget && data.providerSelectHtml) {
        this.providerTarget.innerHTML = data.providerSelectHtml;
      }
      if (this.hasSizeTarget && data.sizeSelectHtml) {
        this.sizeTarget.innerHTML = data.sizeSelectHtml;
      }

      // Actualiza los campos real_code y real_description
      if (this.hasRealCodeTarget && data.realCode) {
        this.realCodeTarget.value = data.realCode;
      }
      if (this.hasRealDescriptionTarget && data.realDescription) {
        this.realDescriptionTarget.value = data.realDescription;
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      alert("Error al cargar los datos.");
    }
  }

  // Métodos para manejar los eventos de cada select y actualizar sus valores
  updateItemType(event) {
    const itemTypeId = event.target.value;

    // Actualiza el dataset con el nuevo valor de item_type_id
    this.updateDataset("itemType", itemTypeId);

    // Resetea todos los campos dependientes a nulo excepto este
    this.resetToPrompt(this.itemTypeTarget);

    // Envía la solicitud
    this.sendRequest("/items_material_by_item_type", { item_type_id: itemTypeId });
  }

  updateItemTypeType(event) {
    const itemTypeTypeId = event.target.value;

    // Actualiza el dataset con el nuevo valor
    this.updateDataset("itemTypeType", itemTypeTypeId);

    // Envía la solicitud
    this.sendRequest("/items_colour_by_item_type", { item_type_type_id: itemTypeTypeId });
  }

  updateMaterial(event) {
    const materialId = event.target.value;

    // Actualiza el dataset con el nuevo valor
    this.updateDataset("material", materialId);

    // Envía la solicitud
    this.sendRequest("/items_colour_by_item_type", { material_id: materialId });
  }

  updateThickness(event) {
    const thicknessId = event.target.value;

    // Actualiza el dataset con el nuevo valor
    this.updateDataset("thickness", thicknessId);

    // Envía la solicitud
    this.sendRequest("/items_colour_by_item_type", { thickness_id: thicknessId });
  }

  updateColour(event) {
    const colourId = event.target.value;

    // Actualiza el dataset con el nuevo valor
    this.updateDataset("colour", colourId);

    // Envía la solicitud
    this.sendRequest("/items_colour_by_item_type", { colour_id: colourId });
  }

  updateProvider(event) {
    const providerId = event.target.value;

    // Actualiza el dataset con el nuevo valor
    this.updateDataset("provider", providerId);

    // Envía la solicitud
    this.sendRequest("/items_colour_by_item_type", { provider_id: providerId });
  }

  updateSize(event) {
    const sizeId = event.target.value;

    // Actualiza el dataset con el nuevo valor
    this.updateDataset("size", sizeId);

    // Envía la solicitud
    this.sendRequest("/items_colour_by_item_type", { size_id: sizeId });
  }
};
