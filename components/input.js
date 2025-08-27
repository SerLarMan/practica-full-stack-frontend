export function Input(text, id, name, type, placeholder) {
  const container = document.createElement("div");

  const label = document.createElement("label");
  label.htmlFor = name;
  label.classList.add("flex", "items-center", "space-x-2");
  label.textContent = text;

  const input = document.createElement("input");
  input.id = id;
  input.name = name;
  input.type = type;
  input.placeholder = placeholder;
  input.classList.add(
    "mt-1",
    "w-full",
    "border",
    "rounded",
    "px-3",
    "py-2",
    "focus:ring-2",
    "focus:ring-purple-500",
    "outline-none"
  );

  container.append(label);

  if (type === "password") {
    const passwordContainer = document.createElement("div");
    passwordContainer.classList.add("relative");

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.classList.add(
      "absolute",
      "right-3",
      "top-1/2",
      "-translate-y-1/2",
      "text-gray-500",
      "hover:text-gray-700",
    );
    toggleButton.innerHTML = '<i class="fa-solid fa-eye h-4 w-4"></i>';

    toggleButton.addEventListener("click", () => {
      const isText = input.type === "text";
      input.type = isText ? "password" : "text";
      toggleButton.innerHTML = isText
        ? '<i class="fa-solid fa-eye h-4 w-4"></i>'
        : '<i class="fa-solid fa-eye-slash h-4 w-4"></i>';
    });

    passwordContainer.append(input);
    passwordContainer.append(toggleButton);
    container.append(passwordContainer);
  } else {
    container.append(input);
  }

  return container;
}
