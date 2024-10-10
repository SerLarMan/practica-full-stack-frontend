import Movies from "./pages/Movies";
import { NavBar } from "./components/navBar";

import "./style.css";

const header = document.querySelector("header");
header.append(NavBar());

Movies();
