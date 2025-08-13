import { NavBar } from "./components/navBar";
import Home from "./pages/Home";

import "./style.css";

const header = document.querySelector("header");
header.append(NavBar());

Home();
