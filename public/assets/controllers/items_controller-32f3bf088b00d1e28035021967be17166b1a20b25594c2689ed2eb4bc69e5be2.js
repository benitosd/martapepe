import { Controller } from "@hotwired/stimulus"
import $ from "jquery"

import { Controller } from "@hotwired/stimulus";
import axios from "axios";

export default class extends Controller {
  static targets = [
    "itemType", "material", "thickness", "colour", "provider", "size", "realCode", "realDescription"
  ];

  connect() {
    console.log("Stimulus conectado");
  }

  sendRequest(endpoint, extraParams = {}) {
    const params = {
      item_type_id: this.element.dataset.itemsItemTypeId,
      material_id: this.element.dataset.itemsMaterialId,
      thickness_id: this.element.dataset.itemsThicknessId,
      colour_id: this.element.dataset.itemsColourId,
      item_type_type_id: this.element.dataset.itemsItemTypeTypeId,
      provider_id: this.element.dataset.itemsProviderId,
      size_id: this.element.dataset.itemsSizeId,
      code_first: this.element.dataset.itemsCodeFirst
    };
  
    $.get(endpoint, params)
      .done((response) => {
        console.log("Respuesta del servidor:", response);
  
        // Actualiza dinámicamente los campos de selección
        if (response.materialSelectHtml) {
          this.element.querySelector("#material_select").innerHTML = response.materialSelectHtml;
        }
        if (response.colourSelectHtml) {
          this.element.querySelector("#colour_select").innerHTML = response.colourSelectHtml;
        }
        if (response.thicknessSelectHtml) {
          this.element.querySelector("#thickness_select").innerHTML = response.thicknessSelectHtml;
        }
        if (response.itemTypeSelectHtml) {
          this.element.querySelector("#item_type_select").innerHTML = response.itemTypeSelectHtml;
        }
        if (response.itemTypeTypeSelectHtml) {
          this.element.querySelector("#item_type_type_select").innerHTML = response.itemTypeTypeSelectHtml;
        }
        if (response.providerSelectHtml) {
          this.element.querySelector("#provider_select").innerHTML = response.providerSelectHtml;
        }
        if (response.sizeSelectHtml) {
          this.element.querySelector("#size_select").innerHTML = response.sizeSelectHtml;
        }
  
        // Actualiza los campos real_code y real_description
        if (response.realCode) {
          this.realCodeTarget.value = response.realCode;
        }
        if (response.realDescription) {
          this.realDescriptionTarget.value = response.realDescription;
        }
      })
      .fail(() => {
        alert("Error al cargar los datos.");
      });
  }
}
;
