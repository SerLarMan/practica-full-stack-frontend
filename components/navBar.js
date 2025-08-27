import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { Link } from "./link";
import { Button } from "./button";

import { isUserLogged, currUser } from "../utils/user-functions";
import Tickets from "../pages/Tickets";
import Settings from "../pages/Setting";

export function NavBar() {
  const container = document.createElement("div");
  container.className = "container mx-auto px-4";

  const nav = document.createElement("nav");
  nav.className = "flex items-center justify-between h-16";

  // Logo
  const logoLink = document.createElement("button");
  logoLink.addEventListener("click", () => {
    Home();
  });
  logoLink.classList.add(
    "flex",
    "items-center",
    "space-x-2",
    "text-purple-600",
    "hover:text-purple-700",
    "transition-colors"
  );

  const logoText = document.createElement("span");
  logoText.classList.add(
    "text-xl",
    "font-bold",
    "bg-gradient-to-r",
    "from-purple-600",
    "to-pink-600",
    "bg-clip-text",
    "text-transparent"
  );
  logoText.textContent = "SOUND-SYSTEM";
  logoLink.append(logoText);

  // Menu (desktop)
  const menu = document.createElement("div");
  menu.className = "hidden md:flex items-center space-x-8";

  menu.append(Link("Conciertos", () => Home()));

  if (isUserLogged()) {
    menu.append(Link("Mis Entradas", () => Tickets()));
  }

  // Right Section
  const rightSection = document.createElement("div");
  rightSection.className = "flex items-center space-x-4";

  if (isUserLogged()) {
    // User Dropdown Menu
    const dropdownWrapper = document.createElement("div");
    dropdownWrapper.className = "relative";

    const dropdownBtn = document.createElement("button");
    dropdownBtn.classList.add(
      "flex",
      "items-center",
      "space-x-2",
      "text-gray-700",
      "hover:text-purple-600",
      "transition-colors",
      "font-medium"
    );
    dropdownBtn.innerHTML = `<img src="${currUser().image}" alt="${
      currUser().name
    }" class="h-8 w-8 rounded-full object-cover border border-gray-200"><span class="md:inline">${
      currUser().name
    }</span>`;

    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add(
      "hidden",
      "absolute",
      "right-0",
      "mt-2",
      "w-48",
      "bg-white",
      "rounded",
      "shadow-lg",
      "py-2",
      "z-50"
    );

    // Tickets (mobile)
    const ticketsLink = document.createElement("button");
    ticketsLink.addEventListener("click", () => {
      Tickets();
    });
    ticketsLink.classList.add(
      "flex",
      "items-center",
      "space-x-2",
      "px-4",
      "py-2",
      "hover:bg-gray-100",
      "md:hidden"
    );
    ticketsLink.innerHTML = `<i class="fa-solid fa-ticket h-4 w-4"></i>${
      Link("Mis Entradas", () => Tickets()).outerHTML
    }`;
    dropdownMenu.append(ticketsLink);

    // Setting
    const settingsBtn = document.createElement("button");
    settingsBtn.classList.add(
      "flex",
      "items-center",
      "space-x-2",
      "px-4",
      "py-2",
      "hover:bg-gray-100",
      "w-full",
      "text-left"
    );
    settingsBtn.innerHTML = `<i class="fa-solid fa-gear h-4 w-4"></i><span>Configuración</span>`;
    settingsBtn.addEventListener("click", () => {
      Settings();
    });
    dropdownMenu.append(settingsBtn);

    // Log Out
    const logoutBtn = document.createElement("button");
    logoutBtn.classList.add(
      "flex",
      "items-center",
      "space-x-2",
      "px-4",
      "py-2",
      "text-red-600",
      "hover:bg-gray-100",
      "w-full",
      "text-left"
    );
    logoutBtn.innerHTML = `<i class="fa-solid fa-right-from-bracket h-4 w-4"></i><span>Cerrar Sesión</span>`;
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    });
    dropdownMenu.append(logoutBtn);

    dropdownWrapper.append(dropdownBtn);
    dropdownWrapper.append(dropdownMenu);

    // Toggle menu
    dropdownBtn.addEventListener("click", () => {
      dropdownMenu.classList.toggle("hidden");
    });

    rightSection.append(dropdownWrapper);
  } else {
    // Sign In / Sign Up
    const signInBtn = document.createElement("button");
    signInBtn.classList.add(
      "px-3",
      "py-2",
      "rounded",
      "hover:bg-gray-100",
      "transition-colors"
    );
    signInBtn.textContent = "Iniciar Sesión";
    signInBtn.addEventListener("click", () => Login());

    rightSection.append(signInBtn);
    rightSection.append(Button("Registrarse", null, null, () => Register()));
  }
  nav.append(logoLink);
  nav.append(menu);
  nav.append(rightSection);
  container.append(nav);

  return container;
}
