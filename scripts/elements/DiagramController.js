import RelationshipElement from "./relationship/RelationshipElement.js";
import TableElement from "./table/TableElement.js";

const DIAGRAM_ELEMENTS_TAGS = {
  tabela: TableElement,
  relacao: RelationshipElement
}

class DiagramController {
  static createElement(tag, elementStr) {
    return (new DIAGRAM_ELEMENTS_TAGS[tag](elementStr));
  }
}

export default DiagramController;