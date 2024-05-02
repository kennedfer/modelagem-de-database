function restoreThemeSaved() {
  const savedTheme = localStorage.getItem("theme");
  const theme = savedTheme ? savedTheme : "dark";

  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("theme", theme);
}

function changeTheme() {
  const currentTheme = document.documentElement.getAttribute("theme");
  let targetTheme = "light";

  if (currentTheme === "light") {
    targetTheme = "dark";
  } else {
    targetTheme = "light";
  }

  localStorage.setItem("theme", targetTheme);
  document.documentElement.setAttribute('theme', targetTheme)
}

const changeThemeButton = document.getElementById("change-theme-button");
changeThemeButton.onclick = changeTheme;

restoreThemeSaved();