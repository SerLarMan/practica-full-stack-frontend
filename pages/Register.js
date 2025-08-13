import { post } from "../utils/http-functions";
import Home from "./Home";

const template = () => `
    <section id="register">
        <form>
            <input type="text" placeholder="Nombre" id="username" />
            <input type="email" placeholder="Email" id="email" />
            <input type="password" placeholder="Contraseña" id="password" />
            <button id="registerbtn">Registrarse</button>
        </form>
    </section>
`;

const registerSubmit = async () => {
  const name = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    await post("users/register", { name, email, password });
    const user = await post("users/login", { email, password });
    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "/";
    alert(`Bienvenido ${user.user.name}`);
  } catch (error) {
    alert(error.message);
  }
};

const Register = () => {
  document.querySelector("main").innerHTML = template();

  document.querySelector("#registerbtn").addEventListener("click", (e) => {
    e.preventDefault();
    registerSubmit();
  });
};

export default Register;
