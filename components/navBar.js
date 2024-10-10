import Login from "../pages/Login";
import Register from "../pages/Register";
import Movies from "../pages/Movies";
import { Link } from "./link";

export function NavBar() {
  const navbar = document.createElement("div");

  navbar.append(Link("Movies", () => Movies()));

  if (localStorage.getItem("user")) {
    navbar.append(Link("My Tickets"));
  }

  if (!localStorage.getItem("user")) {
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
    navbar.append(login);

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
    navbar.append(register);
  } else {
    const userName = document.createElement("span");
    userName.textContent = JSON.parse(localStorage.getItem("user")).user.name;
    navbar.append(userName);
  }

  return navbar;
}
