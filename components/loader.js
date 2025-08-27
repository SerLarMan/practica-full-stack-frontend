export function Loader() {
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.className = "flex justify-center items-center w-full py-12";

  loader.innerHTML = `
    <div class="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
  `;

  return loader;
}
