import DiagramElement from "../DiagramElement.js";

class RelationshipElement extends DiagramElement {
  element;
  relationItens;
  line1;

  constructor(relationshipStr) {
    super();
    this.parse(relationshipStr);
  }

  parse(relationshipStr) {
    const relationshipSplit = relationshipStr.split("\n");

    this.title = relationshipSplit.shift().split(" ")[1].replace("{", "");
    relationshipSplit.pop();

    // console.log(relationshipSplit);
    this.relationItens = relationshipSplit.shift().split("->");
  }

  // tabela k{
  // }

  // tabela c{
  // }

  // relacao s{
  //   k -> c
  // }
  calculateLines(relationItens) {
    const firstRelationItem = document.getElementById(relationItens[0].trim() + "-table");
    const lastRelationItem = document.getElementById(relationItens[1].trim() + "-table");

    const firstRelationItemX = Number(firstRelationItem.style.left.replace("px", ""));
    const firstRelationItemY = Number(firstRelationItem.style.top.replace("px", ""));

    const lastRelationItemX = Number(lastRelationItem.style.left.replace("px", ""));
    const lastRelationItemY = Number(lastRelationItem.style.top.replace("px", ""));

    const relationItemX = Number(this.element.style.left.replace("px", ""));
    const relationItemY = Number(this.element.style.top.replace("px", ""));

    const line1 = this.line1.children[0];
    const line2 = this.line1.children[1];
    line1.setAttributeNS(null, "d", `M ${firstRelationItemX} ${firstRelationItemY} L ${relationItemX} ${relationItemY}`);
    line2.setAttributeNS(null, "d", `M ${relationItemX} ${relationItemY} L ${lastRelationItemX} ${lastRelationItemY}`);
  }

  create() {
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path1.setAttribute("stroke", "black");
    path1.setAttribute("stroke-width", "2px");
    path1.setAttribute("fill", "none");
    line1.setAttribute("class", "line");

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path2.setAttribute("stroke", "black");
    path2.setAttribute("stroke-width", "2px");
    path2.setAttribute("fill", "none");
    line1.setAttribute("class", "line");

    line1.setAttribute("height", "100%");
    line1.setAttribute("width", "100%");
    line1.setAttribute("preserveAspectRatio", "none");

    line1.appendChild(path1);
    line1.appendChild(path2);

    document.body.appendChild(line1);
    this.line1 = line1;
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