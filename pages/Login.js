import { post } from "../utils/http-functions";

const template = () => `
    <section id="login">
        <form>
            <input type="email" placeholder="Email" id="email" />
            <input type="password" placeholder="Password" id="password" />
            <button id="loginbtn">Sing in</button>
        </form>
    </section>
`;

const loginSubmit = async () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const user = await post("users/login", { email, password });
    localStorage.setItem("user", JSON.stringify(user));

    alert(`Welcome ${user.user.name}`);
  } catch (error) {
    alert(error.message);
  }
};

const Login = () => {
  document.querySelector("main").innerHTML = template();

  document.querySelector("#loginbtn").addEventListener("click", (e) => {
    e.preventDefault();
    loginSubmit();
  });
};

export default Login;
