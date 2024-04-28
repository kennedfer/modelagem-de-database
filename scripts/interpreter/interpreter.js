import DiagramController from "../elements/DiagramController.js";

DiagramController
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
        const elementIdentifier = elementStrSplit[1].replace("{", "");

        elementsOnCode.push(elementIdentifier);
        const element = DiagramController.createElement(tag, elementStr);

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
