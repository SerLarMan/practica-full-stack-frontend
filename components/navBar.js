import Login from "../pages/Login";
import Register from "../pages/Register";
import Movies from "../pages/Movies";
import MovieForm from "../pages/MovieForm";
import Tickets from "../pages/Tickets";
import { Link } from "./link";

import { isAdmin, isUserLogged, currUser } from "../utils/user-functions";

export function NavBar() {
  const navbar = document.createElement("div");
  navbar.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "px-4",
    "py-4"
  );

  const title = document.createElement("h1");
  title.textContent = "Cinema Paradiso";
  title.classList.add("w-[33%]");

  const linksDiv = document.createElement("div");
  linksDiv.classList.add("flex", "w-[33%]", "justify-center", "gap-4");

  linksDiv.append(Link("Movies", () => Movies()));
  if (isUserLogged()) {
    linksDiv.append(Link("My Tickets", () => Tickets()));

    if (isAdmin()) {
      linksDiv.append(Link("Add film", () => MovieForm()));
    }
  }

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("flex", "w-[33%]", "justify-end", "gap-4");

  if (!isUserLogged()) {
    const login = document.createElement("button");
    login.classList.add(
      "bg-transparent",
      "hover:bg-blue-700",
      "text-blue-700",
      "font-semibold",
      "hover:text-white",
      "py-2",
      "px-4",
      "border",
      "border-blue-500",
      "hover:border-transparent",
      "rounded"
    );
    login.textContent = "Sing in";
    login.addEventListener("click", () => Login());
    buttonsDiv.append(login);

    const register = document.createElement("button");
    register.classList.add(
      "bg-blue-500",
      "hover:bg-blue-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "border",
      "border-transparent",
      "rounded"
    );
    register.textContent = "Sing up";
    register.addEventListener("click", () => Register());
    buttonsDiv.append(register);
  } else {
    const userName = document.createElement("div");
    userName.classList.add(
      "border",
      "border-gray-300",
      "px-5",
      "py-2",
      "rounded",
      "cursor-pointer",
      "font-bold",
      "w-[200px",
      "shadow-sm"
    );
    userName.addEventListener("click", () => toggleDropDown());
    userName.textContent = currUser().name;

    const userActionsMenu = document.createElement("div");
    userActionsMenu.id = "dropDownMenu";
    userActionsMenu.classList.add(
      "rounded",
      "border",
      "border-gray-300",
      "absolute",
      "top-[65px]",
      "w-[175px]",
      "shadow-sm",
      "hidden"
    );

    const userAction = document.createElement("div");
    userAction.classList.add("cursor-pointer", "hover:bg-gray-300", "p-4");
    userAction.textContent = "Sign out";
    userAction.addEventListener("click", () => {
      localStorage.removeItem("user");

      Movies();
      alert("Sign out");
    });

    userActionsMenu.append(userAction);
    buttonsDiv.append(userName);
    buttonsDiv.append(userActionsMenu);
  }

  navbar.append(title);
  navbar.append(linksDiv);
  navbar.append(buttonsDiv);
  return navbar;
}

function toggleDropDown() {
  const dropdown = document.querySelector("#dropDownMenu");
  dropdown.classList.toggle("hidden");
}
