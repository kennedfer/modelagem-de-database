import DiagramElement from "../DiagramElement.js";

class RelationshipElement extends DiagramElement {
  element;
  relationItens;
  svgContainer;

  constructor(relationshipStr) {
    super();
    this.parse(relationshipStr);
  }

  parse(relationshipStr) {
    const relationshipSplit = relationshipStr.split("\n");

    this.title = relationshipSplit.shift().split(" ")[1].replace("{", "");
    relationshipSplit.pop();

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

    const line = this.svgContainer.children[0];
    line.setAttributeNS(null, "d", `M ${firstRelationItemX} ${firstRelationItemY} 
    L ${firstRelationItemX} ${relationItemY} L ${relationItemX} ${relationItemY} 
    L ${lastRelationItemX} ${relationItemY} L ${lastRelationItemX} ${lastRelationItemY}`);
  }

  create() {
    const svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgContainer.setAttribute("height", "100%");
    svgContainer.setAttribute("width", "100%");
    svgContainer.setAttribute("preserveAspectRatio", "none");

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    line.setAttribute("stroke", "#FAF0E6");
    line.setAttribute("stroke-width", "2px");
    line.setAttribute("fill", "none");
    svgContainer.setAttribute("class", "line");

    svgContainer.appendChild(line);

    document.body.appendChild(svgContainer);
    this.svgContainer = svgContainer;

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