class DiagramElement {
  getIdentifier() {
    return this.title;
  }

  delete() {
    this.element.remove();
  }

  onDragElement(element) {
    element.draggable = true;

    element.addEventListener("dragend", e => {
      element.style.left = e.x + "px";
      element.style.top = e.y + "px";
    });
  }
}

export default DiagramElement;