import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["modal"];

  connect() {
    console.log("ModalController connected");
    this.element.addEventListener("closeModal", this.close.bind(this));
  }

  close() {
    console.log("Closing modal...");
    const modalElement = this.modalTarget;
    if (modalElement) {
      const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      if (bootstrapModal) {
        console.log("Hiding the modal using Bootstrap...");
        bootstrapModal.hide();
      } else {
        console.log("Bootstrap modal instance not found.");
      }
    } else {
      console.log("Modal target not found.");
    }
  }
};
