import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["zipCodeInput", "provinceSelect", "municipalitySelect"];

  // Este método se activa al cambiar el código postal
  updateSelects() {
    const postalCode = this.zipCodeInputTarget.value.trim();

    // Si no hay código postal, no hacer nada
    if (!postalCode) return;

    // Llamada a la ruta que devuelve las provincias y municipios
    fetch(`/clients/find_province_and_municipalities?postal_code=${postalCode}`, {
      headers: { "Accept": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualiza las provincias y municipios con los datos recibidos
        this.updateProvinceSelect(data.provinces, data.selected_province);
        this.updateMunicipalitySelect(data.municipalities);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Actualiza las opciones de la lista de provincias
  updateProvinceSelect(provinces, selectedProvince) {
    this.provinceSelectTarget.innerHTML = provinces
      .map(
        (province) =>
          `<option value="${province.id}" ${
            province.id === selectedProvince ? "selected" : ""
          }>${province.name}</option>`
      )
      .join("");
  }

  // Actualiza las opciones de la lista de municipios
  updateMunicipalitySelect(municipalities) {
    this.municipalitySelectTarget.innerHTML = municipalities
      .map(
        (municipality) =>
          `<option value="${municipality.id}">${municipality.name}</option>`
      )
      .join("");
  }
};
