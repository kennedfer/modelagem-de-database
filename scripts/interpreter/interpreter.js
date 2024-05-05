import DiagramController from "../elements/DiagramController.js";

class Interpreter {
  elements = {};

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

        const elementStrSplit = elementStr.split(" ");
        const elementTag = elementStrSplit[0];
        let elementIdentifier = elementStrSplit[1];
        elementIdentifier = elementIdentifier.substring(0, elementIdentifier.length - 1);

        elementsOnCode.push(elementIdentifier);
        const elementFromObject = this.elements[elementIdentifier];

        if (elementFromObject) {
          elementFromObject.parse(elementStr);
          elementFromObject.edit();
        } else {
          const newElement = DiagramController.createElement(elementTag, elementStr);

          this.elements[elementIdentifier] = newElement;
          parentElement.appendChild(newElement.create());
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