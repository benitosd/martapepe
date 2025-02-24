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
    this.nameInputTarget.classList.remove("d-none");
    this.descriptionInputTarget.classList.remove("d-none");

    this.nameTextTarget.classList.add("d-none");
    this.descriptionTextTarget.classList.add("d-none");

    this.saveButtonTarget.classList.remove("d-none");
    this.cancelButtonTarget.classList.remove("d-none");

    this.editButtonTarget.classList.add("d-none");
  }

  async save() {
    const name = this.nameInputTarget.value;
    const description = this.descriptionInputTarget.value;
    console.log("Editing family with ID:", this);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    try {
      const response = await fetch(`/families/${this.idValue}`, {
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
