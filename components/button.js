export function Button(text, icon, clickEvent) {
  const button = document.createElement("button");
  button.classList.add(
    "px-4",
    "py-2",
    "rounded",
    "bg-gradient-to-r",
    "from-purple-600",
    "to-pink-600",
    "hover:from-purple-700",
    "hover:to-pink-700",
    "text-white",
    "transition-colors",
    "flex",
    "items-center",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed"
  );
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
