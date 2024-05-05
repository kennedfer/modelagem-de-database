import DiagramElement from "../DiagramElement.js";

class RelationshipElement extends DiagramElement {
  element;
  relationItens;

  cardinalityLastToFirst;
  cardinalityFirstToLast;

  cardinalities = [];

  constructor(relationshipStr) {
    super();
    this.parse(relationshipStr);
  }

  parse(relationshipStr) {
    const relationshipSplit = relationshipStr.split("\n");
    const relationshipTitle = relationshipSplit.shift().split(" ")[1];

    this.title = relationshipTitle.substring(0, relationshipTitle.length - 1);
    relationshipSplit.pop();

    this.relationItens = relationshipSplit.shift().split("->");
    this.cardinalities = relationshipSplit.map(line => line.trim());
  }

  calculateLines(relationItens) {
    const firstRelationItem = document.getElementById(relationItens[0].trim() + "-table");
    const lastRelationItem = document.getElementById(relationItens[1].trim() + "-table");

    const firstRelationItemX = Number(firstRelationItem.style.left.replace("px", ""));
    const firstRelationItemY = Number(firstRelationItem.style.top.replace("px", ""));

    const lastRelationItemX = Number(lastRelationItem.style.left.replace("px", ""));
    const lastRelationItemY = Number(lastRelationItem.style.top.replace("px", ""));

    const relationItemX = Number(this.element.style.left.replace("px", ""));
    const relationItemY = Number(this.element.style.top.replace("px", ""));

    const line = this.relationshipLine;
    line.setAttributeNS(null, "d", `M ${firstRelationItemX} ${firstRelationItemY} 
    L ${firstRelationItemX} ${relationItemY} L ${relationItemX} ${relationItemY} 
    L ${lastRelationItemX} ${relationItemY} L ${lastRelationItemX} ${lastRelationItemY}`);

    this.cardinalityLastToFirst.textContent = this.cardinalities[0];
    this.cardinalityFirstToLast.textContent = this.cardinalities[1];

    this.cardinalityLastToFirst.style.top = relationItemY + "px";
    this.cardinalityLastToFirst.style.left = firstRelationItemX + "px";

    this.cardinalityFirstToLast.style.top = relationItemY + "px";
    this.cardinalityFirstToLast.style.left = lastRelationItemX + "px";
  }

  createLines() {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    const svgContainer = document.getElementById("svg-container");
    svgContainer.appendChild(line);

    this.relationshipLine = line;
  }

  create() {
    this.createLines();

    this.cardinalityLastToFirst = document.createElement("span");
    this.cardinalityFirstToLast = document.createElement("span");

    this.cardinalityFirstToLast.className = "cardinality-label";
    this.cardinalityLastToFirst.className = "cardinality-label";

    document.body.appendChild(this.cardinalityFirstToLast);
    document.body.appendChild(this.cardinalityLastToFirst);

    const tableElement = document.createElement("div");

    tableElement.id = this.title + "-relationship";
    tableElement.className = "relationship";

    const titleElement = document.createElement("h3");
    titleElement.className = "relationship__title";
    titleElement.id = this.title + "-title";

    titleElement.textContent = this.title;
    tableElement.appendChild(titleElement);

    this.element = tableElement;
    console.log(this.relationItens);

    const firstRelationItem = document.getElementById(this.relationItens[0].trim() + "-table");
    firstRelationItem.addEventListener("drag", () => this.calculateLines(this.relationItens));

    const lastRelationItem = document.getElementById(this.relationItens[1].trim() + "-table");
    lastRelationItem.addEventListener("drag", () => this.calculateLines(this.relationItens));

    this.element.addEventListener("drag", () => this.calculateLines(this.relationItens));
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