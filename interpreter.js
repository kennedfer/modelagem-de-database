class DiagramElement{
  
}

class TableElement extends DiagramElement{
  element;

  constructor(tableStr) {
    this.parse(tableStr);
    super();
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

  getIdentifier() {
    return this.title;
  }

  create() {
    const tableElement = document.createElement("div");
    tableElement.id = this.title + "-table";
    tableElement.className = "table";

    tableElement.draggable = true;
    tableElement.addEventListener("dragend", e => {
      console.log(e);
      tableElement.style.left = e.x+"px";
      tableElement.style.top = e.y+"px";
    });

    const titleElement = document.createElement("span");
    titleElement.id = this.title + "-title";

    titleElement.textContent = this.title;
    tableElement.appendChild(titleElement);

    const attributesContainer = document.createElement("div");
    attributesContainer.id = this.title + "-attributes";

    for (let atribute of this.attributes) {
      const atributeParentElement = document.createElement("div");
      atributeParentElement.className = "table__attributes";

      const atributeNameElement = document.createElement("span");
      const atributeTypeElement = document.createElement("span");

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
    console.log(this.element);

    if (!this.element) {
      return this.create();
    }

    return this.edit();
  }
}

// table kenis{
//   nome varchar
// }

// table aicalica{
//  kenis varchar
// }

class Interpreter {
  elements = {};

  // show() {
  //   const parentElement = document.getElementById("res");
  //   // parentElement.innerHTML = ""; //APAGANDO TUDO DO PANEL
  //   const elements = Object.values(this.elements);

  //   for (let element of elements) {
  //     // console.log(table);
  //     element.show();
  //   }
  // }

  interpret(code) {
    this.tableBlocks = [];

    let lastCloseIndex = 0;

    const parentElement = document.getElementById("res");

    for (let i in code) {
      const letter = code[i];

      if (letter == "}") {
        const index = Number(i) + 2;

        const tableStr = code.substring(lastCloseIndex, index).trim();
        lastCloseIndex = index;

        //ISSO PODE SER LENTO POIS CRIA VARIOS OBJETOS
        //MUDAR DEPOIS PARA CRIAR UM NOVO APENAS SE FOR
        //DE FATO UMA NOVA TABELA
        const tableElement = new TableElement(tableStr);
        const tableTitle = tableElement.getIdentifier();

        if (this.elements[tableTitle]) {
          this.elements[tableTitle].parse(tableStr);
          this.elements[tableTitle].edit();
        } else {
          this.elements[tableTitle] = tableElement;
          parentElement.appendChild(tableElement.show());
        }
      }
    }

    // this.show();
  }
}

const interpreter = new Interpreter();

export default interpreter;
