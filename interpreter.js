
class DiagramElement{
  getIdentifier() {
    return this.title;
  }

  delete(){
    this.element.remove();
  }

  static createElement(tag, elementStr){
    // console.log(ELEMENTS_TAG);

    return (new ELEMENTS_TAG[tag](elementStr));
  }
}

//ELEMENTOS ESTAO CONSIDERANDO LINHAS SEM NADA COMO ATRIBUTOS, NADA APARECE MAS OCUPA ESPAÇO, CORRIGIR

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

// table kenis{
//   nome varchar
// }

// table aicalica{
//  kenis varchar
// }
const ELEMENTS_TAG = {
  table: TableElement,
}

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
    const elementsOnCode = [];

    for (let i in code) {
      const letter = code[i];

      if (letter == "}") {
        const index = Number(i) + 2;

        const elementStr = code.substring(lastCloseIndex, index).trim();
        lastCloseIndex = index;

        //ISSO PODE SER LENTO POIS CRIA VARIOS OBJETOS
        //MUDAR DEPOIS PARA CRIAR UM NOVO APENAS SE FOR
        //DE FATO UMA NOVA TABELA
        
        // const tableElement = new TableElement(tableStr);

        const elementStrSplit = elementStr.split(" ");
        const tag = elementStrSplit[0]; ///ISSO É LENTO PACAS, LEMBRAR DE MUDAR
        const elementIdentifier = elementStrSplit[1].replace("{","");

        elementsOnCode.push(elementIdentifier);
        const element = DiagramElement.createElement(tag, elementStr);

        if (this.elements[elementIdentifier]) {
          this.elements[elementIdentifier].parse(elementStr);
          this.elements[elementIdentifier].edit();
        } else {
          this.elements[elementIdentifier] = element;
          parentElement.appendChild(element.show());
        }
      }
    }

    const onScreenElementsEntries = Object.entries(this.elements);
    const entriesDeleteds = onScreenElementsEntries.filter(entry => {
      return !elementsOnCode.includes(entry[0]);
    });

    entriesDeleteds.forEach(entry => {
      const element = entry[1];
      this.elements[entry[0]] = null;
      
      element.delete();
    });
  }
}

const interpreter = new Interpreter();

export default interpreter;
