export function Link(text, clickEvent) {
  const link = document.createElement("a");
  link.classList.add(
    "text-gray-700",
    "hover:text-purple-600",
    "transition-colors",
    "font-medium",
    "hover:cursor-pointer"
  );
  link.addEventListener("click", clickEvent)
  link.textContent = text;

  return link;
}