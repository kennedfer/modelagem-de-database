class DiagramElement {
  getIdentifier() {
    return this.title;
  }

  delete() {
    this.element.remove();
  }

  setElement(element) {
    this.element = element;
    this.onDragElement(element);

    this.element.style.top = "50%";
    this.element.style.left = "50%";
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