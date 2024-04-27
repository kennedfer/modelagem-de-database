class DiagramElement{
  getIdentifier() {
    return this.title;
  }

  delete(){
    this.element.remove();
  }

  static createElement(tag, elementStr){
    return (new ELEMENTS_TAG[tag](elementStr));
  }
}