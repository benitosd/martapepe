import { Controller } from "@hotwired/stimulus";
import EditableController from "./controllers/editable_controller";

const application = Application.start();
application.register("editable", EditableController);

window.Stimulus = application;
export default class extends Controller {
  static targets = ["field"];
  static values = { url: String };

  edit(event) {
  event.preventDefault();

  // Convierte cada campo en un input editable
  this.fieldTargets.forEach((field) => {
    const name = field.dataset.editableField;
    const input = document.createElement("input");
    input.type = "text";
    input.name = `family[${name}]`;
    input.value = field.textContent.trim();
    input.dataset.editableTarget = "field";
    field.replaceWith(input);
  });

  // Cambia el botón "Edit" a "Save"
  const editButton = event.target; // Botón "Edit"
  editButton.textContent = "Save";
  editButton.setAttribute("data-action", "click->editable#save");
}


  async save(event) {
  event.preventDefault();

  // Obtén el token CSRF del meta tag
  const token = document.querySelector('meta[name="csrf-token"]').content;

  const formData = new FormData(this.element);
  const response = await fetch(this.urlValue, {
    method: "PATCH",
    body: formData,
    headers: {
      "Accept": "text/vnd.turbo-stream.html",
      "X-CSRF-Token": token, // Agrega el token CSRF
    },
  });

  if (response.ok) {
    Turbo.renderStreamMessage(await response.text());
  } else {
    console.error("Save failed");
  }
}

};
