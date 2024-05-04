import DiagramElement from "../DiagramElement.js";
//ELEMENTOS ESTAO CONSIDERANDO LINHAS SEM NADA COMO ATRIBUTOS, NADA APARECE MAS OCUPA ESPAÇO, CORRIG

class TableElement extends DiagramElement {
  KEY_TYPES = {
    pk: "🔑",
    fk: "🔗"
  }

  element;

  #getKeySymbol(key) {
    const symbol = this.KEY_TYPES[key];
    return symbol ? (symbol + " ") : "";
  }

  #createAttributes(attributesContainer) {
    for (let attribute of this.attributes) {
      const attributeParentElement = document.createElement("div");

      const attributeNameElement = document.createElement("span");
      const attributeTypeElement = document.createElement("span");
      attributeTypeElement.className = "attributes__type";

      const keyPrefix = this.#getKeySymbol(attribute.key);

      attributeNameElement.textContent = keyPrefix + attribute.name;
      attributeTypeElement.textContent = attribute.type;

      attributeParentElement.appendChild(attributeNameElement);
      attributeParentElement.appendChild(attributeTypeElement);

      attributesContainer.appendChild(attributeParentElement);
    }
  }

  constructor(tableStr) {
    super();
    this.parse(tableStr);
  }

  parse(tableStr) {
    const tableSplit = tableStr.split("\n");
    const tableTitle = tableSplit.shift().split(" ")[1];

    this.title = tableTitle.substring(0, tableTitle.length - 1);
    tableSplit.pop();

    this.attributes = [];

    for (let attribute of tableSplit) {
      const attributesTuple = attribute.trim().split(" ");

      this.attributes.push({
        name: attributesTuple[0],
        type: attributesTuple[1],
        key: attributesTuple[2]
      });
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