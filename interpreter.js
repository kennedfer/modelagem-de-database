class DiagramElement {}

class TableElement extends DiagramElement {
  constructor(tableStr) {
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

  show() {
    const tableElement = document.createElement("div");
    tableElement.className = "table";

    const titleElement = document.createElement("span");
    titleElement.textContent = this.title;
    tableElement.appendChild(titleElement);

    for (let atribute of this.attributes) {
      const atributeParentElement = document.createElement("div");
      atributeParentElement.className = "table__attributes";

      const atributeNameElement = document.createElement("span");
      const atributeTypeElement = document.createElement("span");

      atributeNameElement.textContent = atribute.name;
      atributeTypeElement.textContent = atribute.type;

      atributeParentElement.appendChild(atributeNameElement);
      atributeParentElement.appendChild(atributeTypeElement);

      tableElement.appendChild(atributeParentElement);
    }

    return tableElement;
  }
}

// table kenis{
//   nome varchar
// }

// table aicalica{
//  kenis varchar
// }

class Interpreter {
  tableBlocks;

  show() {
    const parentElement = document.getElementById("res");
    parentElement.innerHTML = "";

    for (let table of this.tableBlocks) {
      // console.log(table);
      parentElement.appendChild(table.show());
    }
  }

  interpret(code) {
    this.tableBlocks = [];

    let lastCloseIndex = 0;

    for (let i in code) {
      const letter = code[i];

      if (letter == "}") {
        const index = Number(i) + 2;

        const tableStr = code.substring(lastCloseIndex, index).trim();
        lastCloseIndex = index;

        this.tableBlocks.push(new TableElement(tableStr));
      }
    }

    this.show();
  }
}

const interpreter = new Interpreter();

export default interpreter;
