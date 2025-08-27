import { Button } from "../components/button";
import { Input } from "../components/input";
import { post } from "../utils/http-functions";
import Register from "./Register";

const template = () => `
<section id="login" class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <h2 class="text-center mt-6 text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
      Inicio de Sesión
    </h2>
    <div class="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-lg p-6">
      <form id="login-form" class="space-y-6">
        <div class="text-center">
          <p class="mt-2 text-sm text-gray-600"> 
            ¿No tienes una cuenta? <button id="register-redirect" type="button" class="text-purple-600 hover:text-purple-500">Regístrate</button>
          </p>
        </div>
      </form>
    </div>
  </div>
</section>
`;

const loginSubmit = async () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const user = await post("users/login", { email, password });
    localStorage.setItem(
      "user",
      JSON.stringify({
        token: user.token,
        user: user.user,
      })
    );

    window.location.href = "/";
    alert(`Bienvenido ${user.user.name}`);
  } catch (error) {
    alert(error.message);
  }
};

const Login = () => {
  document.querySelector("main").innerHTML = template();

  const form = document.querySelector("#login-form");
  form.prepend(
    Button(
      "Iniciar Sesión",
      null,
      (e) => {
        e.preventDefault();
        loginSubmit();
      },
      ["w-full"]
    )
  );
  form.prepend(
    Input(
      "Contraseña",
      "password",
      "password",
      "password",
      "Introduce tu contraseña"
    )
  );
  form.prepend(Input("Email", "email", "email", "email", "Introduce tu email"));

  document.querySelector("#register-redirect").addEventListener("click", () => {
    Register();
  });
};

export default Login;
