import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "namePText",
    "descriptionText",
    "namePInput",
    "descriptionInput",
    "editButton",
    "saveButton",
    "cancelButton",
    "deleteButton"
  ];

  connect() {
    console.log(`Connecting controller for ID: ${this.element.dataset.editableId}`);
    this.resetInputs();
  }
  
  resetInputs() {
    // Asegúrate de que los valores de los inputs coincidan con los datos iniciales
    if (this.nameInputTarget && this.nameTextTarget) {
      this.nameInputTarget.value = this.nameTextTarget.textContent.trim();
    }
    if (this.descriptionInputTarget && this.descriptionTextTarget) {
      this.descriptionInputTarget.value = this.descriptionTextTarget.textContent.trim();
    }
  }
  
  edit() {
    this.namePInputTarget.classList.remove("d-none");
    this.descriptionInputTarget.classList.remove("d-none");

    this.namePTextTarget.classList.add("d-none");
    this.descriptionTextTarget.classList.add("d-none");

    this.saveButtonTarget.classList.remove("d-none");
    this.cancelButtonTarget.classList.remove("d-none");

    this.editButtonTarget.classList.add("d-none");
    this.deleteButtonTarget.classList.add("d-none");
  }

  async save() {
    const name = this.namePInputTarget.value;
    const description = this.descriptionInputTarget.value;
    const id = this.element.dataset.editableId;
    console.log("Editing family with ID:", this.element.dataset.editableId);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    try {
      const response = await fetch(`/families/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/vnd.turbo-stream.html",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          family: {
            name: name,
            description: description,
          },
        }),
      });

      if (response.ok) {
        const turboStream = await response.text();
        Turbo.renderStreamMessage(turboStream);
        this.resetView();
      } else {
        console.error("Save failed:", response.statusText);
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
  }

  cancel() {
    this.resetView();
  }

  resetView() {
    this.namePInputTarget.classList.add("d-none");
    this.descriptionInputTarget.classList.add("d-none");

    this.namePTextTarget.classList.remove("d-none");
    this.descriptionTextTarget.classList.remove("d-none");

    this.saveButtonTarget.classList.add("d-none");
    this.cancelButtonTarget.classList.add("d-none");

    this.editButtonTarget.classList.remove("d-none");
    this.deleteButtonTarget.classList.remove("d-none");
  }
};
