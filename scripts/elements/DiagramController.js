import DIAGRAM_ELEMENTS_TAGS from "./elements-tags.js";

class DiagramController {
  constructor() { }

  static createElement(tag, elementStr) {
    return (new DIAGRAM_ELEMENTS_TAGS[tag](elementStr));
  }
}

export default DiagramController;