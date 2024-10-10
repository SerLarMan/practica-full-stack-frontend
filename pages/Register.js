import { post } from "../utils/http-functions";

const template = () => `
    <section id="register">
        <form>
            <input type="text" placeholder="Username" id="username" />
            <input type="email" placeholder="Email" id="email" />
            <input type="password" placeholder="Password" id="password" />
            <button id="registerbtn">Sing up</button>
        </form>
    </section>
`;

const registerSubmit = async () => {
  const name = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    await post("users/register", { name, email, password });
    const user = await post("users/login", {email, password})
    localStorage.setItem("user", JSON.stringify(user));

    alert(`Welcome ${res.user.name}`);
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
