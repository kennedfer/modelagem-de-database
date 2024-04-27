//ELEMENTOS ESTAO CONSIDERANDO LINHAS SEM NADA COMO ATRIBUTOS, NADA APARECE MAS OCUPA ESPAÇO, CORRIG

class TableElement extends DiagramElement{
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
      });
    }
  }

  create() {
    const tableElement = document.createElement("div");
    tableElement.id = this.title + "-table";
    tableElement.className = "table";

    tableElement.draggable = true;

    //MUDAR O DRAG PRA CLASSE MAE 
    tableElement.addEventListener("dragend", e => {
      tableElement.style.left = e.x+"px";
      tableElement.style.top = e.y+"px";
    });

    const titleElement = document.createElement("h3");
    titleElement.className = "table__title";
    titleElement.id = this.title + "-title";

    titleElement.textContent = this.title;
    tableElement.appendChild(titleElement);

    const attributesContainer = document.createElement("div");
    attributesContainer.className = "table__attributes";
    attributesContainer.id = this.title + "-attributes";

    for (let atribute of this.attributes) {
      const atributeParentElement = document.createElement("div");

      const atributeNameElement = document.createElement("span");
      const atributeTypeElement = document.createElement("span");
      atributeTypeElement.className = "attributes__type";

      atributeNameElement.textContent = atribute.name;
      atributeTypeElement.textContent = atribute.type;

      atributeParentElement.appendChild(atributeNameElement);
      atributeParentElement.appendChild(atributeTypeElement);

      attributesContainer.appendChild(atributeParentElement);
    }

    tableElement.appendChild(attributesContainer);

    this.element = tableElement;
    return tableElement;
  }

  edit() {
    // const tableElement = document.getElementById(this.title + "-table");

    const titleElement = document.getElementById(this.title + "-title");
    titleElement.textContent = this.title;

    const attributesContainer = document.getElementById(
      this.title + "-attributes"
    );

    attributesContainer.innerHTML = "";

    for (let atribute of this.attributes) {
      const atributeParentElement = document.createElement("div");
      atributeParentElement.className = "table__attributes";

      const atributeNameElement = document.createElement("span");
      const atributeTypeElement = document.createElement("span");
      atributeTypeElement.className = "attributes__type";

      atributeNameElement.textContent = atribute.name;
      atributeTypeElement.textContent = atribute.type;

      atributeParentElement.appendChild(atributeNameElement);
      atributeParentElement.appendChild(atributeTypeElement);

      attributesContainer.appendChild(atributeParentElement);
    }

    console.log(attributesContainer);
    return this.element;
  }

  show() {
    if (!this.element) {
      return this.create();
    }

    return this.edit();
  }
}
