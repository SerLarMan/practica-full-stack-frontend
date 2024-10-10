export function Link(text, clickEvent) {
  const link = document.createElement("a");
  link.classList.add("cursor-pointer");
  link.addEventListener("click", clickEvent)
  link.textContent = text;

  return link;
}
