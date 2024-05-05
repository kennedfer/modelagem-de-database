import interpreter from "./interpreter/interpreter.js";

const codeInput = document.getElementById("code-input");

codeInput.onblur = function (e) {
  const code = Array.from(codeInput.children).reduce(
    (accumulator, currentValue) => accumulator + currentValue.textContent + "\n",
    "",);

  try {
    interpreter.interpret(code);
  } catch (e) {
    console.log(e);
  }
};
