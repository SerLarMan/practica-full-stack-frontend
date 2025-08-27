import { Button } from "../components/button";
import { Input } from "../components/input";
import { post } from "../utils/http-functions";
import Login from "./Login";

const template = () => `
<section id="register" class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <h2 class="text-center mt-6 text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
      Registro
    </h2>

    <div class="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-lg p-6">
      <form id="register-form" class="space-y-6">
        <div class="text-center">
          <p class="mt-2 text-sm text-gray-600">
            ¿Ya tienes una cuenta? 
            <button type="button" id="login-redirect" class="text-purple-600 hover:text-purple-500 font-semibold">Inicia sesión</button>
          </p>
        </div>
      </form>
    </div>
  </div>
</section>
`;

const registerSubmit = async () => {
  const name = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;
  const image = document.querySelector("#profileImage").files[0];

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);

    await post("users/register", formData, "", true);
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

const Register = () => {
  document.querySelector("main").innerHTML = template();

  const form = document.querySelector("#register-form");
  form.prepend(
    Button(
      "Registrarse",
      null,
      (e) => {
        e.preventDefault();
        registerSubmit();
      },
      ["w-full"]
    )
  );
  form.prepend(
    Input(
      "Confirmar Contraseña",
      "confirmPassword",
      "confirmPassword",
      "password",
      "Confirma tu contraseña"
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
  form.prepend(Input("Imagen perfil", "profileImage", "file", "file", ""));
  form.prepend(
    Input(
      "Nombre de usuario",
      "username",
      "username",
      "text",
      "Tu nombre de usuario"
    )
  );

  document.querySelector("#login-redirect").addEventListener("click", () => {
    Login();
  });
};

export default Register;
