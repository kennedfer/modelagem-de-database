function collapseCodeInput() {
  codeInput.style.left = "-100%";
}

function expandCodeInput() {
  codeInput.style.left = "0";
}

const codeInput = document.getElementById("code-input");
const showCodeInput = document.getElementById("show-code-input");

codeInput.addEventListener("blur", collapseCodeInput);
showCodeInput.addEventListener("click", expandCodeInput);