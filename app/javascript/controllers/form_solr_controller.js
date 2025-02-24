import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["form"]

  submit() {
    console.log("Formulario enviado con Hotwire!");
    this.formTarget.requestSubmit(); // Enviar el formulario usando el método estándar
  }
}

