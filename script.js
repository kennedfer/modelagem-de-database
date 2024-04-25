import interpreter from "./interpreter.js";

const codeTextarea = document.getElementById("code-textarea");

codeTextarea.onchange = function (e) {
  const code = e.target.value;

  try {
    interpreter.interpret(code);
  } catch (e) {
    console.log(e);
  }
};
