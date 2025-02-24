import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "nameText",
    "descriptionText",
    "nameInput",
    "descriptionInput",
    "editButton",
    "saveButton",
    "cancelButton",
  ];
  static values = { id: Number };
  
  edit() {
    
  }

  async save() {
    const name = this.nameInputTarget.value;
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
    this.nameInputTarget.classList.add("d-none");
    this.descriptionInputTarget.classList.add("d-none");

    this.nameTextTarget.classList.remove("d-none");
    this.descriptionTextTarget.classList.remove("d-none");

    this.saveButtonTarget.classList.add("d-none");
    this.cancelButtonTarget.classList.add("d-none");

    this.editButtonTarget.classList.remove("d-none");
  }
};
