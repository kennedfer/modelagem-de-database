import DiagramElement from "../DiagramElement.js";

class RelationshipElement extends DiagramElement {
  element;

  constructor(tableStr) {
    super();
    this.parse(tableStr);
  }

  parse(tableStr) {
    const tableSplit = tableStr.split("\n");

    this.title = tableSplit.shift().split(" ")[1].replace("{", "");
    tableSplit.pop();
  }

  create() {
    const tableElement = document.createElement("div");

    tableElement.id = this.title + "-relationship";
    tableElement.className = "relationship";

    const titleElement = document.createElement("h3");
    titleElement.className = "relationship__title";
    titleElement.id = this.title + "-title";

    titleElement.textContent = this.title;
    tableElement.appendChild(titleElement);

    this.element = tableElement;
    this.onDragElement(this.element);

    return tableElement;
  }

  edit() {
    const titleElement = document.getElementById(this.title + "-title");
    titleElement.textContent = this.title;

    return this.element;
  }

  show() {
    if (!this.element) {
      return this.create();
    }

    return this.edit();
  }
}

export default RelationshipElement;