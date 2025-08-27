export function Button(text, icon, clickEvent, classes) {
  const button = document.createElement("button");
  button.classList.add(
    "px-4",
    "py-2",
    "rounded",
    "text-white",
    "bg-gradient-to-r",
    "from-purple-600",
    "to-pink-600",
    "hover:from-purple-700",
    "hover:to-pink-700",
    "transition-colors",
    "flex",
    "justify-center",
    "items-center",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed"
  );

  if(classes) {
    button.classList.add(classes);
  }

  button.addEventListener("click", clickEvent);
  button.textContent = text;

  if(icon) {
    const iconElement = document.createElement("i");
    iconElement.className = icon;
    iconElement.classList.add("mr-2", "h-4", "w-4");
    button.prepend(iconElement);
  }

  return button;
}
