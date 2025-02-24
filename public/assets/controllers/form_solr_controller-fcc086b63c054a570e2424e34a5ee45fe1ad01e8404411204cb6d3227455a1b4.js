import { Controller } from "@hotwired/stimulus";
const application = Application.start()
application.debug = true // Activa el modo de depuración
window.Stimulus = application
export default class extends Controller {
  static targets = ["form"]

  submit() {
    console.log("Formulario enviado con Hotwire!");
    this.formTarget.requestSubmit(); // Enviar el formulario usando el método estándar
  }
}
;
