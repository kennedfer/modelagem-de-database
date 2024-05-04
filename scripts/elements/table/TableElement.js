import DiagramElement from "../DiagramElement.js";
//ELEMENTOS ESTAO CONSIDERANDO LINHAS SEM NADA COMO ATRIBUTOS, NADA APARECE MAS OCUPA ESPAÇO, CORRIG

class TableElement extends DiagramElement {
  KEY_TYPES = {
    pk: "🔑",
    fk: "🔗"
  }

  element;

  constructor(tableStr) {
    super();
    this.parse(tableStr);
  }

  parse(tableStr) {
    const tableSplit = tableStr.split("\n");

    this.title = tableSplit.shift().split(" ")[1].replace("{", "");
    tableSplit.pop();

    this.attributes = [];

    for (let atribute of tableSplit) {
      const attributesTuple = atribute.trim().split(" ");

      this.attributes.push({
        name: attributesTuple[0],
        type: attributesTuple[1],
        key: attributesTuple[2]
      });
    }
  }

  #getKeySymbol(key) {
    const symbol = this.KEY_TYPES[atribute.key];
    return symbol ? symbol + " " : "";
  }

  #createAttributes(attributesContainer) {
    for (let atribute of this.attributes) {
      const atributeParentElement = document.createElement("div");

      const atributeNameElement = document.createElement("span");
      const atributeTypeElement = document.createElement("span");
      atributeTypeElement.className = "attributes__type";

      const keyPrefix =

        atributeNameElement.textContent = keyPrefix + atribute.name;
      atributeTypeElement.textContent = atribute.type;

      atributeParentElement.appendChild(atributeNameElement);
      atributeParentElement.appendChild(atributeTypeElement);

      attributesContainer.appendChild(atributeParentElement);
    }
  }

  create() {
    const tableElement = document.createElement("div");
    tableElement.id = this.title + "-table";
    tableElement.className = "table";

    const titleElement = document.createElement("h3");
    titleElement.className = "table__title";
    titleElement.id = this.title + "-title";

    titleElement.textContent = this.title;
    tableElement.appendChild(titleElement);

    const attributesContainer = document.createElement("div");
    attributesContainer.className = "table__attributes";
    attributesContainer.id = this.title + "-attributes";

    this.#createAttributes(attributesContainer);
    tableElement.appendChild(attributesContainer);

    this.element = tableElement;
    this.onDragElement(this.element);

    return tableElement;
  }

  edit() {
    const titleElement = document.getElementById(this.title + "-title");
    titleElement.textContent = this.title;

    const attributesContainer = document.getElementById(
      this.title + "-attributes"
    );

    attributesContainer.innerHTML = "";
    this.#createAttributes(attributesContainer);

    return this.element;
  }

  show() {
    if (!this.element) {
      return this.create();
    }

    return this.edit();
  }
}

export default TableElement;