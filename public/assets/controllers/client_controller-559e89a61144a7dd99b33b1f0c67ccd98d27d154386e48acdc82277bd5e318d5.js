import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["zipCodeInput", "provinceSelect", "municipalitySelect"];

  connect() {
    console.log("Client controller connected");
    this.loadInitialValues();
  }

  loadInitialValues() {
    // Si ya hay valores seleccionados (modo edición), no hace nada.
    const provinceId = this.provinceSelectTarget.value;
    const municipalityId = this.municipalitySelectTarget.value;

    if (provinceId && municipalityId) {
      return;
    }

    // Si no hay valores seleccionados (modo creación), carga los valores predeterminados.
    const zipCode = this.zipCodeInputTarget.value;
    if (zipCode) {
      this.updateSelects();
    }
  }

  updateSelects() {
    const zipCode = this.zipCodeInputTarget.value;
    if (!zipCode) return;

    const url = `/clients/find_province_and_municipalities?postal_code=${zipCode}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.populateSelect(this.provinceSelectTarget, data.provinces, data.selectedProvince);
        this.populateSelect(this.municipalitySelectTarget, data.municipalities, data.selectedMunicipality);
      })
      .catch(error => console.error("Error fetching data:", error));
  }

  populateSelect(selectElement, items, selectedId) {
    selectElement.innerHTML = ""; // Limpiar el contenido actual
    items.forEach(item => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.name;
      if (item.id === selectedId) {
        option.selected = true;
      }
      selectElement.appendChild(option);
    });
  }
};
