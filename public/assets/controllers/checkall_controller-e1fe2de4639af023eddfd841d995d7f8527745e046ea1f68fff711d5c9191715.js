import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["checkAll", "checkItem"];

  connect() {
    // Opcional: puede usarse para depurar
    console.log("CheckAll Controller connected");
  }

  toggleAll(event) {
    const isChecked = event.target.checked;
    this.checkItemTargets.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  }
};
