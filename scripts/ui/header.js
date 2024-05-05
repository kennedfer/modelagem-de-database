function restoreThemeSaved() {
  const savedTheme = localStorage.getItem("theme");
  const theme = savedTheme ? savedTheme : "dark";

  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("theme", theme);
}

function changeTheme(event) {
  const currentTheme = document.documentElement.getAttribute("theme");

  const themeIcon = event.srcElement;

  let targetTheme = "light";

  if (currentTheme === "light") {
    targetTheme = "dark";
    themeIcon.src = `../../assets/icons/dark-theme-icon.png`;
  } else {
    targetTheme = "light";
    themeIcon.src = `../../assets/icons/light-theme-icon.png`;
  }

  localStorage.setItem("theme", targetTheme);
  document.documentElement.setAttribute('theme', targetTheme)
}

const changeThemeButton = document.getElementById("change-theme-button");
changeThemeButton.onclick = changeTheme;

restoreThemeSaved();