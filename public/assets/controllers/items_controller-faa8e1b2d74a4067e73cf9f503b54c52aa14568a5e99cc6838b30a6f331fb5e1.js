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
    "lastItemId"
  ];

  connect() {
    console.log("Controlador Stimulus conectado para Items.");
  }
  resetToNull(excludeTarget) {
    // Resetea los campos excepto el especificado a `null`
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
          target.value = ""; // Reinicia el campo al valor vacío (nulo)
          const prompt = target.querySelector("option[value='']");
          if (prompt) {
            prompt.selected = true;
          }
        }
      });
  }
  async sendRequest(endpoint, extraParams = {}) {
    const params = {
      item_type_id: this.element.dataset.itemsItemTypeId,
      material_id: this.element.dataset.itemsMaterialId,
      thickness_id: this.element.dataset.itemsThicknessId,
      colour_id: this.element.dataset.itemsColourId,
      item_type_type_id: this.element.dataset.itemsItemTypeTypeId,
      provider_id: this.element.dataset.itemsProviderId,
      size_id: this.element.dataset.itemsSizeId,
      code_first: this.element.dataset.itemsCodeFirst,
      last_item_id: this.element.dataset.itemsLastItemId,
      item_id: this.element.dataset.itemsItemId, // Incluye el item_id
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

      // Actualiza los campos dinámicos con los valores de la respuesta
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
      if (data.itemTypeTypeSelectHtml) {
        this.itemTypeTypeTarget.innerHTML = data.itemTypeTypeSelectHtml;
      }
      if (data.providerSelectHtml) {
        this.providerTarget.innerHTML = data.providerSelectHtml;
      }
      if (data.sizeSelectHtml) {
        this.sizeTarget.innerHTML = data.sizeSelectHtml;
      }

      // Actualiza los campos real_code y real_description
      if (data.realCode) {
        this.realCodeTarget.value = data.realCode;
      }
      if (data.realDescription) {
        this.realDescriptionTarget.value = data.realDescription;
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      alert("Error al cargar los datos.");
    }
  }

  // Métodos específicos para manejar los eventos onchange de cada campo
  updateItemType(event) {
    const itemTypeId = event.target.value;
     // Actualiza el dataset con el nuevo valor de item_type_id
     this.element.dataset.itemsItemTypeId = itemTypeId;

     // Actualiza last_item_id antes de enviar la solicitud
     this.element.dataset.itemsLastItemId = this.element.dataset.itemsItemTypeId;
    this.sendRequest("/items_material_by_item_type", { item_type_id: itemTypeId});
    this.resetToNull(this.itemTypeTarget);
  }

  updateItemTypeType(event) {
    const itemTypeTypeId = event.target.value;
    this.sendRequest("/items_colour_by_item_type", { item_type_type_id: itemTypeTypeId });
  }

  updateMaterial(event) {
    const materialId = event.target.value;
    this.sendRequest("/items_colour_by_item_type", { material_id: materialId });
  }

  updateThickness(event) {
    const thicknessId = event.target.value;
    this.sendRequest("/items_colour_by_item_type", { thickness_id: thicknessId });
  }

  updateColour(event) {
    const colourId = event.target.value;
    this.sendRequest("/items_colour_by_item_type", { colour_id: colourId });
  }

  updateProvider(event) {
    const providerId = event.target.value;
    this.sendRequest("/items_colour_by_item_type", { provider_id: providerId });
  }

  updateSize(event) {
    const sizeId = event.target.value;
    this.sendRequest("/items_colour_by_item_type", { size_id: sizeId });
  }
};
