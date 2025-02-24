import { Application } from "@hotwired/stimulus"

const application = Application.start()


// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }
document.addEventListener("turbo:load", () => {
    const button = document.querySelector('button[data-action="click->editable#edit"]');
    console.log(button); // Debería mostrar el botón
  });
