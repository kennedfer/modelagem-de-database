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
      const normalizedX = Math.round(e.x / 64) * 64;
      const normalizedY = Math.round(e.y / 64) * 64;

      element.style.left = normalizedX + "px";
      element.style.top = normalizedY + "px";
    });
  }
}

export default DiagramElement;