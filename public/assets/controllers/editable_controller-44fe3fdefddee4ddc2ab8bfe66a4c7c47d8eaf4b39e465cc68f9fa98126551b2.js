save(event) {
  event.preventDefault();
  const updatedData = {};
  this.fieldInputTargets.forEach((input) => {
    updatedData[input.dataset.editableField] = input.value;
  });

  fetch(`/${this.element.dataset.editableResource}/${this.element.dataset.editableId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
    },
    body: JSON.stringify({ family: updatedData }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.text(); // Devuelve el Turbo Stream HTML
    })
    .then((html) => {
      const parser = new DOMParser();
      const newRow = parser.parseFromString(html, "text/html").querySelector(`#family_${this.element.dataset.editableId}`);
      this.element.replaceWith(newRow); // Reemplaza la fila actualizada
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
