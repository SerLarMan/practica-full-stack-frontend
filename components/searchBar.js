export function SearchBar() {
  const searchbar = document.createElement("div");
  searchbar.className = "relative";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Buscar por artista o concierto";
  input.name = "search";
  input.classList.add(
    "pl-10",
    "h-12",
    "text-lg",
    "border-2",
    "border-purple-200",
    "focus:border-purple-400",
    "rounded-full"
  );

  const icon = document.createElement("i");
  icon.classList.add(
    "fa-solid",
    "fa-magnifying-glass",
    "absolute",
    "left-3",
    "top-1/2",
    "transform",
    "-translate-y-1/2",
    "text-gray-400",
    "h-4",
    "w-4"
  );

  searchbar.append(input);
  searchbar.append(icon);
  return searchbar;
}
