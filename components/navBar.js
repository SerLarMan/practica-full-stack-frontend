import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { Link } from "./link";
import { Button } from "./button";

import { isAdmin, isUserLogged, currUser } from "../utils/user-functions";

export function NavBar() {
  console.log(currUser());

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

  const logoIcon = document.createElement("i");
  logoIcon.className = "fa-solid fa-music h-8 w-8";

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
  logoText.textContent = "Título";

  logoLink.appendChild(logoIcon);
  logoLink.appendChild(logoText);

  // Menu (desktop)
  const menu = document.createElement("div");
  menu.className = "hidden md:flex items-center space-x-8";

  menu.appendChild(Link("Conciertos", () => Home()));

  const myTicketsLink = document.createElement("button");
  myTicketsLink.addEventListener("click", () => {});
  myTicketsLink.classList.add(
    "text-gray-700",
    "hover:text-purple-600",
    "transition-colors",
    "font-medium"
  );
  myTicketsLink.textContent = "Mis Entradas";
  menu.appendChild(myTicketsLink);

  if (isAdmin()) {
    const adminLink = document.createElement("button");
    adminLink.addEventListener("click", () => {});
    adminLink.classList.add(
      "text-gray-700",
      "hover:text-purple-600",
      "transition-colors",
      "font-medium"
    );
    adminLink.textContent = "Panel Administrador";
    menu.appendChild(adminLink);
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
    dropdownBtn.innerHTML = `<i class="fa-solid fa-user h-4 w-4"></i><span class="hidden md:inline">${
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

    // Profile
    const profileLink = document.createElement("a");
    profileLink.href = "/user-management";
    profileLink.className =
      "flex items-center space-x-2 px-4 py-2 hover:bg-gray-100";
    profileLink.innerHTML = `<i class="fa-solid fa-gear h-4 w-4"></i><span>Configuración</span>`;
    dropdownMenu.appendChild(profileLink);

    // Tickets (mobile)
    const ticketsLink = document.createElement("a");
    ticketsLink.href = "/my-tickets";
    ticketsLink.classList.add(
      "flex",
      "items-center",
      "space-x-2",
      "px-4",
      "py-2",
      "hover:bg-gray-100",
      "md:hidden"
    );
    ticketsLink.innerHTML = `<i class="fa-solid fa-ticket h-4 w-4"></i><span>My Tickets</span>`;
    dropdownMenu.appendChild(ticketsLink);

    // Admin (mobile)
    if (isAdmin()) {
      const adminMobileLink = document.createElement("a");
      adminMobileLink.href = "/admin";
      adminMobileLink.classList.add(
        "flex",
        "items-center",
        "space-x-2",
        "px-4",
        "py-2",
        "hover:bg-gray-100",
        "md:hidden"
      );
      adminMobileLink.innerHTML = `<i class="fa-solid fa-calendar h-4 w-4"></i><span>Admin Dashboard</span>`;
      dropdownMenu.appendChild(adminMobileLink);
    }

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
    dropdownMenu.appendChild(logoutBtn);

    dropdownWrapper.appendChild(dropdownBtn);
    dropdownWrapper.appendChild(dropdownMenu);

    // Toggle menu
    dropdownBtn.addEventListener("click", () => {
      dropdownMenu.classList.toggle("hidden");
    });

    rightSection.appendChild(dropdownWrapper);
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

    rightSection.appendChild(signInBtn);
    rightSection.appendChild(Button("Registrarse", null, () => Register()));
  }
  nav.appendChild(logoLink);
  nav.appendChild(menu);
  nav.appendChild(rightSection);
  container.appendChild(nav);

  return container;
}
