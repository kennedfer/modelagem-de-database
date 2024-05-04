class DiagramElement {
  getIdentifier() {
    return this.title;
  }

  delete() {
    this.element.remove();
  }

  onDragElement(element) {
    element.draggable = true;

    element.addEventListener("drag", e => {
      const snapedX = Math.round(e.x / 32) * 32;
      const snapedY = Math.round(e.y / 32) * 32;

      element.style.left = snapedX + "px";
      element.style.top = snapedY + "px";
    });

    document.body.ondrop = e => e.preventDefault();
    document.body.ondragover = e => e.preventDefault();
  }
}

export default DiagramElement;