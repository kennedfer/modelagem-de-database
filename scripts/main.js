import interpreter from "./interpreter/interpreter.js";

const codeTextarea = document.getElementById("code-textarea");

codeTextarea.onblur = function (e) {
  // const code = e.target.value;
  const code = Array.from(codeTextarea.children).reduce(
    (accumulator, currentValue) => accumulator + currentValue.textContent + "\n",
    "",);

  try {
    interpreter.interpret(code);
  } catch (e) {
    console.log(e);
  }
};
