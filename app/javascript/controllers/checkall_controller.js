import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["checkAll", "checkItem"];

  connect() {
    // Opcional: puede usarse para depurar
    console.log("CheckAll Controller connected");
  }

  toggleAll(event) {
    const isChecked = event.target.checked;
    console.log("Checkbox principal:", isChecked);
    console.log("Checkbox secundarios:", this.checkItemTargets);
  
    this.checkItemTargets.forEach((checkbox) => {
      checkbox.checked = isChecked;
      console.log(`Checkbox actualizado: ${checkbox.name}, Marcado: ${checkbox.checked}`);
    });
  }
  
  }
