import { Button } from "../components/button";
import { Input } from "../components/input";
import { put } from "../utils/http-functions";
import { currUser, TOKEN } from "../utils/user-functions";

const template = () => `
    <section id="settings" class="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
        <h2 class="mt-6 text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Configuración
        </h2>
        <div id="profileCard" class="bg-white rounded-2xl shadow-lg border border-gray-200"></div>
    </section>
`;

const updateProfile = async () => {
  const name = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const image = document.querySelector("#profileImage").files[0];

  try {
    const formData = new FormData();
    name != "" && formData.append("name", name);
    email != "" && formData.append("email", email);
    if (image) formData.append("image", image);

    const user = await put("users", currUser()._id, formData, TOKEN(), true);
    localStorage.setItem(
      "user",
      JSON.stringify({
        token: TOKEN(),
        user: user,
      })
    );

    window.location.href = "/";
    alert("Perfil actualizado correctamente");
  } catch (error) {
    alert(error.message);
  }
};

const Settings = () => {
  document.querySelector("main").innerHTML = template();

  const profileCard = document.querySelector("#profileCard");

  const header = document.createElement("div");
  header.className = "border-b p-6 flex items-center space-x-3";
  header.innerHTML = `
    <i class="fa-solid fa-user text-purple-600"></i>
    <h3 class="text-lg font-semibold">Información del perfil</h3>
  `;

  const content = document.createElement("div");
  content.className = "p-6 space-y-6";

  // Profile picture
  const avatarSection = document.createElement("div");
  avatarSection.className = "flex items-center space-x-6";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "relative";

  const avatar = document.createElement("img");
  avatar.src = currUser().image;
  avatar.alt = currUser().name;
  avatar.className = "h-24 w-24 rounded-full object-cover border";

  // Botón de cambio de imagen
  const changePicBtn = document.createElement("button");
  changePicBtn.classList.add(
    "absolute",
    "-bottom-2",
    "-right-2",
    "rounded-full",
    "h-8",
    "w-8",
    "flex",
    "items-center",
    "justify-center",
    "bg-gradient-to-r",
    "from-purple-600",
    "to-pink-600",
    "text-white",
    "shadow",
    "hover:from-purple-700",
    "hover:to-pink-700"
  );
  changePicBtn.innerHTML = `<i class="fa-solid fa-camera"></i>`;

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.className = "hidden";
  fileInput.id = "profileImage";
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      avatar.src = URL.createObjectURL(file);
    }
  });

  changePicBtn.addEventListener("click", () => fileInput.click());

  avatarWrapper.append(avatar, changePicBtn, fileInput);

  avatarSection.append(avatarWrapper);

  // Form
  const form = document.createElement("form");
  form.className = "space-y-4";

  form.append(
    Input(
      "Nombre de usuario",
      "username",
      "username",
      "text",
      currUser().name || ""
    )
  );

  form.append(
    Input(
      "Correo electrónico",
      "email",
      "email",
      "email",
      currUser().email || ""
    )
  );

  form.append(
    Button("Guardar cambios", null, (e) => {
      e.preventDefault();
      updateProfile();
    })
  );

  content.append(avatarSection, form);
  profileCard.append(header, content);
};

export default Settings;
