class DiagramElement {
  // ELEMENTS_TAG = {
  //   table: TableElement
  // }

  getIdentifier() {
    return this.title;
  }

  delete() {
    this.element.remove();
  }
}

export default DiagramElement;